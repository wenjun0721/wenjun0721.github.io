<?php
namespace app\home\controller;
use think\Loader;
use think\Cache;
use think\Controller;
use app\home\model\Index as I;
class Index extends Base
{
    public function index()
    {
    	print_r(111);exit;
    }

    public function indexLook()
    {
    	$i = new I();
        return $i->indexLook();
    }

    public function indexSharerCat()
    {
    	$i = new I();
        return $i->indexSharerCat();
    }

    public function sharerLsit()
    {
        $i = new I();
        return $i->sharerLsit();
    }

    public function sharerLove()
    {
        $i = new I();
        return $i->sharerLove();
    }

    public function getOpenId(){
        $data = input('get.');
        $rs=array();
        if($data){
            $res = $this->getUserInfo($data);
            if ($res['status'] == 1) {
                $i = new I();
                $rs = $i->getUserInfoData($res['rs']);
            }else{
                $rs = $res;
            }
        }
        return json_encode(WSTReturn('success',1,$rs));
    }
}
