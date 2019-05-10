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
            $videoList = Db::name('video')->where(['userId'=>0,'isok'=>1])->order(SO_SORT_COMMON)->select();
            $max   = count($videoList);
            $videoId = rand(0,($max-1));
            $video   = $videoList[$videoId]['video'];
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

    public function sharer(){
        $sharerId = input('sharerId/d',0);
        //先判断该锦集是否被分享过，如果已被分享，不需要理会
        $res = Db::name('sharer')->where(['id'=>$sharerId])->find();
        //判断是否被分享过，但是有被删除了，如果删除了，重新开放
        if ($res['isSharer'] == 1 && $res['isshow'] == 1) {
            return 1;exit;
        }
        //修改可以被查看状态
        Db::name('sharer')->where(['id'=>$sharerId])->update(['isSharer'=>1,'isshow'=>1]);
        // 判断是否有了二维码，如果有，不需要理会
        // if (empty($res['sharerCode'])) {
        //     $c = new \app\home\controller\Code();
        //     $data['sharerId'] = $sharerId;
        //     $data['sharerUserId'] = $res['userId'];
        //     $res = $c->qrcode($data);
        // }

        return 1;exit;
    }
}
