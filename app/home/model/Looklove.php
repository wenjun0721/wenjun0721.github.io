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
        $where['sharerCatId']   = 0;
    	$sharerId = input('sharerId/d',0);
    	if ($sharerId == 0) {
    		$xp = Db::name('xp')->where($where)->order(SO_ADDTIME_COMMON)->select();
            $video = 'upload/video/wenjun.mp3';
    	}else{
            $sharerWhere['sharerId']=$sharerId;
            $sharerWhere['isok']   = 1;
    		$xp = Db::name('sharer_img')->where($sharerWhere)->order(SO_SORT_COMMON)->limit(30)->select();
            //获取音乐ID
            $videoId = Db::name('sharer')->where(['id'=>$sharerId,'isok'=>1])->value('videoId');
            $video   = Db::name('video')->where(['id'=>$videoId,'isok'=>1])->value('video');
    	}
    	foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
            $xp[$k]['select'] = false;
        }
        $rs['xp'] = $xp;
        $rs['countXp'] = count($xp);
        $rs['video'] = $video;
    	return $rs;
    }

    public function sharerCat()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
    	
		$addArr = ['id'=>'0','name'=>'个人最新'];
		array_unshift($res, $addArr);

    	$arr = [];
    	foreach ($res as $k => $v) {
    		$arr[$k]['name'] = $v['name'];
    		$arr[$k]['id'] = $v['id'];
    	}
    	$rs['arr'] = $arr;
    	return $rs;
    }
}
