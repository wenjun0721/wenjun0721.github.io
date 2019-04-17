<?php
if(!empty($_POST)){
	
	$_POST["pics"]="";
	print_r($_FILES);exit;
	foreach($_FILES as $fk=>$fr){
		
		if(is_array($_FILES[$fk]["name"])){
			for($i=0;$i<count($_FILES[$fk]["name"]);$i++){
				if($_FILES[$fk]["error"][$i]==0){
					$img["name"]=$_FILES[$fk]["name"][$i];
					$img["type"]=$_FILES[$fk]["type"][$i];
					$img["tmp_name"]=$_FILES[$fk]["tmp_name"][$i];
					$img["error"]=$_FILES[$fk]["error"][$i];
					$img["size"]=$_FILES[$fk]["size"][$i];
					
					$_POST["pics"].=imgUpload($img)."|";
				}
			}
		}
		else{
			$_POST["thumb"]=imgUpload($fr);
		}
		
	}
	
	
	
	 print_r($_POST);exit;
	
	// $_POST["pics"]="";
	// foreach($_FILES as $fk=>$fr){
		// $_POST[$fk]=imgUpload($fr);
		
		// if($fk!="thumb"){
			// $_POST["pics"].=$_POST[$fk]."|";
			// unset($_POST[$fk]);
		// }
	// }
	// print_r($_POST);exit;
	
	
	$_POST["addtime"]=time();
	$re=DBAdd("news",$_POST);
	if($re){
		echo "<script>alert('添加成功');location.href='index.php?mod=Admin&fun=News&act=index';</script>";
		exit;
	}
	else{
		echo "<script>alert('添加失败');history.go(-1);</script>";
		exit;
	}
}

$catlist=DBSelectforIf("category","cattype='News' and pid<>0","id");
?>