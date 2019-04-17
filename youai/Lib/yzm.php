<?php
//定义输出文档格式
header('Content-type:image/jpeg');
//开记SESSION会话
session_start();
//设置显示图片的宽度
$width=130;
//设置显示图片的高度
$height=34;
//设置验证字符长度
$wordnum=2;
//验证码的取值范围
$element=array('1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z');
$string='';
for ($i=0;$i<$wordnum;$i++){
	$string.=$element[rand(0,count($element)-1)];
}
$_SESSION["YZMcode"]=$string;


//创建一个指定宽高的画布
$img=imagecreatetruecolor($width, $height); 
//设定可以在画布中使用的颜色(RGB)
$colorBg=imagecolorallocate($img,rand(200,255),rand(200,255),rand(200,255));  //定义颜色
$colorBorder=imagecolorallocate($img,rand(200,255),rand(200,255),rand(200,255));  //定义颜色
$colorString=imagecolorallocate($img,rand(10,100),rand(10,100),rand(10,100));  //定义颜色

imagefill($img,0,0,$colorBg); //填充背景颜色

//描边
imagerectangle($img,0,0,$width-1,$height-1,$colorBorder);

//干扰点
for($i=0;$i<100;$i++){
	imagesetpixel($img,rand(0,$width-1),rand(0,$height-1),imagecolorallocate($img,rand(100,200),rand(100,200),rand(100,200)));
}
//干扰线
for($i=0;$i<3;$i++){
	imageline($img,rand(0,$width/2),rand(0,$height),rand($width/2,$width),rand(0,$height),imagecolorallocate($img,rand(100,200),rand(100,200),rand(100,200)));
}
//imagestring($img,5,0,0,'abcd',$colorString);
//添加随机字符串
imagettftext($img,14,rand(-5,5),rand(55,70),rand(14,23),$colorString,'arial.ttf',$string);
//生成并显示图片
imagejpeg($img);
//摧毁
imagedestroy($img);

