<?php
namespace app\home\controller;
use think\Loader;
use think\Cache;
use think\Controller;
use app\home\model\Index as I;
class Index extends Base
{
    public function index()
    {
    	print_r(111);exit;
    }

    public function indexLook()
    {
    	$i = new I();
        return $i->indexLook();
    }

    public function indexSharerCat()
    {
    	$i = new I();
        return $i->indexSharerCat();
    }
}
