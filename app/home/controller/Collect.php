<?php
namespace app\home\controller;
use app\home\model\Collect as M;
class Collect extends Base
{
    public function index()
    {
    	$m = new M();
    	$res = $m->index();
    	if (empty($res)) {
    		echo(json_encode(WSTReturn('暂无内容，请先去添加哦，么么哒')));die;
    	}
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function collect(){
        $m = new M();
        return $m->collect();
    }
    public function collectDel(){
        $m = new M();
        return $m->collectDel();
    }

    public function collectRead(){
        $m = new M();
        return $m->collectRead();
    }
    public function collectOne(){
        $m = new M();
        return $m->collectOne();
    }
    public function sharerUserList(){
        $m = new M();
        return $m->sharerUserList();
    }
}
