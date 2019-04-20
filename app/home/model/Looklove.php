<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Looklove extends Base
{
    public function index()
    {
    	$where['userId'] = Session::get('userId');
    	$where['isok']   = 1;
    	$where['isshow']   = 1;
    	$res = DB::name('xp')->where($where)->order(SO)->select();
    	return $res;
    }
}
