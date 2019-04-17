<?php
	$list=DBSelectforIf("category","pid=0","id");
	foreach($list as  $li=>$lr){
		$temp=DBSelectforIf("category","pid=".$lr["id"],"id");
		$list[$li]["sub"]=$temp;
	}
	//print_r($list);exit;
	
	$aa=getCat(0);
	//print_r($aa);exit;
	
	
	function getCat($pid){
		//global $space;
		$str="";
		$cat=DBSelectforIf("category","pid=".$pid,"id");
		foreach($cat as $k=>$r){  //1.新闻中心
			$space="";
			for($i=0;$i<$r["level"];$i++){
				$space.="&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			$space.="├";
			$str.='<tr>
					<td>'.$r["id"].'</td>
					<td>'.$space.$r["catname"].'</td>
					<td><a href="index.php?mod=Admin&fun=Category&act=edit&id='.$r["id"].'" class="btn btn-info">修改</a> <a href="index.php?mod=Admin&fun=Category&act=del&id='.$r["id"].'" class="btn btn-danger">删除</a></td>
				</tr>';
			$str.=getCat($r["id"]);  //5
		}
		return $str;
	}
?>

