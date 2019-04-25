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
    	$res = Db::name('xp')->where($where)->order(SO)->limit(30)->select();
    	return $res;
    }
}
