
var skyeditor = {};
skyeditor.isfirst=true;
skyeditor.root = "http://" + document.domain + "/plugin/skyeditor/";
skyeditor.uploadUrl = "/shop.php?m=upload&a=base64";
skyeditor.uploadVideo = "/shop.php?m=upload&a=UploadVideo";
skyeditor.colors=['#1ebdc0','#f8375b','#fd8f43','#a4ce3b','#35dab6','#199de1','#9581f3','#333','#8f8f94'];
skyeditor.html='<div style="height: 50px;"></div><div class="sky-editor-loading">上传中...</div><div class="sky-editor">	<div class="sky-editor-colors">			</div>	<div class="sky-editor-emojis">			</div>	<div class="sky-editor-tools">		</div>	<input type="file" id="sky-editor-file" name="upimg" multiple="multiple" style="display: none;" />	<input type="file" id="sky-editor-file-video" name="upimg" style="display: none;" /></div>';
skyeditor.skyUpload = function (upid, url, success, error, uploadProgress) {
    var vFD = new FormData();
    var f = document.getElementById(upid).files;
    $("#" + upid + "loading").show();
    for (var i = 0; i < f.length; i++) {
        vFD.append('upimg', document.getElementById(upid).files[i]);
        // create XMLHttpRequest object, adding few event listeners, and POSTing our data
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', success, false);
        oXHR.addEventListener('error', error, false);
        if (uploadProgress != undefined) {
            oXHR.upload.addEventListener("progress", uploadProgress, false);
        }
        oXHR.open('POST', url);
        oXHR.send(vFD);

    }
}
skyeditor.init = function () {
   	if(skyeditor.isfirst){ 
    	$("<link>")
        .attr({
            rel: "stylesheet",
            type: "text/css",
            href: skyeditor.root + "skyeditor.css"
        }).appendTo("head");
		$("body").append(skyeditor.html);
		skyeditor.isfirst=false;
	} 
    skyeditor.skyEmojis();   
	skyeditor.setColors();
    skyeditor.setTools();
    

}
 
skyeditor.setColors=function(){
	var html='';	
	for(var i in skyeditor.colors){
		html=html+'<div class="sky-editor-excute" style="background-color:'+skyeditor.colors[i]+';" data-role="ForeColor"></div>';
	}
	$(".sky-editor-colors").html(html);
}

skyeditor.tools=["h3","pic","color","B","video","emoji","center"];
skyeditor.setTools=function(){
	var html='';
	 
	for(var i in skyeditor.tools){
		switch(skyeditor.tools[i]){
			case "h3":
				html=html+'<div class="sky-editor-tools-item sky-editor-excute"  data-role="h3">h3</div>';
				break;
			case "pic":
				html=html+'<div class="sky-editor-tools-item sky-editor-img"><i class="skyeditor-iconfont skyeditor-icon-pic"></i> </div>'
				break;
			case "color":
				html=html+'<div class="sky-editor-tools-item sky-editor-colors-toggle">&nbsp; <span class="sky-editor-color"></span> </div>';
				break;
			case "B":
				html=html+'<div class="sky-editor-tools-item sky-editor-excute" data-role="bold">B</div>';
				break;
			case "video":
				html=html+'<div class="sky-editor-tools-item sky-editor-video"><i class="skyeditor-iconfont skyeditor-icon-video"></i> </div>';
				break;
			case "emoji":
				html=html+'<div class="sky-editor-tools-item sky-editor-emoji-toggle"><i class="skyeditor-iconfont skyeditor-icon-emoji"></i></div>';
				break;
			case "center":
				html=html+'<div class="sky-editor-tools-item sky-editor-excute" data-role="center"><i class="skyeditor-iconfont skyeditor-icon-centor"></i></div>';
				break;
		}
	}
	$(".sky-editor-tools").html(html);
}

skyeditor.skyEmojis=function() {
    var html = '';
    for (var i = 0; i < 84; i++) {
        var pos = i * 36 - i;
        html += '<div class="sky-editor-emoji" style="background-position:left -' + pos + 'px;"></div>';
    }
    $(".sky-editor-emojis").html(html);
}
$(function () {
    skyeditor.init();
    skyeditor.skyEl = $(".sky-editor-content");

    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, false);
    $(document).on("click", ".sky-editor-emoji-toggle", function () {
        $(".sky-editor-emojis").toggle();
    })
    $(document).on("click", ".sky-editor-emoji", function () {
        var index = $(this).index() + 1;
        var indexTag = "";
        if (index > 9) {
            indexTag = "j_00" + index;
        } else {
            indexTag = "j_000" + index;
        }
        skyeditor.skyEl.append('<img src="' + skyeditor.root + 'images/jx2/' + indexTag + '.gif" />');
        $(".sky-editor-emojis").hide();
    })
    $(document).on("click", ".sky-editor-colors-toggle", function () {
        $(".sky-editor-colors").toggle();
    })
    $(document).on("click", ".sky-editor-img", function () {
        $("#sky-editor-file").click();
    })
    $(document).on("click", ".sky-editor-video", function () {
        $("#sky-editor-file-video").click();
    })
    $(document).on("change", "#sky-editor-file-video", function () {
    	$(".sky-editor-loading").show();
        skyeditor.skyUpload("sky-editor-file-video", skyeditor.uploadVideo, function (e) {
            var res = JSON.parse(e.target.responseText);
			$(".sky-editor-loading").hide();
            if (res.error) {
                mui.toast(res.error);
            } else {
                var html = '&nbsp; &nbsp;<video controls  style="max-width:100%;" src="' + res.trueimgurl +
                    '"></video>&nbsp; &nbsp;</br>';
                skyeditor.skyEl.append(html);
                
            }
        })
    })

    $(document).on('change', '#sky-editor-file',function () {
        var that = this;
		$(".sky-editor-loading").show();
        lrz(that.files[0], {
                width: 1024
            })
            .then(function (rst) {
                $.post(skyeditor.uploadUrl, {
                    content: rst.base64
                }, function (data) {
					$(".sky-editor-loading").hide();
                    if (data.error == 0) {
                        var html = '<img src="' + data.trueimgurl + '"> &nbsp;';
                        skyeditor.skyEl.append(html);
                    }
					
                }, "json");
            })

    })
    $(document).on("click", ".sky-editor-content", function () {
        if ($(".sky-editor-content div").length == 0) {
            $(".sky-editor-content").prepend('<div style="color:#555;">&nbsp;</div>')
        }
        skyeditor.skyEl = $(this).find("div").eq(0);

    })
    $(document).on("click", ".sky-editor-content div", function (e) {
        e.stopPropagation();
        skyeditor.skyEl = $(this);
        var color = $(".sky-editor-color").css("background-color");
        if ($(this).css("color") != color) {
            $(this).css("color", color);
        }
    })
    $(document).on("keyup", ".sky-editor-content", function (event) {
        
        if (event.keyCode == "13"){     	 
        	setTimeout(function(){
        		if(skyeditor.skyEl.next().length>0){
        			skyeditor.skyEl = skyeditor.skyEl.next();
        		}	
        	},60) 	
        	return false;
        }
        
        
    })

    $(document).on("click", '.sky-editor-excute', function (e) {
        $(this).toggleClass("active");

        switch ($(this).data('role')) {

            case 'h3':
                if ($(this).hasClass("active")) {
                    skyeditor.skyEl.css({
                        fontSize: "16px",
                        fontWeight: "600",
                        "padding": "8px 0px"
                    });
                } else {
                    skyeditor.skyEl.css({
                        fontSize: "14px",
                        fontWeight: "400",
                        "padding": "0"
                    });
                }

                break;
            case "bold":

                if ($(this).hasClass("active")) {
                    skyeditor.skyEl.css("font-weight", "bolder");
                } else {
                    skyeditor.skyEl.css("font-weight", "inherit");
                }

                break;
            case "center":

                if ($(this).hasClass("active")) {
                    skyeditor.skyEl.css("text-align", "center");
                } else {
                    skyeditor.skyEl.css("text-align", "left");
                }

                break;
            case "ForeColor":
                var color = $(this).css("background-color");
                $(".sky-editor-color").css("background-color", color);
                console.log(skyeditor.skyEl.html());
                skyeditor.skyEl.css("color", color);
                $(".sky-editor-colors").hide();
                break;

        }

    })
});
