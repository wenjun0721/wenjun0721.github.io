$(function(){
	$('.next').click(function(){
		var $a = $('.product_on').index();
		if($a == $('.pro_details_pic ul li').length-1){
			$a = 0;
		}else{
			$a++;
		}
		$('.pro_details_pic ul li').removeClass('product_on');
		$('.pro_details_pic ul li').eq($a).addClass('product_on');
	})
	$('.prev').click(function(){
		var $a = $('.product_on').index();
		if($a == 0){
			$a = $('.pro_details_pic ul li').length-1;
		}else{
			$a--;
		}
		$('.pro_details_pic ul li').removeClass('product_on');
		$('.pro_details_pic ul li').eq($a).addClass('product_on');
	})
	$('.pro_details_pic ol li').mouseover(function(){
		$a=$(this).index();
		$('.pro_details_pic ul li').removeClass('product_on');
		$('.pro_details_pic ul li').eq($a).addClass('product_on');
	})
})
