<?php
namespace app\home\controller;
use app\home\model\Looklove as L;
class Looklove extends Base
{
    public function index()
    {
    	$l = new L();
    	$res = $l->index();
    	if (empty($res['xp'])) {
            if (input('sharerId') == 0) {
                $tips = '亲，暂无最新内容，请点击右下角的图标或者编译回忆添加哦，么么哒';
            }else{
                $tips = '亲，该锦集暂无内容，请去个人中心那里添加哦，么么哒';
            }
    		echo(json_encode(WSTReturn($tips)));die;
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
