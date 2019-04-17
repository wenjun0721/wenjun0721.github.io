window.onload=function(){
$(function(){
	//图片轮播
		$('#banner li').eq(0).attr({
			zhi: '0'
		});
		for (var i =0; i<4; i++) {
			$('#an a').eq(i).attr({
				a1: i
			});
			
		}
	function run(){
		var img=$('#banner li');
		var li=$('#an a');
		var c=Number($('#showa').attr('zhi'));
		c++
		if(c>3){
			c=0;
		}
		$('#banner li').eq(c).attr({
			zhi: c
		});
		img.removeAttr('id');
		li.removeAttr('id');
		img.eq(c).attr('id','showa');
		li.eq(c).attr('id','anniugl');
	    }
	var imgrun=setInterval(run,2000);
	
	$('#an a').mouseover(function(){
		
		clearInterval(imgrun);
		$('#banner li').removeAttr('id');
		$('#an a').removeAttr('id');
		$(this).attr('id','anniugl');
		var a=Number($(this).attr('a1'));
		$('#banner li').eq(a).attr('id','showa');
		});
		
	$('#an li').mouseout(function(){
			imgrun=setInterval(run,2000)	
			});
	$('#banner li').mouseover(function(){
		clearInterval(imgrun);
		});	
	$('#banner li').mouseout(function(){
		imgrun=setInterval(run,2000)
		});

	//关于我们轮播
	for (var t=0; t <3; t++) {
		$('#nihao a').eq(t).attr({
				bakc: t
			});
	}
	for (var j=0; j <3; j++) {
		$('#bn li').eq(j).attr({
				a2: j
		});
	}
	for (var j=0; j <3; j++) {
		$('#abt_title li').eq(j).attr({
				a3: j
		});
	}
	var aboutimg=setInterval(abot,5000);
	function abot(){
		var autimg=$('#nihao a');
		var li=$('#bn li');
		var lia=$('#abt_title li');
		var n=Number($('#showb').attr('bakc'));
		var nahtml=$('#showb').eq(n).html();
		
		n++;
		if(n>2){
			n=0
			}
		
		$('#nihao').fadeOut(10,function(){

			nahtml
			autimg.removeAttr('id');
			li.removeAttr('id');
			lia.removeAttr('id');
			autimg.eq(n).attr('id','showb');
			li.eq(n).attr('id','showb_ho');
			lia.eq(n).attr('id','gaolin');
			$('#nihao').fadeIn(3000,function(){
				$('#showb').eq(n).html();
			});
		});
	   }
	
	$('#bn li').mouseover(function(){
		
		clearInterval(aboutimg);
		$('#nihao a').removeAttr('id');
		$('#bn li').removeAttr('id');
		$('#abt_title li').removeAttr('id');
		$(this).attr('id','showb_ho');
		var a=Number($(this).attr('a2'));
		var nahtml=$('#showb').eq(a).html();
		$('#nihao a').eq(a).attr('id','showb');
		$('#abt_title li').eq(a).attr('id','gaolin');
		$('#nihao').fadeOut(10,function(){
			nahtml
			$('#nihao').fadeIn(3000,function(){
				$('#showb').eq(a).html();
			});
		});
	});
	$('#abt_title li').mouseover(function(){
		
		clearInterval(aboutimg);
		$('#nihao a').removeAttr('id');
		$('#bn li').removeAttr('id');
		$('#abt_title li').removeAttr('id');
		$(this).attr('id','gaolin');
		var a=Number($(this).attr('a3'));
		var nahtml=$('#showb').eq(a).html();
		$('#nihao a').eq(a).attr('id','showb');
		$('#bn li').eq(a).attr('id','showb_ho');
		$('#nihao').fadeOut(10,function(){
			nahtml
			$('#nihao').fadeIn(3000,function(){
				$('#showb').eq(a).html();
			});
		});
	});
		
	$('#bn li').mouseout(function(){
			aboutimg=setInterval(abot,5000)	
			});
	$('#about a').mouseover(function(){
		clearInterval(aboutimg);
		});	
	$('#about a').mouseout(function(){
		aboutimg=setInterval(abot,5000)
		});

	//成功案例滑动
	var ckli_l,ckli_r,div1;
	var huadtime=setInterval(xxmding,2000);
	function xxmding(){
		regionhtml=$('#casehd li:first').html();
		$('#casehd li:first').remove();
        $('#casehd').append('<li>'+regionhtml+'</li>');   
        };

	$('#casehd').mouseover(function(){
		clearInterval(huadtime);
		});
	$('.ckli_l').mouseover(function(){
		clearInterval(huadtime);
		});
	$('.ckli_r').mouseover(function(){
		clearInterval(huadtime);
		});
	$('.ckli_l').click(function(){
		regionhtml=$('#casehd li:first').html();
		$('#casehd li:first').remove();
        $('#casehd').append('<li>'+regionhtml+'</li>');   
        });
	$('.ckli_r').click(function(){
		regionhtml=$('#casehd li:last').html();
		$('#casehd li:last').remove();
		div1=$('#casehd li:first')
		$('<li>'+regionhtml+'</li>').insertBefore(div1);
		
		});


	
	
	
	
	
	


	
//产品jquery
	var pro=$('#product li'),prohtml;
	for(var k=0;k<=6;k++){
		pro.eq(k).attr({
				id:'pro_block'
			});
	} 
//给li加class
var i="";
	for (var i = 0; i<=7; i++) {
			var k="li_a"+i
			pro.eq(i).attr({
				"class": k,
			});
		
	}
//左边按钮点击效果	
	$('.aackli_l').click(function(){
		$li_a0=1;$li_a1=1;$li_a2=1;$li_a3=1;$li_a4=1;$li_a5=1;$li_a6=1;$li_a7=1;
		
		
		if($li_a6){$(".li_a6").attr("class","li_a7");$li_a6=0;}
		if($li_a5){$(".li_a5").attr("class","li_a6");$li_a5=0;}
		if($li_a4){$(".li_a4").attr("class","li_a5");$li_a4=0;}
		if($li_a3){$(".li_a3").attr("class","li_a4");$li_a3=0;}
		if($li_a2){$(".li_a2").attr("class","li_a3");$li_a2=0;}
		if($li_a1){$(".li_a1").attr("class","li_a2");$li_a1=0;}
		if($li_a0){$(".li_a0").attr("class","li_a1");$li_a0=0;}
		if($li_a7){$(".li_a7").attr("class","li_a0");$li_a7=0;}
		
		
			$(".li_a3 img").fadeOut("10");
			
			$(".li_a3 img").fadeIn("2000");
			
		
	});

		
		
		

//右边按钮点击效果
	$('.aackli_r').click(function(){
		$li_a0=1;$li_a1=1;$li_a2=1;$li_a3=1;$li_a4=1;$li_a5=1;$li_a6=1;$li_a7=1;
		if($li_a0){$(".li_a0").attr("class","li_a7");$li_a0=0;}
		if($li_a1){$(".li_a1").attr("class","li_a0");$li_a1=0;}
		if($li_a2){$(".li_a2").attr("class","li_a1");$li_a2=0;}
		if($li_a3){$(".li_a3").attr("class","li_a2");$li_a3=0;}
		if($li_a4){$(".li_a4").attr("class","li_a3");$li_a4=0;}
		if($li_a5){$(".li_a5").attr("class","li_a4");$li_a5=0;}
		if($li_a6){$(".li_a6").attr("class","li_a5");$li_a6=0;}
		if($li_a7){$(".li_a7").attr("class","li_a6");$li_a7=0;}
		
		$(".li_a3 img").fadeOut("10");
		$(".li_a3 img").fadeIn("2000");
	});
});
 }