<?php
//��վ������Ϣ
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

//�����б�
$indexnews=DBSelectLimit("news","3");









?>