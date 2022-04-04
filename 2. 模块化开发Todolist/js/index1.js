init();

function init(){
  initTodoList;
}

var initTodoList = (function(){
  var plusBtn = document.getElementsByClassName('j-plus-btn')[0],
      inputArea = document.getElementsByClassName('input-wrap')[0],
      addItem = document.getElementsByClassName('j-add-item')[0],
      itemContent = document.getElementsByClassName('j-item-content')[0],
      oList = document.getElementsByClassName('list')[0],
      items = document.getElementsByClassName('item'),
      itemLen = items.length;
      inputShow= false,
      isEdit = false,
      tarIdx = null;
      

  addEvent(plusBtn, 'click', function(){
    if(inputShow){
      showInput('close');
      if(tarIdx !== null){
        items[tarIdx].className = 'item';
        resolveEdit();
        initInputwrap();
      }
    }else{
      showInput('open');
    }
  });

  addEvent(addItem, 'click', function(){
    var content = itemContent.value,
        contentLen = content.length;

    if(contentLen <= 0) {
      return;
    }

    if(contentLen > 0){
      for(var i = 0; i < itemLen; i++){
        itemText = elemChildren(items[i])[0].innerText;

        if(itemText === content){
          alert('该项目已经存在!!!');
          return;
        }
      }
    }

    if(isEdit){ // ? 在编辑
      // console.log('edit..');
      var curItem = elemChildren(items[tarIdx])[0];
      // console.log(curItem)
      curItem.innerText = content;
      items[tarIdx].className = 'item';
      resolveEdit();
    }else{ // ? 添加
      var li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = itemTpl(content);
      oList.appendChild(li);
    }
    initInputwrap();
    showInput('close');
    
  });

  addEvent(oList, 'click', function(){
    var e = e || window.event,
        tar = e.target || e.srcElement;
        className = tar.className,
        tarItem = elemParent(tar, 2),
        tarContent = elemChildren(tarItem)[0]
        curIdx = Array.prototype.indexOf.call(items, tarItem);

    if(className === 'fa fa-edit'){ 
      // ? 编辑项目
      for(var i = 0; i < itemLen; i++){
        var item = items[i];
        item.className = 'item';
      }
      items[curIdx].className += ' active';

      showInput('open');
      itemContent.value = elemChildren(tarItem)[0].innerText;
      addItem.innerText = '编辑第' + (curIdx + 1) + '项';
      isEdit = true;
      tarIdx = curIdx;
    }else if(className === 'fa fa-times'){
      // ? 删除项目
      tarItem.remove();
      showInput('close');
      resolveEdit()
      initInputwrap();
    }

  })

  function showInput(status){
    if(status === 'close'){
      inputArea.style.display = 'none';
      inputShow = false;
    }else if(status === 'open'){
      inputArea.style.display = 'block';
      inputShow = true;
    }
  }

  function initInputwrap(){
    itemContent.value = '';
    addItem.innerText = '增加项目';
  }

  function resolveEdit(){
    isEdit = false,
    tarIdx = null;
  }

  function itemTpl(text){
    return '<p class="content">' +  text + '</p>' +
            '<div class="btn-group">' + 
              '<a href="javascript:;" class="fa fa-edit"></a>' +
              '<a href="javascript:;" class="fa fa-times"></a>'+
            '</div>'
  }
  
})();