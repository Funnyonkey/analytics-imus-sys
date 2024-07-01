let companyNameObj = {};
let companyAddressObj = {};
let positionObj = {};
let inclusiveDateObj = {};
let statusObj = {};

let companyName = document.querySelectorAll(".company_name");
let companyAddress = document.querySelectorAll(".company_address");
let position = document.querySelectorAll(".position");
let inclusiveDate = document.querySelectorAll(".inclusive_date");
let companyStatus = document.querySelectorAll(".status");

let addCompanyName = () => {
    let num = 1;
    for(let i = 0; i < companyName.length; i++){
        let inputCompanyName = $(companyName)[i];
        companyNameObj[`company_name${num}`] = $(inputCompanyName).val();
        num++;
    }
}
let addCompanyAddress = () => {
    let num = 1;
    for(let j = 0; j < companyAddress.length; j++){
        let inputCompanyAddress = $(companyAddress)[j];
        companyAddressObj[`company_address${num}`] = $(inputCompanyAddress).val();
        num++;
    }
}
let addPosition = () => {
    let num = 1;
    for(let k = 0; k < position.length; k++){
        let inputPosition = $(position)[k];
        positionObj[`position${num}`] = $(inputPosition).val();
        num++;
    }
}
let addInclusiveDate = () => {
    let num = 1;
    for(let l = 0; l < inclusiveDate.length; l++){
        let inputInclusiveDate = $(inclusiveDate)[l];
        inclusiveDateObj[`inclusive_date${num}`] = $(inputInclusiveDate).val();
        num++;
    }
}
let addStatus = () => {
    let num = 1;
    for(let m = 0; m < companyStatus.length; m++){
        let inputCompanyStatus = $(companyStatus)[m];
        statusObj[`status${num}`] = $(inputCompanyStatus).val();
        num++;
    }
}

$(".work-experience input").on("input", function(){
    addCompanyName();
    addCompanyAddress();
    addPosition();
    addInclusiveDate();
    addStatus();

    $("input[name='company_name']").val(JSON.stringify(companyNameObj));
    $("input[name='company_address']").val(JSON.stringify(companyAddressObj));
    $("input[name='position']").val(JSON.stringify(positionObj));
    $("input[name='inclusive_date']").val(JSON.stringify(inclusiveDateObj));
    $("input[name='status']").val(JSON.stringify(statusObj));

});