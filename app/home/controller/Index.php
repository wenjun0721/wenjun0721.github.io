<?php
namespace app\home\controller;
use think\Loader;
use think\Cache;
use think\Controller;
class Index extends Base
{
    public function index()
    {
    	print_r(111);exit;
    }

    public function indexLook()
    {
    	$m = new M();
        return $m->sharerCatAdd();
    }
}
