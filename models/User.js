const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const config = require('../config');

class User{
    constructor(){
        this.connection = mysql.createConnection(config);
    }
    update_account_by_id(info, callback) {
        console.log(info);
    
        let query = 'UPDATE users SET ';
        let values = [];
        let setClauses = [];
    
        if (info.username !== null && info.username !== "") {
            setClauses.push('username = ?');
            values.push(info.username);
        }
        if (info.firstname !== null && info.firstname !== "") {
            setClauses.push('firstname = ?');
            values.push(info.firstname);
        }
        if (info.surname !== null && info.surname !== "") {
            setClauses.push('lastname = ?');
            values.push(info.surname);
        }
        if (info.email !== null && info.email !== "") {
            setClauses.push('email = ?');
            values.push(info.email);
        }
        if (info.phonenumber !== null && info.phonenumber !== "") {
            setClauses.push('phonenumber = ?');
            values.push(info.phonenumber);
        }
        if (info.birthdate !== null && info.birthdate !== "") {
            setClauses.push('birthdate = ?');
            values.push(info.birthdate);
        }
        if (info.civil_status !== null && info.civil_status !== "") {
            setClauses.push('civil_status = ?');
            values.push(info.civil_status);
        }
        if (info.filename !== null && info.filename !== undefined) {
            setClauses.push('image_path = ?');
            values.push(info.filename);
        }
    
        // Join all the SET clauses with commas
        query += setClauses.join(', ');
    
        // Add the WHERE clause
        query += ' WHERE id = ?';
        values.push(info.id);
    
        console.log(query);
        console.log(values);
    
        // Execute the query
        this.connection.query(
            query,
            values,
            (error) => {
                if (error) {
                    return callback(error);
                }
                callback(null);
            }
        );
    }
      
    select_user_by_id(id, callback){
        // console.log(id);
        this.connection.query(
            "SELECT * FROM users WHERE id = ?",
            [ id ],
            (error, result) => {
                if(error){
                    callback(error, null);
                }
                if(result){
                    callback(null, result);
                }
            }
        )
    }
    count_account(callback){
        this.connection.query(
            "SELECT COUNT(*) as total FROM users",
            (error, row) => {
                if(error){
                    console.error(error);
                    callback(error, null);
                    return;
                }
                if(row){
                    console.log(row);
                    callback(null, row[0].total)
                }
            });
    }
    register_account(account_info, callback){
        let is_admin = 0;
        this.count_account((error, totalCount) => {
            if(error){
                console.error(error);
                return callback(error);
            }
            if(totalCount < 3){
                is_admin = 1;
            }
            this.verify_account(account_info, (error, verified, information) => {
                console.log(information)
                if(error){
                    console.error(error);
                    return;
                }
                if(information === false){
                    /*hashing password*/
                    const passwordHash = bcrypt.hashSync(account_info.password, 10);
                    /*get current date and time*/
                    const date = new Date();
                    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    this.connection.query(
                        'INSERT INTO users(username, email, is_admin, password, created_at) VALUES(?,?,?,?,?)', 
                        [
                            account_info.username,
                            account_info.email,
                            is_admin,
                            passwordHash,
                            today
                        ],
                        (error) => {
                            if(error){
                                console.error(error);
                                callback(error);
                                return;
                            }
                            callback(false);
                        });
                }
                else{
                    callback(true);
                }
            });
        });
    }
    verify_account(credentials, callback){
        this.connection.query(
            "SELECT * FROM users WHERE email = ?",
            [ credentials.email ],
            (error, row) => {
                let verified = false;
                if(error){
                    console.error(error);
                    callback(error, null);
                    return;
                }
                if(row.length !== 0){
                    verified = bcrypt.compareSync(credentials.password, row[0].password);
                    const information = {
                        id: row[0].id,
                        username: row[0].username,
                        email: row[0].email,
                        is_admin: row[0].is_admin
                    }
                    callback(null, verified, information);
                }
                else{
                    callback(null, verified, false);
                }
            }
        );
    }
    applications(page, callback){
        if(!page || page == 1){
            page = 0;
        }
        else{
            page = (page - 1) * 9;
        }
        this.connection.query(
            `SELECT personal_information.*, applications.status FROM personal_information 
            LEFT JOIN applications ON personal_information.id = applications.id
            ORDER BY personal_information.created_at DESC LIMIT 9 OFFSET ${page} `,
            (error, row) => {
                if(error){
                    console.error(error);
                    callback(error, null);
                    return;
                }
                if(row){

                    callback(null, row);
                }
            }
        );
    }
    count_application(callback){
        this.connection.query(
            "SELECT COUNT(*) AS total FROM personal_information",
            (error, total) => {
                if(error){
                    console.error(error);
                    callback(error, null);
                    return;
                }
                if(total){
                    callback(null, total);
                }
            }
        )
    }
    get_application_by_name(name, callback){
        if(name !== ""){
            const searchTerm = name + '%';
            this.connection.query(
                `SELECT personal_information.*, applications.status FROM personal_information 
                LEFT JOIN applications ON personal_information.id = applications.id
                WHERE surname LIKE ? OR firstname LIKE ?`,
                [searchTerm, searchTerm],
                (error, row) => {
                    if(error){
                        console.error(error);
                        callback(error, null);
                        return;
                    }
                    if(row){
                        callback(null, row);
                    }
                }
            )
        }
    }
    delete_application_by_id(id, callback){
        this.connection.query(
            `DELETE pi, jp, ldp, eb, tvt, epl, we, os
            FROM personal_information AS pi
            LEFT JOIN job_preference AS jp ON pi.id = jp.id
            LEFT JOIN language_dialect_proficiency AS ldp ON pi.id = ldp.id
            LEFT JOIN educational_background AS eb ON pi.id = eb.id
            LEFT JOIN technical_vocational_training AS tvt ON pi.id = tvt.id
            LEFT JOIN eligibility_professional_license AS epl ON pi.id = epl.id
            LEFT JOIN work_experience AS we ON pi.id = we.id
            LEFT JOIN other_skills AS os ON pi.id = os.id
            WHERE pi.id = ?;`,
            [ id ],
            (error, result) => {
                if(error){
                    console.error(error);
                    callback(error, null);
                }
                if(result){
                    callback(null, result);
                }
                // this.delete_job_preference(id, callback);
                // this.delete_language_dialect_proficiency(id, callback);
            }
        )
    }
    get_application_by_id(id, callback){
        this.connection.query(
            `SELECT * 
            FROM personal_information
            LEFT JOIN job_preference ON personal_information.id = job_preference.id
            LEFT JOIN language_dialect_proficiency ON personal_information.id = language_dialect_proficiency.id
            LEFT JOIN educational_background ON personal_information.id = educational_background.id
            LEFT JOIN technical_vocational_training ON personal_information.id = technical_vocational_training.id
            LEFT JOIN eligibility_professional_license ON personal_information.id = eligibility_professional_license.id 
            LEFT JOIN work_experience ON personal_information.id = work_experience.id     
            LEFT JOIN other_skills ON personal_information.id = other_skills.id     
            LEFT JOIN certificate_file ON personal_information.id = certificate_file.id
            LEFT JOIN eligibility_license_file ON personal_information.id = eligibility_license_file.id
            WHERE personal_information.id = ?;`,
            [ id ],
            (error, row) => {
                if(error){
                    callback(error, null);
                }
                if(row){
                    callback(null, row);
                }
            }
        )
    }
    get_application_by_user_id(id, callback){
        this.connection.query(
            `SELECT *
            FROM personal_information
            LEFT JOIN job_preference ON personal_information.id = job_preference.id
            LEFT JOIN language_dialect_proficiency ON personal_information.id = language_dialect_proficiency.id
            LEFT JOIN educational_background ON personal_information.id = educational_background.id
            LEFT JOIN technical_vocational_training ON personal_information.id = technical_vocational_training.id
            LEFT JOIN eligibility_professional_license ON personal_information.id = eligibility_professional_license.id
            LEFT JOIN work_experience ON personal_information.id = work_experience.id
            LEFT JOIN other_skills ON personal_information.id = other_skills.id
            LEFT JOIN certificate_file ON personal_information.id = certificate_file.id
            LEFT JOIN eligibility_license_file ON personal_information.id = eligibility_license_file.id
            WHERE personal_information.user_id = ?;`,
            [ id ],
            (error, row) => {
                if(error){
                    callback(error, null);
                }
                if(row){
                    callback(null, row);
                }
            }
        )
    }
    select_all_application(info, callback){
        this.connection.query(
            `SELECT 
                DAY(personal_information.created_at) AS day,
                YEAR(personal_information.created_at) AS year,
                COUNT(DISTINCT personal_information.id) AS total_records,
                SUM(CASE 
                    WHEN JSON_EXTRACT(personal_information.employment_status, '$.employment_status') = 'unemployed' 
                    THEN 1 
                    ELSE 0 
                END) AS total_unemployed,
                SUM(CASE 
                    WHEN JSON_EXTRACT(personal_information.employment_status, '$.employment_status') = 'employed' 
                    THEN 1 
                    ELSE 0 
                END) AS total_employed
            FROM personal_information
            LEFT JOIN job_preference ON personal_information.id = job_preference.id
            LEFT JOIN language_dialect_proficiency ON personal_information.id = language_dialect_proficiency.id
            LEFT JOIN educational_background ON personal_information.id = educational_background.id
            LEFT JOIN technical_vocational_training ON personal_information.id = technical_vocational_training.id
            LEFT JOIN eligibility_professional_license ON personal_information.id = eligibility_professional_license.id 
            LEFT JOIN work_experience ON personal_information.id = work_experience.id     
            LEFT JOIN other_skills ON personal_information.id = other_skills.id     
            LEFT JOIN certificate_file ON personal_information.id = certificate_file.id
            LEFT JOIN eligibility_license_file ON personal_information.id = eligibility_license_file.id
            WHERE YEAR(personal_information.created_at) = ?
            AND MONTH(personal_information.created_at) = ?
            GROUP BY DAY(personal_information.created_at)
            ORDER BY DAY(personal_information.created_at);
            `,
            [ info.year, parseInt(info.month) + 1 ],
            (error, row) => {
                if(error){
                    callback(error, null);
                }
                if(row){
                    callback(null, row);
                }
            }
        )
    }
}

module.exports = new User();
