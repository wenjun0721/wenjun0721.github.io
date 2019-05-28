<?php
namespace app\home\controller;
/**
 * 小程序二维码控制器
 */
use think\Controller;
use think\Cache;
class Code extends Controller {
	public $appId = 'wx22c25fe332a7c5ee';
    public $secret ='d223c831b0bd61464fe16720317995bc';

    public function __construct(){
        require(ROOT_PATH.'/vendor/topthink/think-image/src/Image.php');
    }
    /**
     * http访问
     * @param $url 访问网址
     */
    private function http($url,$data = null){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        if($data){
            curl_setopt($curl,CURLOPT_POST,1);
            curl_setopt($curl,CURLOPT_POSTFIELDS,$data);//如果要处理的数据，请在处理后再传进来 ，例如http_build_query这里不要加
        }
        $res = curl_exec($curl);
        if(!$res){
            $error = curl_errno($curl);
            echo $error;
        }
        curl_close($curl);
        return $res;
    }

    /**
     * 获取访问令牌
     */
    public function getToken(){
        $access_token = cache('access_token');
        if($access_token!=false) { //已缓存，直接使用
            $this->tokenId = $access_token;
            return $this->tokenId;
        } else { //获取access_token
            $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$this->appId.'&secret='.$this->secret;
            $data = $this->http($url);
            $data = json_decode($data, true);
            if($data['access_token']!=''){
                Cache::set('access_token',$data['access_token'],600);
                $this->tokenId = $data['access_token'];
                return $this->tokenId;
            }else{
                $this->error = $data;
            }
            return false;
        }
    }


    public function qrcode($data){
        $dir = iconv("UTF-8", "GBK", ROOT_PATH .'upload/qrcode/'.$data['sharerUserId'].'/'.date('Ymd'));
        if (!file_exists($dir)){
            mkdir ($dir,0777,true);
        }
        // 页面
        $postdata['path']="/pages/index/index";
        $fiel = $dir.DS. $data['sharerId'].'.png';
        @unlink($fiel);
        //获取access_token
        $access_token = $this->getToken();
        //获取二维码
        //参数
        $postdata['scene']= 'code'.'.'.$data['sharerUserId'].".".$data['sharerId'];
        // 宽度
        $postdata['width']=430;
        // 线条颜色
        $postdata['auto_color']=false;
        //auto_color 为 false 时生效
        $postdata['line_color']=['r'=>'0','g'=>'0','b'=>'0'];
        // 是否有底色为true时是透明的
        $postdata['is_hyaline']=false;
        $post_data = json_encode($postdata);
        // 获取二维码
        $url="https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=".$access_token;

        // post请求
        // 保存二维码
        try{
            $res = file_put_contents($fiel,$this->postCurl($url,$post_data));
            return $this->thumb($fiel);
        }catch (Exception $e) {

        }

        

        
    }
    public function postCurl($url, $data){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $tmpInfo = curl_exec($ch);
        if (curl_errno($ch)) {
            return false;
        }else{
            return $tmpInfo;
        }
    }


    public function thumb($file){
        $image = \think\Image::open($file);
        $image->thumb(160,160,1);
        @unlink($file);
        $image->save($file);
        return $file;
    }
    
    /** 
        * 小程序海报
    **/
    public function getCodeGoodsImg($data){
        $code = $data['sharerCode'];//二维码
        $backGroundImg = $data['backGroundImg'];//海报背景
        $backGroundImg = $backGroundImg?$backGroundImg:WEBURL .'upload/background/5.jpg';
        $backGroundImg = str_replace(WEBURL,"./",$backGroundImg);
        $is = 'upload/sharerCode/'.$data['sharerUserId'].'/'.date('Ymd');
        $dir = ROOT_PATH .$is;
        if (!file_exists($dir)){
            mkdir ($dir,0777,true);
        }
        $filename = $dir.DS. $data['sharerId'].'.png';
        @unlink($filename);

        //生成带水印的图片
        $image = \think\Image::open($backGroundImg);
        $image->water($code,7);
        $image->save($filename);
        return WEBURL.$is.'/'. $data['sharerId'].'.png';
    }

}