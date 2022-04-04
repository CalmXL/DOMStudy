window.onload = function(){
  init();
}

function init(){
  initMenu;
}

var initMenu = (function(){
  var oMenu = document.getElementsByClassName('menu-wrap')[0],
      oMenuItems = oMenu.getElementsByClassName('main-item'),
      menuLen = oMenuItems.length,
      oSub = document.getElementsByClassName('sub')[0],
      oSubItems = oSub.getElementsByClassName('sub-item'),
      subLen = oSubItems.length,
      isEnterSub,
      isFirst,
      menuItem,
      subItem,
      t,
      mousePoses = [];

  addEvent(oMenu, 'mouseleave', menuMouseLeave);

  addEvent(oSub, 'mouseenter', function(){
    isEnterSub = true;
  });

  addEvent(oSub, 'mouseleave', function(){
    isEnterSub = false;
  });

  addEvent(oMenu, 'mouseenter', function(){
    addEvent(oMenu, 'mousemove', mouseMove);
  });

  for(var i = 0; i < menuLen; i++){
    menuItem  = oMenuItems[i];

    addEvent(menuItem, 'mouseenter', menuItemMouseEnter);
  }

  function menuItemMouseEnter(e){
    var e = e || window.event,
        tar = e.target || e.srcElement,
        thisIdx = Array.prototype.indexOf.call(oMenuItems, tar),
        posLen = mousePoses.length,
        curPos = mousePoses[posLen - 1] || {x: 0, y: 0},
        lastPos = mousePoses[posLen - 2] || {x: 0, y: 0},
        toDealy = doTimeout(lastPos, curPos);

    if(t){
      clearTimeout(t);
    }
    
    if(isFirst){
      addActive(thisIdx);
    }else{
      if(toDealy){
        t = setTimeout(function(){
          if(isEnterSub){
            return;
          }
          addActive(thisIdx);
          t = null;
        }, 300);
      }else{
        addActive(thisIdx);
      }
    } 
  }

  function addActive(index){
    removeAllActive();
    oSub.className = 'sub';
    oSubItems[index].className += ' active';
    oMenuItems[index].className += ' active';
  }

  function removeAllActive(){
    for(var i = 0; i < menuLen; i++){
      menuItem = oMenuItems[i];
      subItem = oSubItems[i];
      menuItem.className = 'main-item';
      subItem.className = 'sub-item';
    }
  }

  function menuMouseLeave(){
    oSub.className += ' hide';
    removeAllActive();
  }

  function mouseMove(e){
    var e = e || window.event;

    mousePoses.push({
      x: pagePos(e).X,
      y: pagePos(e).Y
    })
    
    if(mousePoses.length >= 3){
      mousePoses.shift();
    }
  }

  function doTimeout(lastPos, curPos){

    var TL = {
      x: getStyles(oMenu, 'margin-left') + getStyles(oMenu, 'width'),
      y: getStyles(oMenu, 'margin-top')
    }

    var BL = {
      x: getStyles(oMenu, 'margin-left') + getStyles(oMenu, 'width'),
      y: getStyles(oMenu, 'margin-top') + getStyles(oMenu, 'height')
    }

    return pointInTriangle({
      curPos: curPos,
      lastPos: lastPos,
      topLeft: TL,
      bottomLeft: BL
    })
  }

})();