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
	}
    protected function fetch($template = '', $vars = [], $replace = [], $config = [])
    {
    	$replace['__HOME__'] = str_replace('/index.php','',\think\Request::instance()->root()).'/public/home/';
        return $this->view->fetch($template, $vars, $replace, $config);
    }

}