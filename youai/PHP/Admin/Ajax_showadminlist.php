<?php
$pagenum=5;
if(empty($_POST["p"])){
	$curpage=1;
}
else{
	$curpage=intval($_POST["p"]);
}
if($curpage<1){
	$curpage=1;
}

//统计记录总条数
$count=count(DBSelect("admin"));

//总页码数
$pagecount=ceil($count/$pagenum);

if($curpage>=$pagecount){
	$curpage=$pagecount;
}

$list=DBSelectLimit("admin",($curpage-1)*$pagenum.",".$pagenum);

$htmlcon="";
foreach($list as $k=>$r){
	$htmlcon.='<tr>
				<td>'.$r["id"].'</td>
				<td>'.$r["username"].'</td>
				<td>'.$r["realname"].'</td>
				<td>'.$r["tel"].'</td>
				<td><a href="index.php?mod=Admin&fun=Admin&act=edit&id='.$r["id"].'" class="btn btn-info">修改</a> <a href="index.php?mod=Admin&fun=Admin&act=del&id='.$r["id"].'" class="btn btn-danger">删除</a></td>
			</tr>';
}	
//echo $htmlcon;

$pagestr="";
//首页
$pagestr.='<li><a rel="1" onclick="showdata(1)" href="javascript:;">首页</a></li>';
//上一页
if($curpage<=1){
	$pagestr.='<li><a rel="1" onclick="showdata(1)" href="javascript:;">上一页</a></li>';
}
else{
	$pagestr.='<li><a rel="'.($curpage-1).'" onclick="showdata('.($curpage-1).')" href="javascript:;">上一页</a></li>';
}
//页码
for($i=1;$i<=$pagecount;$i++){
	if($curpage==$i){
		$pagestr.='<li class="active"><a rel="'.$i.'" onclick="showdata('.$i.')" href="javascript:;">'.$i.'</a></li>';
	}
	else{
		$pagestr.='<li><a rel="'.$i.'" onclick="showdata('.$i.')" href="javascript:;">'.$i.'</a></li>';
	}
}
//下一页
if($curpage>=$pagecount){
	$pagestr.='<li><a rel="'.$pagecount.'" onclick="showdata('.$pagecount.')" href="javascript:;">下一页</a></li>';
}
else{
	$pagestr.='<li><a rel="'.($curpage+1).'" onclick="showdata('.($curpage+1).')" href="javascript:;">下一页</a></li>';
}
//尾页
$pagestr.='<li><a rel="'.$pagecount.'" onclick="showdata('.$pagecount.')" href="javascript:;">尾页</a></li>';



$arr["content"]=$htmlcon;
$arr["page"]=$pagestr;

$str=json_encode($arr);

print_r($str);


exit;
?>