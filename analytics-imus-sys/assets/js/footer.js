$(document).ready(function(){
   
    /*
    * Previous button
    */
    $(".btn-prev").off("click").on("click", function(e){
        e.preventDefault();
        
        $(`.page${currentPage}`).css("font-weight", "100"); 
        $(`#page${currentPage}`).css("display", "none");

        /* decrement the value of the current page */
        currentPage -= 1;
        $(".side-bar-links").find("a").css("font-weight", "100");
        $(".side-bar-links").find("a").css("background-color", "rgb(8, 72, 151)");

        $(`#page${currentPage}`).css("display", "block");
        /* bold the selected link or the current page label in the sidebar */
        $(`.page${currentPage}`).css({
            "font-weight": "bold",
            "background-color": "rgba(3, 138, 255, 0.1)"
        });
        console.log(finalInformation)
    });

    /*
    * Next button (also submits form)
    */
    let nextPage = () => {
        checkInputField($(`#page${currentPage}`))

        if(isEmptyField === false){
            $(`.page${currentPage}`).css("font-weight", "100"); 
            $(`#page${currentPage}`).css("display", "none")    
            /* increment the value of the current page */
            currentPage += 1;
            $(".side-bar-links").find("a").css("font-weight", "100");
            $(".side-bar-links").find("a").css("background-color", "rgb(8, 72, 151)");

            $(`#page${currentPage}`).css("display", "block");
            /* bold the selected link or the current page label in the sidebar */
            $(`.page${currentPage}`).css({
                "font-weight": "bold",
                "background-color": "rgba(3, 138, 255, 0.1)"
            });
        }
    }
    $(".btn-next").off("click").on("click", function(e){
        e.preventDefault();

        nextPage();
    });

    let isChecked = true;
    $(".certify-authorize").change(function() {
        let certifyAuthorize = document.querySelectorAll(".certify-authorize");
        for (let i = 0; i < certifyAuthorize.length; i++) {
            if (!certifyAuthorize[i].checked) {
                isChecked = false;
                break;
            }
            if (certifyAuthorize[i].checked) {
                isChecked = true;
            }
        }

        if(isChecked){
            $(".btn-submit").prop("disabled", false);
        }
        else{
            $(".btn-submit").prop("disabled", true);
        }
    });

    /*
    * Submit button
    * AJAX to information to the controller
    */
    $(".btn-submit").click(async function(e){
        e.preventDefault();
        
        if(isChecked){
            let certificateFiles = $("input[name='selected-certificate-file']")[0].files;
            let eligibilityLicenseFiles = $("input[name='selected-eligibility-license-file']")[0].files;
            // Create a FormData object to hold the files
            let certificateData = new FormData();
            let eligibilityLicenseData = new FormData();
            for(let i = 0; i < certificateFiles.length; i++){
                certificateData.append('selected-certificate-file[]', certificateFiles[i]);
            }
            // console.log(certificateData);
            for(let i = 0; i < eligibilityLicenseFiles.length; i++){
                eligibilityLicenseData.append('selected-eligibility-license-file[]', eligibilityLicenseFiles[i]);
            }
            // Send the data to the database

            if(certificateData){
                try{
                    await $.ajax({
                        url: "/uploadCertificate",
                        type: "POST",
                        data: certificateData,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            // console.log(finalInformation['certificateFile']);
                            // let retrieveCertificate = document.querySelectorAll(".certificate-file-wrapper");
                            // console.log($(retrieveCertificate));
                            // console.log("Response: ", response);

                            finalInformation['certificateFile'] = response;
                            
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('Error uploading files: ' + textStatus);
                        }
                    });
                }
                catch(error){
                    console.error(error);
                }
            }

            try{
                await $.ajax({
                    url: "/uploadEligibilityLicense",
                    type: "POST",
                    data: eligibilityLicenseData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        console.log(response);
                        finalInformation['eligibilityLicenseFile'] = response;
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('Error uploading files: ' + textStatus);
                    }
                });
            }
            catch(error){
                console.error(error);
            }

            $.ajax({
                url: "/addInformation",
                type: "POST",
                contentType : "application/json",
                data: JSON.stringify(finalInformation),
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.error(error);
                }
            });

            $("#btnSuccess").trigger('click');
        }
        else{
            let p = document.createElement('p');
            p.className = "alert alert-danger col-lg-5 col-md-5 col-sm-6 col-12 custom-message"
            p.style.color = 'red';
            p.style.margin = "0 auto";
            p.innerText = 'Please check all the boxes.';
            $("#message").append(p);
            $("#message").css({
                "display": "block",
                "position": "absolute",
                "top": "0",
                "z-index": "5"
            });
            
            setTimeout(function(){
                $(".custom-message").remove();
            }, 1000);
        }
    });
    $(".btn-exit").click(function(){
        window.location.href = "/dashboard"
    })
    // document.onkeydown = function (e) {
    //     if(e.keyCode === 13){
    //         nextPage();
    //     }
    // }   
});