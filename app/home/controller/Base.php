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
		define('SO','is_recom desc,sort desc,click desc,add_time desc');
		define('SO_BACKGROUND','is_recom desc,sort desc,downclick desc,add_time desc');
		define('SO_BACKGROUND_CAT','is_recom desc,sort desc,add_time desc');
		define('WEBURL','http://www.tplm.com/');
	}
    protected function fetch($template = '', $vars = [], $replace = [], $config = [])
    {
    	$replace['__HOME__'] = str_replace('/index.php','',\think\Request::instance()->root()).'/public/home/';
        return $this->view->fetch($template, $vars, $replace, $config);
    }

}