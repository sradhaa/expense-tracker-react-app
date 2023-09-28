function getChannelCardData($user_id,$id,$limit1 ,$limit2 ,$is_ajax=false)
{
$idArr = array(); $rec = array(); $flashData = array(); $flashDataArr = array();
$search = "";
//$limit1=0;
//$limit2=60;
//if($limit >0){
// $limit1=$limit+60;
//$limit2=60;
//}
if(isset($_POST['lang']))
$lang =$_POST['lang'];
else
$lang = SELECTED_LANGUAGE;
$search .= " AND user_id=".$user_id." ";
if($id!=0)
{

if($is_ajax){
$search .= " AND id < $id"; }else{ $search .=" AND id <= $id" ; } // $limit=LOADMORE_LIMIT; } $order='DESC' ;
    $qry="SELECT `id`, `news_title`, `news_link`, `news_desc`, `channel_name`,`channel_id`, `user_name`,`user_id`, `image_link`, `media_type`, `view_count`, `like_count`, `comment_count`, `share_count`, `download_count`, `save_count`, `duration`, `video_key`, `embed_code`,`added_on`, `news_language`, `news_category` FROM trends_stories WHERE news_language='"
    .$lang."' AND (media_type=1 ) ".$search." ORDER BY added_on $order LIMIT $limit1,$limit2";
    //news_category='flash-card' AND OR media_type=2 OR media_type=3 OR media_type=4 $sql=$this->execute_query($qry);
    $rec = $sql->fetchAll(PDO::FETCH_ASSOC);
    // echo '
    <pre>';print_r($rec); exit;
           if(!empty($rec)){
            $userImage = $this->getUserImages($rec);
           
          // echo '<pre>';print_r($userImage); exit;
            foreach($rec as $key=>$r)
            {
                if($r['like_count']<=0)$r['like_count']='';
                if($r['share_count']<=0)$r['share_count']='';
                if($r['download_count']<=0)$r['download_count']='';
                if($r['comment_count']<=0)$r['comment_count']='';
                if($r['save_count']<=0)$r['save_count']='';
                $flashData[$key] = $r;
                $flashData[$key]['added_on_text'] = $this->time_elapsed_string($r['added_on']);
                $flashData[$key]['user_image'] = (empty($userImage[$r['user_id']])) ? "" : $userImage[$r['user_id']];
                $idArr[]=$r['id'];
            }
            if(count($idArr)>0)$userActivity = $this->getUserCardActivity(implode(",",$idArr));
            foreach($flashData as $key=>$r)
            {
                $flashDataArr[$key] = $r;
                if(isset($userActivity[$key]['user']['userlike']))
                {
                    if( strpos( $userActivity[$key]['user']['userfollow'], $flashData[$key]['channel_id'] ) !== false)
                        $userActivity[$key]['user']['userfollow']=1;
                    else
                        $userActivity[$key]['user']['userfollow']=0;
                    $flashDataArr[$key]['user'] =$userActivity[$key]['user'];
                }
                else
                {
                     $uarr['userlike'] = 0;
                     $uarr['userdown'] = 0;
                     $uarr['usercomment'] = 0;
                     $uarr['usershare'] = 0;
                     $uarr['usersave'] = 0;
                     $uarr['userfollow'] = '';
                     $flashDataArr[$key]['user'] =$uarr;
                }
                $hashtags = explode('$$$',$this->getHashTags($r['id'],$lang));

                $flashDataArr[$key]['hashtags'] = $hashtags[0];
                $flashDataArr[$key]['item_category'] = str_replace(' ','-',strtolower($hashtags[1]));
            }
            
    }

        // echo "<pre>";  print_r($flashDataArr);echo "</pre>";
    return $flashDataArr;
    }