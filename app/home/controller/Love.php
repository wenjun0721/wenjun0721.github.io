<?php
namespace app\home\controller;
use app\home\model\Love as L;
class Love extends Base
{
    public function index()
    {
    	$l = new L();
    	$res = $l->index();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }


    public function backGround()
    {
    	$l = new L();
    	$res = $l->backGround();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function backGround_cat()
    {
    	$l = new L();
    	$res = $l->backGround_cat();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    /* 水印相关常量定义 
    const WATER_NORTHWEST = 1; //常量，标识左上角水印
    const WATER_NORTH     = 2; //常量，标识上居中水印
    const WATER_NORTHEAST = 3; //常量，标识右上角水印
    const WATER_WEST      = 4; //常量，标识左居中水印
    const WATER_CENTER    = 5; //常量，标识居中水印
    const WATER_EAST      = 6; //常量，标识右居中水印
    const WATER_SOUTHWEST = 7; //常量，标识左下角水印
    const WATER_SOUTH     = 8; //常量，标识下居中水印
    const WATER_SOUTHEAST = 9; //常量，标识右下角水印
    */
  	public function add()
    {
    	$inputDate =input();
    	$data['toUser'] = $inputDate['toName'];
		$data['fromUser'] = $inputDate['fromName'];
		$data['text'] = $inputDate['loveTetx'];
		$kk  = explode("\n", $data['text']);
		$limit = 18;
		$fontSize = 30;
		// $widthW = $inputDate['widthW'];
		// $heightW = $inputDate['heightW'];
		$widthW = 10;
		$heightW = 10;
		//width 0-300  height 0-400  文字倾斜角度：0-90
		$wz=array($widthW,$heightW);//水印位置
		// 字体
		$fontFamily = './upload/font/zt0.ttf';
		//背景图
		$backGroundImg = str_replace("http://www.tplm.com/","./",$inputDate['backgroundImg']);

		foreach ($kk as $k => $v) {
		    $len = mb_strlen($v,'utf-8');
		    
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
		$lineArr = explode("\n", $content);
		$allnum =count($lineArr);
		if ($allnum*1 >27) {
			echo(json_encode(WSTReturn('您的浪漫，空行过多哦。请删除一些，么么哒',-1)));die;
		}
    	//生成带水印的图片
    	require(ROOT_PATH.'/vendor/topthink/think-image/src/Image.php');
		$image = \think\Image::open($backGroundImg);
		//生成图片位置
		$fileName = 'upload/love/'.date('YmdHis').rand(10000,100000).'.jpg';
		$path="./".$fileName;
		$str = $content;
		$image->crop('640','960')->text($str, $fontFamily, $fontSize, '#000000',$wz,20)->text('wj测试', $fontFamily, $fontSize, '#000000',9,-25)->save($path);

		
		echo(json_encode(WSTReturn('success',1,$fileName)));die;
    }

    public function delImg(){
    	$img = input('love');
    	@unlink('./'.$img);
    }

    public function addImg(){
    	$l = new L();
    	$data = input();
    	$data['add_time'] = time();
    	$l->loveAdd($data);
    }

}
