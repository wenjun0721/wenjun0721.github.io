$(function(){
 //判断浏览器是否支持placeholder属性
  supportPlaceholder='placeholder'in document.createElement('textarea'),
 
  placeholder=function(textarea){
 
    var text = textarea.attr('placeholder'),
    defaultValue = textarea.defaultValue;
 
    if(!defaultValue){
 
      textarea.val(text).addClass("phcolor");
    }
 
    textarea.focus(function(){
 
      if(textarea.val() == text){
   
        $(this).val("");
      }
    });
 
  
    textarea.blur(function(){
 
      if(textarea.val() == ""){
       
        $(this).val(text).addClass("phcolor");
      }
    });
 
    //输入的字符不为灰色
    textarea.keydown(function(){
  
      $(this).removeClass("phcolor");
    });
  };
 
  //当浏览器不支持placeholder属性时，调用placeholder函数
  if(!supportPlaceholder){
 
    $('textarea').each(function(){
 
      text = $(this).attr("placeholder");
 
      
 
        placeholder($(this));

    });
  }
});