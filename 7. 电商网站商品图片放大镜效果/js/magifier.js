window.onload = function(){
  init();
}

function init(){
  initMagifier();
}

var initMagifier = (function(){
  var oImgWrap = document.getElementsByClassName('img-wrap')[0], //  获取底层图片的元素
      oMagWrap= oImgWrap.getElementsByClassName('mag-wrap')[0], // 获取放大镜框的元素
      magImg = oImgWrap.getElementsByClassName('mag-img')[0], // 用来放大镜放大的图片
      oMagWrapWidth = getStyles(oMagWrap, 'width'), // 放大镜的宽度
      oMagWrapHeight = getStyles(oMagWrap, 'height'),// 放大镜的高度
      imgX = oImgWrap.offsetLeft, // 放大镜左边距离
      imgY = oImgWrap.offsetTop; // 放大镜上边距离
  // 绑定鼠标移入的事件
  addEvent(oImgWrap, 'mouseover', function(e){
    showMag(getXY(e).x, getXY(e).y);
    // 绑定鼠标移动的事件
    addEvent(document, 'mousemove', mouseMove);
  });
  // 鼠标移出的事件
  addEvent(oImgWrap, 'mouseout', mouseOut);

  function mouseOut(){
    oMagWrap.className = 'mag-wrap';
    removeEvent(document, 'mousemove', mouseMove);
  }

  function mouseMove(e){
    var e = e || window.event;
    showMag(getXY(e).x, getXY(e).y, getXY(e).mouseX, getXY(e).mouseY);
  }
  // 用来获取鼠标 定位和鼠标移出的最大范围函数
  function getXY(e){
    var e = e || window.event;
    return {
      x: pagePos(e).X - imgX - oMagWrapWidth / 2,
      y: pagePos(e).Y - imgY - oMagWrapHeight / 2,
      mouseX: pagePos(e).X - imgX,
      mouseY: pagePos(e).Y - imgY
    }
  }
  // 用来展示放大镜效果的函数
  function showMag(x, y, mouseX, mouseY){
    oMagWrap.style.left = x + 'px';
    oMagWrap.style.top = y + 'px';
    magImg.style.left = -x + 'px';
    magImg.style.top = -y + 'px';
    oMagWrap.className += ' show';

    if(mouseX && mouseY){
      if(mouseX < 0 || mouseX > getStyles(oImgWrap, 'width') || mouseY < 0 || mouseY > getStyles(oImgWrap, 'height')){
        oMagWrap.className = 'mag-wrap';
      }
    }
  }

});