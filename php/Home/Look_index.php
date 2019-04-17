
<?php 

$result=DBSelectLimit('xp',20,'id desc','userId = 1');

$count = count($result);
?>