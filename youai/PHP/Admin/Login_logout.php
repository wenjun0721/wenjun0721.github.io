<?php
session_destroy();

header("location:index.php?mod=Admin&fun=Login&act=index");
?>