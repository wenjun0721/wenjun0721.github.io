
<?php 
$sql="select * from ya_news order by id desc limit 4";
$result=mysqli_query($conn,$sql);
$arr=array();
while($row=mysqli_fetch_assoc($result)){
	$arr[]=$row;
}
?>