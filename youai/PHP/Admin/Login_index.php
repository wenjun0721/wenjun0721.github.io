<?php
//不能重复登录
if(!empty($_SESSION["AdminUser"])){
	header("location:index.php?mod=Admin&fun=Index&act=index");
	exit;
}
			
if(!empty($_POST)){
	if($_SESSION["YZMcode"]!=$_POST["yzmcode"]){
		echo "<script>alert('验证码不正确');history.go(-1);</script>";
		exit;
	}
	
	$usname=$_POST["username"]; //获取传递的用户名信息
	$pwd=$_POST["password"];  //获取传递的密码信息
	//$yzm=$_POST["yzmcode"];  //获取传递的密码信息
	
	//判断是否存在数据库里面
	$isuser=DBOneforIf("admin","username='".$usname."'");
	if($isuser){
		if($isuser["password"]==md5($pwd)){
			$_SESSION["AdminUser"]=$isuser;
			$group=DBOneforID("group",$isuser["groupid"]);
			
			$_SESSION["AdminUser"]["rule"]=explode(",",$group["rule"]);
			$_SESSION["AdminUser"]["rule2"]=$group["rule"];
			
			if(!empty($_POST["isremember"])){
				setcookie("ADMINUSERNAME",$usname,time()+86400);
				setcookie("ADMINPASSWORD",$pwd,time()+86400);
			}
			else{
				setcookie("ADMINUSERNAME","",-1);
				setcookie("ADMINPASSWORD","",-1);
			}
			
			header("location:index.php?mod=Admin&fun=Index&act=index");
		}
		else{
			echo "<script>alert('用户名或密码不存在');history.go(-1);</script>";
		}
	}
	else{
		echo "<script>alert('用户名或密码不存在');history.go(-1);</script>";
	}
	exit;
}

$adminusername="";
$adminpassword="";
if(!empty($_COOKIE["ADMINUSERNAME"])){
	$adminusername=$_COOKIE["ADMINUSERNAME"];
	$adminpassword=$_COOKIE["ADMINPASSWORD"];
}
?>