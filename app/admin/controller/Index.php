<?php
namespace app\admin\controller;
use think\Loader;
use think\Cache;
use think\Controller;
class Index extends Base
{
    public function index()
    {
    	return $this->fetch();
    }
}
