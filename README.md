# skyeditor
skyeditor 简单的手机端web编辑器
# 使用方法
<meta charset="UTF-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" name="viewport" />

<div style="margin-bottom:10px">skyEditor-手机端编辑器 </div>
<div class="sky-editor-content" contenteditable="true"></div>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="http://www.deitui.com/plugin/lrz/lrz.bundle.js"></script>
<script src="skyeditor.js"></script>
 
# 配置方法
    //编辑器位置
    skyeditor.root = "http://" + document.domain + "/plugin/skyeditor/";
    //图片上传地址
    skyeditor.uploadUrl = "/shop.php?m=upload&a=uploadTao";
    //视频上传地址
    skyeditor.uploadVideo="/shop.php?m=upload&a=UploadVideo";

 
