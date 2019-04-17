<?php
$menulist=DBSelectforIf("role","pid=0");
foreach($menulist as $mmk=>$mmr){
	$menulist[$mmk]["sub"]=DBSelectforIf("role","pid=".$mmr["id"]);
}

// $menulist2=DBSelectforIf("role","id in(".$_SESSION["AdminUser"]["rule2"].")");
// $menuarr=array();
// $i=0;
// foreach($menulist2 as $ak=>$ar){
	// if($ar["pid"]==0){
		// if($ar["fun"]==$fun){
			// $menuarr[$i]["issel"]=1;
		// }
		// else{
			// $menuarr[$i]["issel"]=0;
		// }
		// $menuarr[$i]=$ar;
		// $j=0;
		// foreach($menulist2 as $ak2=>$ar2){
			// if($ar2["pid"]==$ar["id"]){
				// $menuarr[$i]["sub"][$j]=$ar2;
			// }
			// $j++;
		// }
		// $i++;
	// }
// }

?>