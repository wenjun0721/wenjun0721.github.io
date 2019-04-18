<?php
namespace app\admin\controller;
/**
 * 基础控制器
 */
use think\Cache;
use think\Controller;
use think\Log;

class Base extends Controller {
	
    protected function fetch($template = '', $vars = [], $replace = [], $config = [])
    {
    	$replace['__ADMIN__'] = str_replace('/index.php','',\think\Request::instance()->root()).'/public/admin/';
        return $this->view->fetch($template, $vars, $replace, $config);
    }

}