
<?php 
// $sql="select * from lm_xp order by id desc limit 4";
// $result=DBQuery($sql);

// print_r($result);exit;
// 
// 
/*打开图片*/
//1.配置图片路径
// $src = 'http://'.$_SERVER['SERVER_NAME'].'/lm1/Html/images/index.jpg';

// //2.获取图片的信息（得到图片的基本信息）
// $info = getimagesize($src);
// //3.通过获取图片类型
// $type = image_type_to_extension($info[2],false);
// //4.在内存中创建一个图片类型一样的图像
// $fun = "imagecreatefrom{$type}";
// //5.图片复制到内存中
// $image = $fun($src);
// /*操作图片*/
// //1.设置字体的路径
// $font = './font/zt'.rand(0,2).'.ttf';//c盘windows/fonts

// //2.填写水印内容
// $content = '5月,您的浪漫，由您书写！';
// //3.设置字体的颜色rgb和透明度
// $col = imagecolorallocatealpha($image,255,255,255,10);
// //4.写入文字
// // 画布资源 字体大小 旋转角度 x轴 y轴 字体颜色 字体文件 需要渲染的字符串
// imagettftext($image,50,275,200,30,$col,$font,$content);
// /*输出图片*/
// //浏览器输出
// header("Content-type:{$info['mime']}");
// $func = "image{$type}";
// $mm = $func($image);
// $newimage = './upload/'.uniqid().'.'.$type;
// //保存图片
// $func($image,$newimage);
// /*销毁图片*/
// imagedestroy($image);
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

$src = 'http://'.$_SERVER['SERVER_NAME'].'/lm2/bgb/5.jpg';
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

// $lineArr = autoLineSplit($content, $fontFamily, $fontSize, $charset, $lineWidth);


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


// $fileName = '2019041713273052973.jpg';
// $localUrl = './upload/'.$fileName;
// $miuscUrl = './video/renxi.mp4';
/*
 * 绘图文字分行函数
 * by COoL
 * - 输入：
 * str: 原字符串
 * fontFamily: 字体
 * fontSize: 字号
 * charset: 字符编码
 * width: 限制每行宽度(px)
 * - 输出：
 * 分行后的字符串数组
 */
function autoLineSplit ($str, $fontFamily, $fontSize, $charset, $width) {
    $result = [];

    $len = (strlen($str) + mb_strlen($str, $charset)) / 2;

    // 计算总占宽
    $dimensions = imagettfbbox($fontSize, 0, $fontFamily, $str);
    $textWidth = abs($dimensions[4] - $dimensions[0]);

    // 计算每个字符的长度
    $singleW = $textWidth / $len;
    // 计算每行最多容纳多少个字符
    $maxCount = floor($width / $singleW);

    while ($len > $maxCount) {
        // 成功取得一行
        $result[] = mb_strimwidth($str, 0, $maxCount, '', $charset);
        // 移除上一行的字符
        $str = str_replace($result[count($result) - 1], '', $str);
        // 重新计算长度
        $len = (strlen($str) + mb_strlen($str, $charset)) / 2;
    }
    // 最后一行在循环结束时执行
    $result[] = $str;
    
    return $result;
}




?>