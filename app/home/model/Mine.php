<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Mine extends Base
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

    public function sharerCat()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
        if (empty($res)) {
            return json_encode(WSTReturn('点击右下图标即可创建锦集哦！'));
        }
    	foreach ($res as $k => $v) {
            $img = Db::name('sharer_img')->where(['sharerId'=>$v['id'],'isok'=>1])->order('sort asc')->value('img');
            if ($img) {
                $res[$k]['bgImg'] = WEBURL.$img;
            }else{
                $res[$k]['bgImg'] = WEBURL.'upload/common/logo.png';
            }
        }
    	return json_encode(WSTReturn('success',1,$res));
    }

    public function sharerCatAdd()
    {
        $userId = input('userId/d',0);
        $id = input('id/d',0);
        $name = input('name');
        if (empty(trim($name))) {
            return json_encode(WSTReturn('无效的锦集名称！'));
        }
        $data['userId'] = $userId;
        $data['name'] = $name;
        if ($id) {
            $res = Db::name('sharer')->where(['id'=>$id])->update($data);
            $tips = '修改';
        }else{
            $data['add_time'] = time();
            $res = Db::name('sharer')->insert($data);
            $tips = '添加';
        }
        
        if ($res) {
            return json_encode(WSTReturn($tips.'成功',1));
        }else{
            return json_encode(WSTReturn($tips.'失败'));
        }
    }

    public function sharerCatDel()
    {
        $userId = input('userId/d',0);
        $id = input('id/d',0);
        if (empty($id)) {
            return json_encode(WSTReturn('无效的锦集！'));
        }
        $where['userId'] = $userId;
        $where['id'] = $id;
        $res = Db::name('sharer')->where($where)->update(['isok'=>0,'del_time'=>time()]);
        if ($res) {
            return json_encode(WSTReturn('删除成功',1));
        }else{
            return json_encode(WSTReturn('删除失败'));
        }
    }

    public function sharerImgMove()
    {
        $data = input();
        $imgs = $data['data'];
        $i = 1;
        foreach ($imgs as $k => $v) {
            Db::name('sharer_img')->where(['id'=>$v['id']])->update(['sort'=>$i]);
            $i++;
        }
        return 1;
    }

    public function sharerImgDel()
    {
        $userId = input('userId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要删除的图片'));
        }
        $where['userId'] = $userId;
        $where['id'] = ['in',$ids];
        $res = Db::name('sharer_img')->where($where)->update(['isok'=>0,'del_time'=>time()]);
        if ($res) {
            return json_encode(WSTReturn('删除成功',1));
        }else{
            return json_encode(WSTReturn('删除失败'));
        }
    }

    public function allXp()
    {
        $userId = input('userId/d',0);
        if (empty($userId)) {
            return json_encode(WSTReturn('亲，请关闭小程序，重新进入'));
        }
        $where['userId'] = $userId;
        $where['isok']   = 1;
        $where['isshow']   = 1;
        $sharerId = input('sharerId/d',0);
        $sharerWhere['sharerId']=$sharerId;
        $sharerWhere['isok']   = 1;
        $sharerWhere['userId'] = $userId;
        $sharer_img = Db::name('sharer_img')->where($sharerWhere)->select();
        $sharer_ids = '';
        foreach ($sharer_img as $k => $v) {
            $sharer_ids .= $v['xpId'].',';
        }
        if (!empty($sharer_ids)) {
            $sharer_ids = rtrim($sharer_ids,',');
            $where['id']   = ['not in',$sharer_ids];
        }
        $xp = Db::name('xp')->where($where)->order(SO_ADDTIME_COMMON)->select();
        foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
            $xp[$k]['select'] = false;
        }
        return $xp;
    }

    public function sharerImgadd()
    {
        $userId = input('userId/d',0);
        $sharerId = input('sharerId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要添加的图片'));
        }
        $where['userId'] = $userId;
        $where['id'] = ['in',$ids];
        $where['isok'] = 1;
        $where['isshow']   = 1;
        $res = Db::name('xp')->where($where)->select();
        foreach ($res as $k => $v) {
            $data[$k]['sharerId'] = $sharerId;
            $data[$k]['userId'] = $userId;
            $data[$k]['xpId'] = $v['id'];
            $data[$k]['img'] = $v['img'];
            $data[$k]['add_time'] = time()+$k*1;
        }
        $k = Db::name('sharer_img')->insertAll($data);
        if ($k) {
            return json_encode(WSTReturn('删除成功',1));
        }else{
            return json_encode(WSTReturn('删除失败'));
        }
    }

    public function sharerVideoList()
    {
        $where['userId'] = input('userId/d',0);
        $where['isok']   = 1;
        $res = Db::name('video')->where($where)->order(SO_ADDTIME_COMMON)->select();
        if ($res) {
            $addArr = Db::name('video')->where(['userId'=>0,'isok'=>1])->order(SO_RECOM_COMMON)->select();
            $res = array_merge($addArr, $res);
        }else{
            $res = Db::name('video')->where(['userId'=>0,'isok'=>1])->order(SO_RECOM_COMMON)->select();
        }

        //判断锦集是否有背景音乐了
        $sharerId = input('sharerId/d',0);
        $videoId = Db::name('sharer')->where(['id'=>$sharerId])->value('videoId');
        $arr = [];
        $index = 0; 
        foreach ($res as $k => $v) {
            $arr[$k]['video_name'] = $v['video_name'];
            $arr[$k]['id'] = $v['id'];
            $arr[$k]['video'] = $v['video'];
            if (!empty($videoId) && $v['id'] == $videoId) {
               $index = $k; 
            }
        }
        $rs['arr'] = $arr;
        $rs['index'] = $index;
        return $rs;
    }

    public function sharervideochange()
    {
        $userId = input('userId/d',0);
        $sharerId = input('sharerId/d',0);
        $videoId = input('videoId/d',1);
        $where['userId'] = $userId;
        $where['isok'] = 1;
        $where['id']   = $sharerId;
        $k = Db::name('sharer')->where($where)->update(['videoId'=>$videoId]);
        if ($k) {
            return json_encode(WSTReturn('更换成功',1));
        }else{
            return json_encode(WSTReturn('更换失败'));
        }
    }
}
