const modelForm = require("../models/Form");
const model = require("../models/User"); /* move the controller methods to Form model */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const multer = require('multer');

// Ensure the uploads directory exists
const dir = './proofs';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'proofs/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

class Forms{
    upload_certificate(req, res){
        // Use multer to handle the upload
        upload.array('selected-certificate-file[]')(req, res, function (err) {
            if(err){
                return res.status(400).send('File upload failed.');
            }
            // At this point, req.files contains the uploaded files information
            if(!req.files || req.files.length === 0){
                return res.status(400).send('No files uploaded.');
            }

            console.log(req.files)
            // Log each uploaded file's path
            let files = {};
            let num = 0;
            req.files.forEach(file => {
                let filename = "/" + file.path.replace(/\\/g, '/'); // Normalize the file path
                files[num] = filename;
                num++;
            });
            res.json(files);
        });
    }
    upload_eligibility_license(req, res){
        upload.array('selected-eligibility-license-file[]')(req, res, function (err) {
            if(err){
                return res.status(400).send('File upload failed.');
            }
            // At this point, req.files contains the uploaded files information
            if(!req.files || req.files.length === 0){
                return res.status(400).send('No files uploaded.');
            }
            // Log each uploaded file's path
            let files = {};
            let num = 0;
            req.files.forEach(file => {
                let filename = "/" + file.path.replace(/\\/g, '/'); // Normalize the file path
                files[num] = filename;
                num++;
            });
            res.json(files);
        });
    }
    add(req, res){
        modelForm.insert(req.body, (error) => {
            if(error){
                console.error(error);
            }
        })
    }
    // Update application information
    update(req, res){
        modelForm.update(req.body, (error) => {
            if(error){
                console.error(error);
                res.status(500).json({"success": false, "message": "An error occurred while updating the record."});
            }
        });
    }
    update_application_status(req, res){
        modelForm.update_application_status_by_id(req.body, (error) => {
            if(error){
                console.error(error);
            }
        });
    }
    get_all_application(req, res){
        model.select_all_application(req.body, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // console.log(row);
                res.json(row);
            }
        })
    }
    get_notification(req, res){
        const id = req.params.id;
        // console.log(id);
        modelForm.select_notification_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // console.log(row);
                res.json(row);
            }
        })
    }
    get_all_notification(req, res){
        modelForm.select_all_notification((error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // console.log(row);
                res.json(row);
            }
        })
    }
    check_form(req, res){
        const id = req.params.id;
        model.get_application_by_user_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // res.render('user_view_form', { row });
                res.json(row);
            }
        })
    }
    /* For admin */
    admin_form(req, res){
        const id = req.params.id;
        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                console.log(row);
                res.render('admin_form', { row });
            }
        })
    }
    search(req, res){
        let name = req.params.name;
        model.get_application_by_name(name, (error, row) =>{
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    delete(req, res){
        let id = req.params.id;
        model.delete_application_by_id(id, (error, result) => {
            if(error, result){
                console.error(error);
            }
            if(result){
                res.send("Successfully deleted");
            }
        });
    }
    count_form(req, res){
        model.count_application((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total;
                res.json({"total": val});
            }
        })
    }
    count_male(req, res){
        modelForm.get_all_male((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total
                res.json({"total_male": val});
            }
        })
    }
    count_female(req, res){
        modelForm.get_all_female((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total
                res.json({"total_female": val})
            }
        })
    }
    get_top_five_occupation(req, res){
        modelForm.select_top_five_occupation((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"occupation": result})
            }
        })
    }
    get_top_five_location(req, res){
        modelForm.select_top_five_location((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"location": result})
            }
        })
    }
    get_top_unemployed(req, res){
        modelForm.select_top_unemployed((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"unemployed": result})
            }
        })
    }
    get_top_employed(req, res){
        modelForm.select_top_employed((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"employed": result})
            }
        })
    }
    get_top_company(req, res){
        modelForm.select_top_company((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"company": result})
            }
        })
    }
    get_top_position(req, res){
        modelForm.select_top_position((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"position": result})
            }
        })
    }
    get_top_age(req, res){
        modelForm.select_top_age((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"birthdate": result})
            }
        })
    }
    retrieve_application_by_id(req, res){
        const id = req.params.id;
        // console.log(id);
        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    get_total_applicant_per_month(req, res){
        modelForm.select_total_applicant_per_month((error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    get_top_language(req, res){
        modelForm.select_top_language((error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    get_top_skill(req, res){
        modelForm.select_top_skill((error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    download_form(req, res){
        const id = req.params.id;

        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                let { surname, firstname, middlename, suffix, birthdate, email, contact, height, gender, civil_status, disability, religion, address, employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, preferred_occupation, occupation, preferred_work_occupation, work_occupation, language1, language2, language3, other_language, elementary_school, elementary_course, elementary_year_graduated, if_elementary_undergraduate, secondary_school, secondary_course, secondary_year_graduated, if_secondary_undergraduate, tertiary_school, tertiary_course, tertiary_year_graduated, if_tertiary_undergraduate, graduate_studies_school, graduate_studies_course, graduate_studies_year_attended, if_graduate_studies_undergraduate, course, institution, date_from, date_to, certificate, eligibility, rating, date_exam, professional_license, valid_until, company_name, company_address, position, inclusive_date, status, skills } = row[0];
                
                surname = surname.toUpperCase();
                firstname = firstname.toUpperCase();
                middlename = middlename.toUpperCase();
                suffix = (suffix.toLowerCase() !== "na" && suffix.toLowerCase() !== "n/a") ? suffix.toUpperCase() : "";

                let inputDate = birthdate;
                const date = new Date(inputDate);
                const month = date.toLocaleString('default', { month: 'long' });
                const day = date.getDate();
                const year = date.getFullYear();
                birthdate = `${month} ${day}, ${year}`;
                
                if(disability === '{}' || disability === "") {
                    disability = "NA";
                }
                else{
                    const parsedDisability = JSON.parse(disability);

                    const filteredValues = Object.values(parsedDisability).filter(value => value.toLowerCase() !== 'na' && value !== '');
                    const result = filteredValues.join(', ');

                   disability = result;
                }

                if(address !== '{}' && address !== "") {
                    const obj = JSON.parse(address);
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (!obj[key] || obj[key].trim() === '') {
                                obj[key] = "NA";
                            }
                        }
                    }
                    address = Object.values(obj).join(', ');
                }
                // Create a new PDF document
                const doc = new PDFDocument();
                const margin = 40;

                // Add border around content
                const startX = margin;
                const startY = margin; // Adjusted for the title height
                const width = 530;
                const borderHeight = 710;
                doc.rect(startX, startY, width, borderHeight);
                // Write content to PDF
                doc.fontSize(18).text(`${firstname} ${middlename} ${surname} ${suffix}`, 50, 50);

                // PERSONAL INFORMATION
                let content = "--------------------------------------------------------------------------------------------------------------------------";
                content += "PERSONAL INFORMATION\n";
                
                content += `\nBirthdate: ${birthdate}\nEmail: ${email}\nContact: ${contact}\nHeight: ${height}\nGender: ${gender}\nCivil Status: ${civil_status}\n`;
                
                if(disability !== ""){
                    content += `Disability: ${disability}\n`;
                }
                if(religion.toLowerCase() !== "na"){
                    content += `Religion: ${religion}\n`;
                }
                content += `Address: ${address}`;
                
                employment_status = JSON.parse(employment_status);

                // EMPLOYMENT STATUS / TYPE
                content += "\n--------------------------------------------------------------------------------------------------------------------------";
                content += `\nEMPLOYMENT STATUS / TYPE\n\nEmployment Status: ${employment_status.employment_status}`
                if(employment_status.hasOwnProperty("employed_type")){
                    content += `\nEmployed type: ${employment_status["employed_type"]}`;
                }
                if(employment_status.hasOwnProperty("job") && employment_status["job"] !== '{}' && employment_status["job"] !== "") {
                    let obj = employment_status['job'];
                    for (const key in obj) {
                        console.log(key)
                        if (obj.hasOwnProperty(key)) {
                            if (!obj[key] || obj[key].trim() === '') {
                                obj[key] = "NA";
                            }
                        }
                    }
                    content += "\nJobs: " + Object.values(obj).join(', ');
                }
                if(employment_status.hasOwnProperty("how_long_looking_for_work")) {
                    content += `\nHow long have you been looking for work? ${employment_status["how_long_looking_for_work"]}`;
                }
                if(employment_status.hasOwnProperty("unemployed_type")){
                    content += `\nUnemployed type: ${employment_status["unemployed_type"]}`;
                }
                // content += `\nAre you an OFW? ${((JSON.parse(is_ofw).is_ofw).toLowerCase() !== "no") ? `Yes\nCountry: ${JSON.parse(is_ofw).is_ofw}` : "No"}`

                // let formerOfw = JSON.parse(is_former_ofw);
                // if(formerOfw.hasOwnProperty("country") && formerOfw.hasOwnProperty("month_year")){
                //     content += `\nAre you former OFW? Yes`
                //     content += `\nLatest country of deployment: ${formerOfw.country}`
                //     content += `\nMonth and year of return to Philippines: ${formerOfw.month_year}`
                // }
                // else{
                //     content += `\nAre you former OFW? ${((JSON.parse(is_former_ofw).is_former_ofw).toLowerCase() !== "no") ? `Yes\nCountry: ${JSON.parse(is_former_ofw).is_former_ofw}` : "No"}`
                // }
                // let is4ps = JSON.parse(is_4ps_beneficiary);
                // content += `\nAre you a 4Ps beneficiary? ${is4ps.is_4ps_beneficiary.toLowerCase() === "no" ? "No" : "Yes\nHousehold ID No:" + is4ps.household_no}`;
                
                // JOB PREFERENCE
                // content += "\n--------------------------------------------------------------------------------------------------------------------------";
                // content += "\nJOB PREFERENCE";

                // content += `\n\n${(JSON.parse(preferred_occupation).type_preferred_occupation)}:`;
                // console.log((JSON.parse(preferred_occupation).type_preferred_occupation))
                // content += " " + Object.values(JSON.parse(occupation)).filter(value => value !== "").join(', ');
                // content += `\n${(JSON.parse(preferred_work_occupation).type_work_occupation)}:`;
                // content += " " + Object.values(JSON.parse(work_occupation)).filter(value => value !== "").join(', ');
                
                // LANGUAGE / DIALECT PROFICIENCY
                content += "\n--------------------------------------------------------------------------------------------------------------------------";
                content += "\nLANGUAGE / DIALECT PROFICIENCY";
                if(language1 !== undefined){
                    let language1Obj = JSON.parse(language1);
                    if(language1Obj.hasOwnProperty("english")){
                        content += `\nEnglish: ${Object.entries(language1Obj.english) .map(([key, value]) => key) .join(', ')}`
                    }
                }
                if(language2 !== undefined){
                    let language2Obj = JSON.parse(language2);
                    if(language2Obj.hasOwnProperty("filipino")){
                        content += `\nFilipino: ${Object.entries(language2Obj.filipino) .map(([key, value]) => key) .join(', ')}`
                    }
                }
                if(language3 !== undefined){
                    let language3Obj = JSON.parse(language3);
                    if(language3Obj.hasOwnProperty("filipino")){
                        content += `\nMandarin: ${Object.entries(language3Obj.mandarin).map(([key, value]) => key).join(', ')}`
                    }
                }
                if(other_language !== '{}'){
                    let otherLanguageObj = JSON.parse(other_language);
                    if(Object.keys(otherLanguageObj).length > 0) {
                        let otherLanguage = Object.keys(otherLanguageObj)[0];
                        content += `\n${otherLanguage}: ${Object.entries(otherLanguageObj[otherLanguage]).map(([key, value]) => key) .join(', ')}`
                    }
                }
                // EDUCATIONAL ATTAINMENT
                content += "\n--------------------------------------------------------------------------------------------------------------------------";
                content += "\nEDUCATIONAL ATTAINMENT\n";
                if(elementary_school !== "" && 
                elementary_year_graduated.toLowerCase() !== "na" && 
                elementary_year_graduated.toLowerCase() !== "n/a"){
                    content += `\nElementary:\n${elementary_school} - ${elementary_year_graduated}`
                }
                if(JSON.parse(if_elementary_undergraduate).hasOwnProperty("awards_received") &&
                JSON.parse(if_elementary_undergraduate).awards_received.toLowerCase() !== "na" &&
                JSON.parse(if_elementary_undergraduate).awards_received.toLowerCase() !== "n/a"){
                    content += `\nAwards: ${JSON.parse(if_elementary_undergraduate).awards_received}`;
                }
                if(secondary_school.toLowerCase() !== "" && 
                secondary_year_graduated.toLowerCase() !== "na" && 
                secondary_year_graduated.toLowerCase() !== "n/a"){
                    content += `\n\nSecondary:\n${secondary_school} - ${secondary_year_graduated}`
                }
                if(JSON.parse(if_secondary_undergraduate).hasOwnProperty("awards_received") &&
                JSON.parse(if_secondary_undergraduate).awards_received.toLowerCase() !== "na" &&
                JSON.parse(if_secondary_undergraduate).awards_received.toLowerCase() !== "n/a"){
                    content += `\nAwards: ${JSON.parse(if_secondary_undergraduate).awards_received}`;
                }
                console.log(tertiary_school);
                if(tertiary_school.toLowerCase() !== "" && 
                tertiary_year_graduated.toLowerCase() !== "na" && 
                tertiary_year_graduated.toLowerCase() !== "n/a"){
                    content += `\n\nTertiary:\n${tertiary_school} - ${tertiary_year_graduated}`
                }
                if(JSON.parse(if_tertiary_undergraduate).hasOwnProperty("awards_received") &&
                JSON.parse(if_tertiary_undergraduate).awards_received.toLowerCase() !== "na" &&
                JSON.parse(if_tertiary_undergraduate).awards_received.toLowerCase() !== "n/a"){
                    content += `\nAwards: ${JSON.parse(if_tertiary_undergraduate).awards_received}`;
                }
                if(graduate_studies_school.toLowerCase() !== "" && 
                graduate_studies_year_attended.toLowerCase() !== "na" && 
                graduate_studies_year_attended.toLowerCase() !== "n/a"){
                    content += `\n\nGraduate_studies:\n${graduate_studies_school} - ${graduate_studies_year_attended}\n${graduate_studies_course}`
                }
                if(JSON.parse(if_graduate_studies_undergraduate).hasOwnProperty("awards_received") && 
                JSON.parse(if_graduate_studies_undergraduate).awards_received.toLowerCase() !== "na" &&
                JSON.parse(if_graduate_studies_undergraduate).awards_received.toLowerCase() !== "n/a"){
                    content += `\nAwards: ${JSON.parse(if_graduate_studies_undergraduate).awards_received}`;
                }
                // TECHNICAL / VOCATIONAL AND OTHER TRAINING
                // content += "\n--------------------------------------------------------------------------------------------------------------------------";
                // if(JSON.parse(institution) !== '{}'){
                //     content += `\nTECHNICAL / VOCATIONAL AND OTHER TRAINING\n`;
                //     const courseEntries = Object.entries(JSON.parse(course));
                //     const institutionEntries = Object.entries(JSON.parse(institution));
                //     const durationFrom = Object.entries(JSON.parse(date_from));
                //     const durationTo = Object.entries(JSON.parse(date_to));
                //     const certificateEntries = Object.entries(JSON.parse(certificate));

                //     content += `${institutionEntries.map(([instKey, instValue], index) => {
                //         let techVoc = "";
                //         const dateFromValue = durationFrom[index] ? durationFrom[index][1] : "";
                //         const dateToValue = durationTo[index] ? durationTo[index][1] : ""
                //         const courseValue = courseEntries[index] ? courseEntries[index][1] : "";
                //         const certificateValue = certificateEntries[index] ? certificateEntries[index][1] : "";
                //         if (instValue !== "" && dateFromValue !== "" && dateToValue !== "" && courseValue !== "" ) {
                //             techVoc += `\n${courseValue} ${instValue} - from ${dateFromValue} to ${dateToValue}`;
                //         }
                //         if(certificateValue !== "" && certificateValue.toLowerCase() !== "na" && certificateValue.toLowerCase() !== "n/a"){
                //             techVoc += `\nCerticate Received: ${certificateValue}`;
                //         }
                //         return techVoc;
                //     }).filter(value => value !== "").join('')}`;
                // }
                // if(JSON.parse(eligibility) !== '{}'){
                //     let count = 1;
                //     const eligibilityEntries = Object.entries(JSON.parse(eligibility));
                //     const ratingEntries = Object.entries(JSON.parse(rating));
                //     const dateExamEntries = Object.entries(JSON.parse(date_exam));
                //     content += `${eligibilityEntries.map(([instKey, instValue], index) => {
                //         let eligibilityContent = "";
                //         const ratingValue = ratingEntries[index] ? ratingEntries[index][1] : "";
                //         const dateExamValue = dateExamEntries[index] ? dateExamEntries[index][1] : "";
                //         if(count === 1 && instValue !== "" && ratingValue !== "" && dateExamValue !== ""){
                //             eligibilityContent += "\n--------------------------------------------------------------------------------------------------------------------------";
                //             eligibilityContent += `\nELIGIBILITY`;
                //             count++;
                //         }
                //         if (instValue !== "" && ratingValue !== "" && dateExamValue !== "") {
                //             eligibilityContent += `\nCivil Service: ${instValue}\nRating: ${ratingValue}\nDate of examination: ${dateExamValue}`;
                //         }
                //         return eligibilityContent;
                //     }).filter(value => value !== "").join('')}`;
                // }
                // if(JSON.parse(professional_license) !== '{}'){
                //     let count = 1;
                //     const professional_licenseEntries = Object.entries(JSON.parse(professional_license));
                //     const valid_untilEntries = Object.entries(JSON.parse(valid_until));

                //     content += `${professional_licenseEntries.map(([instKey, instValue], index) => {
                //         let profLicenseContent = "";
                //         const valid_untilValue = valid_untilEntries[index] ? valid_untilEntries[index][1] : "";
                //         if(count === 1 && instValue !== "" && valid_untilValue !== ""){
                //             profLicenseContent += "\n--------------------------------------------------------------------------------------------------------------------------";
                //             profLicenseContent += `\nPROFESSIONAL LICENSE`;
                //             count++;
                //         }
                //         if (instValue !== "" && valid_untilValue !== "") {
                //             profLicenseContent += `\nProfessional license: ${instValue}\nValid until: ${valid_untilValue}`;
                //         }
                //         return profLicenseContent;
                //     }).filter(value => value !== "").join('')}`;
                // }
                
                // WORK EXPERIENCE
                if(JSON.parse(company_name) !== '{}'){
                    let count = 1;
                    
                    const companyNameEntries = Object.entries(JSON.parse(company_name));
                    const companyAddressEntries = Object.entries(JSON.parse(company_address));
                    const positionEntries = Object.entries(JSON.parse(position));
                    const inclusiveEntries = Object.entries(JSON.parse(inclusive_date));
                    const statusEntries = Object.entries(JSON.parse(status));
                    content += `${companyNameEntries.map(([instKey, instValue], index) => {
                        let workExpContent = "";
                        const addressValue = companyAddressEntries[index] ? companyAddressEntries[index][1] : "";
                        const positionValue = positionEntries[index] ? positionEntries[index][1] : "";
                        const inclusiveValue = inclusiveEntries[index] ? inclusiveEntries[index][1] : "";
                        const statusValue = statusEntries[index] ? statusEntries[index][1] : "";
                        if(count === 1 && instValue !== "" && addressValue !== "" && positionValue !== "" && inclusiveValue !== "" && statusValue !== ""){
                            workExpContent += "\n--------------------------------------------------------------------------------------------------------------------------";
                            workExpContent += `\nWORK EXPERIENCE\n`;
                            count++;
                        }
                        if (instValue !== "" && addressValue !== "" && positionValue !== "" && inclusiveValue !== "" && statusValue !== "") {
                            // workExpContent += `\n${positionValue} - ${inclusiveValue} ${statusValue}\n${instValue}, ${addressValue}`;
                            workExpContent += `\n ${instValue} - ${positionValue}`;
                        }
                        return workExpContent;
                    }).filter(value => value !== "").join('')}`;
                }
                // OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING
                // if(JSON.parse(skills) !== '{}'){
                //     content += "\n--------------------------------------------------------------------------------------------------------------------------";
                //     content += `\nOTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING\n`;
                //     content += `\n${Object.entries(JSON.parse(skills))
                //     .map(([key, value]) => "- " + value)
                //     .filter(value => value !== "")
                //     .join('\n')}`;
                // }

                doc.fontSize(12).text(content, 50, 70);

                const todayFile = new Date();
                const yearFile = todayFile.getFullYear();
                const monthFile = todayFile.getMonth() + 1; // Note: January is 0, so we add 1
                const dayFile = todayFile.getDate();

                // Pad month and day with leading zeros if necessary
                const formattedMonth = monthFile < 10 ? `0${monthFile}` : monthFile;
                const formattedDay = dayFile < 10 ? `0${dayFile}` : dayFile;

                const filename = `${surname}-${yearFile}-${formattedMonth}-${formattedDay}.pdf`;
                
                // Finalize the PDF
                const buffers = [];
                doc.on("data", buffers.push.bind(buffers));
                doc.on("end", function() {
                    const pdfData = Buffer.concat(buffers);
                    res.setHeader("Content-Type", "application/pdf");
                    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
                    res.send(pdfData);
                });
                doc.end();
            }
        })
        
    }
    download_report(req, res){
        model.select_all_application(req.query,(error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // Create a new PDF document
                const doc = new PDFDocument();
                const margin = 40;

                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const todayFile = new Date();
                const yearFile = todayFile.getFullYear();
                const monthFile = todayFile.getMonth() + 1;
                const dayFile = todayFile.getDate();

                // Add border around content
                const startX = margin;
                const startY = margin;
                const width = 530;
                const borderHeight = 710;
                doc.rect(startX, startY, width, borderHeight);
                // Write content to PDF
                doc.fontSize(18).text(`Monthly Report of ${months[req.query.month]} ${req.query.year}`, 50, 50);

                let header = "--------------------------------------------------------------------------------------------------------------------------";
                doc.fontSize(12).text(header, 50, 70);

                let monthHeader = "Month";
                doc.fontSize(12).text(monthHeader, 90, 88);
                let applicantHeader = "Applicant";
                doc.fontSize(12).text(applicantHeader, 210, 88);
                let employedHeader = "Employed";
                doc.fontSize(12).text(employedHeader, 330, 88);
                let unemployedHeader = "Unemployed";
                doc.fontSize(12).text(unemployedHeader, 440, 88);
                let belowLine = "--------------------------------------------------------------------------------------------------------------------------";
                doc.fontSize(12).text(belowLine, 50, 105);

                let today = new Date();
                let currentYear = parseInt(req.query.year);
                let currentMonth = parseInt(req.query.month);

                function getDaysInMonth(year, month) {
                    return new Date(year, month + 1, 0).getDate();
                }

                let daysInMonth = getDaysInMonth(currentYear, currentMonth);
                let contentMargin = 120;
                for(let day = 1; day <= daysInMonth; day++){
                    let date = new Date(currentYear, currentMonth, day);
                    let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                    doc.fontSize(12).text(dateString, 87, contentMargin);
                    contentMargin += 18;
                }

                contentMargin = 120;
                for(let dayNum = 1; dayNum <= daysInMonth; dayNum++){
                    let applicantNum = 0;
                    let employedNum = 0;
                    let unemployedNum = 0;
                    for(let i = 0; i < row.length; i++){
                        if(row[i].day == dayNum){
                            applicantNum = row[i].total_records;
                            employedNum = row[i].total_employed;
                            unemployedNum = row[i].total_unemployed;
                        }
                    }
                    doc.fontSize(12).text(applicantNum, 230, contentMargin);
                    doc.fontSize(12).text(employedNum, 355, contentMargin);
                    doc.fontSize(12).text(unemployedNum, 470, contentMargin);
                    // console.log("Margin: ", contentMargin)
                    contentMargin += 18;
                }

                // Pad month and day with leading zeros if necessary
                const formattedMonth = monthFile < 10 ? `0${monthFile}` : monthFile;
                const formattedDay = dayFile < 10 ? `0${dayFile}` : dayFile;
                const filename = `MonthlyReport-${yearFile}-${formattedMonth}-${formattedDay}.pdf`;

                // Finalize the PDF
                const buffers = [];
                doc.on("data", buffers.push.bind(buffers));
                doc.on("end", function() {
                    const pdfData = Buffer.concat(buffers);
                    res.setHeader("Content-Type", "application/pdf");
                    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
                    res.send(pdfData);
                });
                doc.end();
            }
        })
        
    }
}

module.exports = new Forms;