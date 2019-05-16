<?php
namespace app\home\controller;
use app\home\model\Mine as M;
class Mine extends Base
{
    public function index()
    {
    	$m = new M();
    	$res = $m->index();
    	if (empty($res)) {
    		echo(json_encode(WSTReturn('暂无内容，请先去添加哦，么么哒')));die;
    	}
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharerCat(){
    	$m = new M();
    	$res = $m->sharerCat();
        return $res;
    }

    public function sharerCatAdd(){
        $m = new M();
        return $m->sharerCatAdd();
    }

    public function sharerCatDel(){
        $m = new M();
        return $m->sharerCatDel();
    }

    public function sharerImgMove(){
        $m = new M();
        $res = $m->sharerImgMove();
        echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharerImgDel(){
        $m = new M();
        return $m->sharerImgDel();
    }

    public function allXp(){
        $m = new M();
        $res = $m->allXp();
        if (empty($res)) {
            echo(json_encode(WSTReturn('没有相片可选择啦，请先去添加哦，么么哒')));die;
        }
        echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharerImgadd(){
        $m = new M();
        return $m->sharerImgadd();
    }

    public function sharerVideoList(){
        $m = new M();
        $res = $m->sharerVideoList();
        echo(json_encode(WSTReturn('success',1,$res)));die;
    }

    public function sharervideochange(){
        $m = new M();
        return $m->sharervideochange();
    }

    public function sharerOne(){
        $m = new M();
        return $m->sharerOne();
    }

    public function sharerOneRead(){
        $m = new M();
        return $m->sharerOneRead();
    }

    public function sharerOneDel(){
        $m = new M();
        return $m->sharerOneDel();
    }

    public function sharerHB(){
        $m = new M();
        return $m->sharerHB();
    }

    // public function ce(){
    //     $m = new M();
    //     return $m->ce();
    // }

    public function userXp(){
        $m = new M();
        return $m->userXp();
    }

    public function userDelXp(){
        $m = new M();
        return $m->userDelXp();
    }

    public function userBC(){
        $m = new M();
        return $m->userBC();
    }

    public function userBX(){
        $m = new M();
        return $m->userBX();
    }

    public function userBCDel(){
        $m = new M();
        return $m->userBCDel();
    }

    public function userAddBC(){
        $m = new M();
        return $m->userAddBC();
    }

    public function userDelBC(){
        $m = new M();
        return $m->userDelBC();
    }

    public function userBM(){
        $m = new M();
        return $m->userBM();
    }

    public function userUpFile(){
        require(ROOT_PATH.'/vendor/topthink/think-image/src/Image.php');
        if ($_FILES['file']['type'] != 'image/png' && $_FILES['file']['type'] != 'image/gif' &&$_FILES['file']['type'] != 'image/x-ms-bmp' &&$_FILES['file']['type'] != 'image/jpeg') {
            echo(json_encode(WSTReturn('只允许上传jpg,gif,png,bmp类型的文件')));die;
        }
        if ($_FILES['file']['size']*1 > '5097152') {
            echo(json_encode(WSTReturn('文件大小超出5M')));die;
        }
        $ds = 'upload/background/'.input('userId/d','z').'/'.date('Ymd');
        $dir = iconv("UTF-8", "GBK", './'.$ds);
        if (!file_exists($dir)){
            mkdir ($dir,0777,true);
        }
        // 页面
        $fileName = $ds.'/'. time().rand(10000,100000).'.png';
        $image = \think\Image::open($_FILES['file']['tmp_name']);
        if ($image->width() != 640 || $image->height() != 960) {
            $image->thumb('640','960',1);
        }
        $path="./".$fileName;
        $image->save($path);
        return json_encode(WSTReturn('success',1,WEBURL.$fileName));
    }

    public function userDelBN(){
        $img = input('images');
        $img = str_replace(WEBURL,"./",$img);
        @unlink('./'.$img);
    }

    public function userSaveB(){
        $m = new M();
        return $m->userSaveB();
    }
}
