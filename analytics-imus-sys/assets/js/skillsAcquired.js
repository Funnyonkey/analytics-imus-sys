/*
* OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING
*/
let skills = document.querySelectorAll(".skills");

let addSkill = () => {
    let num = 1;
    let skillsObj = {};
    for(let i = 0; i < skills.length; i++){
        if($(skills[i]).prop("checked")){
            let inputSkills = skills[i];
            skillsObj[`skill${num}`] = $(inputSkills).val(); 
            num++;
        }
    }
    if($(".other_skill").prop("checked")){
        skillsObj[`other`] = $(".input_other_skill").val();
    }
    $("input[name='skills']").val(JSON.stringify(skillsObj));
}

$(".skills").click(function(){
    addSkill();
});

$(".other_skill").click(function(){
    addSkill();
});

$(".input_other_skill").on("input", function(){
    addSkill();
});