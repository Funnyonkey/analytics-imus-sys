$(document).ready(function(){
    
    let show = false;
    $("#username").click(function(){
        if(!show){
            $(".account-info-container").css("display", "block");
            show = true;
            $(".notification-container").css("display", "none");
        }
        else if(show){
            $(".account-info-container").css("display", "none");
            show = false;
        }
    });
    $("input[type='date']").change(function() {
        $(this).css('color', 'black');
    });

    let userId = localStorage.getItem("userId");
    let refreshProfileInfo = () => {
        $.ajax({
            url: "/user_account",
            type: "POST",
            data: { id: userId },
            success: function(response){
                let input;
                let label;
                if(response[0].username !== null){
                    input = $("input[name='username']");
                    label = $(input).siblings()[0];
                    $(label).css("margin-top", "-12px");
                    $(input).val(response[0].username);
                    $(".username").text(response[0].username);
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
                    $(".profile-picture img").attr("src", response[0].image_path);
                }
            },
            error: function(error){
                console.error(error);
            }
        });
    }
    refreshProfileInfo();

    $("input[name='image']").change(function(){
        let imageFile = $("input[name='image']")[0].files[0]; // Get the first file (if multiple files are allowed)
        // Display image preview
        let reader = new FileReader();
        reader.onload = function(e) {
            $('.image').attr('src', e.target.result);
            $('.image').show();
        }
        reader.readAsDataURL(imageFile);
    });

    $(".btn-edit").click(function(e){
        e.preventDefault();

        let disabledInput = document.querySelectorAll("input");
        let disabledSelect = document.querySelectorAll("select");
        $(disabledInput).css("border", "1px solid #5cb85c");
        $(disabledSelect).css("border", "1px solid #5cb85c");
        $(disabledInput).prop("disabled", false);
        $(disabledSelect).prop("disabled", false);

        $(".btn-edit").prop("disabled", false);
        $(".btn-account-save").prop("disabled", false);
    });
    $("#btn-save-account").click(function(e){
        let formData = new FormData();

        let id = localStorage.getItem("userId");
        let username = $("input[name='username']").val();
        let surname = $("input[name='surname']").val();
        let firstname = $("input[name='firstname']").val();
        let email = $("input[name='email']").val();
        let phonenumber = $("input[name='phonenumber']").val();
        let birthdate = $("input[name='birthdate']").val();
        let civilStatus = $("select[name='civil_status']").val();
        
        formData.append("id", id);
        formData.append("username", username);
        formData.append("surname", surname);
        formData.append("firstname", firstname);
        formData.append("email", email);
        formData.append("phonenumber", phonenumber);
        formData.append("birthdate", birthdate);
        formData.append("civil_status", civilStatus);

        let imageFile = $(".image").attr('src');
        if(imageFile === "/images/default_profile.jpg"){
            formData.append("image", imageFile);
        }
        else{
            imageFile = $("input[name='image']")[0].files[0];
            formData.append("image", imageFile);
        }
        
        $.ajax({
            url: "/update_user_by_id",
            type: "POST",
            data: formData,
            processData: false, // Prevent jQuery from automatically processing data
            contentType: false, // Set content type to false for FormData
            success: function(response){
                console.log(response);
                $(".profile-picture-container").attr("src", response);
            },
            error: function(error){
                console.error(error);
            }
        });

        // location.reload();

        let enabledInput = $(".account-container").find("input");
        let enabledSelect = $(".account-container").find("select");        
        $(enabledInput).prop("disabled", true);
        $(enabledSelect).prop("disabled", true);

        $(enabledInput).css("border", "1px solid #898989");
        $(enabledSelect).css("border", "1px solid #898989");
    
        $(".btn-edit").prop("disabled", false);
        $(".btn-account-save").prop("disabled", false);
    });

    let closeGray = "/images/close_gray.svg";
    let closeWhite = "/images/close_white.svg";
    $(".close_icon").hover(
        function(){
            $(this).attr('src', closeWhite);
        },
        function(){
            $(this).attr('src', closeGray);
        }
    );

    $(".close_icon").click(function(e){
        e.preventDefault();
        $(".image").attr('src', '/images/default_profile.jpg');
        
    });

});