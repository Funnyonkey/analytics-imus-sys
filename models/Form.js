const mysql = require('mysql');
const config = require('../config');

class Form{
    constructor(){
        this.connection = mysql.createConnection(config);
    }
    /* Get notification by id */
    select_notification_by_id(id, callback){
        this.connection.query(
            'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
            [ id ],
            (error, row) => {
                if(error){
                    callback(error, null);
                }
                if(row){
                    callback(null, row);
                }
            },
        )
    }
    /* Get all notification*/
    select_all_notification(callback){
        this.connection.query(
            'SELECT * FROM notifications ORDER BY created_at DESC',
            (error, row) => {
                if(error){
                    callback(error, null);
                }
                if(row){
                    callback(null, row);
                }
            },
        )
    }
    update_application_status_by_id(info, callback){
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        // console.log(`UPDATE applications SET status = ${info.newStatus}, updated_at = ${today} WHERE user_id = ${info.id}`)
        this.connection.query(
            'UPDATE applications SET status = ?, updated_at = ? WHERE id = ?',
            [
                info.newStatus,
                today,
                info.id
            ],
            (error) => {
                if (error) {
                    // console.error(error);
                    callback(error);
                    return;
                }
            }
        )

        this.connection.query(
            'SELECT username FROM users WHERE id = ?',
            [
                info.userId
            ],
            (error, row) => {
                if(row){
                    let username = row[0].username
                    // insert activity to the notification
                    this.connection.query(
                        'INSERT INTO notifications(user_id, description, created_at) VALUES(?,?,?)',
                        [
                            info.userId,
                            `${username}'s application status is ${info.newStatus}`,
                            today
                        ],
                        (error) => {
                            console.error(error);
                            callback(error);
                            return;
                        }
                    )
                }
            }
        )

        
    }
    /* Insert information to the database */
    insert(info, callback){
        // console.log(info)
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        /* personal information */
        this.connection.query(
            'INSERT INTO personal_information(user_id, surname, firstname, middlename, suffix, birthdate, email, contact, height, gender, civil_status, disability, religion, address, employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                info.id,
                info.personalInformation[0].value, // surname
                info.personalInformation[1].value, // first name
                info.personalInformation[2].value, // middle name
                info.personalInformation[3].value, // suffix
                info.personalInformation[4].value, // birthdate
                info.personalInformation[5].value, // email
                info.personalInformation[6].value, // contact
                info.personalInformation[7].value, // height
                info.personalInformation[8].value, // gender
                info.personalInformation[9].value, // civil_status
                info.personalInformation[10].value, // disability
                info.personalInformation[11].value, // religion
                info.personalInformation[12].value, // address
                info.personalInformation[13].value, // employment_status
                info.personalInformation[14].value, // is_ofw
                info.personalInformation[15].value, // is_former_ofw
                info.personalInformation[16].value, // is_4ps_beneficiary
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* job preference */
        this.connection.query(
            'INSERT INTO job_preference(user_id, preferred_occupation, occupation, preferred_work_occupation, work_occupation, created_at) VALUES(?,?,?,?,?,?)',
            [
                info.id,
                info.jobPreference[0].value, // preferred_occupation
                info.jobPreference[1].value, // occupation
                info.jobPreference[2].value, // preferred_work_occupation
                info.jobPreference[3].value, // work_occupation
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* language and dialect proficiency */
        this.connection.query(
            'INSERT INTO language_dialect_proficiency(user_id, language1, language2, language3, other_language, created_at) VALUES(?,?,?,?,?,?)',
            [
                info.id,
                info.languageDialectProficiency[0].value, // language1
                info.languageDialectProficiency[1].value, // language2
                info.languageDialectProficiency[2].value, // language3
                info.languageDialectProficiency[3].value, // other language
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* educational background */
        this.connection.query(
            'INSERT INTO educational_background(user_id, elementary_school, elementary_course, elementary_year_graduated, if_elementary_undergraduate, secondary_school, secondary_course, secondary_year_graduated, if_secondary_undergraduate, tertiary_school, tertiary_course, tertiary_year_graduated, if_tertiary_undergraduate, graduate_studies_school, graduate_studies_course, graduate_studies_year_attended, if_graduate_studies_undergraduate, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                info.id,
                info.educationalBackground[0].value, // elementary_school
                "na", // elementary_course
                info.educationalBackground[1].value, // elementary_year_graduated
                info.educationalBackground[2].value, // if_elementary_undergraduate
                info.educationalBackground[3].value, // secondary_school
                "na",
                info.educationalBackground[4].value, // secondary_year_graduated
                info.educationalBackground[5].value, // if_secondary_undergraduate
                info.educationalBackground[6].value, // tertiary_school
                info.educationalBackground[7].value, // tertiary course
                info.educationalBackground[8].value, // tertiary_year_graduated
                info.educationalBackground[9].value, // if_tertiary_undergraduate
                info.educationalBackground[10].value, // graduate_studies_school
                info.educationalBackground[11].value, // graduate_studies_course
                info.educationalBackground[12].value, // graduate_studies_year_graduated
                info.educationalBackground[13].value, // if_graduate_studies_undergraduate
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* technical vocational training */
        this.connection.query(
            'INSERT INTO technical_vocational_training(user_id, course, institution, date_from, date_to, certificate, created_at) VALUES(?,?,?,?,?,?,?)',
            [
                info.id,
                info.techicalVocationalTraining[0].value, // course
                info.techicalVocationalTraining[1].value, // institution
                info.techicalVocationalTraining[2].value, // date_from
                info.techicalVocationalTraining[3].value, // date_to
                info.techicalVocationalTraining[4].value, // certificate
                today // created_at
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )
        /* eligibility and professional license */
        this.connection.query(
            'INSERT INTO eligibility_professional_license(user_id, eligibility, rating, date_exam, professional_license, valid_until, created_at) VALUES(?,?,?,?,?,?,?)',
            [
                info.id,
                info.eligibilityProfessionalLicense[0].value, // eligibility
                info.eligibilityProfessionalLicense[1].value, // rating
                info.eligibilityProfessionalLicense[2].value, // date_exam
                info.eligibilityProfessionalLicense[3].value, // professional_license
                info.eligibilityProfessionalLicense[4].value, // valid_until
                today // created_at
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )
        /* work experience */
        this.connection.query(
            'INSERT INTO work_experience(user_id, company_name, company_address, position, inclusive_date, status, created_at) VALUES(?,?,?,?,?,?,?)',
            [
                info.id,
                info.workExperience[0].value, // company_name
                info.workExperience[1].value, // company_address
                info.workExperience[2].value, // position
                info.workExperience[3].value, // inclusive_date
                info.workExperience[4].value, // status
                today // created_at
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )
        /* other skills */
        this.connection.query(
            'INSERT INTO other_skills(user_id, skills, created_at) VALUES(?,?,?)',
            [
                info.id,
                info.otherSkills[0].value, // skills
                today // created_at
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );

        // Certificate File
        this.connection.query(
            'INSERT INTO certificate_file(user_id, certificate_path, created_at) VALUES(?,?,?)',
            [
                info.id,
                JSON.stringify(info.certificateFile),
                today,
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );

        // Eligibility and License File
        this.connection.query(
            'INSERT INTO eligibility_license_file(user_id, eligibility_license_path, created_at) VALUES(?,?,?)',
            [
                info.id,
                JSON.stringify(info.eligibilityLicenseFile),
                today
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );

        // insert to the application table
        this.connection.query(
            'INSERT INTO applications(user_id, status, created_at) VALUE(?,?,?)',
            [
                info.id,
                'pending',
                today
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )

        // insert activity to the notification
        this.connection.query(
            'INSERT INTO notifications(user_id, description, created_at) VALUES(?,?,?)',
            [
                info.id,
                `${info.username} submitted application successfully.`,
                today
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )
    }
    update(info, callback) {
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
        // Personal Information
        this.connection.query(
            'UPDATE personal_information SET surname = ?, firstname = ?, middlename = ?, suffix = ?, birthdate = ?, email = ?, contact = ?, height = ?, gender = ?, civil_status = ?, disability = ?, religion = ?, address = ?, employment_status = ?, is_ofw = ?, is_former_ofw = ?, is_4ps_beneficiary = ?, updated_at = ? WHERE user_id = ?',
            [
                info.personalInformation[0].value, // surname
                info.personalInformation[1].value, // first name
                info.personalInformation[2].value, // middle name
                info.personalInformation[3].value, // suffix
                info.personalInformation[4].value, // birthdate
                info.personalInformation[5].value, // email
                info.personalInformation[6].value, // contact
                info.personalInformation[7].value, // height
                info.personalInformation[8].value, // gender
                info.personalInformation[9].value, // civil_status
                info.personalInformation[10].value, // disability
                info.personalInformation[11].value, // religion
                info.personalInformation[12].value, // address
                info.personalInformation[13].value, // employment_status
                info.personalInformation[14].value, // is_ofw
                info.personalInformation[15].value, // is_former_ofw
                info.personalInformation[16].value, // is_4ps_beneficiary
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        );
    
        // Job Preference
        this.connection.query(
            'UPDATE job_preference SET preferred_occupation = ?, occupation = ?, preferred_work_occupation = ?, work_occupation = ?, updated_at = ? WHERE user_id = ?',
            [
                info.jobPreference[0].value, // preferred_occupation
                info.jobPreference[1].value, // occupation
                info.jobPreference[2].value, // preferred_work_occupation
                info.jobPreference[3].value, // work_occupation
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        );
    
        // Language and Dialect Proficiency
        this.connection.query(
            'UPDATE language_dialect_proficiency SET language1 = ?, language2 = ?, language3 = ?, other_language = ?, updated_at = ? WHERE user_id = ?',
            [
                info.languageDialectProficiency[0].value, // language1
                info.languageDialectProficiency[1].value, // language2
                info.languageDialectProficiency[2].value, // language3
                info.languageDialectProficiency[3].value, // other language
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        );
    
        // Educational Background
        this.connection.query(
            'UPDATE educational_background SET elementary_school = ?, elementary_course = ?, elementary_year_graduated = ?, if_elementary_undergraduate = ?, secondary_school = ?, secondary_course = ?, secondary_year_graduated = ?, if_secondary_undergraduate = ?, tertiary_school = ?, tertiary_course = ?, tertiary_year_graduated = ?, if_tertiary_undergraduate = ?, graduate_studies_school = ?, graduate_studies_course = ?, graduate_studies_year_attended = ?, if_graduate_studies_undergraduate = ?, updated_at = ? WHERE user_id = ?',
            [
                info.educationalBackground[0].value, // elementary_school
                "na", // elementary_course
                info.educationalBackground[1].value, // elementary_year_graduated
                info.educationalBackground[2].value, // if_elementary_undergraduate
                info.educationalBackground[3].value, // secondary_school
                "na", // secondary_course
                info.educationalBackground[4].value, // secondary_year_graduated
                info.educationalBackground[5].value, // if_secondary_undergraduate
                info.educationalBackground[6].value, // tertiary_school
                info.educationalBackground[7].value, // tertiary_course
                info.educationalBackground[8].value, // tertiary_year_graduated
                info.educationalBackground[9].value, // if_tertiary_undergraduate
                info.educationalBackground[10].value, // graduate_studies_school
                info.educationalBackground[11].value, // graduate_studies_course
                info.educationalBackground[12].value, // graduate_studies_year_attended
                info.educationalBackground[13].value, // if_graduate_studies_undergraduate
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        );
    
        // Technical Vocational Training
        this.connection.query(
            'UPDATE technical_vocational_training SET course = ?, institution = ?, date_from = ?, date_to = ?, certificate = ?, updated_at = ? WHERE user_id = ?',
            [
                info.techicalVocationalTraining[0].value, // course
                info.techicalVocationalTraining[1].value, // institution
                info.techicalVocationalTraining[2].value, // date_from
                info.techicalVocationalTraining[3].value, // date_to
                info.techicalVocationalTraining[4].value, // certificate
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );
    
        // Eligibility and Professional License
        this.connection.query(
            'UPDATE eligibility_professional_license SET eligibility = ?, rating = ?, date_exam = ?, professional_license = ?, valid_until = ?, updated_at = ? WHERE user_id = ?',
            [
                info.eligibilityProfessionalLicense[0].value, // eligibility
                info.eligibilityProfessionalLicense[1].value, // rating
                info.eligibilityProfessionalLicense[2].value, // date_exam
                info.eligibilityProfessionalLicense[3].value, // professional_license
                info.eligibilityProfessionalLicense[4].value, // valid_until
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );
    
        // Work Experience
        this.connection.query(
            'UPDATE work_experience SET company_name = ?, company_address = ?, position = ?, inclusive_date = ?, status = ?, updated_at = ? WHERE user_id = ?',
            [
                info.workExperience[0].value, // company_name
                info.workExperience[1].value, // company_address
                info.workExperience[2].value, // position
                info.workExperience[3].value, // inclusive_date
                info.workExperience[4].value, // status
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );
    
        // Other Skills
        this.connection.query(
            'UPDATE other_skills SET skills = ?, updated_at = ? WHERE user_id = ?',
            [
                info.otherSkills[0].value, // skills
                today, // updated_at
                info.id // user_id
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        );

        if(info.certificateFile !== undefined){
            // Certificate File
            this.connection.query(
                'UPDATE certificate_file SET certificate_path = ?, updated_at = ? WHERE user_id = ?',
                [
                    JSON.stringify(info.certificateFile),
                    today, // updated_at
                    info.id // user_id
                ],
                (error) => {
                    console.error(error);
                    callback(error);
                    return;
                }
            );
        }

        if(info.eligibilityLicenseFile !== undefined){

            this.connection.query(
                'UPDATE eligibility_license_file SET eligibility_license_path = ?, updated_at = ? WHERE user_id = ?',
                [
                    JSON.stringify(info.eligibilityLicenseFile),
                    today, // updated_at
                    info.id // user_id
                ],
                (error) => {
                    console.error(error);
                    callback(error);
                    return;
                }
            );
        }

        // insert activity to the notification
        this.connection.query(
            'INSERT INTO notifications(user_id, description, created_at) VALUES(?,?,?)',
            [
                info.id,
                `${info.username} updated application successfully.`,
                today
            ],
            (error) => {
                console.error(error);
                callback(error);
                return;
            }
        )
    }
    get_all_male(callback){
        this.connection.query(
            "SELECT count(*) AS total FROM personal_information WHERE UPPER(gender) = UPPER(?)",
            [ "male" ],
            (error, total) => {
                if(error){
                    callback(error, null);
                }
                if(total){
                    callback(null, total)
                }
            }
        )
    }
    get_all_female(callback) {
        this.connection.query(
            "SELECT COUNT(*) AS total FROM personal_information WHERE UPPER(gender) = UPPER(?)",
            [ "female" ],
            (error, total) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, total);
                }
            }
        );
    }
    select_top_five_occupation(callback) {
        this.connection.query(
            `SELECT UPPER(occupation) AS occupation, COUNT(*) AS count
             FROM (
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(occupation, '$.occupation1')) AS occupation FROM job_preference
                 UNION ALL
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(occupation, '$.occupation2')) AS occupation FROM job_preference
                 UNION ALL
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(occupation, '$.occupation3')) AS occupation FROM job_preference
             ) AS subquery
             WHERE occupation != '' AND occupation != 'null'
             GROUP BY UPPER(occupation)
             ORDER BY count DESC
             LIMIT 10;`,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        );
    }
    select_top_five_location(callback) {
        this.connection.query(
            `SELECT UPPER(location) AS work_occupation, COUNT(*) AS count
             FROM (
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(work_occupation, '$.location1')) AS location FROM job_preference
                 UNION ALL
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(work_occupation, '$.location2')) AS location FROM job_preference
                 UNION ALL
                 SELECT JSON_UNQUOTE(JSON_EXTRACT(work_occupation, '$.location3')) AS location FROM job_preference
             ) AS subquery
             WHERE location != ''
             GROUP BY UPPER(location)
             ORDER BY count DESC
             LIMIT 10`,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        );
    }
    select_top_unemployed(callback) {
        this.connection.query(
            `SELECT UPPER(JSON_UNQUOTE(JSON_EXTRACT(employment_status, '$.employment_status'))) AS employment_status, 
                    UPPER(JSON_UNQUOTE(JSON_EXTRACT(employment_status, '$.unemployed_type'))) AS unemployed_type, 
                    COUNT(*) AS count 
             FROM personal_information 
             WHERE UPPER(JSON_UNQUOTE(JSON_EXTRACT(employment_status, '$.employment_status'))) = UPPER('unemployed') 
             GROUP BY unemployed_type 
             ORDER BY count DESC 
             LIMIT 10;`,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        );
    }
    select_top_employed(callback) {
        this.connection.query(
            `SELECT
                SUM(CASE WHEN JSON_VALUE(employment_status, '$.employed_type') = 'self employed' THEN 1 ELSE 0 END) AS self_employed_count,
                SUM(CASE WHEN JSON_VALUE(employment_status, '$.employed_type') = 'wage employed' THEN 1 ELSE 0 END) AS wage_employed_count
            FROM
                personal_information;
            `,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        );
    }
    select_top_company(callback) {
        this.connection.query(
            `SELECT UPPER(REPLACE(company_name, '"', '')) AS company_name, COUNT(company_name) AS count
            FROM (
                SELECT UPPER(REPLACE(JSON_EXTRACT(company_name, '$.company_name1'), '"', '')) AS company_name FROM work_experience
                UNION ALL
                SELECT UPPER(REPLACE(JSON_EXTRACT(company_name, '$.company_name2'), '"', '')) AS company_name FROM work_experience
                UNION ALL
                SELECT UPPER(REPLACE(JSON_EXTRACT(company_name, '$.company_name3'), '"', '')) AS company_name FROM work_experience
            ) AS companies
            WHERE company_name NOT IN ('NA', 'N/A', '')
            GROUP BY company_name
            ORDER BY count DESC
            LIMIT 10;`,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        );
    } 
    select_top_position(callback){
        this.connection.query(
            `SELECT position, COUNT(position) AS count
            FROM (
                SELECT JSON_EXTRACT(position, '$.position1') AS position FROM work_experience
                UNION ALL
                SELECT JSON_EXTRACT(position, '$.position2') AS position FROM work_experience
                UNION ALL
                SELECT JSON_EXTRACT(position, '$.position3') AS position FROM work_experience
            ) AS positions
            WHERE position != 'NA' AND position != 'N/A' AND position != 'n/a' AND position != 'na' AND position != '' AND position != 'null'
            GROUP BY position
            ORDER BY count DESC
            LIMIT 10;
            `,
            (error, rows) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
            }
        )
    }
    select_top_age(callback){
        this.connection.query(
            `SELECT COUNT(*) AS count, YEAR(birthdate) AS year FROM personal_information GROUP BY YEAR(birthdate)`,
            (error, rows) => {
                if(error){
                    callback(error, null);
                }
                else{
                    callback(null, rows);
                }
            }
        )
    }
    select_total_applicant_per_month(callback){
        this.connection.query(
            `SELECT 
                YEAR(created_at) AS year,
                MONTH(created_at) AS month,
                DAY(created_at) AS day,
                COUNT(*) AS total_applicants
            FROM 
                personal_information
            WHERE 
                YEAR(created_at) = YEAR(CURDATE())
                AND MONTH(created_at) = MONTH(CURDATE())
            GROUP BY 
                year, month, day
            ORDER BY 
                year, month, day;
            `,
            (error, rows) => {
                if(error){
                    callback(error, null);
                }
                else{
                    callback(null, rows);
                }
            }
        )

    }      
    select_top_language(callback){
        this.connection.query(
            `SELECT REPLACE(JSON_UNQUOTE(JSON_EXTRACT(language, '$[0]')), '"', '') AS language, COUNT(*) AS count
            FROM (
                SELECT JSON_UNQUOTE(JSON_KEYS(language1)) AS language FROM language_dialect_proficiency WHERE JSON_LENGTH(language1) > 0
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_KEYS(language2)) FROM language_dialect_proficiency WHERE JSON_LENGTH(language2) > 0
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_KEYS(language3)) FROM language_dialect_proficiency WHERE JSON_LENGTH(language3) > 0
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_KEYS(other_language)) FROM language_dialect_proficiency WHERE JSON_LENGTH(other_language) > 0
            ) AS languages
            WHERE language IS NOT NULL AND language != 'null'
            GROUP BY language
            ORDER BY count DESC;`,
            (error, rows) => {
                if(error){
                    callback(error, null);
                }
                else{
                    callback(null, rows);
                }
            }
        )
    }
    select_top_skill(callback){
        this.connection.query(
            `SELECT skill, COUNT(*) AS skill_count
            FROM (
                SELECT JSON_UNQUOTE(JSON_EXTRACT(skills, '$.skill1')) AS skill FROM other_skills
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_EXTRACT(skills, '$.skill2')) FROM other_skills
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_EXTRACT(skills, '$.skill3')) FROM other_skills
                UNION ALL
                SELECT JSON_UNQUOTE(JSON_EXTRACT(skills, '$.other')) FROM other_skills
            ) AS skills_data
            WHERE skill IS NOT NULL AND skill != 'null' AND skill != ''
            GROUP BY skill
            ORDER BY skill_count DESC
            LIMIT 10;
            `,
            (error, rows) => {
                if(error){
                    callback(error, null);
                }
                else{
                    callback(null, rows);
                }
            }

        )
    }
}
module.exports = new Form();