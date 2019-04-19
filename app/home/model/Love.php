<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Love extends Base
{
    public function index()
    {
    	$where['userId'] = Session::get('userId');
    	$where['isok']   = 1;
    	$res = DB::name('xp')->where($where)->order(SO)->select();
        foreach ($res as $k => $v) {
            $res[$k]['img'] = WEBURL.'upload/love/'.$v['img'];
        }
    	return $res;
    }


    public function backGround()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$where['ischeck']   = 1;
    	$res = DB::name('background')->where($where)->order(SO_BACKGROUND)->select();
        $img = [];
        foreach ($res as $k => $v) {
            $img[$k] = WEBURL.'upload/background/'.$v['img'];
        }
        $res['imgs'] = $img;
    	return $res;
    }
}
