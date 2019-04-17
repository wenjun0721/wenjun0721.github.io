<?php
if(!empty($_POST)){
	$re=DBUpdate("news",$_POST,"id=".$_POST["id"]);
	if($re){
		echo "<script>alert('修改成功');location.href='index.php?mod=Admin&fun=News&act=index';</script>";
	}
	else{
		echo "<script>alert('修改失败');history.go(-1);</script>";
	}
	exit;
}


$id=intval($_GET["id"]);
$vo=DBOneforID("news",$id);

$catlist=DBSelectforIf("category","cattype='News' and pid<>0","id");

?>