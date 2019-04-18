<?php
namespace app\home\controller;
use app\home\model\Looklove as L;
class Looklove extends Base
{
    public function index()
    {
    	$l = new L();
    	$res = $l->index();
    	echo(json_encode(WSTReturn('success',1,$res)));die;
    }
}
