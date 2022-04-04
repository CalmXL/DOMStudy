init();

function init(){
  initTodoList;
}

var initTodoList = (function(){
  var showInput = document.getElementsByClassName('j-show-input')[0],
      inputWrap = document.getElementsByClassName('input-wrap')[0],
      inputContent = inputWrap.getElementsByClassName('j-item-content')[0],
      addBtn = inputWrap.getElementsByClassName('j-add-item')[0],
      oList = document.getElementsByClassName('list')[0],
      isInputShow = false;

  addEvent(showInput, 'click', function(){
   
    if(isInputShow){
      inputWrap.style.display = 'none';
      isInputShow = false;
    }else{
      inputWrap.style.display = 'block';
      isInputShow = true;
    }
  });

  addEvent(addBtn, 'click', function(){
    var val = inputContent.value,
        len = val.length,
        oListChild = elemChildren(oList),
        oListLen = oListChild.length,
        liItem,
        listExist = false;
    
    if(len === 0){
      return;
    }
    
    for(var i = 0; i < oListLen; i++){
      liItem = oListChild[i];
      var text = elemChildren(liItem)[0].innerText;
      console.log(i);
      if(text === val){
        Exist = true;
        break;
      }
    }

    if(!listExist){
      var li = document.createElement('li');
      li.innerHTML = addItem(val);
      li.className = 'item';
      oList.appendChild(li);
      listExist = false;
      inputContent.value = '';
      inputWrap.style.display = 'none';
    }else{
      alert('该项目已经存在了!!!!');
    }

  });

  function addItem(text){
    return  '<p class="content">' + text + '</p>' + 
            '<div class="btn-group">' +
              '<a href="javascript:;" class="fa fa-edit"></a>' +
              '<a href="javascript:;" class="fa fa-times"></a>' +
            '</div>' 
   }

})();

 