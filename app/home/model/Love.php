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
        $where['isshow']   = 1;
    	$res = DB::name('xp')->where($where)->order(SO)->select();
        foreach ($res as $k => $v) {
            $res[$k]['img'] = WEBURL.'upload/love/'.$v['img'];
        }
    	return $res;
    }


    public function backGround()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1; //是否有效
        $where['isshow']   = 1; //是否显示
    	$where['ischeck']   = 1; //是否审核
    	$res = DB::name('background')->where($where)->order(SO_BACKGROUND)->select();
        $img = [];
        foreach ($res as $k => $v) {
            $img[$k] = WEBURL.'upload/background/'.$v['img'];
        }
        $res['imgs'] = $img;
    	return $res;
    }

    public function backGround_cat()
    {
        $where['isok']   = 1; //是否有效
        $where['isshow']   = 1; //是否显示
        $vaule = input('value/d',1);
        if ($vaule == 2) {
            $where['userId'] = input('userId/d',0);
        }else{
            $where['userId'] = 0;
        }
        $res = DB::name('background_cat')->where($where)->order(SO_BACKGROUND_CAT)->select();
        $arr = [];
        foreach ($res as $k => $v) {
            $arr[$k] = $v['catName'];
        }
        $rs['arr'] = $arr;
        return $rs;
    }
}
