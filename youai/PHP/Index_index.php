<?php
//网站基本信息
$site=DBSelect("site");
$siteconfig=array();
foreach($site as $sk=>$sr){
	$siteconfig[$sr["name"]]=$sr["valstr"];
}


$nav=DBSelectforIf("category","pid=0");
foreach($nav as $nnk=>$nnr){
	$re=DBOneforID("module",$nnr["mid"]);
	$nav[$nnk]["menname"]=$re["enname"];
}

//新闻列表
$indexnews=DBSelectLimit("news","3");









?>