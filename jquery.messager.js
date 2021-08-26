(function (jQuery){

	this.layer = {'width' : 400, 'height': 70};
	this.title = 'Message : ';
	this.time = 3000;
	this.anims = {'type' : 'slide', 'speed' : 600};
	this.timer1 = null;
	this.inits = function(title, text){
		if($("#message").is("div")){ return; }
		var DOM = '<div id="message" style="position:absolute; bottom:10px; right:10px; z-index:10001;\
									width:'+this.layer.width+'px; height:'+this.layer.height+'px;\
									background:#000000; display:none; opacity: 0.8; border-radius: 15px;\
									color: azure; line-height: 16px; font-size: 16px;\
									padding: 28px 15px">\
						'+ title + text +'\
					</div>'
		$(document.body).prepend(DOM);
		$("#message_close").click(function(){
			setTimeout('this.close()', 1);
		});
		$("#message").hover(function(){
			clearTimeout(timer1);
			timer1 = null;
		},function(){
			timer1 = setTimeout('this.close()', time);
		});
	};
	this.show = function(title, text, time){
		if($("#message").is("div")){ return; }
		if(title==0 || !title)title = this.title;
		this.inits(title, text);
		if(time>=0)this.time = time;
		switch(this.anims.type){
			case 'slide':$("#message").slideDown(this.anims.speed);break;
			case 'fade':$("#message").fadeIn(this.anims.speed);break;
			case 'show':$("#message").show(this.anims.speed);break;
			default:$("#message").slideDown(this.anims.speed);break;
		}
		setTimeout(function(){
			$("#message").remove();
			this.inits(title, text);
			$("#message").css("display","block");
		},this.anims.speed-(this.anims.speed/5));
		this.rmmessage(this.time);
	};
	this.lays = function(width, height){
		if($("#message").is("div")){ return; }
		if(width!=0 && width) this.layer.width = width;
		if(height!=0 && height) this.layer.height = height;
	};
	this.anim = function(type, speed){
		if($("#message").is("div")){ return; }
		if(type!=0 && type) this.anims.type = type;
		if(speed!=0 && speed){
			switch(speed){
				case 'slow' : ;break;
				case 'fast' : this.anims.speed = 200; break;
				case 'normal' : this.anims.speed = 400; break;
				default:
					this.anims.speed = speed;
			}
		}
	};
	this.rmmessage = function(time){
		if(time>0){
			timer1 = setTimeout('this.close()', time);
		}

	};
	this.close = function(){
		switch(this.anims.type){
			case 'slide':$("#message").slideUp(this.anims.speed);break;
			case 'fade':$("#message").fadeOut(this.anims.speed);break;
			case 'show':$("#message").hide(this.anims.speed);break;
			default:$("#message").slideUp(this.anims.speed);break;
		};
		setTimeout('$("#message").remove();', this.anims.speed);
		this.original();
	};
	this.original = function(){
		this.layer = {'width' : 400, 'height': 70};
		this.title = 'Message : ';
		this.time = 3000;
		this.anims = {'type' : 'slide', 'speed' : 600};
	};
    jQuery.messager = this;
    return jQuery;
})(jQuery);
