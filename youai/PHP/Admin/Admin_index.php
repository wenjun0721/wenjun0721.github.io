<?php
	//print_r($_COOKIE["ya"]);exit;
	//limit (当前页-1)*每页条数,每页条数
	$pagenum=5;
	if(empty($_GET["p"])){
		$curpage=1;
	}
	else{
		$curpage=intval($_GET["p"]);
	}
	if($curpage<1){
		$curpage=1;
	}
	$count=count(DBSelect("admin"));
	$pagecount=ceil($count/$pagenum);
	if($curpage>=$pagecount){
		$curpage=$pagecount;
	}
	
	$list=DBSelectLimit("admin",($curpage-1)*$pagenum.",".$pagenum);
	
	//$str=showPage($curpage,$pagecount,"index.php?mod=Admin&fun=Admin");
	$str="";
	$str.='<li><a rel="1" onclick="showdata(1)" href="javascript:;">首页</a></li>';
	$str.='<li><a rel="1" onclick="showdata(1)" href="javascript:;">上一页</a></li>';
	for($i=1;$i<=$pagecount;$i++){
		$str.='<li><a rel="'.$i.'" onclick="showdata('.$i.')" href="javascript:;">'.$i.'</a></li>';
	}
	$str.='<li><a rel="2" onclick="showdata(2)" href="javascript:;">下一页</a></li>';
	$str.='<li><a rel="'.$pagecount.'" onclick="showdata('.$pagecount.')" href="javascript:;">尾页</a></li>';
	
?>