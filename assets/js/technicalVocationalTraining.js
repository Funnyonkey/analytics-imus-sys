let coursesObj = {};
let dateFromObj = {};
let dateToObj = {};
let institutionsObj = {};
let certificatesObj = {};

let courses = document.querySelectorAll(".courses");
let dateFrom = document.querySelectorAll(".date_from");
let dateTo = document.querySelectorAll(".date_to");
let institutions = document.querySelectorAll(".institutions");
let certificates = document.querySelectorAll(".certificates");

let addCourses = () => {
    let num = 1;
    for(let i = 0; i < courses.length;i++){
        let inputCourse = $(courses)[i];
        coursesObj[`course${num}`] = $(inputCourse).val();
        num++;
    }
}
let addDateFrom = () => {
    let num = 1;
    for(let j = 0; j < dateFrom.length; j++){
        let inputDateFrom = $(dateFrom)[j];
        dateFromObj[`date_from${num}`] = $(inputDateFrom).val();
        num++;
    }
}
let addDateTo = () => {
    let num = 1;
    for(let k = 0; k < dateTo.length; k++){
        let inputDateTo = $(dateTo)[k];
        dateToObj[`date_to${num}`] = $(inputDateTo).val();
        num++;
    }
}
let addInstitutions = () => {
    let num = 1;
    for(let l = 0; l < institutions.length; l++){
        let inputInstitutions = $(institutions)[l];
        institutionsObj[`institution${num}`] = $(inputInstitutions).val();
        num++;
    }
}
let addCertificates = () => {
    let num = 1;
    for(let m = 0; m < certificates.length; m++){
        let inputCertificates = $(certificates)[m];
        certificatesObj[`certificate${num}`] = $(inputCertificates).val();
        num++;
    }
}

$(".technical-vocational-training input").on("input", function(){
    /* call these function to update object value */
    addCourses();
    addDateFrom();
    addDateTo();
    addInstitutions();
    addCertificates();

    /* Update input tag value */
    $("input[name='courses']").val(JSON.stringify(coursesObj));
    $("input[name='institutions']").val(JSON.stringify(institutionsObj));
    $("input[name='date_from']").val(JSON.stringify(dateFromObj));
    $("input[name='date_to']").val(JSON.stringify(dateToObj));
    $("input[name='certificates']").val(JSON.stringify(certificatesObj));
});

$("input[name='selected-certificate-file']").change(function(){
    let certificateFiles = $("input[name='selected-certificate-file']")[0].files;
    $(".selected-certificate-file-wrapper").remove();
    for(let i = 0; i < certificateFiles.length; i++){
        let div = document.createElement("div");
        div.className = "col-lg-6 mt-3 d-block selected-certificate-file-wrapper";
        div.id = i;
        div.style.position = "relative";
        let a = document.createElement("a");
        a.className = "px-3 py-2 border d-block certificate-container";
        a.style.color = "black";
        a.style.borderRadius = "5px";
        a.style.textDecoration = "none";
        let relativePath = certificateFiles[i].name;
        a.textContent = relativePath;
        let localUrl = URL.createObjectURL(certificateFiles[i]);
        a.setAttribute('href', localUrl);
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

    // Create a FormData object to hold the files
    let formData = new FormData();
    for(let i = 0; i < certificateFiles.length; i++){
        formData.append('selected-certificate-file[]', certificateFiles[i]);
        // console.log(certificateFiles[i]);
    }

})
$("input[name='selected-eligibility-license-file']").change(function(){
    let certificateFiles = $("input[name='selected-eligibility-license-file']")[0].files;
    $(".selected-eligibility-license-file-wrapper").remove();
    for(let i = 0; i < certificateFiles.length; i++){
        let div = document.createElement("div");
        div.className = "col-lg-6 mt-3 d-block selected-eligibility-license-file-wrapper";
        div.id = i;
        div.style.position = "relative";
        let a = document.createElement("a");
        a.className = "px-3 py-2 border d-block eligibility-license-container";
        a.style.color = "black";
        a.style.borderRadius = "5px";
        a.style.textDecoration = "none";
        let relativePath = certificateFiles[i].name;
        a.textContent = relativePath;
        let localUrl = URL.createObjectURL(certificateFiles[i]);
        a.setAttribute('href', localUrl);
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

    // Create a FormData object to hold the files
    let formData = new FormData();
    for(let i = 0; i < certificateFiles.length; i++){
        formData.append('selected-certificate-file[]', certificateFiles[i]);
        // console.log(certificateFiles[i]);
    }

})
// Display image preview
// let reader = new FileReader();
// reader.onload = function(e) {
//     $('.image').attr('src', e.target.result);
//     $('.image').show();
// }
// reader.readAsDataURL(imageFile);