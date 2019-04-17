<?php
$id=intval($_GET["id"]);
$re=DBDelete("admin",$id);
if($re){
		echo "<script>alert('删除成功');location.href='index.php?mod=Admin&fun=Admin&act=index';</script>";
	}
	else{
		echo "<script>alert('删除失败');history.go(-1);</script>";
	}
	exit;
?>