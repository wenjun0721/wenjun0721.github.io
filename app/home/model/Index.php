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
            $xp = Db::name('xp')->where(['userId'=>$sharerUserId,'isok'=>1])->order(SO_ADDTIME_COMMON)->limit(20)->select();
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
            $video   = $videoList[$videoId]['video'];
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
            //修改查看次数
            $sharerClick = $sharer['sharerClick']+1;
            Db::name('sharer')->where($where)->update(['sharerClick'=>$sharerClick]);
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

    public function indexSharerCat()
    {
        $where['userId'] = input('sharerUserId/d',0);
        $where['isSharer']   = 1;
        $where['isshow']   = 1;
        $res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
        $cartNum = count($res);
        $addArr = ['id'=>'0','name'=>'个人最新'];
        array_unshift($res, $addArr);

        $arr = [];
        foreach ($res as $k => $v) {
            $arr[$k]['name'] = $v['name'];
            $arr[$k]['id'] = $v['id'];
        }
        $rs['arr'] = $arr;
        $rs['cartNum'] = $cartNum;
        echo(json_encode(WSTReturn('success',1,$rs)));die;
    }

    public function sharerLsit()
    {
        $page = input('page/d',0);
        $where['isshow']   = 1;
        $where['isSharer'] = 1;
        //判断锦集是否能被查看
        $data = Db::name('sharer')->where($where)->order('sort asc , sharerClick desc, sharerLove desc, id desc')
                      ->paginate()->toArray();
        foreach ($data['data'] as $k => $v) {
            $data['data'][$k]['sharerImg'] = WEBURL.$v['sharerImg'];
            $userInfo = Db::name('users')->where(['userId'=>$v['userId']])->find();
            $data['data'][$k]['userImg'] = $userInfo['userImg'];
            $data['data'][$k]['userName'] = $userInfo['userName'];
            $data['data'][$k]['userAddress'] = $userInfo['userAddress'];
        }
        echo(json_encode(WSTReturn('success',1,$data)));die;
    }

    public function sharerLove()
    {
        //修改点赞次数
        $where['id'] = input('id');
        Db::name('sharer')->where($where)->setInc('sharerLove');
        echo(json_encode(WSTReturn('success',1)));die;
    }
    
}
