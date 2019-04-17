<?php
$catid=$_GET["catid"];

//列表
$wherestr="1=1";
if(!empty($_POST["keyword"])){
	$wherestr.=" and title like '%".$_POST["keyword"]."%'";
}
if(!empty($_GET["cid"])){
	$wherestr.=" and catid=".$_GET["cid"];
}

//$list=DBSelectLimit("news","10","id desc",$wherestr);

$list=DBQuery("select 相同字段名 from 新闻表 union all select 相同字段名 from 产品表 order by addtime");


file_put_contents(文件名,内容)




?>