window.onload = function(){
  init();
}

function init(){
  keySearch();
}

var keySearch = (function(){
  var searchKw = document.getElementById('J_search_kw'),
      autoKw = document.getElementById('J_autoKw'),
      recomKw = document.getElementById('recomKw'),
      keyWords = JSON.parse(recomKw.innerText),
      keyNum = 0,
      timer;

  addEvent(searchKw, 'input', function(){
    showKey(this.value);
  });

  addEvent(searchKw, 'propertychange', function(){
    showKey(this.value);
  });

  addEvent(searchKw, 'focus', function(){
    clearInterval(timer);
    autoKw.style.color = '#ddd';
  });

  addEvent(searchKw, 'blur', function(){
    autoKw.style.color = '#989898';
    keyNum > 0 ? keyNum-- : keyNum;
    autoChange();
  });

  function wordChange(){
    autoKw.innerText = keyWords[keyNum];
    keyNum = keyNum < 4 ? keyNum + 1 : 0;
  }

  function showKey(value){
    if(value.length <= 0){
      autoKw.className = 'keyWords';
    }else{
      clearInterval(timer);
      autoKw.className += ' hide';
    }
  }

  function autoChange(){
    wordChange();
    timer = setInterval(wordChange, 2000);
  }

  return function(){
    autoChange();
  }
})();