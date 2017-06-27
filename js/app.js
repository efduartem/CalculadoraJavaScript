var Calculadora = {
  display : document.getElementById('display'),
  operator: "",
  firstValue: "",
  secondValue: "",
  resultValue: "",
  executedEqual: false,
  init : function(){
    this.listenKeyClick();
  },
  listenKeyClick: function(){
    var self = this;
    var keys = document.querySelectorAll(".tecla");
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
            self.maxLengthCheck(function(){
              if(display.textContent != "0"){
                display.append(key.id);
              }else if(display.textContent == "0" && parseInt(key.id) != 0){
                display.innerHTML = key.id;
              }
            });
        });
      }else if(keys[i].id == "on"){
        keys[i].addEventListener('click', function(){
          self.setDisplayToZero(self);
        });
      }else if (keys[i].id == "punto") {
        keys[i].addEventListener('click', function(){
          self.maxLengthCheck(self.addDecimalPoint);
        });
      }else if (keys[i].id == "sign") {
        keys[i].addEventListener('click', function(){
          self.maxLengthCheck(self.addSubtractionSign);
        });
      }else if (keys[i].id == "dividido"
                || keys[i].id == "por"
                || keys[i].id == "menos"
                || keys[i].id == "mas") {
        keys[i].addEventListener('click', function(){
            self.processOperation(self, this.id);
        });
      }else if (keys[i].id == "igual") {
        keys[i].addEventListener('click', function(){
            self.processEqual(self);
        });
      }
    }
  },
  processEqual: function(self){
    if(!self.executedEqual){
        self.secondValue = self.display.textContent;
        self.executedEqual = true;
    }
    self.executeOperation(self);

    if(self.resultValue.length >= 8){
      self.resultValue = self.resultValue.substr(0,8);
      var toPrecisionValue;
      if(self.resultValue.search("\\.") != -1){
        toPrecisionValue = 8 - self.resultValue.search("\\.");
      }
      if(toPrecisionValue!=undefined){
        self.resultValue = Number(self.resultValue).toPrecision(toPrecisionValue);
      }
    }
    self.display.textContent = self.resultValue;
    self.firstValue = self.resultValue;
  },
  processOperation: function(self, operator) {
    if(self.operator=="" || self.executedEqual){
        if(self.executedEqual){
          self.executedEqual = false;
        }
        self.operator = operator;
        self.firstValue = self.display.textContent;
        self.display.textContent = "";
    }else{
      self.secondValue = self.display.textContent;
      self.executeOperation(self);
      self.firstValue = self.resultValue;
      self.display.textContent = "";
      self.operator = operator;
    }
  },
  executeOperation: function(self){
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
  },
  setDisplayToZero: function(self){
    self.display.innerHTML = "0";
    self.secondValue = "";
    self.firstValue = "";
    self.operator = "";
    self.executedEqual = false;
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
    return (Number(firstValue) + Number(secondValue)).toString();
  },
  processSubtract: function(firstValue, secondValue){
    return (Number(firstValue) - Number(secondValue)).toString();
  },
  processMultiplication: function(firstValue, secondValue){
    return (Number(firstValue) * Number(secondValue)).toString();
  },
  processDivision: function(firstValue, secondValue){
    return (Number(firstValue) / Number(secondValue)).toString();
  }
}

Calculadora.init();
