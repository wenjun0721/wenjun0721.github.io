<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Collect extends Base
{
    // public function index()
    // {
    // 	$where['userId'] = input('userId/d',0);
    // 	$where['isok']   = 1;
    // 	$where['isshow']   = 1;
    // 	$sharerId = input('sharerId/d',0);
    // 	if ($sharerId == 0) {
    // 		$xp = Db::name('xp')->where($where)->order(SO_ADDTIME_COMMON)->limit(30)->select();
    // 	}else{
    // 		$sharerValue = Db::name('sharer')->where(['id'=>$sharerId,'isok'=>1])->value('sharerValue');
    // 		if ($sharerValue) {
    // 			$where['id'] = ['in',$sharerValue];
    // 			$xp =Db::name('xp')->where($where)->select();
    // 			print_r(Db::name('xp')->getlastsql());exit;
    // 		}else{
    // 			$xp = [];
    // 		}
    // 	}
    // 	foreach ($xp as $k => $v) {
    //         $xp[$k]['img'] = WEBURL.$v['img'];
    //     }

    // 	return $xp;
    // }

    public function collect()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
        $where['isshow']   = 1;
    	$res = Db::name('collection')->where($where)->order(SO_ADDTIME_COMMON)->select();
        if (empty($res)) {
            return json_encode(WSTReturn('亲，您没有收藏任何的锦集呢,去"每天100分"那挑选哦，么么哒！'));
        }
    	foreach ($res as $k => $v) {
            $img = Db::name('sharer_img')->where(['sharerId'=>$v['sharerId'],'isshow'=>1])->order('sort asc,id desc')->value('img');
            if ($img) {
                $res[$k]['bgImg'] = WEBURL.$img;
            }else{
                $res[$k]['bgImg'] = WEBURL.'upload/common/logo.png';
            }
             $res[$k]['select'] = false;
        }
    	return json_encode(WSTReturn('success',1,$res));
    }

    public function collectDel()
    {
        $userId = input('userId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要删除的锦集'));
        }
        $where['userId'] = $userId;
        $where['id'] = ['in',$ids];
        $res = Db::name('collection')->where($where)->update(['isok'=>0,'del_time'=>time()]);
        if ($res) {
            return json_encode(WSTReturn('删除成功',1));
        }else{
            return json_encode(WSTReturn('删除失败'));
        }
    }

    public function collectRead()
    {
        $sharerId = input('sharerId/d',0);
        $where['isshow']   = 1;
        $where['id']   = $sharerId;

        $sharerWhere['sharerId']=$sharerId;
        $sharerWhere['isshow']   = 1;
        //判断锦集是否能被查看
        $sharer = Db::name('sharer')->where($where)->find();
        if (empty($sharer)) {
            return json_encode(WSTReturn('此锦集已被该主人删除了哦！可以点击右下角按钮查看她的主页哦'));
        }
        $xp = Db::name('sharer_img')->where($sharerWhere)->order(SO_SORT_COMMON)->limit(30)->select();
        if (empty($xp)) {
            return json_encode(WSTReturn('此锦集已被该主人删除了哦！可以点击右下角按钮查看她的主页哦'));
        }
        //获取音乐ID
        $videoId = Db::name('sharer')->where(['id'=>$sharerId])->value('videoId');
        $video   = Db::name('video')->where(['id'=>$videoId])->value('video');
        foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
        }
        //判断是否已经收藏了
        $co = Db::name('collection')->where(['sharerId'=>$sharerId,'isok'=>1])->count();
        $co = empty($co)?1:0;
        $rs['xp'] = $xp;
        $rs['video'] = $video;
        $rs['co'] = $co;
        echo(json_encode(WSTReturn('success',1,$rs)));die;
    }

    public function collectOne()
    {
        $userId = input('userId/d',0);
        $sharerId = input('sharerId/d',0);
        $co = input('co/d',0);
        //co 等于0 代表已经收藏了
        $where['userId'] = $userId;
        $where['sharerId'] = $sharerId;
        if (empty($co)) {
            $res = Db::name('collection')->where($where)->update(['isok'=>0,'del_time'=>time()]);
            return json_encode(WSTReturn('取消收藏',1,1));
        }else{
            $res = Db::name('collection')->where($where)->update(['isok'=>1,'del_time'=>'']);
            return json_encode(WSTReturn('收藏成功',1,-1));
        }
        
    }
    
}
