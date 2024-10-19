<?php

  function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){
    $cut = imagecreatetruecolor($src_w, $src_h);
    imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h);
    imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h);
    imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct);
  }

  $str_json = file_get_contents('php://input');
  $obj_json = json_decode($str_json, true);

  $photo_x = $obj_json['x'];
  $photo_y = $obj_json['y'];

  $photo_width = $obj_json['width'];
  $photo_height = $obj_json['height'];

  $width = 1140;
  $height = 700;

  $back_file_name = "back_image.png";
  $over_file_name = "image.png";
  $image_file_name = "temp/".md5(uniqid(rand(), true)).'.png';
  $result_file_name = "process/".md5(uniqid(rand(), true)).'.jpg';

  file_put_contents($image_file_name, file_get_contents($obj_json['image']));

  $image_1 = imagecreatefrompng($back_file_name);
  $image_2 = imagecreatefrompng($image_file_name);
  $image_3 = imagecreatefrompng($over_file_name);

  $final_img = imagecreatetruecolor($width, $height);
  imagealphablending($final_img, true);
  imagesavealpha($final_img, true);

  imagecopymerge_alpha($final_img, $image_1, 0, 0, 0, 0, $width, $height, 100);
  imagecopymerge_alpha($final_img, $image_2, $photo_x, $photo_y, 0, 0, $photo_width, $photo_height, 100);
  imagecopymerge_alpha($final_img, $image_3, 0, 0, 0, 0, $width, $height, 100);

  ob_start();
  imagejpeg($final_img,$result_file_name);
  ob_end_clean();

  $result=array(
    "status"=>"Ok",
    "url"=>$result_file_name
  );

  echo json_encode($result);

  if (file_exists($image_file_name)) {
    unlink($image_file_name);
  }

?>
