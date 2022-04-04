;(function(){
	var AutoReader = function(opt){
		this.sTopBtn = opt.sTopBtn;
		this.playBtn = opt.playBtn;
		this.hd = opt.hd;

	}

	AutoReader.prototype = {

		init: function(){

			this.bindEvent();
		},
		bindEvent(){
			var _self = this,
				isScroll = false,
			    timer = null,
			    scrollTop = 0,
			    pageHeight = getScrollSize().height,
			    vHeight = getViewportSize().height,
			    hdHeight = getStyles(_self.hd, 'height'),
			    scrollBottom = pageHeight - vHeight + hdHeight;


		    addEvent(document, 'scroll', function(){	
		    	scrollTop = getScrollOffset().top;
		    	if(scrollTop <= 0){
			   		_self.sTopBtn.style.display = 'none';
			    }else{
			    	_self.sTopBtn.style.display = 'block';
			    }
		    });

		    addEvent(_self.hd, 'click', function(){
		    	window.scrollTo(0, 0);
 				clearInterval(timer);
 				_self.playBtn.style.backgroundImage = 'url(imgs/play.png)';
		    })

			addEvent(_self.sTopBtn, 'click', function(){
 				window.scrollTo(0, 0);
 				clearInterval(timer);
 				_self.playBtn.style.backgroundImage = 'url(imgs/play.png)';
			});

			addEvent(_self.playBtn, 'click', function(e){
				isScroll = !isScroll;
				if(isScroll){
					this.style.backgroundImage = 'url(imgs/pause.png)';

					timer = setInterval(function(){
						scrollTop = getScrollOffset().top;
						window.scrollBy(0, 1);
						
						if(scrollTop > 0){
					    	_self.sTopBtn.style.display = 'block';
					    }
						
						if(scrollTop > scrollBottom - 1){
							console.log(scrollTop, scrollBottom);
							clearInterval(timer);
							_self.playBtn.style.backgroundImage = 'url(imgs/play.png)';
						}
						
					}, 10);
				}else{
					this.style.backgroundImage = 'url(imgs/play.png)';
					clearInterval(timer);
				}
				
			});
		}
	}


	window.AutoReader = AutoReader;
})()
