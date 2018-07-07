var skyEL;
var skyeditor = {};
skyeditor.root = "http://" + document.domain + "/plugin/skyeditor/";
skyeditor.uploadUrl = "/shop.php?m=upload&a=uploadTao";
skyeditor.uploadVideo="/shop.php?m=upload&a=UploadVideo";
skyeditor.skyUpload=function(upid,url,success,error,uploadProgress)
{
		 var vFD = new FormData();
		 var f= document.getElementById(upid).files;
		 $("#"+upid+"loading").show();
		 for(var i=0;i<f.length;i++){ 
		vFD.append('upimg', document.getElementById(upid).files[i]);
		// create XMLHttpRequest object, adding few event listeners, and POSTing our data
		var oXHR = new XMLHttpRequest();        
		oXHR.addEventListener('load', success, false);
		oXHR.addEventListener('error', error, false);
		if(uploadProgress!=undefined){
			oXHR.upload.addEventListener("progress", uploadProgress, false);
		}
		oXHR.open('POST',url);
		oXHR.send(vFD);
	
		 }
}
skyeditor.init=function(){
	$("<link>")
	.attr({ rel: "stylesheet",
		type: "text/css",
		href: skyeditor.root+"skyeditor.css"
	}).appendTo("head");
	$.get(skyeditor.root+"skyeditor.html",function(data){
		$("body").append(data);
		skyEmojis();
	})
	
}
function skyEmojis() {
    var html = '';
    for (var i = 0; i < 84; i++) {
        var pos = i * 36 - i;
        html += '<div class="sky-editor-emoji" style="background-position:left -' + pos + 'px;"></div>';
    }
    $(".sky-editor-emojis").html(html);
}
$(function () {
	skyeditor.init();
    skyEl = $(".sky-editor-content");
    
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
        skyEl.append('<img src="' + skyeditor.root + 'images/jx2/' + indexTag + '.gif" />');
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
	        skyeditor.skyUpload("sky-editor-file-video", skyeditor.uploadVideo, function (e) {
	            console.log(e.target.responseText);
	            var res = JSON.parse(e.target.responseText);
	
	            if (res.error) {
	                mui.toast(res.error);
	            } else {
	                var html = '<video controls  style="max-width:100%;" src="' + res.trueimgurl + '"></video>';
	                skyEl.append(html);
	            }
	        })
	    })
    $(document).on("change", "#sky-editor-file", function () {
        skyeditor.skyUpload("sky-editor-file", skyeditor.uploadUrl, function (e) {
            console.log(e.target.responseText);
            var res = JSON.parse(e.target.responseText);

            if (res.error) {
                mui.toast(res.error);
            } else {
                var html = '<img src="' + res.trueimgurl + '"> &nbsp;';
                skyEl.append(html);
            }
        })
    })
    $(document).on("click", ".sky-editor-content", function () {
        if ($(".sky-editor-content div").length == 0) {
            $(".sky-editor-content").prepend('<div style="color:#555;">&nbsp;</div>')
        }
        skyEl = $(this).find("div").eq(0);

    })
    $(document).on("click", ".sky-editor-content div", function (e) {
        e.stopPropagation();
		skyEl = $(this);
        var color = $(".sky-editor-color").css("background-color");
        if ($(this).css("color") != color) {
            $(this).css("color", color);
        }
       
    })

    $(document).on("click", '.sky-editor-excute', function (e) {
        $(this).toggleClass("active");

        switch ($(this).data('role')) {

            case 'h3':
               if($(this).hasClass("active")){
               	skyEl.css({fontSize:"16px",fontWeight:"600","padding":"8px 0px"});
               }else{
               	skyEl.css({fontSize:"14px",fontWeight:"400","padding":"0"});
               }

                break;
            case "bold":

                if ($(this).hasClass("active")) {
                    skyEl.css("font-weight", "bolder");
                } else {
                    skyEl.css("font-weight", "inherit");
                }

                break;
            case "center":

                if ($(this).hasClass("active")) {
                    skyEl.css("text-align", "center");
                } else {
                    skyEl.css("text-align", "left");
                }

                break;
            case "ForeColor":
                var color = $(this).css("background-color");
                $(".sky-editor-color").css("background-color", color);
                console.log(skyEl.html());
                skyEl.css("color", color);
                $(".sky-editor-colors").hide();
                break;

        }

    })
});
