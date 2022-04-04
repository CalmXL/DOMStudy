window.onload = function(){
  init();
}

function init(){
  initGame();
}

var initGame = (function(){
  var gameWrap = document.getElementsByClassName('game-wrap')[0],
      gameBg = gameWrap.getElementsByClassName('game-bg')[0],
      snakeWrap = gameWrap.getElementsByClassName('snake-wrap')[0],
      gameMenu = gameWrap.getElementsByClassName('game-menu')[0],
      score = gameMenu.getElementsByClassName('score')[0],
      btnStart = gameMenu.getElementsByClassName('btn-start')[0],
      gameWrapW = getStyles(gameWrap, 'width'),
      gameWrapH = getStyles(gameWrap, 'height'),
      dir = 'DOWN',
      t;

  var Snake = function(){
    this.bodyArr = [
      {x: 0, y: 0},
      {x: 0, y: 32},
      {x: 0, y: 64},
      {x: 0, y: 96},
      {x: 0, y: 128},
      {x: 0, y: 160},
    ]
  }

  Snake.prototype = {
    init: function(){
      this.bindEvent();
      this.createFood();
      this.initSnake();
      this.run();
    },

    bindEvent: function(){
      var _self = this;
      addEvent(document, 'keydown', function(){
        _self.setDir();
      });

      addEvent(btnStart, 'click', function(){
        gameMenu.className += ' hide';
        gameBg.className += ' show';
        console.log(btnStart.innerText);
        if(btnStart.innerText == '再次开始'){
          _self.bodyArr = [
            {x: 0, y: 0},
            {x: 0, y: 32},
            {x: 0, y: 64},
            {x: 0, y: 96},
            {x: 0, y: 128},
            {x: 0, y: 160},
          ],
          dir = 'DOWN';
          _self.restartGame();
        }
    
      })
    },

    restartGame: function(){
      this.bindEvent();
      this.createFood();
      this.initSnake();
      this.run();
    },

    initSnake: function(){
      var arr = this.bodyArr,
          len = arr.length,
          item,
          frag = document.createDocumentFragment();
     
      for(var i = 0; i < len; i++){
        item = arr[i];
        var sBody = document.createElement('i');
        
        if(i === len - 1){
          sBody.className = 'body icon head';
        }else if(i === 0){
          sBody.className = 'body icon end';
        }else{
          sBody.className = 'body icon dna';
        }

        sBody.style.left = item.x + 'px';
        sBody.style.top = item.y + 'px';

        frag.appendChild(sBody);
      }

      snakeWrap.appendChild(frag);
      
    },

    removeSnake: function(){
      var bodys = document.getElementsByClassName('body');
      
      while(bodys.length){
        bodys[0].remove();
      }
    },

    run: function(){
      var _self = this;
      t = setInterval(function(){
        // console.log('move');
        _self.move();
      }, 500);
    },

    move: function(){
      var arr = this.bodyArr,
          len = arr.length,
          head = arr[len - 1],
          item;

      for(var i = 0; i < len; i++){
        item = arr[i];
        
        if(i === len - 1){
          this.setHeadXY(head);
        }else{
          item.x = arr[i + 1].x;
          item.y = arr[i + 1].y;
        }
      }
      this.removeSnake();
      this.initSnake();
      this.isInBody(head);
      this.eatFood(head);
    },

    setDir: function(e){
      var _self = this,
          e = e || window.event,
          code = e.keyCode;
      _self.changeDir(code);
    },

    changeDir: function(code){
      var arr = this.bodyArr,
          len = arr.length,
          first = arr[len - 1],
          second = arr[len - 2];

      switch(code){
        case 37:
          if(dir !== 'LEFT' && dir !== 'RIGHT' && first.y !== second.y){
            dir = 'LEFT';
          }
          break;
        case 39:
          if(dir !== 'LEFT' && dir !== 'RIGHT' && first.y !== second.y){
            dir = 'RIGHT';
          }
          break;
        case 38:
          if(dir !== 'UP' && dir !== 'DOWN' && first.x !== second.x){
            dir = 'UP';
          }
          break;
        case 40:
          if(dir !== 'UP' && dir !== 'DOWN' && first.x !== second.x){
            dir = 'DOWN';
          }
          break;
        default: 
          break;
      }
    },

    setHeadXY: function(head){
      var body = document.getElementsByClassName('body')[0],
          bodyW = getStyles(body, 'width'),
          bodyH = getStyles(body, 'height');
          maxX = gameWrapW - bodyW,
          maxY = gameWrapH - bodyH;

      switch(dir){
        case 'LEFT':
          if(head.x <= 0){
            head.x = maxX;
          }else{
            head.x -= bodyW;
          }
          break;
        case 'RIGHT':
          if(head.x >= maxX){
            head.x = 0;
          }else{
            head.x += bodyW;
          }
          break;
        case 'UP':
          if(head.y <= 0){
            head.y = maxY;
          }else{
            head.y -= bodyH;
          }
          break;
        case 'DOWN':
          if(head.y >= maxY){
            head.y = 0;
          }else{
            head.y += bodyH; 
          }
          break;
      }
    },

    createFood: function(){
      var i = document.createElement('i');
      // console.log(this.randomXY(gameWrapW), this.randomXY(gameWrapH))
      i.className = 'food icon dna';
      i.style.left = this.randomXY(gameWrapW) + 'px';
      i.style.top = this.randomXY(gameWrapH) + 'px';

      snakeWrap.appendChild(i);
    },

    randomXY: function(widthOrHeight){
      return Math.floor(Math.random() * (widthOrHeight / 32)) * 32;
    },
    
    removeFood: function(){
      var food = document.getElementsByClassName('food')[0];

      food.remove();
    },

    eatFood: function(head){
      var food = document.getElementsByClassName('food')[0];
          foodX = getStyles(food, 'left');
          foodY = getStyles(food, 'top');
      // console.log(foodX, foodY, head.x, head.y);
      if(head.x === foodX && head.y === foodY){
        this.removeFood();
        this.createFood();
        this.snakeAdd(foodX, foodY);
      }
    },

    snakeAdd: function(foodX, foodY){
      var arr = this.bodyArr,
          len = arr.length,
          lastOne = arr[0],
          lastTwo = arr[1],
          addBody = {};

      if(lastOne.x === lastTwo.x){
        addBody.x = lastOne.x;
        if(lastOne.y < lastTwo.y){
          addBody.y = lastOne.y - foodY;
        }else if(lastOne.y > lastTwo.y){
          addBody.y = lastOne.y + foodY;
        }
      }

      if(lastOne.y === lastTwo.y){
        addBody.y = lastOne.y;
        if(lastOne.x < lastTwo.x){
          addBody.x = lastOne.x - foodX;
        }else if(lastOne.x > lastTwo.x){
          addBody.x = lastOne.x - foodX;
        }
      }

      this.bodyArr.unshift(addBody);
    },

    isInBody: function(head){
      var _self = this,
          arr = this.bodyArr,
          len = arr.length,
          item;
      for(var i = 0; i < len - 1; i++){
        item = arr[i];
        // console.log(head.x, item.x);
        if(head.x === item.x && head.y === item.y){
          var timer = setTimeout(function(){
            _self.removeSnake();
            _self.removeFood();
            clearInterval(t); 
            score.innerHTML = len;
            gameBg.className = 'game-bg';
            gameMenu.className = 'game-menu';
            btnStart.innerText = '再次开始';
            timer = null;
          },300)
         
        }
      }
    }

  }

  return new Snake().init();
})