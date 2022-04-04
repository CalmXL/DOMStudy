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
    autoKwShow(this.value, true);
  });

  addEvent(searchKw, 'propertychange', function(){
    autoKwShow(this.value, true);
  });

  addEvent(searchKw, 'focus', function(){
    clearInterval(timer);
    autoKwShow(this.value, true);
  });

  addEvent(searchKw, 'blur', function(){
    autoKwShow(this.value, false);
    timer = setInterval(autoKwChange, 3000);
  });


  function setAutoKws(){
    autoKwChange();
    timer = setInterval(autoKwChange, 3000);
  }

  function autoKwChange(){
    var len = keyWords.length;

    autoKw.innerHTML = keyWords[keyNum];
    keyNum = keyNum >= len - 1 ? 0 : keyNum + 1;
  }

  function autoKwShow(value, isBlur){
    if(value.length <= 0){
      autoKw.style.display = 'block';
      autoKw.style.color = isBlur ? '#ddd' : '#989898';
    }else{
      autoKw.style.display = 'none';
    }
  }
  return function(){
    setAutoKws();
  }
})();