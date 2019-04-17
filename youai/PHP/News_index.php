<?php
//分类信息
$catlist=DBSelectforIf("category","pid<>0 and mid=1");


//列表
$wherestr="1=1";
if(!empty($_GET["cid"])){
	$wherestr.=" and catid=".$_GET["cid"];
}

$list=DBSelectLimit("news","10","id desc",$wherestr);



?>