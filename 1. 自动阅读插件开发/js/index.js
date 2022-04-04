var sTopBtn = document.getElementsByClassName('s-top-btn')[0],
	hd = document.getElementsByClassName('list-hd')[0];

// 1. 滚动距离为0的时候, 图标不显示
addEvent(window, 'scroll', function(){
	var sTop = 	getScrollOffset().height;

	// sTop ? sTopBtn.style.display = 'block'
	// 	 : sTopBtn.style.display = 'none';

	sTopBtn.style.display = stop ? 'block' : 'none';
});

// 2. 点击图标回到顶部 
addEvent(sTopBtn, 'click', function(){
	window.scrollTo(0, 0);
});

// 3. 点击header回到顶部
addEvent(hd, 'click', function(){
	window.scrollTo(0, 0);
})
