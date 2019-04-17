(function($){
	
	//---------banner轮播-------------------
	$.fn.extend({
		bannerRun:function(){
			var i=0;
			var timer=null;
			var cur_option;
			for (var j=0; j < $(".img_list li").length; j++){
				$(".index_list").append("<li></li>");
			}
			$(".index_list li").first().addClass("current_index");
			var firstimg=$(".img_list li").first().clone();
			$(".img_list").append(firstimg).width($(".img_list li").length*($(".img_list li").width()));
			
		    /*---------------------函数区-------------------------------*/
			//图片自动运行
			function ImgRun(){
				i++;
				            if(i==$(".img_list li").length){
								i=1;
								$(".img_list").css({left:0});
							};
							$(".img_list").stop().animate({left:-i*1920},300);
							if(i==$(".img_list li").length-1){
								$(".index_list li").eq(0).addClass("current_index").siblings().removeClass("current_index");
							}else{
								$(".index_list li").eq(i).addClass("current_index").siblings().removeClass("current_index");
							}
			}
			//下一幅图
			
			//图片选择	
			function ChoiceImg(){
				i=cur_option;
				$(".img_list").stop().animate({left:-cur_option*1920},150);
				$(".index_list li").eq(cur_option).addClass("current_index").siblings().removeClass("current_index");
				$(".info_list li").eq(cur_option).addClass("current_info").siblings().removeClass("current_info");
			};
			
			/*---------------------运行区-------------------------------*/
		    
			timer=setInterval(function(){	
					ImgRun();
			},2500);
			
			$(".index_list li").hover(
				function(){
					clearInterval(timer);
					cur_option=$(this).index();
					//alert(cur_option);
					ChoiceImg();
				},
				function(){
					timer=setInterval(function(){
						ImgRun();
					},2500);
				}
			);
			
			$(".prev").hover(
				function(){
					clearInterval(timer);
				},
				function(){
					timer=setInterval(function(){
						ImgRun();
					},2500);
				}
			);
			
			$(".next").hover(
				function(){
					clearInterval(timer);
				},
				function(){
					timer=setInterval(function(){
						ImgRun();
					},2500);
				}
			)	
		}
	})
	
	
	//---------产品轮播-------------------
	$.fn.extend({
		proShow:function(){
			var proRack=$('.pro_rack');
			var prev=$('#prev');
			var next=$('#next');
			var Imglen = $(".pro_rack li").length;
   			var ImgWid = $(".pro_rack li").width()+20;
			proRack.width(Imglen*ImgWid);
			proRack.css({left:-ImgWid})
			next.click(function(){
				proRack.css({left:-ImgWid*2})
				proRack.stop().animate({left:-ImgWid},500);
				$('.pro_rack li:first').before($('.pro_rack li:last'));
				
			})
			
			prev.click(function(){
				proRack.css({'left':'0'})
				proRack.stop().animate({left:-ImgWid},500);
				proRack.append($('.pro_rack li:first'));
				
			})
		}
	})
	
	
	//-------------选项卡---------------------
	$.fn.extend({
		detailShow:function(){
			var title = $(this).find('ul li');
			var content = $(this).find('ol li');
			title.mouseenter(function(){
				title.removeAttr('class','title_current')
				$(this).attr('class','title_current')
				content.removeAttr('class','message_current')
				content.eq($(this).index()).attr('class','message_current')
			})
			
		}
	})
	
	//---------------轮播展示------------------
	$.fn.extend({
		showProduct:function(Num){
			var curPic = $(this).find($('.pic_cur'));
			var proRack=$(this).find($('.pro_rack'))
			var imgList=$(this).find('ul');
			var prev=$(this).find($('#prev'));
			var next=$(this).find($('#next'));
			var imgLi = $(this).find('ul li')
			var ImgLen = imgLi.length;
   			var ImgWid = imgLi.width()+24;
			var cur=Math.ceil(Num/2)
			var no=cur
			var liContent=imgLi.eq(cur).html()
			imgLi.removeAttr('class','img_cur')
			imgLi.eq(cur).attr('class','img_cur')
			curPic.html(liContent)
			
			proRack.width(Num*ImgWid);
			imgList.width(ImgLen*ImgWid);
			imgList.css({left:-ImgWid})
//	--------------------------定义--------------------------	
//	--------------------------方法--------------------------	
			function shownext(start,end,time){
				imgList.css({left:-ImgWid*2})
				$('.pro_rack ul li:first').before($('.pro_rack ul li:last'));
				imgList.stop().animate({left:-ImgWid},time,function(){
						start++
						cur--
						if(cur<0){
							cur+=ImgLen
						}
						liContent=imgLi.eq(cur).html()
						imgLi.removeAttr('class','img_cur')
						imgLi.eq(cur).attr('class','img_cur')
						curPic.html(liContent)
					if(start<end){
						shownext(start,end,time);
					}
				});
			}
			
		
				
			function showprev(start,end,time){
				imgList.css({'left':'0'})
				imgList.append($('.pro_rack li:first'));
				imgList.stop().animate({left:-ImgWid},time,function(){
						start++
						cur++
						if(cur>=ImgLen){
							cur-=ImgLen
						}
						liContent=imgLi.eq(cur).html()
						imgLi.removeAttr('class','img_cur')
						imgLi.eq(cur).attr('class','img_cur')
						curPic.html(liContent)
					if(start<end){
						showprev(start,end,time);
					}
				});
			}
			
			
			
//	--------------------------方法--------------------------				
//	--------------------------执行--------------------------	
			
			prev.click(function(){
				showprev(0,3,100)
			})
			
			next.click(function(){
				shownext(0,3,100)
			})
			
			
			imgLi.hover(function(){
				$(this).addClass('img_cur').siblings().removeClass('img_cur');
			},function(){
				imgLi.eq(cur).addClass('img_cur').siblings().removeClass('img_cur');
			})
			
			imgLi.click(function(){
				picOn=$(this).index()
				if(picOn>no){
					n=picOn-no
					showprev(0,n,500)
				}else if(picOn<no){
					n=no-picOn
					shownext(0,n,500)
				}
			})
			
			
		
		}
	})
	
//----------------------------------------------------	
	//-------------占位符----------------
	$.fn.extend({
		TextPhd:function(){
			var name=$(this);
			var val=name.attr('value');
			if(name.val() == ""){
				name.val(val);
			}
			name.css('color','darkgray');
			name.focus(function(){
				name.css('color','black');
				if(name.val() == val){
					name.val('')
				}
			})
			name.blur(function(){
				if(name.val() == ""){
					name.css('color','darkgray');
					name.val(val);
				}
			})
		}
		
	})
	
	//---------新闻轮播-------------------
	$.fn.extend({
		run:function(){
			var List=$('.news_list');
			var prev=$('#prev');
			var next=$('#next');
			var Imglen = $(".news_list li").length;
   			var ImgWid = $(".news_list li").width()+100;
			List.width(Imglen*ImgWid);
			List.css({left:-ImgWid})
			next.click(function(){
				List.css({left:-ImgWid*2})
				List.stop().animate({left:-ImgWid},500);
				$('.news_list li:first').before($('.news_list li:last'));
				
			})
			
			prev.click(function(){
				List.css({'left':'0'})
				List.stop().animate({left:-ImgWid},500);
				List.append($('.news_list li:first'));
				
			})
		}
	})
	
	
	
})(jQuery)


