<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('diff_humanize'))
{
    function diff_humanize($datetime=null)
    {
        if(empty($datetime)){
            $datetime = date("Y-m-d h:i:s");
        }

        $lasttime = time() - strtotime($datetime);

        if($lasttime < 1 )
            return 'beberapa saat yang lalu.';

        $condition = array(
            31104000    =>  'tahun',
            2592000     =>  'bulan',
            86400       =>  'hari',
            3600        =>  'jam',
            60          =>  'menit',
            1           =>  'detik'
        );

        foreach($condition as $secs => $str){
            $d = $lasttime / $secs;

            if($d >= 1){
                $r = round($d);
                return $r.' '.$str.' yang lalu.';
            }
        }
    }
}

/* End of file general_helper.php */