$(function(){
		skyeditor.loadCss("code/code.css");
		skyeditor.$codeEl="";
		skyeditor.tools.push("code");
		skyeditor.$toolsItem.set('code','<div class="sky-editor-tools-item sky-editor-code-toggle"><i class="skyeditor-iconfont skyeditor-icon-code"></i></div>');
		skyeditor.init();
		var codeHtml='<div class="sky-editor-code-bg"></div>'
					+'<div class="sky-editor-code-box">'
					+'<textarea class="sky-editor-code-content"></textarea>'
					+'<div class="sky-editor-btns">'
						+'<div class="sky-editor-btn sky-editor-code-excute" >插入代码</div>'
						
					+'</div>'
				+'</div>';
		$("body").append(codeHtml);
		$(document).on("click",".sky-editor-code-excute",function(){
			var code=$(".sky-editor-code-content").val();
			code=code.replace("<","&lt;").replace(">","&gt;");
			if(skyeditor.$codeEl!=""){
				skyeditor.$codeEl.html(code);
				skyeditor.$codeEl="";
			}else{
				skyeditor.skyEl.append('<pre  class="sky-editor-code">'+code+'</pre>');
			}
			$(".sky-editor-code-bg").hide();
			$(".sky-editor-code-box").hide(); 
			$(".sky-editor-code-content").val("");
		})
		$(document).on("click",".sky-editor-code-bg",function(){
			$(".sky-editor-code-bg").hide();
			$(".sky-editor-code-box").hide(); 
			$(".sky-editor-code-content").val("");
		})
		$(document).on("click",".sky-editor-code-toggle",function(){
			$(".sky-editor-code-bg").toggle();
			$(".sky-editor-code-box").toggle();
		})
		$(document).on("click",".sky-editor-code",function(event){
			
			var code=$(this).html();
			code=code.replace("&lt;","<").replace("&gt;",">");
			$(".sky-editor-code-content").val(code);
			$(".sky-editor-code-bg").show();
			$(".sky-editor-code-box").show(); 
			skyeditor.$codeEl=$(this);
		})
	})