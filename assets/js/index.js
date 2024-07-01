$(document).ready(function(){

    let isShow = 0;
    $(".navbar-toggler").click(function(){
        if(isShow === 0){
            $(".carousel-control-next").css("display", "none");
            $(".carousel-control-prev").css("display", "none");
            isShow = 1;
        }
        else{
            $(".carousel-control-next").css("display", "block");
            $(".carousel-control-prev").css("display", "block")           
            isShow = 0;
        }
    })

});