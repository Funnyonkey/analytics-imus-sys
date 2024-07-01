$(document).ready(function() {
    let isAdmin = localStorage.getItem('isAdmin');

    // Function to check account status and redirect accordingly
    let checkAccount = () => {
        // console.log("checkAccount called, isAdmin:", isAdmin);

        if(isAdmin === '1'){
            console.log("Redirecting to /dashboard");
            // window.location.href = "/dashboard";

            return true;
        } 
        else if(isAdmin === '0'){
            console.log("Redirecting to /");
            // window.location.href = "/";
            return true;
        }
        else if(isAdmin === null){
            console.log("Redirecting to /");
            // window.location.href = "/";
            // loop += 1
            return false;
        }
    };
    
    // Perform account check once when the document is ready
    checkAccount();
    
    // Event handler for the .apply-now button click
    $(".peso-link").click(function() {
        window.location.href = "/peso";
    });
    $(".about-link").click(function() {
        window.location.href = "/about";
    });
    $(".apply-now").click(function(e) {
        localStorage.setItem("currentPage", "form")
        e.preventDefault();
        let result = checkAccount();
        if (isAdmin === null) {
            $("#navLoginBtn").trigger('click');
        }
        if(result === true){
            window.location.href = "/apply";
        }
    });
    
});
