/**
 * 兼容性封装函数库
 */

// 获取元素子元素节点的封装
function elemChildren(node){
  var temp = {
        'length': 0,
        'push': Array.prototype.push,
        'splice': Array.prototype.splice
      },
      children = node.childNodes,
      len = children.length,
      childItem;

  for(var i = 0; i < len; i++){
    childItem = children[i];
    if(childItem.nodeType === 1){
      temp.push(childItem);
    }
  }

  return temp;
}

// 获取元素父节点为 Tag的父节点
function elemTagParent(elem, Tag){
  var tagName = Tag.toUpperCase();
  while(elem.tagName !== tagName){
    elem = elem.parentNode;
  }

  return elem;
}

// 获取元素的第n个父级元素
function elemParent(node, n){

  var type = typeof(n);

  if(type === 'undefined'){
    return node.parentNode;
  }else if(n <= 0 || type !== 'number'){
    return undefined
  }

  while(n){
    node = node.parentNode;
    n--;
  }

  return node;
}

// 1. 获取滚动条移动距离
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      top: window.pageYOffset,
      left: window.pageXOffset
    }
  }else{
    return {
      top: document.body.scrollTop + document.documentElement.scrollTop,
      left: document.body.scrollLeft + document.documentElement.scrollLeft
    }
  }
}

// 2. 浏览器的可视区域
function getViewportSize(){
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    if(document.compatMode === 'CSS1Compat'){
      return {
        width: document.docuemntElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }else{
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  }

}

// 3. 整个文档的宽高
function getScrollSize(){
  if(document.body.scrollWidth){
    return{
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width: document.documentElement.scrollWidth,
      height: document.docuemntElement.scrollHeight
    }
  }
}

// 查找元素到可视区域的宽高
function getElemDocPosition(el){
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
  
  while(parent){
    offsetLeft += parent.offserLeft;
    offserTop += parent,offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

// 查看元素计算样式兼容性封装
function getStyles(elem, prop){
  if(window.getComputedStyle){
    if(prop){
      return parseInt(window.getComputedStyle(elem, null)[prop]);
    }else{
      return window.getComputedStyle(elem, null);
    }
  }else{
    if(prop){
      return parseInt(elem.currentStyle[prop]);
    }else{
      return elem.currentStyle;
    }
  }
}

// 事件处理函数-封装
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachment('on'+type, fn);
  }else{
    el['on' + type] = fn;
  }
}

// 解除事件绑定
function removeEvent(el, type, fn){
  if(el.removeEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.detachEvent){
    el.detachEvent('on' + type, fn);
  }else{
    el['on' + type] = null;
  }
}

function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

function preventDefaultEvent(e){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}

function pagePos(e){
  var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.cTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}