<?php
//������Ϣ
$catlist=DBSelectforIf("category","pid<>0 and mid=1");


$id=intval($_GET["id"]);
$re=DBOneforId("news",$id);



?>