<?php
if(!empty($_POST)){
	if($_POST["pid"]==0){
		$_POST["level"]=1;
	}
	else{
		$cat=DBOneforID("Category",$_POST["pid"]);
		$_POST["level"]=$cat["level"]+1;
	}

	$re=DBAdd("Category",$_POST);
	if($re){
		echo "<script>alert('添加成功');location.href='index.php?mod=Admin&fun=Category&act=index';</script>";
		exit;
	}
	else{
		echo "<script>alert('添加失败');history.go(-1);</script>";
		exit;
	}
}

$catlist=DBSelectforIf("category","pid=0","id");
?>