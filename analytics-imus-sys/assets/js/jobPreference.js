
let addPreferredOccupation = () => {
    let preferredOccupationObj = {};
    let occupationObj = {};

    /* add checkboxes value */
    for(let i = 0; i < $(".type_preferred_occupation").length; i++){
        let checkbox = $(".type_preferred_occupation")[i];

        if($(checkbox).prop("checked")){
            preferredOccupationObj["type_preferred_occupation"] = $(checkbox).val();
            console.log($(checkbox));
        }
    }
    /* add input fields value */
    let num = 1;
    for(let i = 0; i < $(".input_occupation").length; i++){
        let input = $(".input_occupation")[i];
        occupationObj[`occupation${num}`] = $(input).val();

        num++;
    }

    $("input[name='preferred_occupation']").val(JSON.stringify(preferredOccupationObj));
    $("input[name='occupation']").val(JSON.stringify(occupationObj));
}
$(".type_preferred_occupation").click(function(){
    $(".type_preferred_occupation").prop("checked", false);
    $(this).prop("checked", true);

    addPreferredOccupation();
});

/* Specified occupation */ 
$(".preferred_occupation1").on("input", function(){
    addPreferredOccupation();
}); 
$(".preferred_occupation2").on("input", function(){
    addPreferredOccupation();
});
$(".preferred_occupation3").on("input", function(){
    addPreferredOccupation();
});  

/* Work location */
let addWorkLocation = () => {
    let preferredWorkOccupationObj = {};
    let workOccupationObj = {};

    /* add checkboxes value */
    for(let i = 0; i < $(".type_work_occupation").length; i++){
        let checkbox = $(".type_work_occupation")[i];

        if($(checkbox).prop("checked")){
            preferredWorkOccupationObj["type_work_occupation"] = $(checkbox).val();
        }
    }
    /* add input fields value */
    let num = 1;
    for(let i = 0; i < $(".input_address").length; i++){
        let input = $(".input_address")[i];
        workOccupationObj[`location${num}`] = $(input).val();

        num++;
    }

    $("input[name='preferred_work_occupation']").val(JSON.stringify(preferredWorkOccupationObj));
    $("input[name='work_occupation']").val(JSON.stringify(workOccupationObj));
}

$(".type_work_occupation").click(function(){
    $(".type_work_occupation").prop("checked", false);
    $(this).prop("checked", true);

    addWorkLocation();
});
/* Input work location */ 
$(".input_address").on("input", function(){
    addWorkLocation();
});

