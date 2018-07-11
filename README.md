# skyeditor
skyeditor 简单的手机端web编辑器
# 使用方法
<<<<<<< HEAD
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
=======

    <div class="sky-editor-content" contenteditable="true"></div>
    <script src="/plugin/jquery/jquery.js"></script>
    //上传压缩图片
    <script src="/plugin/lrz/lrz.bundle.js"></script>
    <script src="skyeditor.js"></script>
# 配置方法
    //上传图片
    skyeditor.uploadUrl = "/index.php?m=upload&a=base64";
    //上传视频
	skyeditor.uploadVideo = "/index.php?m=upload&a=uploadmp4";
    //配置颜色
	skyeditor.colors=['#1ebdc0','#f8375b','#fd8f43','#a4ce3b','#35dab6','#199de1','#9581f3','#333','#8f8f94'];
    //配置工具栏
	skyeditor.tools=["h3","pic","color","B","video","emoji","center"];
    //初始化
	skyeditor.init();
>>>>>>> e644fbab7e7e4c6f2a744e2d0a0e9908c6596eac

 
