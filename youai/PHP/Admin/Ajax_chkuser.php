<?php
$username=$_POST["username"];
$re=DBOneforIf("admin","username='".$username."'");
if($re){
	echo 1;
}
else{
	echo 0;
}
exit;
?>