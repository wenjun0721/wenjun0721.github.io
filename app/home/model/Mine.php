<?php
namespace app\home\model;
use think\Db;
use think\Session;
class Mine extends Base
{
    public function index()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$where['isshow']   = 1;
    	$sharerId = input('sharerId/d',0);
    	if ($sharerId == 0) {
    		$xp = Db::name('xp')->where($where)->order(SO_ADDTIME_COMMON)->limit(30)->select();
    	}else{
    		$sharerValue = Db::name('sharer')->where(['id'=>$sharerId,'isok'=>1])->value('sharerValue');
    		if ($sharerValue) {
    			$where['id'] = ['in',$sharerValue];
    			$xp =Db::name('xp')->where($where)->select();
    			print_r(Db::name('xp')->getlastsql());exit;
    		}else{
    			$xp = [];
    		}
    	}
    	foreach ($xp as $k => $v) {
            $xp[$k]['img'] = WEBURL.$v['img'];
        }

    	return $xp;
    }

    public function sharerCat()
    {
    	$where['userId'] = input('userId/d',0);
    	$where['isok']   = 1;
    	$res = Db::name('sharer')->where($where)->order(SO_SORT_COMMON)->select();
        if (empty($res)) {
            return json_encode(WSTReturn('点击右下图标即可创建锦集哦！'));
        }
    	foreach ($res as $k => $v) {
            $img = Db::name('sharer_img')->where(['sharerId'=>$v['id']])->order('sort asc')->value('img');
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
}
