$(document).ready(function(){

    let id = localStorage.getItem("userId");
    let checkFrom = async() => {
        try{
            let response = await $.ajax({
                url: "/check_form/"+id  ,
                type: "GET",
                success: function(response){
                    if(response.length !== 0){

                        // console.log(response[0].certificate_path);
                        // $(".btn-update").css("display", "block");
                        $("#btnApplication").trigger("click");

                        // $("label").css("margin-top", "-12px");
                        // Personal information
                        $("input[name='surname']").val(response[0].surname);
                        $("input[name='firstname']").val(response[0].firstname);
                        $("input[name='middlename']").val(response[0].middlename);
                        $("input[name='suffix']").val(response[0].suffix);
                        $("input[name='birthdate']").val(response[0].birthdate);
                        $("input[name='birthdate']").css("color", "black");
                        $("input[name='email']").val(response[0].email);
                        $("input[name='contact']").val(response[0].contact);
                        $("input[name='height']").val(response[0].height);
                        let applicantGender = response[0].gender;
                        if(applicantGender.toLowerCase() === "male"){
                            $("#male").prop("checked", true);
                        }
                        else if(applicantGender.toLowerCase() === "female"){
                            $("#female").prop("checked", true);
                        }
                        let applicantCivilStatus = response[0].civil_status;
                        if(applicantCivilStatus.toLowerCase() === "single"){
                            $("#single").prop("checked", true);
                        }
                        else if(applicantCivilStatus.toLowerCase() === "married"){
                            $("#married").prop("checked", true);
                        }
                        else if(applicantCivilStatus.toLowerCase() === "widowed"){
                            $("#widowed").prop("checked", true);
                        }
                        let disability = JSON.parse(response[0].disability);
                        Object.keys(disability)
                            .forEach(key => {
                                if(disability[key] === "na"){ 
                                    $("#none").prop("checked", true);
                                }
                                if(disability[key] === "visual"){
                                    $("#visual").prop("checked", true);
                                }
                                if(disability[key] === "hearing"){
                                    $("#hearing").prop("checked", true);
                                }
                                if(disability[key] === "speech"){
                                    $("#speech").prop("checked", true);
                                }
                                if(disability[key] === "physical"){
                                    $("#physical").prop("checked", true);
                                }
                                if(disability[key] === "mental"){
                                    $("#mental").prop("checked", true);
                                }
                                if(key === "other" && disability[key] !== ""){
                                    $("#disability_others").prop("checked", true);
                                    $(".input_other_disability").val(disability[key]);
                                }
                            });
                        $("input[name='disability']").val(JSON.stringify(disability));

                        $("input[name='religion']").val(response[0].religion);
                        
                        let addressObj = {
                            "house_no_street": "",
                            "barangay": "",
                            "city_municipality": "",
                            "province": ""
                        };
                        let addressApplicant = JSON.parse(response[0].address);
                        $(".province").val(addressApplicant.province);
                        addressObj.province =  addressApplicant.province
                        $(".city_municipality").val(addressApplicant.city_municipality);
                        addressObj.city_municipality = addressApplicant.city_municipality
                        $(".barangay").val(addressApplicant.barangay);
                        addressObj.barangay =  addressApplicant.barangay
                        $(".house_no_street").val(addressApplicant.house_no_street);
                        addressObj.house_no_street =  addressApplicant.house_no_street
                        $("input[name='address']").val(JSON.stringify(addressObj));
                        
                        let employmentStatusObj = JSON.parse(response[0].employment_status);
                        if(employmentStatusObj.employment_status === "employed"){
                            $("#employed").prop("checked", true);
                            
                            if(employmentStatusObj.employed_type === "wage employed"){
                                $(".wage_employed").prop("checked", true);
                                $(".wage_employed").prop("disabled", false);
                            }
                            if(employmentStatusObj.employed_type === "self employed"){
                                $(".self_employed").prop("checked", true);
                                $(".self_employed").prop("disabled", false);

                                for(let key in employmentStatusObj.job){
                                    $(".job").prop("disabled", false);
                                    $(".other_job").prop("disabled", false);
                                    let jobStr = employmentStatusObj.job[key];
                                    if(jobStr === "fisherman/fisherfolk"){
                                        $("#fisherman").prop("checked", true);
                                    }
                                    if(jobStr === "vendor/retailer"){
                                        $("#vendor").prop("checked", true);
                                    }
                                    if(jobStr === "home based worker"){
                                        $("#home_based_worker").prop("checked", true);
                                    }
                                    if(jobStr === "transport"){
                                        $("#transport").prop("checked", true);
                                    }
                                    if(jobStr === "domestic"){
                                        $("#domestic").prop("checked", true);
                                    }
                                    if(jobStr === "freelancer"){
                                        $("#freelancer").prop("checked", true);
                                    }
                                    if(jobStr === "artisan/craft worker"){
                                        $("#artisan_craft_worker").prop("checked", true);
                                    }
                                    if(key === "other" && jobStr !== ""){
                                        $(".other_job").prop("checked", true);
                                        $(".input_other_job").val(jobStr)
                                    }
                                }
                            }
                        }
                        if(employmentStatusObj.employment_status === "unemployed"){
                            $("#unemployed").prop("checked", true);
                            $(".other_unemployed_type").prop("disabled", false);

                            $(".how_long_looking_for_work").val(employmentStatusObj.how_long_looking_for_work)
                            $(".unemployed_type").prop("disabled", false);
                            if(employmentStatusObj.unemployed_type === "new entrant or fresh graduate"){
                                $("#new_entrant_fresh_graduate").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "finished contract"){
                                $("#finished_contract").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "resigned"){
                                $("#resigned").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "retired"){
                                $("#retired").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "terminated/laid off due calamity"){
                                $("#laid_off_due_calamity").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "terminated/laid off (local)"){
                                $("#laid_off_local").prop("checked", true);
                            }
                            if(employmentStatusObj.unemployed_type === "terminated/laid off (abroad)"){
                                $(".laid_off_abroad").prop("checked", true);
                                $(".input_laid_off_abroad").val(employmentStatusObj.country);
                            }
                            if(employmentStatusObj.other !== "" && employmentStatusObj.other !== undefined){
                                $(".unemployed_type").prop("checked", false);
                                $(".other_unemployed_type").prop("checked", true);
                                $(".input_other_unemployed_type").val(employmentStatusObj.other);
                            }
                        }
                        $("input[name='employment_status']").val(JSON.stringify(employmentStatusObj));

                        let ofwObj = JSON.parse(response[0].is_ofw);
                        if(ofwObj.is_ofw === "no"){
                            $("#no_ofw").prop("checked", true);
                        }
                        else if(ofwObj.is_ofw !== "no"){
                            $("#yes_ofw").prop("checked", true);
                            $(".input_ofw_country").val(ofwObj.is_ofw);
                        }
                        $("input[name='is_ofw']").val(JSON.stringify(ofwObj));

                        let formerOfwObj = JSON.parse(response[0].is_former_ofw);
                        if(formerOfwObj.is_former_ofw === "no"){
                            $(".no_former_ofw").prop("checked", true);
                        }
                        else if(formerOfwObj.is_former_ofw !== "no"){
                            $(".yes_former_ofw").prop("checked", true);
                            $(".ofw_former_country").val(formerOfwObj.country);
                            $(".month_year_return_ph").val(formerOfwObj.month_year);
                        }
                        $("input[name='is_former_ofw']").val(JSON.stringify(formerOfwObj));


                        let beneficiary4psObj = JSON.parse(response[0].is_4ps_beneficiary);
                        // console.log(beneficiary4psObj);
                        if(beneficiary4psObj.is_4ps_beneficiary === "no"){
                            $(".no_4ps_beneficiary").prop("checked", true);
                        }
                        else if(beneficiary4psObj.is_4ps_beneficiary === "yes"){
                            $(".yes_4ps_beneficiary").prop("checked", true);
                            $(".4ps_household_no").val(beneficiary4psObj.household_no)
                        }
                        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(beneficiary4psObj));
                    
                        // Job preference
                        let preferredOccupationObj = JSON.parse(response[0].preferred_occupation);
                        if(preferredOccupationObj.type_preferred_occupation === "part time"){
                            $("#part-time").prop("checked", true);
                        }
                        else if(preferredOccupationObj.type_preferred_occupation === "full time"){
                            $("#full-time").prop("checked", true);
                        }
                        $("input[name='preferred_occupation']").val(response[0].preferred_occupation);
                    
                        let occupationObj = JSON.parse(response[0].occupation);
                        if(occupationObj.occupation1 !== ""){
                            $(".preferred_occupation1").val(occupationObj.occupation1);
                        }
                        if(occupationObj.occupation2 !== ""){
                            $(".preferred_occupation2").val(occupationObj.occupation2);
                        }
                        if(occupationObj.occupation3 !== ""){
                            $(".preferred_occupation3").val(occupationObj.occupation3);
                        }
                        $("input[name='occupation']").val(response[0].occupation);

                        let preferredWorkOccupationObj = JSON.parse(response[0].preferred_work_occupation);
                        if(preferredWorkOccupationObj.type_work_occupation === "local"){
                            $("#local").prop("checked", true);
                        }
                        else if(preferredWorkOccupationObj.type_work_occupation === "overseas"){
                            $("#overseas").prop("checked", true);
                        }
                        $("input[name='preferred_work_occupation']").val(response[0].preferred_work_occupation);
                    
                        let workLocationObj = JSON.parse(response[0].work_occupation);
                        if(workLocationObj.location1 !== ""){
                            $(".location1").val(workLocationObj.location1);
                        }
                        if(workLocationObj.location2 !== ""){
                            $(".location2").val(workLocationObj.location2);
                        }
                        if(workLocationObj.location3 !== ""){
                            $(".location3").val(workLocationObj.location3);
                        }
                        $("input[name='work_occupation']").val(response[0].work_occupation);

                        let objEnglish = JSON.parse(response[0].language1);
                        if(objEnglish !== "{}"){
                            for(let key in objEnglish.english){
                                if(key === "read"){
                                    $(".english_read").prop("checked", true);
                                }
                                if(key === "write"){
                                    $(".english_write").prop("checked", true);
                                }
                                if(key === "speak"){
                                    $(".english_speak").prop("checked", true);
                                }
                                if(key === "understand"){
                                    $(".english_understand").prop("checked", true);
                                }
                            }
                        }
                        $("input[name='language1']").val(response[0].language1);

                        let objFilipino = JSON.parse(response[0].language2);
                        if(objFilipino !== "{}"){
                            for(let key in objFilipino.filipino){
                                if(key === "read"){
                                    $(".filipino_read").prop("checked", true);
                                }
                                if(key === "write"){
                                    $(".filipino_write").prop("checked", true);
                                }
                                if(key === "speak"){
                                    $(".filipino_speak").prop("checked", true);
                                }
                                if(key === "understand"){
                                    $(".filipino_understand").prop("checked", true);
                                }
                            }
                        }
                        $("input[name='language2']").val(response[0].language2);

                        let objMandarin = JSON.parse(response[0].language3);
                        if(objMandarin !== "{}"){
                            for(let key in objMandarin.mandarin){
                                if(key === "read"){
                                    $(".mandarin_read").prop("checked", true);
                                }
                                if(key === "write"){
                                    $(".mandarin_write").prop("checked", true);
                                }
                                if(key === "speak"){
                                    $(".mandarin_speak").prop("checked", true);
                                }
                                if(key === "understand"){
                                    $(".mandarin_understand").prop("checked", true);
                                }
                            }
                        }
                        $("input[name='language3']").val(response[0].language3);

                        // $(".checkbox_other_language").prop("disabled", false)
                        let otherLangObj = JSON.parse(response[0].other_language);
                        if(otherLangObj !== "{}"){

                            for(let key in otherLangObj){
                                $(".checkbox_other_language").prop("disabled", false);
                                $(".input_other_language").val(key);

                                for(let key2 in (otherLangObj[key])){
                                    if(key2 === "read"){
                                        $(".other_language_read").prop("checked", true);
                                    }
                                    if(key2 === "write"){
                                        $(".other_language_write").prop("checked", true);
                                    }
                                    if(key2 === "speak"){
                                        $(".other_language_speak").prop("checked", true);
                                    }
                                    if(key2 === "understand"){
                                        $(".other_language_understand").prop("checked", true);
                                    }
                                }
                            }
                        }

                        // Educational background
                        $("input[name='elementary_school']").val(response[0].elementary_school);
                        $("input[name='elementary_course']").val(response[0].elementary_course);
                        $("input[name='elementary_year_graduated']").val(response[0].elementary_year_graduated);
                        let elemUndergrad = JSON.parse(response[0].if_elementary_undergraduate);
                        if(elemUndergrad !== "{}"){
                            // console.log(elemUndergrad);
                            $(".elem_what_level").val(elemUndergrad.what_level);
                            $(".elem_last_year_attended").val(elemUndergrad.last_year_attended);
                            $(".elem_awards_received").val(elemUndergrad.awards_received);
                        }
                        $("input[name='if_elementary_undergraduate']").val(response[0].if_elementary_undergraduate);
                        
                        $("input[name='secondary_school']").val(response[0].secondary_school);
                        $("input[name='secondary_course']").val(response[0].secondary_course);
                        $("input[name='secondary_year_graduated']").val(response[0].secondary_year_graduated);        
                        let secondaryUndergrad = JSON.parse(response[0].if_secondary_undergraduate);
                        if(secondaryUndergrad !== "{}"){
                            // console.log(elemUndergrad);
                            $(".secondary_what_level").val(secondaryUndergrad.what_level);
                            $(".secondary_last_year_attended").val(secondaryUndergrad.last_year_attended);
                            $(".secondary_awards_received").val(secondaryUndergrad.awards_received);
                        }
                        $("input[name='if_secondary_undergraduate']").val(response[0].if_secondary_undergraduate);

                        $("input[name='tertiary_school']").val(response[0].tertiary_school);
                        $("input[name='tertiary_course']").val(response[0].tertiary_course);
                        $("input[name='tertiary_year_graduated']").val(response[0].tertiary_year_graduated);  
                        let tertiaryUndergrad = JSON.parse(response[0].if_tertiary_undergraduate);
                        if(tertiaryUndergrad !== "{}"){
                            // console.log(elemUndergrad);
                            $(".tertiary_what_level").val(tertiaryUndergrad.what_level);
                            $(".tertiary_last_year_attended").val(tertiaryUndergrad.last_year_attended);
                            $(".tertiary_awards_received").val(tertiaryUndergrad.awards_received);
                        }
                        $("input[name='if_tertiary_undergraduate']").val(response[0].if_tertiary_undergraduate);
                        
                        $("input[name='graduate_studies_school']").val(response[0].graduate_studies_school);
                        $("input[name='graduate_studies_course']").val(response[0].graduate_studies_course);
                        $("input[name='graduate_studies_year_attended']").val(response[0].graduate_studies_year_attended);        
                        let graduateStudiesUndergrad = JSON.parse(response[0].if_graduate_studies_undergraduate);
                        if(graduateStudiesUndergrad !== "{}"){
                            // console.log(elemUndergrad);
                            $(".graduate_studies_what_level").val(graduateStudiesUndergrad.what_level);
                            $(".graduate_studies_last_year_attended").val(graduateStudiesUndergrad.last_year_attended);
                            $(".graduate_studies_awards_received").val(graduateStudiesUndergrad.awards_received);
                        }
                        $("input[name='if_graduate_studies_undergraduate']").val(response[0].if_graduate_studies_undergraduate);

                        // Technical/Vocational And Other Training
                        $(".date_from").css("color", "black");
                        $(".date_to").css("color", "black");
                        let objCourse = JSON.parse(response[0].course);
                        let objInstitution = JSON.parse(response[0].institution);
                        let objDateFrom = JSON.parse(response[0].date_from);
                        let objDateTo = JSON.parse(response[0].date_to);
                        let objCertificate = JSON.parse(response[0].certificate);
                        $("input[name='courses']").val(response[0].course);
                        $("input[name='institutions']").val(response[0].institution);
                        $("input[name='date_from']").val(response[0].date_from);
                        $("input[name='date_to']").val(response[0].date_to);
                        $("input[name='certificates']").val(response[0].certificate);
                        
                        for (let i = 1; i <= 3; i++) {
                            if (objCourse[`course${i}`] !== "") {
                                $(`.course${i}`).val(objCourse[`course${i}`]);
                                $(`.institution${i}`).val(objInstitution[`institution${i}`]);
                                $(`.date_from${i}`).val(objDateFrom[`date_from${i}`]);
                                $(`.date_to${i}`).val(objDateTo[`date_to${i}`]);
                                $(`.certificate${i}`).val(objCertificate[`certificate${i}`]);
                            }
                        }
                        $(".certificate-file-wrapper").remove();
                        let certificatePath = JSON.parse(response[0].certificate_path);
                        for(let key in certificatePath){
                            let div = document.createElement("div");
                            div.className = "col-lg-6 mt-3 d-block certificate-file-wrapper";
                            div.style.position = "relative";
                            let a = document.createElement("a");
                            a.className = "px-3 py-2 border d-block certificate-container";
                            a.style.color = "black";
                            a.style.borderRadius = "7px";
                            a.style.textDecoration = "none";
                            // let relativePath = certificatePath[key].replace('proofs/', '');
                            // a.textContent = relativePath.replace(/^[^-]*-/, '');;
                            // a.setAttribute('href', relativePath);
                            a.textContent = certificatePath[key];
                            a.setAttribute("href", certificatePath[key])
                            a.setAttribute('target', "_blank");
                            let closeIcon = document.createElement("img");
                            closeIcon.className = "close-certificate";
                            closeIcon.setAttribute("src", "/images/close_gray.svg");
                            closeIcon.style.zIndex = "5";
                            closeIcon.style.position = "absolute";
                            closeIcon.style.right = "18px";
                            closeIcon.style.top = "10px";
                            div.append(a); 
                            div.append(closeIcon); // Close Icon to remove file

                            document.querySelector(".technical-vocational-training .row").append(div);
                        }
                        // $(".technical-vocational-training .row").append(div);

                        // Eligibility/Professional License
                        $(".date_exam").css("color", "black");
                        let objEligibility = JSON.parse(response[0].eligibility);
                        let objRating = JSON.parse(response[0].rating);
                        let objDateExam = JSON.parse(response[0].date_exam);

                        $("input[name='eligibility']").val(response[0].eligibility);
                        $("input[name='rating']").val(response[0].rating);
                        $("input[name='date_exam']").val(response[0].date_exam);
                        for(let j = 1; j <= 2; j++){
                            if(objEligibility[`eligibility${j}`] !== ""){
                                let inputEligibility = document.querySelectorAll(".eligibility")[j-1];
                                let inputRating = document.querySelectorAll(".rating")[j-1];
                                let inputDateExam = document.querySelectorAll(".date_exam")[j-1];

                                $(inputEligibility).val(objEligibility[`eligibility${j}`]);
                                $(inputRating).val(objRating[`rating${j}`]);
                                $(inputDateExam).val(objDateExam[`date_exam${j}`]);
                            }
                        }

                        $(".valid_until").css("color", "black");
                        let objProfessionalLicense = JSON.parse(response[0].professional_license);
                        let objValidUntil = JSON.parse(response[0].valid_until);

                        $("input[name='professional_license']").val(response[0].professional_license);
                        $("input[name='valid_until']").val(response[0].valid_until);
                        for(let k = 1; k <= 2; k++){
                            if(objProfessionalLicense[`profLicense${k}`] !== ""){
                                let inputProfLicense = document.querySelectorAll(".professional_license")[k-1];
                                let inputValidUntil = document.querySelectorAll(".valid_until")[k-1];

                                $(inputProfLicense).val(objProfessionalLicense[`profLicense${k}`]);
                                $(inputValidUntil).val(objValidUntil[`validUntil${k}`]);
                            }
                        }

                        
                        let objCompanyName = JSON.parse(response[0].company_name);
                        let objCompanyAddress = JSON.parse(response[0].company_address);
                        let objPosition = JSON.parse(response[0].position);
                        let objInclusiveDate = JSON.parse(response[0].inclusive_date);
                        let objStatus = JSON.parse(response[0].status);

                        $("input[name='company_name']").val(response[0].company_name);
                        $("input[name='company_address']").val(response[0].company_address);
                        $("input[name='position']").val(response[0].position);
                        $("input[name='inclusive_date']").val(response[0].inclusive_date);
                        $("input[name='status']").val(response[0].status);

                        for(let l = 1; l <= 3; l++){
                            if(objCompanyName[`company_name${l}`] !== ""){
                                let inputCompanyName = document.querySelectorAll(".company_name")[l-1];
                                let inputCompanyAddress = document.querySelectorAll(".company_address")[l-1];
                                let inputPosition = document.querySelectorAll(".position")[l-1];
                                let inputInclusiveDate = document.querySelectorAll(".inclusive_date")[l-1];
                                $(inputInclusiveDate).css("color", "black");
                                let inputStatus = document.querySelectorAll(".status")[l-1];

                                $(inputCompanyName).val(objCompanyName[`company_name${l}`]);
                                $(inputCompanyAddress).val(objCompanyAddress[`company_address${l}`]);
                                $(inputPosition).val(objPosition[`position${l}`]);
                                $(inputInclusiveDate).val(objInclusiveDate[`inclusive_date${l}`]);

                                for(let m = 1; m < $(inputStatus).find("option").length; m++){
                                    let option = $(inputStatus).find("option")[m];
                                    if($(option).val() === objStatus[`status${l}`]){
                                        $(option).prop("selected", true)
                                    }
                                }
                            }
                        }

                        $(".eligibility-license-file-wrapper").remove();
                        let eligibilityLicensePath = JSON.parse(response[0].eligibility_license_path);
                        for(let key in eligibilityLicensePath){
                            let div = document.createElement("div");
                            div.className = "col-lg-6 mt-3 d-block eligibility-license-file-wrapper";
                            div.style.position = "relative";
                            let a = document.createElement("a");
                            a.className = "px-3 py-2 border d-block eligibility-license-container";
                            a.style.color = "black";
                            a.style.borderRadius = "5px";
                            a.style.textDecoration = "none";
                            let relativePath = eligibilityLicensePath[key].replace('proofs/', '');
                            a.textContent = relativePath.replace(/^[^-]*-/, '');
                            a.setAttribute('href', relativePath);
                            a.setAttribute('target', "_blank");
                            let closeIcon = document.createElement("img");
                            closeIcon.className = "close-certificate";
                            closeIcon.setAttribute("src", "/images/close_gray.svg");
                            closeIcon.style.zIndex = "5";
                            closeIcon.style.position = "absolute";
                            closeIcon.style.right = "18px";
                            closeIcon.style.top = "10px";
                            div.append(a); 
                            div.append(closeIcon); // Close Icon to remove file

                            document.querySelector(".eligibility-professional-license .row").append(div);
                        }
                        
                        // Other Skills Acquired Without Formal Training
                        let objSkills = JSON.parse(response[0].skills);

                        $("input[name='skills']").val(response[0].skills);
                        // {"skill1":"automechanic","skill2":"carpentry","skill3":"domestic chores","skill4":"embroidery","skill5":"masonry","skill6":"painting","skill7":"photography","skill8":"sewing","skill9":"tailoring"}
                        let inputSkills = document.querySelectorAll(".skills");
                        for(let n = 0; n < inputSkills.length; n++){
                            let checkbox = $(inputSkills)[n];
                            for(let key in objSkills){
                                if($(checkbox).val() === objSkills[key]){
                                    $(checkbox).prop("checked", true)
                                    // console.log($(checkbox).val(), objSkills[key]);
                                }
                            }
                        }
                        if(objSkills.other !== undefined){
                            $(".other_skill").prop("checked", true);
                            $(".input_other_skill").val(objSkills.other);
                        }

                        // Authorize
                        $(".certify-authorize").prop("checked", true);
                        
                        // $(".certification-authorization div div div label").css("margin-top", "0px");
                        document.querySelector(".btn-submit").style.setProperty("display", "none", "important");

                        let inputTag = document.querySelectorAll("input");
                        for(let i = 0; i < inputTag.length;i++){
                            let input = $(inputTag)[i];
                            let value = $(input).val();
                            if(value !== ""){
                                let label = $(input).siblings()[0];
                                $(label).css("margin-top", "-12px");
                            }
                            if(value === "na"){
                                let label = $(input).siblings()[0];
                                $(label).css("margin-top", "-12px");
                            }
                        }
                    }
                    else{
                        document.querySelector(".btn-update").style.setProperty("display", "none", "important");
                    }
                },
                error: function(error){
                    console.error(error);
                }
            })
            if(response.length !== 0) {
                // Assuming .close-certificate elements are created dynamically
                // Delegate the click event handling to a static parent element
                $(document).on("click", ".close-certificate", function() {
                    let selectedCertificate = document.querySelectorAll(".selected-certificate-file-wrapper");
                    for(let i = 0; i < selectedCertificate.length; i++){
                        console.log($(selectedCertificate)[i]);
                    }
                    $(this).parent().remove();
                });
            } else {
                console.log("No form found for user:", id);
            }
        }
        catch(error){
            console.error(error);
        }
    }
    checkFrom();

    $(document).on("click", ".close-certificate", function() {
        let selectedCertificate = document.querySelectorAll(".selected-certificate-file-wrapper");
        for(let i = 0; i < selectedCertificate.length; i++){
            console.log($(selectedCertificate)[i]);
        }
        $(this).parent().remove();
    })

    $(".btn-update").click(async function(e){
        e.preventDefault();
        let isChecked = true;
        let certifyAuthorize = document.querySelectorAll(".certify-authorize")
        for(let i = 0; i < certifyAuthorize.length; i++){
            let checkbox = $(certifyAuthorize)[i];
            if($(checkbox).prop("checked") === false){
                isChecked = false;
            }
        }
        if(isChecked){
            let category = ['personalInformation', 'jobPreference', 'languageDialectProficiency', 'educationalBackground', 'techicalVocationalTraining', 'eligibilityProfessionalLicense', 'workExperience', 'otherSkills'];
            for(let i = 0; i < document.querySelectorAll("form").length - 2; i++){
                let form = document.querySelectorAll("form")[i];
                let formData = $(form).serializeArray();
                finalInformation[category[i]] = formData;
            }

            let certificateFiles = $("input[name='selected-certificate-file']")[0].files;
            let certificateData = new FormData();
            for(let i = 0; i < certificateFiles.length; i++){
                certificateData.append('selected-certificate-file[]', certificateFiles[i]);
            }
            if(certificateFiles.length > 0){
                // alert("This is certificate if statement.")
                try{
                    await $.ajax({
                        url: "/uploadCertificate",
                        type: "POST",
                        data: certificateData,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            let selectedCertificate =  document.querySelectorAll(".selected-certificate-file-wrapper");
                            let keysToDelete = [];
                            let remainingKeys = [];

                            for(let key in response){
                                let foundMatch = false;
                                for(let j = 0; j < selectedCertificate.length; j++){
                                    let divSelectedCertificate = $(selectedCertificate)[j];
                                    let val = $(divSelectedCertificate).attr("id");
                                
                                    if(parseInt(val) === parseInt(key)){
                                        // console.log("Val: ", val, " Key: ", key, " Path: ", response[key]);
                                        foundMatch = true;
                                        remainingKeys.push(parseInt(key));
                                        break;
                                    }
                                }
                                if (!foundMatch) {
                                    keysToDelete.push(key);
                                }
                            }
                            keysToDelete.forEach(key => {
                                delete response[key];
                            });

                            // Rearrange remaining keys in order
                            remainingKeys.sort((a, b) => a - b);

                            // Create a new object with rearranged keys
                            let rearrangedResponse = {};
                            remainingKeys.forEach((key, index) => {
                                rearrangedResponse[index] = response[key];
                            });
                            response = rearrangedResponse;

                            let lastKey = 0;
                            for(let key in response){
                                lastKey++;
                            }
                            let retrieveCertificate = document.querySelectorAll(".certificate-file-wrapper");
                            for(let i = 0; i < retrieveCertificate.length; i++){
                                let certificate = $(retrieveCertificate)[i];
                                response[lastKey] = "/proofs"+$(certificate).find("a").attr("href");
                                lastKey++;
                            }
                            finalInformation['certificateFile'] = response;
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('Error uploading files: ' + textStatus);
                        }
                    });
                }
                catch(error){
                    console.error(error)
                }
            }
            // If no file selected
            else{
                let retrieveCertificate = document.querySelectorAll(".certificate-file-wrapper");
                let certificateObj = {};
                for(let i = 0; i < retrieveCertificate.length; i++){
                    let certificate = $(retrieveCertificate)[i];
                    certificateObj[i] = "/proofs"+$(certificate).find("a").attr("href");
                }
                finalInformation['certificateFile'] = certificateObj;
            }

            let eligibilityLicenseFiles = $("input[name='selected-eligibility-license-file']")[0].files;
            let eligibilityLicenseData = new FormData();
            for(let i = 0; i < eligibilityLicenseFiles.length; i++){
                eligibilityLicenseData.append('selected-eligibility-license-file[]', eligibilityLicenseFiles[i]);
            }
            if(eligibilityLicenseFiles.length > 0){
                try{
                    await $.ajax({
                        url: "/uploadEligibilityLicense",
                        type: "POST",
                        data: eligibilityLicenseData,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            let selectedEligibilityLicense =  document.querySelectorAll(".selected-eligibility-license-file-wrapper");
                            let keysToDelete = [];
                            let remainingKeys = [];

                            for(let key in response){
                                let foundMatch = false;
                                for(let j = 0; j < selectedEligibilityLicense.length; j++){
                                    let divSelectedEligibilityLicense = $(selectedEligibilityLicense)[j];
                                    let val = $(divSelectedEligibilityLicense).attr("id");
                                
                                    if(parseInt(val) === parseInt(key)){
                                        // console.log("Val: ", val, " Key: ", key, " Path: ", response[key]);
                                        foundMatch = true;
                                        remainingKeys.push(parseInt(key));
                                        break;
                                    }
                                }
                                if (!foundMatch) {
                                    keysToDelete.push(key);
                                }
                            }
                            keysToDelete.forEach(key => {
                                delete response[key];
                            });

                            // Rearrange remaining keys in order
                            remainingKeys.sort((a, b) => a - b);

                            // Create a new object with rearranged keys
                            let rearrangedResponse = {};
                            remainingKeys.forEach((key, index) => {
                                rearrangedResponse[index] = response[key];
                            });
                            response = rearrangedResponse;

                            let lastKey = 0;
                            for(let key in response){
                                lastKey++;
                            }
                            // console.log(lastKey);
                            let retrieveEligibilityLicense = document.querySelectorAll(".eligibility-license-file-wrapper");
                            // console.log("Before: ", response);
                            for(let i = 0; i < retrieveEligibilityLicense.length; i++){
                                let eligibilityLicense = $(retrieveEligibilityLicense)[i];
                                response[lastKey] = "/proofs"+$(eligibilityLicense).find("a").attr("href");
                                lastKey++;
                            }
                            // console.log("After: ", response);
                            finalInformation['eligibilityLicenseFile'] = response;
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('Error uploading files: ' + textStatus);
                        }
                    });
                }
                catch(error){
                    console.error(error);
                }
            }
            // If no file selected
            else{
                let retrieveEligibilityLicense = document.querySelectorAll(".eligibility-license-file-wrapper");
                let eligibilityLicenseObj = {};
                for(let i = 0; i < retrieveEligibilityLicense.length; i++){
                    let eligibilityLicense = $(retrieveEligibilityLicense)[i];
                    eligibilityLicenseObj[i] = "/proofs"+$(eligibilityLicense).find("a").attr("href");
                }
                finalInformation['eligibilityLicenseFile'] = eligibilityLicenseObj;
            }

            $.ajax({
                url: "/updateInformation",
                type: "POST",
                contentType : "application/json",
                data: JSON.stringify(finalInformation),
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.error(error);
                }
            });
            
            $("#btnUpdateApplication").trigger("click");
        }
        else{
            let p = document.createElement('p');
            p.className = "alert alert-danger col-lg-5 col-md-5 col-sm-6 col-12 custom-message"
            p.style.color = 'red';
            p.style.margin = "0 auto";
            p.innerText = 'Please check all the boxes.';
            $("#message").append(p);
            $("#message").css({
                "display": "block",
                "position": "absolute",
                "top": "0",
                "z-index": "5"
            });
            
            setTimeout(function(){
                $(".custom-message").remove();
            }, 1000);
        }
    });
    
    
    
});
