<?php
if(!empty($_POST)){
	$catid=$_POST["catid"];
	$con=DBOneforIf("page","catid=".$catid);
	
	if($con){
		$re=DBUpdate("page",$_POST,"catid=".$catid);
	}
	else{
		$re=DBAdd("page",$_POST);
	}
	if($re){
		echo "<script>alert('提交成功');location.href='index.php?mod=Admin&fun=Page&act=index';</script>";
	}
	else{
		echo "<script>alert('提交失败');history.go(-1);</script>";
	}
	exit;
}
$id=8;
if(!empty($_GET["id"])){
	$id=intval($_GET["id"]);
}

$vo=DBOneforIf("Page","catid=".$id);

$catlist=DBSelectforIf("category","cattype='Page' and pid<>0","id");

?>