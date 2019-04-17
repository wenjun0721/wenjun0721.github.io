<?php

	header('Content-type:text/html;charset=utf-8');
	//加载数据库信息
	include("Lib/function.php");
	//默认的设置
	$mod=!empty($_GET["mod"])?$_GET["mod"]:'Home';  //定义前后台的内容,默认前台
	$fun=!empty($_GET["fun"])?$_GET["fun"]:'Index';  //定义功能模块,默认是此功能的首页
	$act=!empty($_GET["act"])?$_GET["act"]:'index';  //定义增删改查,行为,默认列表
	
	if($mod=="Admin"){
		if($fun=="Login"){
			include("PHP/Admin/".$fun."_".$act.".php");
			include("Html/Admin/".$fun."_".$act.".html");
		}
		else{
			include("PHP/Admin/common.php");
			//判断是否登录
			if(empty($_SESSION["AdminUser"])){
				echo "<script>alert('请先登录');location.href='index.php?mod=Admin&fun=Login&act=index';</script>";
				exit;
			}
			
			include("PHP/Admin/".$fun."_".$act.".php");
			include("Html/Admin/header.html");
			include("Html/Admin/".$fun."_".$act.".html");
			include("Html/Admin/footer.html");
		}
	}
	else{
		include("PHP/".$fun."_".$act.".php");
		include("Html/".$fun."_".$act.".html");
	}
	
?>