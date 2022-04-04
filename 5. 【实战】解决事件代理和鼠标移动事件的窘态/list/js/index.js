window.onload = function(){

}

var init = function(){
  initList;
}

var initList = (function(){
  var oWrap = document.getElementsByClassName('wrap')[0],
      oList = oWrap.getElementsByClassName('list')[0],
      oItems = oList.getElementsByClassName('list-item'),
      itemsLen = oItems.length,
      item;

  for(var i = 0; i < itemsLen; i++){
    item = oItems[i];

    addEvent(item, 'mouseenter', mouseEnter)
  }

  function mouseEnter(e){
    var e = e || window.event,
      tar = e.target || e.srcElement;
      curIdx = Array.prototype.indexOf.call(oItems, tar);

    for(var i = 0; i < itemsLen; i++){
      item = oItems[i];
      item.className = 'list-item';
    }

    oItems[curIdx].className += ' active';
    
  }
 

})();