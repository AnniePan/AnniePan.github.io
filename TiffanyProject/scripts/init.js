$(document).ready(function(){
    initCarousel();
    mouseEvent();
    mobileEvent();
});

function initCarousel(){
    $('.necessaryRow').owlCarousel({
        responsiveClass:true,
        responsive:{
            320:{
                items: 2,
                nav: false,
                dots: false,
                margin: 10
            },
            768:{
                items: 3,
                nav: true,
                dots: false,
                margin: 10
            },
            1000:{
                items: 4,
                nav: true,
                dots: true,
                margin: 20
            }
        }
    });

    $('.newsRow').owlCarousel({
        responsiveClass:true,
        responsive:{
            320:{
                items: 1,
                nav: false,
                dots: true,
                margin: 10
            }
        }
    });
}

function mouseEvent(){ 
    document.getElementById("necessaryArea").addEventListener('mousemove', down);
    function down(e) {
        isShowNavPrevBtn();
    }
}

function mobileEvent(){ 
    var startx, starty;

    $('.button-toggle').click(function(e){
        e.preventDefault();
        $('.menu2func').toggleClass('active');
    });

    //獲得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
    
    //根據起點終點返回方向 1向上滑動 2向下滑動 3向左滑動 4向右滑動 0點選事件
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
    
        //如果滑動距離太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
    
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
        return result;
    }

    //手指接觸螢幕
    document.getElementById("necessaryArea").addEventListener("touchstart", function(e){
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    
    //手指離開螢幕
    document.getElementById("necessaryArea").addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        if(direction === 3 || direction === 4){
            setTimeout(function(){ isShowNavPrevBtn(); }, 300);
        }
    })
}

function isShowNavPrevBtn() {
    var result = $("#necessaryArea .owl-stage .owl-item:first-child").hasClass("active");
    if(!result){
        $("#necessaryArea .owl-prev").show();
    }else{
        $("#necessaryArea .owl-prev").hide();
    }
}