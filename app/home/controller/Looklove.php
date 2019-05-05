<?php
namespace app\home\controller;
use app\home\model\Looklove as L;
class Looklove extends Base
{
    public function index()
    {
    	$l = new L();
    	$res = $l->index();
    	if (empty($res)) {
    		echo(json_encode(WSTReturn('该锦集暂无内容，请先去添加哦，么么哒')));die;
    	}
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharerCat(){
    	$l = new L();
    	$res = $l->sharerCat();
    	if (empty($res)) {
    		echo(json_encode(WSTReturn('暂无内容')));die;
    	}
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }
}
