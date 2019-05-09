<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Index extends Base
{
    
    public function indexLook()
    {
        $sharerId = input('sharerId/d',0);
        $sharerUserId = input('sharerUserId/d',0);
        if ($sharerId == 0) {
            $xp = Db::name('xp')->where(['userId'=>$sharerUserId,'isok'=>])->order(SO_ADDTIME_COMMON)->limit(20)->select();
            if (empty($xp)) {
                return json_encode(WSTReturn('该主人没有更多的相片了哦！可以点击右下角按钮查看她的主页哦'));
            }
            foreach ($xp as $k => $v) {
                $xp[$k]['img'] = WEBURL.$v['img'];
            }
            // 随机音乐
            $videoList = Db::name('video')->where(['userId'=>0,'isok'=>1])->order(SO_SORT_COMMON)->select();
            $max   = count($videoList);
            $videoId = rand(0,($max-1));
            $video   = $videoList[$videoId];
            $co = 2;
            $rs['xp'] = $xp;
            $rs['video'] = $video;
            $rs['sharerUserId'] = $sharerUserId;
            $rs['co'] = $co;
        }else{
            $where['isshow']   = 1;
            $where['isSharer'] = 1;
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
            $videoId = $sharer['videoId'];
            $sharerUserId  = $sharer['userId'];
            $video   = Db::name('video')->where(['id'=>$videoId])->value('video');
            foreach ($xp as $k => $v) {
                $xp[$k]['img'] = WEBURL.$v['img'];
            }
            //判断是否已经收藏了
            $co = Db::name('collection')->where(['sharerId'=>$sharerId,'isok'=>1])->count();
            $co = empty($co)?1:0;
            $rs['xp'] = $xp;
            $rs['video'] = $video;
            $rs['sharerUserId'] = $sharerUserId;
            $rs['co'] = $co;
        }
        echo(json_encode(WSTReturn('success',1,$rs)));die;
    }

    
    
}
