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
    定义规则，防止以后忘记
    setUpFontType = 0 用默认字体 zt0.ttf  ，大于0 就代表用对应的字体
    fontW 字体大小，默认为28
    fontX 字体倾斜度，默认为0
    setUpArrIndex = 0 随机排序，等于1就是系统排序，取值为setUpSubArrIndex 等于2时，就是自定义排序 取值为widthW，heightW
    */
  	public function add()
    {
    	$inputDate =input();
    	$data['toUser'] = isset($inputDate['toName'])?$inputDate['toName']:'';
		$data['fromUser'] = isset($inputDate['fromName'])?$inputDate['fromName']:'';
		$data['text'] = $inputDate['loveTetx'];
		$kk  = explode("\n", $data['text']);
		$fontSize = $inputDate['fontW']; //字体大小
        $limit = 48 - $inputDate['fontW']; //每一行的字数

        // 字体
        $fontFamily = './upload/font/zt'.$inputDate['setUpFontType'].'.ttf';
        //字体颜色
        $setUpFontColorArr = ['#000000','#FFFFFF','#FFC0CB','#C0C0C0','#F0FFFF','#00C957','#DA70D6','#B0E0E6','#F5DEB3','#5E2612','#33A1C9','#00C78C'];
        $fontColor = $setUpFontColorArr[$inputDate['setUpFontColorArrIndex']];
        //倾斜度 文字倾斜角度：0-90
        $fontX = $inputDate['fontX'];
        //字体摆放位置 //width 0-300  height 0-400  
        if ($inputDate['setUpArrIndex'] == 0) {
            $inputDate['widthW'] = rand(50,150);
            $inputDate['heightW'] = rand(100,300);
            $wz=array($inputDate['widthW'],$inputDate['heightW']);//水印位置
        }else if ($inputDate['setUpArrIndex'] == 1) {
            $wz=$inputDate['setUpSubArrIndex']*1 + 1;//水印位置
        }else{
            $wz=array($inputDate['widthW'],$inputDate['heightW']);//水印位置
        }

		
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
        $file = date('Ymd');
        $file_path = './upload/love/'.$file;
        if(!file_exists($file_path))
        {
            mkdir ($file_path,0777,true);
        }
		$fileName = 'upload/love/'.$file.'/'.date('YmdHis').rand(10000,100000).'.jpg';
		$path="./".$fileName;
		$str = $content;
        // if ($image->width() != 640 || $image->height() != 960) {
        //     $image->crop('640','960');
        // }
        if ($image->width() != 640) {
            $image->thumb('640','960',1);
        }
		$image->text($str, $fontFamily, $fontSize, $fontColor,$wz,20,$fontX)->text('点点回忆', $fontFamily, 24, '#000000',9,-25)->save($path);
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
