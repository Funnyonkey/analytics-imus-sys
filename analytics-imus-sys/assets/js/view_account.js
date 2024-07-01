$(document).ready(function(){
   
    let applicantUserId = localStorage.getItem("applicant_user_id");
    let refreshProfileInfo = () => {
        $.ajax({
            url: "/user_account",
            type: "POST",
            data: { id: applicantUserId },
            success: function(response){
                console.log(response);
                let input;
                let label;
                if(response[0].username !== null){
                    input = $("input[name='username']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].username);
                    // $(".username").text(response[0].username);
                }
                if(response[0].firstname !== null){
                    input = $("input[name='firstname']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].firstname);
                }
                if(response[0].lastname !== null){
                    input = $("input[name='surname']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].lastname);
                }
                if(response[0].email !== null){
                    input = $("input[name='email']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].email);
                }
                if(response[0].phonenumber !== null){
                    input = $("input[name='phonenumber']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].phonenumber);
                }
                if(response[0].birthdate !== null){
                    input = $("input[name='birthdate']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].birthdate);
                    $(input).css("color", "black");
                }
                if(response[0].civil_status !== "null"){
                    select = $("select[name='civil_status']");
                    label = $(select).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(select).val(response[0].civil_status);
                    $(select).css("color", "black");
                }
                if(response[0].civil_status !== null){
                    console.log($("select[name='civil_status']")[0])
                }
                // console.log(response[0].image_path)
                if(response[0].image_path !== null){
                    $(".image").attr("src", response[0].image_path);
                    // $(".profile-picture img").attr("src", response[0].image_path);
                }
            },
            error: function(error){
                console.error(error);
            }
        });
    }
    refreshProfileInfo();
});
