$(document).ready(function(){
    
    let idUser = localStorage.getItem("userId");
    let isAdmin = localStorage.getItem("isAdmin");

    let setTime = (response) => {
        for(let i = 0; i < response.length; i++){
            const givenDate = new Date(response[i].created_at);
            const now = new Date();
            const diffInMilliseconds = now - givenDate;

            const seconds = Math.floor(diffInMilliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);

            let timeAgo;
            if(weeks > 0){
                timeAgo = weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
            } 
            else if(days > 0){
                timeAgo = days === 1 ? "1 day ago" : `${days} days ago`;
            }
            else if (hours > 0){
                timeAgo = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
            }
            else if (minutes > 0){
                timeAgo = minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
            }
            else{
                timeAgo = seconds <= 10 ? "just now" : `${seconds} seconds ago`;
            }

            let div = document.createElement("div");
            div.className = "p-2 border div-notif";
            // div.className = "p-2 border"
            div.textContent = response[i].description;
            let span = document.createElement('span');
            span.textContent = timeAgo;
            span.className = "d-block";
            div.append(span);
            $(".notification-container").append(div);
        }
    }

    let getNotification = () => {
        if(isAdmin == 0){
            $.ajax({
                url: "/notification/"+idUser,
                type: "GET",
                success: function(response){
                    $(".div-notif").remove();
                    if(response.length !== 0){
                        setTime(response);
                    }
                },
                error: function(error){
                    console.log(error);
                }
            })
        }
    }
    getNotification();
    
    let notificationTimeout; // Variable to store the timeout ID
    let showNotif = false;
    $("#notifLogo").click(function(){
        if(!showNotif){
            getNotification();
            $(".notification-container").css("display", "block");
            showNotif = true;
            $(".account-info-container").css("display", "none");
        }
        else if(showNotif){
            $(".notification-container").css("display", "none");
            showNotif = false;
        }
    });

    let notifWhite = "/images/notification.svg"; 
    let viewRed = "/images/notification_green.svg";
    $("#notifLogo img").hover(
        function(){
            $(this).attr("src", viewRed);
        },
        function(){
            $(this).attr("src", notifWhite);
        }
    );

    function hideNotification() {
        notificationTimeout = setTimeout(function() {
            $(".notification-container").fadeOut(); // You can use fadeOut() for a smoother hide effect
            showNotif = false;
        }, 5000);
    }

    $(".notification-container").hover(
        function() {
            clearTimeout(notificationTimeout); // Cancel timeout if hovering
        },
        function() {
            hideNotification(); // Restart timeout when not hovering
        }
    );

    $('#notifLogo').click(function(event) {
        $('.notification-container').toggle();
        event.stopPropagation();
    });
    hideNotification();

    $(document).click(function(event) {
        if (!$(event.target).closest('.notification-container').length && 
            !$(event.target).closest('#notifLogo').length) {
            $('.notification-container').hide();
        }
    });
    
})