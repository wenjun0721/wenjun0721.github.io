<?php
//开启session使用权限
session_start();
	
$conn=new mysqli("localhost:3307","root","","youai");
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

//查询整表数据
function DBSelect($table,$order="id desc"){
	global $conn;
	$sql="select * from ya_".$table." order by ".$order;
	$result=mysqli_query($conn,$sql);
	$arr=array();
	while($re=mysqli_fetch_assoc($result)){
		$arr[]=$re;
	}
	return $arr;
}

//查询整表数据 $aa=DBSelectLimit("admin","0,10")
function DBSelectLimit($table,$limit,$order="id desc",$where="1=1"){
	global $conn;
	$sql="select * from ya_".$table." where ".$where." order by ".$order." limit ".$limit;
	//print_r($sql);exit;
	$result=mysqli_query($conn,$sql);
	$arr=array();
	while($re=mysqli_fetch_assoc($result)){
		$arr[]=$re;
	}
	return $arr;
}

//根据条件查询整表数据
function DBSelectforIf($table,$where,$order="id desc"){
	global $conn;
	$sql="select * from ya_".$table." where ".$where." order by ".$order;
	$result=mysqli_query($conn,$sql);
	$arr=array();
	while($re=mysqli_fetch_assoc($result)){
		$arr[]=$re;
	}
	return $arr;
}

//查询一条数据根据ID
function DBOneforID($table,$id){
	global $conn;
	$sql="select * from ya_".$table." where id=".$id;
	$result=mysqli_query($conn,$sql);
	$re=mysqli_fetch_assoc($result);
	return $re;
}

//根据条件查询一条数据
function DBOneforIf($table,$where){
	global $conn;
	$sql="select * from ya_".$table." where ".$where." limit 1";
	$result=mysqli_query($conn,$sql);
	$re=mysqli_fetch_assoc($result);
	return $re;
}

//上一条
function DBPrev($table,$id){
	global $conn;
	$sql="select * from ya_".$table." where id<".$id." order by id desc limit 1";
	$result=mysqli_query($conn,$sql);
	$re=mysqli_fetch_assoc($result);
	return $re;
}

//下一条
function DBNext($table,$id){
	global $conn;
	$sql="select * from ya_".$table." where id>".$id." order by id limit 1";
	$result=mysqli_query($conn,$sql);
	$re=mysqli_fetch_assoc($result);
	return $re;
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
	
	$sql="insert into ya_".$table."(".$field.")value(".$value.")";
	
	$result=mysqli_query($conn,$sql);
	return $result;
}

//更新
function DBUpdate($table,$data,$where){
	global $conn;
	$str="";
	$i=0;
	foreach($data as $k=>$r){
		if($i==0){
			$str="`".$k."`='".$r."'";
		}
		else{
			$str.=",`".$k."`='".$r."'";
		}
		$i++;
	}
	$sql="update ya_".$table." set ".$str." where ".$where;
	//print_r($sql);exit;
	$result=mysqli_query($conn,$sql);
	return $result;
}

//删除
function DBDelete($table,$id){
	global $conn;
	$sql="delete from ya_".$table."  where id=".$id;
	//print_r($sql);exit;
	$result=mysqli_query($conn,$sql);
	return $result;
}

//删除根据条件
function DBDeleteforIf($table,$where){
	global $conn;
	$sql="delete from ya_".$table."  where ".$where;
	//print_r($sql);exit;
	$result=mysqli_query($conn,$sql);
	return $result;
}

//输出页码
function showPage($curpage,$pagecount,$url){
	//print_r($count);exit;
	$adminpagestr='';
	
	$adminpagestr.='<li><a href="'.$url.'&p=1">首页</a></li>';
	if($curpage>1){
		$adminpagestr.='<li><a href="'.$url.'&p='.($curpage-1).'">&laquo;</a></li>';
	}
	else{
		$adminpagestr.='<li class="disabled"><a href="###">&laquo;</a></li>';
	}
	
	for($ai=1;$ai<=$pagecount;$ai++){
		if($curpage==$ai){
			$adminpagestr.='<li class="active"><a href="'.$url.'&p='.$ai.'">'.$ai.'<span class="sr-only">(current)</span></a></li>';
		}
		else{
			$adminpagestr.='<li><a href="'.$url.'&p='.$ai.'">'.$ai.'</a></li>';
		}
	}
	
	if($pagecount>$curpage){
		$adminpagestr.='<li><a href="'.$url.'&p='.($curpage+1).'">&raquo;</a></li>';
	}
	else{
		$adminpagestr.='<li class="disabled"><a href="###">&raquo;</a></li>';
	}
	$adminpagestr.='<li><a href="'.$url.'&p='.$pagecount.'">尾页</a></li>';
	return $adminpagestr;
}

//图片上传
function imgUpload($file){ //$file=$_FILES["thumb"]
	$filename="";
	if($file["error"]==0){
		if($file["size"]>2*1024*1024){
			echo "<script>alert('文件太大了');history.go(-1);</script>";
			exit;
		}
		if($file["type"]!="image/jpeg" && $file["type"]!="image/jpg" && $file["type"]!="image/png" && $file["type"]!="image/gif"){
			echo "<script>alert('文件格式错误');history.go(-1);</script>";
			exit;
		}
		//23.23.23.54.222.111.jpg
		$extarr=explode(".",$file["name"]);
		$filename="Uploads/".time().rand(100,999).$extarr[count($extarr)-1];
		$r=move_uploaded_file($file["tmp_name"],$filename);
		
	}
	return $filename;
}
?>