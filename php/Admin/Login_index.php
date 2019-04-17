<?php
if(!empty($_POST)){
	$usname=$_POST["username"]; //把提交的用户名内容赋值
	$pwd=$_POST["password"];	//表单的密码
	
	//根据用户名与密码去数据库判断是否存在
	$sql="select * from ya_admin where username='".$usname."' limit 1";
	$re=selectData($sql);
	
	if($re){ //如果有值,证明管理员表里面有此用户名
		if($re["password"]==$pwd){ //根据数据库查询获取的管理员数据判断表单密码是否相同
			header("location:index.php?mod=Admin");
		}
		else{
			echo "密码不正确!";
		}
	}
	else{ //没值
		echo "用户名不存在!";
	}
	exit;
}

?>