<?php
if(!empty($_POST)){
	if(!empty($_POST["password"])){
		$_POST["password"]=md5($_POST["password"]);
	}
	else{
		$_POST["password"]=$_POST["oldpwd"];
	}
	unset($_POST["oldpwd"]);
	
	$re=DBUpdate("admin",$_POST,"id=".$_POST["id"]);
	if($re){
		echo "<script>alert('修改成功');location.href='index.php?mod=Admin&fun=Admin&act=index';</script>";
	}
	else{
		echo "<script>alert('修改失败');history.go(-1);</script>";
	}
	exit;
}


$id=intval($_GET["id"]);
$vo=DBOneforID("admin",$id);

?>