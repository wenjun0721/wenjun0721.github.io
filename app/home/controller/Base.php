<?php
namespace app\home\controller;
/**
 * 基础控制器
 */
use think\Cache;
use think\Controller;
use think\Log;
use think\Session;
class Base extends Controller {
	public function __construct(){
		Session::set('userId','1');
		define('SO','is_recom desc,sort asc,click desc,add_time desc,id desc');
		define('SO_BACKGROUND','is_recom desc,sort asc,useclick desc,downclick desc,add_time desc,id desc');
		define('SO_BACKGROUND_CAT','is_recom desc,sort asc,add_time desc,catId desc');
		define('SO_BACKGROUND_NEW','add_time desc,id desc');
		define('SO_ADDTIME_COMMON','add_time desc,id desc');
		define('SO_SORT_COMMON','sort asc,add_time desc,id desc');
		define('SO_RECOM_COMMON','is_recom desc,sort asc,add_time desc,id desc');
		define('WEBURL','http://www.tplm.com/');
		public $appId = 'wx22c25fe332a7c5ee';
	    public $secret ='d223c831b0bd61464fe16720317995bc';
	    public $grant_type = 'authorization_code';
	}
    protected function fetch($template = '', $vars = [], $replace = [], $config = [])
    {
    	$replace['__HOME__'] = str_replace('/index.php','',\think\Request::instance()->root()).'/public/home/';
        return $this->view->fetch($template, $vars, $replace, $config);
    }

    /**
     * 获取openid
     */
    public function getUserInfo($data){

        $url = 'https://api.weixin.qq.com/sns/jscode2session';
        $datas=array(
            'appid'=>$this->appId,
            'secret'=>$this->secret,
            'js_code'=>$this->DefineStrReplace($data['code']);
            'grant_type'=>$this->grant_type
        );
        $encryptedData= urldecode($data['encryptedData']);
        $iv = $this->DefineStrReplace($data['iv']);
        $rs = json_decode($this->http($url,$datas),true);
        // dump($rs);die;
        $rs = $this->DecryptData($rs['session_key'],$encryptedData,$iv);
        if(isset($rs['openId']) && isset($rs['unionId'])){
            $rv['status'] = 1;
            $rv['rs'] = $rs;
            $rv['msg'] = '获取openid成功';
        }else{
            $rv['status'] = -1;
            $rv['openid'] = '';
            $rv['msg'] = '获取openid失败';
        }
        return $rv;
    }

    /**
     * 请求过程中因为编码原因+号变成了空格
     * 需要用下面的方法转换回来
     */
    public function DefineStrReplace($data)
    {
        return str_replace(' ','+',$data);
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
     * 微信信息解密
     * @param  string  $sessionKey 小程序密钥
     * @param  string  $encryptedData 在小程序中获取的encryptedData
     * @param  string  $iv 在小程序中获取的iv
     * @return array 解密后的数组
     */
    public function DecryptData( $sessionKey, $encryptedData, $iv ){
        $OK = 0;
        $IllegalAesKey = -41001;
        $IllegalIv = -41002;
        $IllegalBuffer = -41003;
        $DecodeBase64Error = -41004;

        if (strlen($sessionKey) != 24) {
            return $IllegalAesKey;
        }
        $aesKey=base64_decode($sessionKey);

        if (strlen($iv) != 24) {
            return $IllegalIv;
        }
        $aesIV=base64_decode($iv);

        $aesCipher=base64_decode($encryptedData);

        $result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);
        $dataObj=json_decode( $result );
        if( $dataObj  == NULL )
        {
            return $IllegalBuffer;
        }
        if( $dataObj->watermark->appid != $this->appId )
        {
            return $DecodeBase64Error;
        }
        $data = json_decode($result,true);

        return $data;
    }

}