<?php
namespace app\home\controller;
use app\home\model\Love as L;
class Love extends Base
{
    public function index()
    {
    	$l = new L();
    	$res = $l->index();
    	// $this->fetch();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }


    public function backGround()
    {
    	$l = new L();
    	$res = $l->backGround();
    	// $this->fetch();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function backGround_cat()
    {
    	$l = new L();
    	$res = $l->backGround_cat();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    
    public function add()
    {
    	$data['toUser'] = '背影';
		$data['fromUser'] = '决心';
		$data['text'] = '知道不该打扰你,
		但每次偷看你背影，
		都不忍再下决心。';
		$kk  = explode("\n", $data['text']);
		foreach ($kk as $k => $v) {
		    $len = mb_strlen($v,'utf-8');
		    $limit = 16;
		    $num = ceil($len/$limit);
		    if ($num*1 >1) {
		        $arr = array();
		        for ($i=0; $i <$num ; $i++) { 
		          $arr[$i] = mb_substr($v,$i*$limit,$limit,"utf-8");
		        }
		        $kk[$k] = implode("\n", $arr);
		    }
		}
		$arr = implode("\n", $kk);

		$content = $data['toUser'].':'."\n"."\n";
		$content .=$arr;
		$content .= "\n"."\n"."-------".$data['fromUser'].'。';

		$src = 'http://'.$_SERVER['SERVER_NAME'].'/upload/background/1.jpg';
		$bg = imagecreatefromjpeg($src);
		$fontFamily = './font/zt0.ttf';//c盘windows/fonts
		$fontSize = 30;
		$charset = 'utf8';
		$textcolor = imagecolorallocatealpha($bg, 0, 0, 0,1);
		$lineHeight = 40;
		$startX = 30;
		$lineArr = explode("\n", $content);
		$allnum =count($lineArr);
		if ($allnum*1 >27) {
		    echo "<script>alert('您的浪漫，空行过多哦。请删除一些，么么哒')</script>";exit;
		}
		if ($allnum*1>10 && $allnum*1<20) {
		    $startY = 300;
		}else if ($allnum*1>20) {
		    $startY = 200;
		}else{
		    $startY = 400;
		}


		$lineWidth = imagesx($bg) - $startX - $startY;



		foreach ($lineArr as $k => $v) {
		    imagettftext($bg, $fontSize, 0, $startX, ($startY + ($lineHeight * $k)), $textcolor, $fontFamily, $v);
		}
		$fileName = date('YmdHis').rand(10000,100000).'.jpg';

		$data['img'] = $fileName;
		$data['add_time'] = time();
		//记录数据表
		$result=DBAdd('xp',$data);
		$localUrl = './upload/'.$fileName;
		imagejpeg($bg, $localUrl, 90);
    }

}
