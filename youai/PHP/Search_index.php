<?php
$catid=$_GET["catid"];

//�б�
$wherestr="1=1";
if(!empty($_POST["keyword"])){
	$wherestr.=" and title like '%".$_POST["keyword"]."%'";
}
if(!empty($_GET["cid"])){
	$wherestr.=" and catid=".$_GET["cid"];
}

//$list=DBSelectLimit("news","10","id desc",$wherestr);

$list=DBQuery("select ��ͬ�ֶ��� from ���ű� union all select ��ͬ�ֶ��� from ��Ʒ�� order by addtime");


file_put_contents(�ļ���,����)




?>