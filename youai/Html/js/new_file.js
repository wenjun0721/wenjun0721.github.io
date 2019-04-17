(function($){
	
	var defaults = {//默认值
		'autoplay':'true',
		'delaytime':'1000'
	}
	
	
	$.fn.extend({
		'banner':function(options){
		var x = $.extend(defaults, options);
		var ul = $(this).find('ul');
		var ol = $(this).find('ol');
		
		//1,复制第一张放在最后一张后面
		var first = ul.find('li:first').clone();
		ul.find('li:last').after(first);
		
		//2,设置ul的宽度；
		var liw = ul.find('li').width();
		var num = ul.find('li').length;
		var ulw = liw*num;
		ul.css('width',ulw);
		
		//3,设置ol中li的数量；不知道为什么不行；
//		for(j=0;j=num-2;j++){
//			$('<li></li>').appendTo(ol);
//		}
		//3，鼠标在轮播点时，图片相应的移动；
		ol.find('li').mouseover(function(){
			
				ol.find('li').removeAttr('class');
				$(this).attr('class','on');
				i = $(this).index();
				ul.animate({'left':-liw*i});
			
		})
		//4,自动轮播
		var i =0;
		if(x.autoplay=='true'){
		var time = setInterval(change,x.delaytime);
		function change(){
			if(i == num-1){
				ul.css('left',0);
				i=1;
			}else{
				i++;
			}
			ul.animate({'left':-liw*i});
			if(i==num-1){
				ol.find('li').removeAttr('class');
				ol.find('li').eq(0).attr('class','on');
			}else{
				ol.find('li').removeAttr('class');
				ol.find('li').eq(i).attr('class','on');
			}
		}
		}
		//5，鼠标hover事件
		$(this).hover(function(){
		clearInterval(time)
		},function(){
		time = setInterval(change,x.delaytime)
		})
			
		
		}
	})
	
	
	var defaults1 = {//默认值
		'scolling':1,
		'aotuplay':'true'
	}
	
	
	$.fn.extend({
		'pro':function(options1){
		var x = $.extend(defaults1, options1);
		var ul = $(this).find('ul');
		
		var liw1 = ul.find('li').width();
		var num = ul.find('li').length;
		var margin= ul.find('li:last').css('margin-left');
		var m_w=Number(margin.substring(0,margin.length-2));
		//li的宽度
		var liw = (liw1+m_w)
		//ul的宽度
		var ulw = liw*num-m_w;
		
		ul.css('width',ulw);
		
		//1,把最后一张放在第一张的前面；
		var i =x.scolling;
		for(q=1;q<=i;q++){
			ul.find('li:first').before(ul.find('li:last'));
		}
		ul.css('margin-left',-liw*i)

		$(this).find('.next').click(function(){
			if(!ul.is(':animated')){
			ul.animate({'left':-liw*i},function(){
				for(q=1;q<=i;q++){
					ul.find('li:last').after(ul.find('li:first'));
					}
				ul.css('left','0')
			})
			}
			
		});
		$(this).find('.prev').click(function(){
			if(!ul.is(':animated')){
			ul.animate({'left':liw*i},function(){
				for(q=1;q<=i;q++){
					ul.find('li:first').before(ul.find('li:last'));
					}
				ul.css('left','0')
			})
			}
			
		});
		
		if(x.aotuplay=='true'){
			var time =setInterval(change,1000)
			function change(){
				$('.next').trigger('click')
			}
		}
		
	
		
		
		
		
		
		
		
		
		}
	})
	
})(jQuery)


