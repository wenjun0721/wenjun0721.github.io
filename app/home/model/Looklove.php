<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Looklove extends Base
{
    public function index()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$where['isshow']   = 1;
    	$sharerId = input('sharerId/d',0);
    	if ($sharerId == 0) {
    		$xp = Db::name('xp')->where($where)->order(SO_ADDTIME_COMMON)->limit(30)->select();
    	}else{
    		$sharerValue = Db::name('sharer')->where(['id'=>$sharerId,'isok'=>1])->value('sharerValue');
    		if ($sharerValue) {
    			$where['id'] = ['in',$sharerValue];
    			$xp =Db::name('xp')->where($where)->select();
    			print_r(Db::name('xp')->getlastsql());exit;
    		}else{
    			$xp = [];
    		}
    	}
    	foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
        }

    	return $xp;
    }

    public function sharerCat()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
    	if ($res) {
    		$addArr = ['id'=>'0','name'=>'个人最新'];
    		array_unshift($res, $addArr);
    	}
    	$arr = [];
    	foreach ($res as $k => $v) {
    		$arr[$k]['name'] = $v['name'];
    		$arr[$k]['id'] = $v['id'];
    	}
    	$rs['arr'] = $arr;
    	return $rs;
    }
}
