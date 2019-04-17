<?php
if(!empty($_POST)){
	if($_POST["password"]!=$_POST["repassword"]){
		echo "<script>alert('两次密码不相同');history.go(-1);</script>";
		exit;
	}
	unset($_POST["repassword"]);
	$_POST["password"]=md5($_POST["password"]);
	$_POST["addtime"]=time();
	$_POST["groupid"]=1;
	
	$re=DBAdd("Admin",$_POST);
	if($re){
		echo "<script>alert('添加成功');location.href='index.php?mod=Admin&fun=Admin&act=index';</script>";
		exit;
	}
	else{
		echo "<script>alert('添加失败');history.go(-1);</script>";
		exit;
	}
}

$con=DBSelect("site");
?>