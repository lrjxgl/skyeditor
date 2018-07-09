# skyeditor
skyeditor 简单的手机端web编辑器
# 使用方法

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

 
