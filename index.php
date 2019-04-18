<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]
// 应用入口文件
header('Content-type:text/html;charset=utf-8');

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.4.0','<'))  die('require PHP > 5.4.0 !');
//进入安装目录
if(is_dir("install") && !file_exists("install/install.ok")){
	header("Location:install/index.php");
	exit();
}
// [ 应用入口文件 ]
// 定义应用目录
define('APP_PATH', __DIR__ . '/app/');
define('APP_STATIC', __DIR__ . '/static/');
define('CONF_PATH', __DIR__.'/app/common/');
// 加载框架引导文件
require __DIR__ . '/thinkphp/start.php';
