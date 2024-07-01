$(document).ready(function(){
    document.getElementById('navLoginBtn').removeAttribute('disabled');

    let passwordVisible = true;
    $(".visible-password").click(function(){
        if(passwordVisible === true){
            passwordVisible = false;
            $("input[name='password']").attr("type", "text");
            $(".visible-password").attr("src", "/images/visibility.svg");        
        }
        else{
            passwordVisible = true;
            $("input[name='password']").attr("type", "password");
            $(".visible-password").attr("src", "/images/visibility_off.svg");
        }
    })
    let confirmPassword = true;
    $(".visible-confirm-password").click(function(){
        if(confirmPassword === true){
            confirmPassword = false;
            $("input[name='confirm_password']").attr("type", "text");
            $(".visible-confirm-password").attr("src", "/images/visibility.svg");
        }
        else{
            confirmPassword = true;
            $("input[name='confirm_password']").attr("type", "password");
            $(".visible-confirm-password").attr("src", "/images/visibility_off.svg");
        }
    });
    document.onkeydown = function (e) {
        if(e.keyCode === 13){
            console.log("Enter is clicked.");
            $(".btn-submit").trigger("click");
        }   
    }
});