<?php
namespace app\home\controller;
use app\home\model\Mine as M;
class Mine extends Base
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

    public function sharerCat(){
    	$m = new M();
    	$res = $m->sharerCat();
        return $res;
    	// echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharerCatAdd(){
        $m = new M();
        return $m->sharerCatAdd();
    }

    public function sharerCatDel(){
        $m = new M();
        return $m->sharerCatDel();
    }
}
