/* 
* PERSONAL INFORMATION
* Stores the value of input tag to the checked radio button
*
* Disability
* Radio buttons
*/
let addDisability = () => {
    let disabilityObj =  {}
    
    let num = 1;
    for(let i = 0; i < $(".disability").length; i++){
        let disability = $(".disability")[i];
        if($(disability).prop("checked")){
            disabilityObj[`disability${num}`] = $(disability).val();
            num++;
        }
    }
    if($(".other_disability").prop("checked")){
        $(".input_other_disability").removeAttr("disabled");
        disabilityObj[`other`] = $(".input_other_disability").val();
        num++;
    }
    if(!$(".other_disability").prop("checked")){
        $(".input_other_disability").val("")
        $(".input_other_disability").attr("disabled", "disabled");
        disabilityObj[`other`] = $(".input_other_disability").val();
    }
    $("input[name='disability']").val(JSON.stringify(disabilityObj));
}
$(".disability").change(function(){
    addDisability();
});
$(".other_disability").click(function(){
   addDisability(); 
});
$(".input_other_disability").on("input", function(){
    addDisability(); 
});

/* Combine all location to complete the present address */
let address = {
    "house_no_street": "",
    "barangay": "",
    "city_municipality": "",
    "province": ""
};

$(".province").on("input", function(){
    address.province = $(".province").val();
    $("input[name='address']").val(JSON.stringify(address));
});
$(".city_municipality").on("input", function(){
    address.city_municipality = $(".city_municipality").val();
    $("input[name='address']").val(JSON.stringify(address));
});
$(".barangay").on("input", function(){
    address.barangay = $(".barangay").val();
    $("input[name='address']").val(JSON.stringify(address));
});
$(".house_no_street").on("input", function(){
    address.house_no_street = $(".house_no_street").val();
    $("input[name='address']").val(JSON.stringify(address));
});

/*
* Employment Status
*/
let employeeStatusObj = JSON.parse($("input[name='employment_status']").val());
let setEmployeeStatus = (status) => {
    employeeStatusObj = {};
    employeeStatusObj["employment_status"] = status;
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
}
$("#employed").click(function(){
    if($(this).prop("checked")){
        $("#unemployed").prop("checked", false); /* unchecked the unemplyed checkbox*/
        setEmployeeStatus("employed"); /* add string json value to the input tag */
        $(".employed .employed_type").prop("disabled", false); /* enable checkboxes under type of employed */
        /* Disable unemployed checkboxes and uncheck */
        $(".unemployed").prop("disabled", true);
        $("#unemployed").prop("disabled", false);
        $(".unemployed input[type='checkbox']").prop("checked", false);
    }
    else{
        employeeStatusObj = {};
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
        /* disable checkboxes except the employed checkbox */
        $(".employed input[type='checkbox']").prop("disabled", true);
        $("#employed").prop("disabled", false);
        $(".employed input[type='checkbox']").prop("checked", false);
        $(".input_other_job").val("");
    }
});
$("#unemployed").click(function(){
    if($(this).prop("checked")){
        $("#employed").prop("checked", false);
        setEmployeeStatus("unemployed");
        $(".unemployed input[type='checkbox']").prop("disabled", false);
        /* Disable employed checkboxes and unchecked */
        $(".employed input[type='checkbox']").prop("disabled", true);
        $("#employed").prop("disabled", false);
        $(".employed input[type='checkbox']").prop("checked", false);
        $(".input_other_job").val(""); /* clear employed input field */
        
    }
    else{
        employeeStatusObj = {};
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
        /* disable checkboxes except the unemployed checkbox */
        $(".unemployed input[type='checkbox']").prop("disabled", true);
        $("#unemployed").prop("disabled", false);
        $(".unemployed input[type='checkbox']").prop("checked", false);
        $(".how_long_looking_for_work").val(""); /* clear input field - duration of looking for a job under unemployed */
        $(".input_other_unemployed_type").val("");
    }
});
/* Wage and self employed */
$(".wage_employed").change(function(){
    if($(this).prop("checked")){
        $(".self_employed").prop("checked", false);
        employeeStatusObj["employed_type"] = "wage employed"; /* add key value pair */

        $(".job").prop("disabled", true);
        $(".other_job").prop("disabled", true);
        $(".job").prop("checked", false);
        $(".other_job").prop("checked", false);
    }
    else{
        delete  employeeStatusObj["employed_type"]; /* remove the key from the nested object */
        $(".job").prop("disabled", true);
        $(".other_job").prop("disabled", true);
        $(".job").prop("checked", false);
        $(".other_job").prop("checked", false);
        
    }
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
});
$(".self_employed").change(function(){
    if($(this).prop("checked")){
        $(".wage_employed").prop("checked", false);
        employeeStatusObj["employed_type"] = "self employed";

        $(".job").prop("disabled", false);
        $(".other_job").prop("disabled", false);
    }
    else{
        delete  employeeStatusObj["employed_type"]; /* remove the key from the nested object */
        $(".job").prop("disabled", true);
        $(".other_job").prop("disabled", true);
        $(".job").prop("checked", false);
        $(".other_job").prop("checked", false);
    }
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
})
/* Job checkboxes */
let addJob = () => {
    let jobObj =  {}
    
    let num = 1;
    for(let i = 0; i < $(".job").length; i++){
        let job = $(".job")[i];
        console.log($(job).val());
        if($(job).prop("checked")){
            jobObj[`job${num}`] = $(job).val();
            num++;
        }
    }
    if($(".other_job").prop("checked")){
        jobObj[`other`] = $(".input_other_job").val();;
        num++;
    }
    employeeStatusObj['job'] = jobObj;
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj))
        
}

$(".job").click(function(){
    addJob();
});
$(".other_job").click(function(){
    addJob();
});
$(".input_other_job").on("input", function(){
    addJob();
});

/* Unemployed checkboxes and input */
$(".how_long_looking_for_work").on("input", function(){
    let time = $(".how_long_looking_for_work").val();
    if($("#unemployed").prop("checked")){
        if(time === ""){
            if("how_long_looking_for_work" in employeeStatusObj){
                delete employeeStatusObj["how_long_looking_for_work"];
            }
        }
        else{
            employeeStatusObj["how_long_looking_for_work"] = time;
        }
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
    }
});
$(".unemployed_type").click(function(){
    $(".unemployed_type").prop("checked", false); /* checkboxes under employed */
    $(".other_unemployed_type").prop("checked", false);    
    $(this).prop("checked", true);
    let unemployed_type = $(this).val();
    if($(this).prop("checked")){
        employeeStatusObj["unemployed_type"] = unemployed_type;

        delete employeeStatusObj["country"]; /* remove the key from the nested object */
        $(".input_laid_off_abroad").val("");
        $(".input_other_unemployed_type").val("");
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
    }
});
$(".laid_off_abroad").click(function(){
    if($(this).prop("checked")){
        let country = $(".input_laid_off_abroad").val();
        employeeStatusObj["country"] = country;
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
    }
    else{
        delete employeeStatusObj["country"]; /* remove the key from the nested object */
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
    }
});
$(".input_laid_off_abroad").on("input", function(){
    if($(".laid_off_abroad").prop("checked")){
        let country = $(".input_laid_off_abroad").val();
        if($("#unemployed").prop("checked")){
            if(country === ""){
                if("country" in employeeStatusObj){
                    delete employeeStatusObj["country"];
                }
            }
            else{
                employeeStatusObj["country"] = country;
            }
        }
    }
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));

})
$(".other_unemployed_type").click(function(){
    $(".unemployed_type").prop("checked", false); /* checkboxes under employed */
    $(this).prop("checked", true);
    if($(this).prop("checked")){
        let unemployed_type = $(".input_other_unemployed_type").val();
        employeeStatusObj["other"] = unemployed_type;
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
    }
    else{
        delete employeeStatusObj["other"]; /* remove the key from the nested object */
        $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
        $(".input_other_unemployed_type").val("");
    }
});
$(".input_other_unemployed_type").on("input", function(){
    if($(".other_unemployed_type").prop("checked")){
        let unemployed_type = $(".input_other_unemployed_type").val();
        if(unemployed_type === ""){
            if("country" in employeeStatusObj){
                delete employeeStatusObj["other"];
            }
        }
        else{
            employeeStatusObj["other"] = unemployed_type;
        }
    }
    $("input[name='employment_status']").val(JSON.stringify(employeeStatusObj));
});

/* Are you an OFW? */
let isOfwObj = JSON.parse($("input[name='is_ofw']").val());
$("#no_ofw").click(function(){
    // console.log("No is clicked");
    if($(this).prop("checked")){
        isOfwObj["is_ofw"] = "no";
        $("input[name='is_ofw']").val(JSON.stringify(isOfwObj));

        $("#yes_ofw").prop("checked", false);
    }
    else{
        delete isOfwObj["is_ofw"]; /* remove the key from the nested object */
        $("input[name='is_ofw']").val(JSON.stringify(isOfwObj));
    }
});
$("#yes_ofw").click(function(){
    // console.log("Yes is clicked");
    if($(this).prop("checked")){
        isOfwObj["is_ofw"] = $(".input_ofw_country").val();
        $("input[name='is_ofw']").val(JSON.stringify(isOfwObj));

        $("#no_ofw").prop("checked", false);
    }
    else{
        delete isOfwObj["is_ofw"]; /* remove the key from the nested object */
        $("input[name='is_ofw']").val(JSON.stringify(isOfwObj));
    }
});
$(".input_ofw_country").on("input", function(){
    if($("#yes_ofw").prop("checked")){
        let country = $(".input_ofw_country").val();
        isOfwObj["is_ofw"] = country;
    }
    $("input[name='is_ofw']").val(JSON.stringify(isOfwObj));
});
/*
* Former OFW
*/
let isFormerOfwObj = JSON.parse($("input[name='is_former_ofw']").val());
$(".no_former_ofw").click(function(){
    if($(this).prop("checked")){
        isFormerOfwObj = {};
        isFormerOfwObj["is_former_ofw"] = "no";
        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));

        $(".yes_former_ofw").prop("checked", false);
    }
    else{
        delete isFormerOfwObj["is_former_ofw"]; /* remove the key from the nested object */
        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
    }
});
$(".yes_former_ofw").click(function(){
    if($(this).prop("checked")){
        isFormerOfwObj["country"] = $(".ofw_former_country").val();
        isFormerOfwObj["month_year"] = $(".month_year_return_ph").val();

        $(".no_former_ofw").prop("checked", false);

        delete isFormerOfwObj["is_former_ofw"];

        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
    }
    else{
        isFormerOfwObj = {};
        delete isFormerOfwObj["is_former_ofw"]; /* remove the key from the nested object */
        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
    }
});
$(".ofw_former_country").on("input", function(){
    if($(".yes_former_ofw").prop("checked")){
        isFormerOfwObj["country"] = $(".ofw_former_country").val();
        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
    }
    $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
})
$(".month_year_return_ph").on("input", function(){
    if($(".yes_former_ofw").prop("checked")){
        isFormerOfwObj["month_year"] = $(".month_year_return_ph").val();
        $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
    }
    $("input[name='is_former_ofw']").val(JSON.stringify(isFormerOfwObj));
})

/* 4P's beneficiary */
let is4psBeneficiaryObj = JSON.parse($("input[name='is_4ps_beneficiary']").val());
$(".no_4ps_beneficiary").click(function(){
    if($(this).prop("checked")){
        is4psBeneficiaryObj = {};
        is4psBeneficiaryObj["is_4ps_beneficiary"] = "no";
        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(is4psBeneficiaryObj));

        $(".yes_4ps_beneficiary").prop("checked", false);
        $(".4ps_household_no").val("");
    }
    else{
        delete is4psBeneficiaryObj["is_4ps_beneficiary"]; /* remove the key from the nested object */
        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(is4psBeneficiaryObj));
    }
});
$(".yes_4ps_beneficiary").click(function(){
    if($(this).prop("checked")){
        is4psBeneficiaryObj["is_4ps_beneficiary"] = "yes";
        is4psBeneficiaryObj["household_no"] = $(".4ps_household_no").val();
        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(is4psBeneficiaryObj));

        $(".no_4ps_beneficiary").prop("checked", false);
    }
    else{
        is4psBeneficiaryObj = {};
        $(".4ps_household_no").val("");
        delete is4psBeneficiaryObj["is_4ps_beneficiary"]; /* remove the key from the nested object */
        $("input[name='is_4ps_beneficiary']").val(JSON.stringify(is4psBeneficiaryObj));
    }
});
$(".4ps_household_no").on("input", function(){
    if($(".yes_4ps_beneficiary").prop("checked")){
        let householdNo = $(".4ps_household_no").val();
        is4psBeneficiaryObj["household_no"] = householdNo;
    }
    $("input[name='is_4ps_beneficiary']").val(JSON.stringify(is4psBeneficiaryObj));
});
