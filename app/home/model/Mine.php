<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Mine extends Base
{
    public function sharerCat()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
        if (empty($res)) {
            return json_encode(WSTReturn('点击右下图标即可创建锦集哦！'));
        }
    	foreach ($res as $k => $v) {
            $img = Db::name('sharer_img')->where(['sharerId'=>$v['id'],'isok'=>1])->order(SO_SORT_COMMON)->value('img');
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
        $res = Db::name('sharer_img')->where(['sharerId'=>$id])->update(['isok'=>0,'del_time'=>time()]);
        $res = Db::name('xp')->where(['sharerCatId'=>$id])->update(['sharerCatId'=>0]);
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
        $rs  = Db::name('sharer_img')->where($where)->select();
        foreach ($rs as $k => $v) {
            Db::name('xp')->where(['id'=>$v['xpId']])->update(['sharerCatId'=>0]);
        }
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
        //改变逻辑，就是添加了锦集的图片不再出现。否则显示下面这段
        // $where['userId'] = $userId;
        // $where['isok']   = 1;
        // $where['isshow']   = 1;
        // $sharerId = input('sharerId/d',0);
        // $sharerWhere['sharerId']=$sharerId;
        // $sharerWhere['isok']   = 1;
        // $sharerWhere['userId'] = $userId;
        // $sharer_img = Db::name('sharer_img')->where($sharerWhere)->select();
        // $sharer_ids = '';
        // foreach ($sharer_img as $k => $v) {
        //     $sharer_ids .= $v['xpId'].',';
        // }
        // if (!empty($sharer_ids)) {
        //     $sharer_ids = rtrim($sharer_ids,',');
        //     $where['id']   = ['not in',$sharer_ids];
        // }
        $where['userId'] = $userId;
        $where['isok']   = 1;
        $where['isshow']   = 1;
        $where['sharerCatId']   = 0;
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
            Db::name('xp')->where($where)->update(['sharerCatId'=>$sharerId]);
            return json_encode(WSTReturn('添加成功',1));
        }else{
            return json_encode(WSTReturn('添加失败'));
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

    public function sharerOne()
    {
        $where['userId'] = input('userId/d',0);
        $where['isSharer']   = 1;
        $where['isshow']   = 1;
        $res = Db::name('sharer')->where($where)->order(['sort asc,sharer_time desc,id desc'])->select();
        if (empty($res)) {
            return json_encode(WSTReturn('亲，您分享过任何的锦集呢,可以去‘我的锦集’那里进行分享哦，么么哒！'));
        }
        foreach ($res as $k => $v) {
            $img = Db::name('sharer_img')->where(['sharerId'=>$v['id'],'isshow'=>1])->order('sort asc,id desc')->limit(1)->value('img');
            if ($img) {
                $res[$k]['bgImg'] = WEBURL.$img;
                $res[$k]['select'] = false;
            }
        }
        return json_encode(WSTReturn('success',1,$res));
    }

    public function sharerOneRead()
    {
        $sharerId = input('sharerId/d',0);
        $where['isshow']   = 1;
        $where['isSharer'] = 1;
        $where['id']   = $sharerId;

        $sharerWhere['sharerId']=$sharerId;
        $sharerWhere['isshow']   = 1;
        //判断锦集是否能被查看
        $sharer = Db::name('sharer')->where($where)->find();
        $xp = Db::name('sharer_img')->where($sharerWhere)->order(SO_SORT_COMMON)->limit(30)->select();
        //获取音乐ID
        $videoId = $sharer['videoId'];
        $video   = Db::name('video')->where(['id'=>$videoId])->value('video');
        foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
        }
        $rs['xp'] = $xp;
        $rs['video'] = $video;
        echo(json_encode(WSTReturn('success',1,$rs)));die;
    }

    public function sharerOneDel()
    {
        $userId = input('userId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要删除的分享'));
        }
        $where['userId']   = $userId;
        $where['id'] = ['in',$ids];
        Db::name('sharer')->where($where)->update(['isshow'=>0,'sharer_time'=>'']);
        $sharerwhere['userId']   = $userId;
        $sharerwhere['sharerId'] = ['in',$ids];
        Db::name('sharer_img')->where($sharerwhere)->update(['isshow'=>0]);
        
        return json_encode(WSTReturn('success',1));
    }

    public function sharerHB(){
        $sharerId = input('sharerId/d',0);
        //先判断该锦集是否已經生成過二維碼了，如果有，直接合成
        $res = Db::name('sharer')->where(['id'=>$sharerId])->find();
        $c = new \app\home\controller\Code();
        if (empty($res['sharerCode'])) {
            $data['sharerId'] = $sharerId;
            $data['sharerUserId'] = $res['userId'];
            $sharerCode = $c->qrcode($data);
            $res['sharerCode'] = $sharerCode;
            Db::name('sharer')->where(['id'=>$sharerId])->update(['sharerCode'=>$sharerCode]);
        }
        //合成小程序海报
        $dataCode['sharerId'] = $sharerId;
        $dataCode['sharerUserId'] = $res['userId'];
        $dataCode['sharerCode'] = $res['sharerCode'];
        $dataCode['backGroundImg'] = input('src');
        $filename = $c->getCodeGoodsImg($dataCode);
        return json_encode(WSTReturn('success',1,$filename));
    }

    

    // public function ce(){
    //     $c = new \app\home\controller\Code();
    //     $sharerCode = ROOT_PATH .'upload/index/1.jpg';
    //     $res = $c->thumb($sharerCode);
    //     return json_encode(WSTReturn('success',1,$res));
    // }

    public function userXp(){
        $userId = input('userId/d',0);  
        $where['userId']   = $userId;
        $where['isshow']   = 1;
        $where['isok']   = 1;
        $res = Db::name('xp')->where($where)->order(SO_SORT_COMMON)->select();
        if (empty($res)) {
            return json_encode(WSTReturn('亲，你没有任何的相片哦'));
        }else{
            foreach ($res as $k => $v) {
                $res[$k]['img'] = WEBURL.$v['img'];
                $res[$k]['select'] = false;
            }
            return json_encode(WSTReturn('success',1,$res));
        }
    }

    public function userDelXp()
    {
        $userId = input('userId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要删除的图片'));
        }
        $where['userId']   = $userId;
        $where['id'] = ['in',$ids];
        Db::name('xp')->where($where)->update(['isok'=>0,'isshow'=>0,'del_time'=>time()]);
        return json_encode(WSTReturn('success',1));
    }

    public function userBC(){
        $userId = input('userId/d',0);  
        $where['userId']   = $userId;
        $where['isshow']   = 1;
        $where['isok']   = 1;
        $res = Db::name('background_cat')->where($where)->order('add_time desc, catId desc')->select();
        $addArr = ['catId'=>'0','catName'=>'默认分类'];
        array_unshift($res, $addArr);
        return json_encode(WSTReturn('success',1,$res));
    }

    public function userBX(){
        $userId = input('userId/d',0);  
        $catId = input('catId/d',0);  
        $where['userId']   = $userId;
        $where['isok']   = 1;
        $where['isshow']   = 1;
        $where['ischeck']   = 1;
        $where['catId']   = $catId;
        $res = Db::name('background')->where($where)->order(SO_SORT_COMMON)->select();
        if (empty($res)) {
            if ($catId == 0) {
                $tips = '亲，你没有上传过任何的背景图哦';
            }else{
                $tips = '亲，此分类没有任何的背景图哦';
            }
            return json_encode(WSTReturn($tips));
        }else{
            foreach ($res as $k => $v) {
                $res[$k]['img'] = WEBURL.$v['img'];
                $res[$k]['select'] = false;
            }
            return json_encode(WSTReturn('success',1,$res));
        }
    }

    public function userBCDel()
    {
        $userId = input('userId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要删除的背景图'));
        }
        $where['userId']   = $userId;
        $where['id'] = ['in',$ids];
        Db::name('background')->where($where)->update(['isok'=>0,'isshow'=>0,'ischeck'=>0,'del_time'=>time()]);
        return json_encode(WSTReturn('success',1));
    }

    public function userAddBC()
    {
        $userId = input('userId/d',0);
        $catId  = input('catId/d',0);
        $showModalName = input('showModalName');
        if (empty(trim($showModalName)) || trim($showModalName) == '默认分类') {
            return json_encode(WSTReturn('无效的分类名称！'));
        }
        //先查询是否有相同的名称
        $catNameCount = Db::name('background_cat')->where(['userId'=>$userId,'catName'=>$showModalName])->count();
        if ($catNameCount) {
            return json_encode(WSTReturn('亲，已存在该分类名称！'));
        }
        $data['catName'] = trim($showModalName);
        $data['userId'] = $userId;
        if ($catId) {
            $res = Db::name('background_cat')->where(['catId'=>$catId])->update($data);
            $tips = '修改';
        }else{
            $data['add_time'] = time();
            $res = Db::name('background_cat')->insert($data);
            $tips = '新增';
        }
        
        if ($res) {
            return json_encode(WSTReturn($tips.'成功',1));
        }else{
            return json_encode(WSTReturn($tips.'失败'));
        }
    }

    public function userDelBC()
    {
        $userId = input('userId/d',0);
        $catId  = input('catId/d',0);
        if (empty($catId)) {
            return json_encode(WSTReturn('无效的分类！'));
        }
        $where['userId'] = $userId;
        $where['catId'] = $catId;
        $res = Db::name('background_cat')->where($where)->delete();
        if ($res) {
            Db::name('background')->where(['catId'=>$catId])->update(['catId'=>0]);
            return json_encode(WSTReturn('删除成功',1));
        }else{
            return json_encode(WSTReturn('删除失败'));
        }
    }

    public function userBM()
    {
        $userId = input('userId/d',0);
        $catId = input('moveCatId/d',0);
        $ids = input('Ids','');
        if (empty($ids)) {
            return json_encode(WSTReturn('请选择要移动的背景图'));
        }
        $where['userId']   = $userId;
        $where['id'] = ['in',$ids];
        Db::name('background')->where($where)->update(['catId'=>$catId]);
        return json_encode(WSTReturn('success',1));
    }

    public function userSaveB()
    {
        $userId = input('userId/d',0);
        $img = input('images');
        $img = str_replace(WEBURL,"",$img);
        $data['userId'] = $userId;
        $data['img'] = $img;
        $data['add_time'] = time();
        Db::name('background')->insert($data);
        return json_encode(WSTReturn('上传成功',1));
    }
}
