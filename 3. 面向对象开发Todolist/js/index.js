;(function(node){
  var TodoList = function(){
    var _self = this;

    this.node = node;
    this.inputShow = false;
    this.isEdit = false;
    this.editIdx = null;
    this.dConfig = {
      "plusBtn": "", 
      "inputArea": "",
      "addBtn": "",
      "list": "",
      "itemClass": ""
    }

    this.config = this.getConfig();
    this.itemClass = this.config.itemClass;

    for(var key in this.dConfig){
      if(!this.config.hasOwnProperty(key)){
        console.log(errorInfo(key));
        return;
      }
    }
    this.setConfig();
    
    addEvent(this.plusBtn, 'click', function(){
      _self.showInput();
    });

    addEvent(this.addBtn, 'click', function(){
      _self.addBtnClick();
    });

    addEvent(this.oList, 'click', function(e){
      
      _self.listClick();
    })

  }

  TodoList.prototype = {
    getConfig: function(){
      // this.node.dataset.config
      // var config = this.node.getAttribute('data-config'); // 兼容性好
      return JSON.parse(this.node.getAttribute('data-config'));
    },

    setConfig: function(){
      var config = this.config,
          node = this.node;

      this.inputArea = node.getElementsByClassName(config.inputArea)[0];
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0];
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.oList = node.getElementsByClassName(config.list)[0];
      this.content = this.inputArea.getElementsByClassName('j-item-content')[0];
    },

    showInput: function(){
      var _self = this;
      if(this.inputShow){
        setInputShow.call(_self, 'close');
      }else{
        setInputShow.call(_self, 'open');
      }
    },

    addBtnClick: function(){
      var _self = this,
          content = this.content.value,
          contentLen = content.length,
          oItems = this.oList.getElementsByClassName('item'),
          itemLen = oItems.length,
          text;

      if(contentLen <= 0){
        return;
      }

      if(itemLen > 0){
        for(var i = 0; i < itemLen; i++){
          text = elemChildren(oItems[i])[0].innerText;
          if(text === content){
            alert('内容已存在');
            return;
          }
        }
      }

      if(_self.isEdit){
        var curItem = oItems[_self.editIdx].childNodes[0];
        curItem.textContent = content;
      }else{
        var oLi = document.createElement('li');
        oLi.className = this.itemClass;
        oLi.innerHTML = itemTpl(content);
        this.oList.appendChild(oLi);
      }
      setInputShow.call(_self, 'close');
    },

    listClick: function(e){
      var _self = this,
          e = e || window.event,
          oItems = _self.oList.getElementsByClassName('item'),
          itemLen = oItems.length,
          item,
          tar = e.target || e.srcELement,
          tarClassName = tar.className,
          tarParent = elemTagParent(tar, 'li'),
          curIdx = Array.prototype.indexOf.call(oItems, tarParent);
      _self.editIdx = curIdx;
      
      if(tarClassName === 'fa fa-edit'){


        setInputStatus.apply(_self, [oItems, tarParent, 'edit']);
        // for(var i = 0; i < itemLen; i++){
        //   item = oItems[i];
        //   item.className = 'item';
        // }

        // tarParent.className += ' active';

        // _self.isEdit = false;
        // setInputShow.call(_self, 'open');
        // _self.content.value = tarParent.childNodes[0].innerText;
        // addBtnName.apply(_self, [_self.isEdit, curIdx]);
      }else if(tarClassName === 'fa fa-times'){
        setInputStatus.apply(_self, [oItems, tarParent, 'add']);
      }
    }

  }

  function setInputShow(action){
  
    if(action === 'open'){
      this.inputArea.style.display = 'block';
      this.inputShow = true;
    }else if(action === 'close'){ 
      this.inputArea.style.display = 'none';
      this.inputShow = false;
      this.content.value = '';
      this.isEdit = false;
      this.addBtn.textContent = '增加项目'; 
    }
  }

  function setInputStatus(oItems, target, status){
    var e = e || window.event,
        oItems = this.oList.getElementsByClassName('item'),
        itemLen = oItems.length,
        item,
        curIdx = Array.prototype.indexOf.call(oItems, target);


    for(var i = 0; i < itemLen; i++){
      item = oItems[i];
      item.className = 'item';
    }

    target.className += ' active';
    if(status === 'edit'){
     
      this.isEdit = false;
      setInputShow.call(this, 'open');
      this.content.value = target.childNodes[0].innerText;
      addBtnName.apply(this, [this.isEdit, curIdx]);
    }else if(status === 'add'){
      oItems[curIdx].remove();
    }

  }

  function addBtnName(isEdit, n){

    if(isEdit){
      this.isEdit = false;
      this.addBtn.textContent = '增加项目'; 
    }else{
      this.isEdit = true;
      this.addBtn.textContent = '编辑第' + (n + 1) + '项';
    }
  }



  function errorInfo(key){
    return new Error(
      '您没有配置参数' + key + '\n' + 
      '必须配置的参数列表如下: \n' + 
      '打开输入框按钮元素类名: plusBtn\n' +
      '输入框区域元素类名: inputArea\n' + 
      '添加元素按钮类名: addBtn\n' +  
      '列表类名: list\n' + 
      '列表项的类名: itemClass\n'
    )
  }

  function itemTpl(text){
    return '<p class="content">' +  text + '</p>' +
            '<div class="btn-group">' + 
              '<a href="javascript:;" class="fa fa-edit"></a>' +
              '<a href="javascript:;" class="fa fa-times"></a>'+
            '</div>'
  }

  new TodoList();
})(document.getElementsByClassName('wrap')[0])