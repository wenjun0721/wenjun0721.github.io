<?php
if(!empty($_POST)){
	$_POST["rule"]=implode(",",$_POST["rulestr"]);
	unset($_POST["rulestr"]);
	$re=DBAdd("group",$_POST);
	if($re){
		echo "<script>alert('添加成功');location.href='index.php?mod=Admin&fun=Group&act=index';</script>";
		exit;
	}
	else{
		echo "<script>alert('添加失败');history.go(-1);</script>";
		exit;
	}
}
?>