const model = require("../models/User");
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ensure the uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

class Users{
    /* For user */
    index(req, res){
        res.render('index');
    }
    form(req, res){
        res.render('form');
    }
    register(req, res){
        res.render('register');
    }
    peso(req, res){
        res.render("peso");
    }
    about(req, res){
        res.render("about");
    }
    account_information(req, res){
        res.render("account_information");
    }
    admin_account_information(req, res){
        res.render("admin_account_information");
    }
    view_account(req, res){
        res.render('view_account');
    }
    report(req, res){
        res.render('report_module');
    }
    notification(req, res){
        res.render('notification');
    }
    get_user_by_id(req, res){
        let id = req.body.id;
        model.select_user_by_id(id, (error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                // console.log(result);
                res.json(result);
            }
        })
    }
    upload_image(req, res, next){
        const uploadSingle = upload.single('image');
        
        uploadSingle(req, res, function (err) {
            if (err) {
                return res.status(400).send('File upload failed.');
            }
            next();
        });
    }
    update_user_by_id(req, res){
        // Access form data

        // console.log(req.body);
        const id = req.body.id;
        const username = req.body.username;
        const surname = req.body.surname;
        const firstname = req.body.firstname;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const birthdate = req.body.birthdate;
        const civil_status = req.body.civil_status;

        let filePath = req.file ? req.file.path : null;
        let filename;
        console.log(filename)
        if(filePath){
            filename = "/" + filePath.replace(/uploads\\/g, '');
        }
        if(req.body.image === '/images/default_profile.jpg'){
            filename = '/images/default_profile.jpg';
        }
        let user = {
            id: id,
            username: username,
            surname: surname,
            firstname: firstname,
            email: email,
            phonenumber: phonenumber,
            birthdate: birthdate,
            civil_status: civil_status,
            filename: filename
        }
        model.update_account_by_id(user, (error) => {
            if(error){
                console.error(error);
            }
        });
    }   
    /* For admin*/
    admin_apply(req, res){
        res.render('admin_apply');
    }
    data_analytics(req, res){
        res.render('admin_data_analytics');
    }
    /* Interact with the model */
    dashboard(req, res){
        const page = req.params.page;
        model.applications(page, (error, row) => {
            if(error){
                console.error(error);
            }
            model.count_application((error, total) => {
                if(error){
                    console.error(error);
                }
                if(total){
                    console.log(total[0].total)
                }
                res.render('admin_dashboard', { row, total });
            })
        })
    }
    /* Account registration, user authentication and authorization */
    create(req, res){
        let result = "";
        /*validate email*/
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(req.body.email);

        if(req.body.username === "" || (isValidEmail === false || req.body.email === "") || 
            req.body.password === ""|| req.body.confirm_password === ""){
            result += "Fill up all information. ";
        }
        if(req.body.password !== req.body.confirm_password){
            result += "Passwords do not match!";
        }
        if(req.body.password.length < 8 || req.body.password.length > 20){
            result += "Password length should be between 8 and 20 characters. "
        }
        if(req.body.username !== "" && req.body.email !== "" &&  isValidEmail === true && req.body.password !== "" && (req.body.password.length >= 8 && req.body.password.length < 20)){
            model.register_account(req.body, (found) => {
                if(found){
                    result = "Email is already taken. ";
                }
                else{ /*not found*/
                    result = "success";
                }
                res.render("register", { result });
            });
        }
        else{
            res.render("register", { result });
        }
    }
    authenticate(req, res){
        let result = "";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(req.body.email);

        if(req.body.email === "" || req.body.password === ""){
            result += "Fill in all the required information. ";
        }
        if(isValidEmail === false){
            result += "Email is invalid ";
        }
        if(req.body.email !== "" && req.body.password !== ""){
            model.verify_account(req.body, (error, verified, information) => {
                if(error){
                    console.error(error);
                    return;
                }
                if(verified){
                    /* Store in session */
                    console.log(information)
                    req.session.username = information.username;
                    res.json({ success: true, id: information.id, username: information.username, isAdmin: information.is_admin});
                }
                if(!verified){
                    result = "Login Failed";
                    res.send(result);
                }
                
            });
        }
        else {
            res.send(result); // Render result without verification
        }
    }
}

module.exports = new Users;