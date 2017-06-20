var Calculadora = {
  display : document.getElementById('display'),
  operator: "",
  firstValue: 0,
  secondValue: 0,
  resultValue: 0,
  init : function(){
    // operator = "";
    // firstValue = 0;
    // secondValue = 0;
    // resultValue = 0;
    this.listenKeyClick();
  },
  listenKeyClick: function(){
    var self = this;
    var keys = document.querySelectorAll(".tecla");
    var maxLengthCheckFunction = this.maxLengthCheck;
    var addDecimalPointFunction = this.addDecimalPoint;
    var addSubtractionSignFunction = this.addSubtractionSign;
    var processOperationFunction = this.processOperation;
    var setDisplayToZeroFunction = this.setDisplayToZero;
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
        keys[i].addEventListener('click', function(){
          setDisplayToZeroFunction(self);
        });
      }else if (keys[i].id == "punto") {
        keys[i].addEventListener('click', function(){
          maxLengthCheckFunction(addDecimalPointFunction);
        });
      }else if (keys[i].id == "sign") {
        keys[i].addEventListener('click', function(){
          maxLengthCheckFunction(addSubtractionSignFunction);
        });
      }else if (keys[i].id == "dividido"
                || keys[i].id == "por"
                || keys[i].id == "menos"
                || keys[i].id == "mas"
                || keys[i].id == "igual") {
        keys[i].addEventListener('click', function(){
            processOperationFunction(self, this);
        });
      }
    }
  },
  processOperation: function(self, element) {
    console.log(self.operator);
    if(self.operator != "" && self.operator != undefined){
      self.secondValue = self.display.textContent;
      switch (self.operator) {
        case "mas":
            self.resultValue = self.processSum(self.firstValue, self.secondValue);
          break;
        case "menos":
              self.resultValue = self.processSubtract(self.firstValue, self.secondValue);
            break;
        case "por":
              self.resultValue = self.processMultiplication(self.firstValue, self.secondValue);
              break;
        case "dividido":
              self.resultValue = self.processDivision(self.firstValue, self.secondValue);
              break;
        default:
          console.log("Ninguna accion");
      }
      self.firstValue = self.resultValue;
      // console.log("Resultado parcial:"+self.resultValue);
    }else{
        self.firstValue = self.display.textContent;
    }

    if(element.id == "igual"){
        self.display.textContent = self.resultValue;
    }else{
        self.display.textContent = "";
        self.operator = element.id;
    }

    // console.log(self.operator);
    // console.log(self.firstValue);
    // console.log(self.secondValue);
    // console.log(self.display);
  },
  setDisplayToZero: function(self){
    self.display.innerHTML = "0";
    self.resultValue = 0;
    self.firstValue = 0;
    self.secondValue = 0;
    self.operator = "";
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
  },
  processSum: function(firstValue, secondValue){
    return (Number(firstValue) + Number(secondValue));
  },
  processSubtract: function(firstValue, secondValue){
    return (Number(firstValue) - Number(secondValue));
  },
  processMultiplication: function(firstValue, secondValue){
    return (Number(firstValue) * Number(secondValue));
  },
  processDivision: function(firstValue, secondValue){
    return (Number(firstValue) / Number(secondValue));
  }
}

Calculadora.init();
