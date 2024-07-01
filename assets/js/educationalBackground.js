/* Elementary */
let elementaryObj = JSON.parse($("input[name='if_elementary_undergraduate']").val());
$(".elem_what_level").on("input", function(){
    let val = $(".elem_what_level").val();
    if(val !== ""){
        elementaryObj["what_level"] = val;
    }
    else{
        delete elementaryObj["what_level"];
    }
    $("input[name='if_elementary_undergraduate']").val(JSON.stringify(elementaryObj));
});
$(".elem_last_year_attended").on("input", function(){
    let val = $(".elem_last_year_attended").val();
    if(val !== ""){
        elementaryObj["last_year_attended"] = val;
    }
    else{
        delete elementaryObj["last_year_attended"];
    }
    $("input[name='if_elementary_undergraduate']").val(JSON.stringify(elementaryObj));
});
$(".elem_awards_received").on("input", function(){
    let val = $(".elem_awards_received").val();
    if(val !== ""){
        elementaryObj["awards_received"] = val;
    }
    else{
        delete elementaryObj["awards_received"];
    }
    $("input[name='if_elementary_undergraduate']").val(JSON.stringify(elementaryObj));
});

/* Secondary */
let secondaryObj = JSON.parse($("input[name='if_secondary_undergraduate']").val());
$(".secondary_what_level").on("input", function(){
    let val = $(".secondary_what_level").val();
    if(val !== ""){
        secondaryObj["what_level"] = val;
    }
    else{
        delete secondaryObj["what_level"];
    }
    $("input[name='if_secondary_undergraduate']").val(JSON.stringify(secondaryObj));
});
$(".secondary_last_year_attended").on("input", function(){
    let val = $(".secondary_last_year_attended").val();
    if(val !== ""){
        secondaryObj["last_year_attended"] = val;
    }
    else{
        delete secondaryObj["last_year_attended"];
    }
    $("input[name='if_secondary_undergraduate']").val(JSON.stringify(secondaryObj));
});
$(".secondary_awards_received").on("input", function(){
    let val = $(".secondary_awards_received").val();
    if(val !== ""){
        secondaryObj["awards_received"] = val;
    }
    else{
        delete secondaryObj["awards_received"];
    }
    $("input[name='if_secondary_undergraduate']").val(JSON.stringify(secondaryObj));
});

/* Tertiary */
let tertiaryObj = JSON.parse($("input[name='if_tertiary_undergraduate']").val());
$(".tertiary_what_level").on("input", function(){
    let val = $(".tertiary_what_level").val();
    if(val !== ""){
        tertiaryObj["what_level"] = val;
    }
    else{
        delete tertiaryObj["what_level"];
    }
    $("input[name='if_tertiary_undergraduate']").val(JSON.stringify(tertiaryObj));
});
$(".tertiary_last_year_attended").on("input", function(){
    let val = $(".tertiary_last_year_attended").val();
    if(val !== ""){
        tertiaryObj["last_year_attended"] = val;
    }
    else{
        delete tertiaryObj["last_year_attended"];
    }
    $("input[name='if_tertiary_undergraduate']").val(JSON.stringify(tertiaryObj));
});
$(".tertiary_awards_received").on("input", function(){
    let val = $(".tertiary_awards_received").val();
    if(val !== ""){
        tertiaryObj["awards_received"] = val;
    }
    else{
        delete tertiaryObj["awards_received"];
    }
    $("input[name='if_tertiary_undergraduate']").val(JSON.stringify(tertiaryObj));
});

/* Graduate studies */
let graduateStudiesObj = JSON.parse($("input[name='if_graduate_studies_undergraduate']").val());
$(".graduate_studies_what_level").on("input", function(){
    let val = $(".graduate_studies_what_level").val();
    if(val !== ""){
        graduateStudiesObj["what_level"] = val;
    }
    else{
        delete graduateStudiesObj["what_level"];
    }
    $("input[name='if_graduate_studies_undergraduate']").val(JSON.stringify(graduateStudiesObj));
});
$(".graduate_studies_last_year_attended").on("input", function(){
    let val = $(".graduate_studies_last_year_attended").val();
    if(val !== ""){
        graduateStudiesObj["last_year_attended"] = val;
    }
    else{
        delete graduateStudiesObj["last_year_attended"];
    }
    $("input[name='if_graduate_studies_undergraduate']").val(JSON.stringify(graduateStudiesObj));
});
$(".graduate_studies_awards_received").on("input", function(){
    let val = $(".graduate_studies_awards_received").val();
    if(val !== ""){
        graduateStudiesObj["awards_received"] = val;
    }
    else{
        delete graduateStudiesObj["awards_received"];
    }
    $("input[name='if_graduate_studies_undergraduate']").val(JSON.stringify(graduateStudiesObj));
});