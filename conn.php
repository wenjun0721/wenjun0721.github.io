<?php
//开启session使用权限
session_start();
	
$conn=new mysqli("127.0.0.1","root","root","lm");
mysqli_query($conn,"set names utf8");
	
function DBQuery($sql){
	global $conn;
	$result=mysqli_query($conn,$sql);
	//转换成数组结果
	$re=mysqli_fetch_assoc($result);
	$arr=array();
	while($re=mysqli_fetch_assoc($result)){
		$arr[]=$re;
	}
	return $arr;
}
?>