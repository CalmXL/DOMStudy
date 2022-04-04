;(function(doc){

  var oList = doc.getElementsByClassName('list')[0],
      oItems = doc.getElementsByClassName('list-item'),
      curIdx = 0;

  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    console.log(oList)
    addEvent(oList, 'mouseover', function(){
      addEvent(document, 'mousemove', slide);
    });

    addEvent(oList, 'mouseout', function(){
      console.log('out')
      removeEvent(document, 'mousemove', slide);
    })
  }

  function slide(e){
    var e = e || window.event;
        tar = e.target || e.srcElement,
        oParent = getParent(tar, 'li'),
        thisIdx = Array.prototype.indexOf.call(oItems, oParent);
    console.log(thisIdx);
    if(curIdx !== thisIdx) {
      oItems[curIdx].className = 'list-item';
      curIdx = thisIdx;
      oItems[curIdx].className += ' active';
    }
  }

  function getParent(target, element){
    while(target.tagName.toLowerCase() !== element){
      target = target.parentNode;
    }

    return target;
  }

/* 
  function bindEvent(){
    console.log(oItems[0].className);
    for(var i = 0; i < oItems.length; i++){
      addEvent(oItems[i], 'mouseover', function(){
        oItems[curIdx].className = 'list-item';
        curIdx = Array.prototype.indexOf.call(oItems, this);
        oItems[curIdx].className += ' active';
      });
    }
  }
 */
  init();
})(document);