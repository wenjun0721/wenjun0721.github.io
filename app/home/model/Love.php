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
    	$res = Db::name('xp')->where($where)->order(SO)->select();
        foreach ($res as $k => $v) {
            $res[$k]['img'] = WEBURL.$v['img'];
        }
    	return $res;
    }


    public function backGround()
    {
    	$where['userId'] = input('userId/d',0);
        $is_new = input('is_new/d',0);

        if ($is_new == 1) {
            $SO = SO_BACKGROUND_NEW;
        }else{
            $SO = SO_BACKGROUND;
        }
        $catId = input('catId/d',0);
        if ($catId) {
            $where['catId'] = $catId;
        }

    	$where['isok']   = 1; //是否有效
        $where['isshow']   = 1; //是否显示
    	$where['ischeck']   = 1; //是否审核
    	$res = Db::name('background')->where($where)->order($SO)->select();
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
        $value = input('value/d',1);
        if ($value == 2) {
            $where['userId'] = input('userId/d',0);
            $addArr = ['catId'=>'0','catName'=>'个人最新'];
        }else{
            $where['userId'] = 0;
            $addArr = ['catId'=>'0','catName'=>'官方最新'];
        }
        $res = Db::name('background_cat')->where($where)->order(SO_BACKGROUND_CAT)->select();
        if (count($res)>0) {
            array_unshift($res, $addArr);
        }else{
            $res = $addArr;
        }
        $arr = [];
        $arrIndex = [];
        foreach ($res as $k => $v) {
            $arr[$k]['catId'] = $v['catId'];
            $arr[$k]['catName'] = $v['catName'];
            $arrIndex[$k] = $v['catId'];
        }
        if ($value == 0) {
            $rs['arr'] = [];
            $rs['arrIndex'] = [];
        }else{
            $rs['arr'] = $arr;
            $rs['arrIndex'] = $arrIndex;
        }
        
        return $rs;
    }

    public function loveAdd($data)
    {
        $res = Db::name('xp')->insert($data);
    }
}
