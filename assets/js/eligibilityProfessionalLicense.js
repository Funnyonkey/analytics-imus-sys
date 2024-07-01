/* For eligibility section */ 
let eligibilityObj = {};
let ratingObj = {};
let dateExamObj = {};

let eligibility = document.querySelectorAll(".eligibility");
let rating = document.querySelectorAll(".rating");
let dateExam = document.querySelectorAll(".date_exam");

let addEligibility = () => {
    let num = 1;
    for(let i = 0; i < eligibility.length; i++){
        let inputEligibility = $(eligibility)[i];
        eligibilityObj[`eligibility${num}`] = $(inputEligibility).val();
        num++;
    }
}
let addRating = () => {
    let num = 1;
    for(let j = 0; j < rating.length; j++){
        let inputRating = $(rating)[j];
        ratingObj[`rating${num}`] = $(inputRating).val();
        num++;
    }
}
let addDateExam = () => {
    let num = 1;
    for(let k = 0; k < dateExam.length; k++){
        let inputDateExam = $(dateExam)[k];
        dateExamObj[`date_exam${num}`] = $(inputDateExam).val();
        num++;
    }
}



/* For professional license */
let profLicenseObj = {};
let validUntilObj = {};

let profLicense = document.querySelectorAll(".professional_license");
let validUntil = document.querySelectorAll(".valid_until");

let addProfLicense = () => {
    let num = 1;
    for(let l = 0; l < profLicense.length; l++){
        let inputProfLicense = $(profLicense)[l];
        profLicenseObj[`profLicense${num}`] = $(inputProfLicense).val();
        num++;
    }
}
let addValidUntil = () => {
    let num = 1;
    for(let m = 0; m < validUntil.length; m++){
        let inputValidUntil = $(validUntil)[m];
        validUntilObj[`validUntil${num}`] = $(inputValidUntil).val();
        num++;
    }
}

$(".eligibility-professional-license input").on("input", function(){
    addEligibility();
    addRating();
    addDateExam();
    addProfLicense();
    addValidUntil();

    /* Update input value */
    $("input[name='eligibility']").val(JSON.stringify(eligibilityObj));
    $("input[name='rating']").val(JSON.stringify(ratingObj));
    $("input[name='date_exam']").val(JSON.stringify(dateExamObj));
    $("input[name='professional_license']").val(JSON.stringify(profLicenseObj));
    $("input[name='valid_until']").val(JSON.stringify(validUntilObj));
});
