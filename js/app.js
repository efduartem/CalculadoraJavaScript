var Calculadora = {
  display : document.getElementById('display'),
  init : function(){
    this.listenKeyClick();
  },
  listenKeyClick: function(){
    var self = this;
    var keys = document.querySelectorAll(".tecla");
    var maxLengthCheckFunction = this.maxLengthCheck;
    var addDecimalPointFunction = this.addDecimalPoint;
    var addSubtractionSignFunction = this.addSubtractionSign;
    for (var i = 0; i < keys.length; i++) {
      keys[i].addEventListener('click', function(e) {
          e.preventDefault()
          var key = this;
          key.style.padding = "1%";
          setTimeout(function(){
            key.style.padding = "";
          }, 200);
      });

      if(parseInt(keys[i].id) >= 0 && parseInt(keys[i].id) <= 9){
        keys[i].addEventListener('click', function(e) {
            e.preventDefault();
            var key = this;
            maxLengthCheckFunction(function(){
              if(display.textContent != "0"){
                display.append(key.id);
              }else if(display.textContent == "0" && parseInt(key.id) != 0){
                display.innerHTML = key.id;
              }
            });
        });
      }else if(keys[i].id == "on"){
        keys[i].addEventListener('click', this.setDisplayToZero);
      }else if (keys[i].id == "punto") {
        keys[i].addEventListener('click', function(){
          maxLengthCheckFunction(addDecimalPointFunction);
        });
      }else if (keys[i].id == "sign") {
        keys[i].addEventListener('click', function(){
          maxLengthCheckFunction(addSubtractionSignFunction);
        });
      }
    }
  },
  setDisplayToZero: function(){
    display.innerHTML = "0";
  },
  addDecimalPoint: function(){
    if(display.textContent.search("\\.") == -1){
      display.append(".");
    }
  },
  addSubtractionSign: function(){
    if(display.textContent != "0"){
      if(display.textContent.search("-") == -1){
        display.innerHTML = "-".concat(display.textContent);
      }else{
        display.innerHTML = display.textContent.substr(1);
      }
    }
  },
  maxLengthCheck: function(callback){
    if(display.textContent.length < 8){
        callback();
    }
  }
}

Calculadora.init();
