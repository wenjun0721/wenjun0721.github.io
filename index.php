<?php
header('Content-type:text/html;charset=utf-8');
include("conn.php");
//http://localhost:8800/youai/index.php?fun=news&mod=index&act=index
$mod=!empty($_GET["mod"])?$_GET["mod"]:"Home"; //设定前后台
$fun=!empty($_GET["fun"])?$_GET["fun"]:"Index"; //设定功能
$act=!empty($_GET["act"])?$_GET["act"]:"index"; //设定行为

if($mod=="Admin"){
	include("php/Admin/".$fun."_".$act.".php");
	
	if($fun=="Login"){
		include("html/Admin/".$fun."_".$act.".html");
	}
	else{
		include("html/Admin/header.html");
		include("html/Admin/".$fun."_".$act.".html");
		include("html/Admin/footer.html");
	}
}
else{
	include("php/Home/".$fun."_".$act.".php");
	// include("html/header.html");
	include("html/".$fun."_".$act.".html");
	// include("html/footer.html");
}


	

//http://localhost:8800/youai/
//http://localhost:8800/youai/index.php?mod=Home&fun=Index&act=index

//http://localhost:8800/youai/index.php?fun=News&act=index

//php/admin/news/add.php
//php/index/news/index.php
//php/index/news/view.php
//html/news/index.html

/*
php/News_index.php
html/header.html
html/News_index.html
html/footer.html

*/


?>