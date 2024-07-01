$(document).ready(function(){

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
            div.className = "p-2 border div-notif border";
            // div.className = "p-2 border"
            div.textContent = response[i].description;
            let span = document.createElement('span');
            span.textContent = timeAgo;
            span.className = "d-block";
            div.append(span);
            $(".notification-body").append(div);
        }
    }

    if(isAdmin == 1){
        $.ajax({
            url: "/all_notification/",
            type: "GET",
            success: function(response){
                console.log(response)
                $(".div-notif").remove();
                if(response.length !== 0){
                    console.log(response)
                    setTime(response);
                }
            },
            error: function(error){
                console.log(error);
            }
        })
    }
})