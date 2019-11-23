let vm_header = new Vue({
    el: '#header',
    data: {
        nav0: true,
        nav1: false,
        nav2: false
    },
    methods: {
        mouseenterli(e) {
            this.nav0 = false;
            this.nav1 = false;
            this.nav2 = false;
            this['nav' + e.target.id.match(/\d+/)[0]] = true;
        },
        mouseleaveli(e) {
            this.nav0 = true;
            this.nav1 = false;
            this.nav2 = false;
        }
    }
});

$(document).ready(function(){
	let $wrapper = $(".guoman-wrapper");
	let $guomanList = $("#guoman-list");
	let $body = $("body");
	let $recommendCard = $(".guoman-wrapper .recommend-list li");
	let $recommendCardImg = $(".guoman-wrapper .recommend-list li img");
	let $describe = $(".guoman-wrapper .describe");
	//国漫列表 点击事件
	$guomanList.click(function(){
		$wrapper.toggleClass("on");
		$body.toggleClass("bg-blur");
	});
	//为"推荐"模块添加hover
	for(let i=0; i<$recommendCard.length; i++){
		$recommendCard.eq(i).hover(function(){
			$recommendCardImg.eq(i).toggleClass("blurify");
			$describe.eq(i).css("opacity",1);
		},function(){
			$recommendCardImg.eq(i).toggleClass("blurify");
			$describe.eq(i).css("opacity",0);
		});
	}
	
	//为"全部"模块添加hover
	let $allCard = $(".guoman-wrapper .all-list li");
	let $allCardImg = $(".guoman-wrapper .all-list li img");
	for(let i=0; i<$allCard.length; i++){
		$allCard.eq(i).hover(function(){
			$allCardImg.eq(i).toggleClass("blurify");
			$describe.eq(i+$recommendCard.length).css("opacity",1);
		},function(){
			$allCardImg.eq(i).toggleClass("blurify");
			$describe.eq(i+$recommendCard.length).css("opacity",0);
		});
	}
	
	let $allList = $(".all-list");
	$allList.width( 3.09*($allCard.length) + "rem" );
	
	let allListInt
	$('.all-list').hover(function(e) {  
	     var positionX=e.pageX-$(this).offset().left; //获取当前鼠标相对img的X坐标  
	     // var positionY=e.pageY-$(this).offset().top; //获取当前鼠标相对img的Y坐标  
	     // console.log(positionX+'   '+positionY);  
		 if(positionX > 700){
			 allListLeft = $(".all-list").offset().left;
			 allListInt =  setInterval(function(){
				$(".all-list").css("left", allListLeft-150+"px");
				console.log(allListLeft);
			 },500);
		 }
	 },function(){
		 clearInterval(allListInt);
	 });

});

