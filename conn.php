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
//查询整表数据 $aa=DBSelectLimit("admin","0,10")
function DBSelectLimit($table,$limit,$order="id desc",$where="1=1"){
	global $conn;
	$sql="select * from lm_".$table." where ".$where." order by ".$order." limit ".$limit;
	//print_r($sql);exit;
	$result=mysqli_query($conn,$sql);
	$arr=array();
	while($re=mysqli_fetch_assoc($result)){
		$arr[]=$re;
	}
	return $arr;
}

//添加
function DBAdd($table,$data){
	global $conn;
	$field="";  //`username`,`password`,`tel`,`realname`
	$value="";	//'dodi','123456','1423232323','ssss'
	$i=0;
	foreach($data as $k=>$r){
		if($i==0){
			$field="`".$k."`";
			$value="'".$r."'";
		}
		else{
			$field.=",`".$k."`";
			$value.=",'".$r."'";
		}
		$i++;
	}
	
	$sql="insert into lm_".$table."(".$field.")value(".$value.")";
	$result=mysqli_query($conn,$sql);
	return $result;
}
?>