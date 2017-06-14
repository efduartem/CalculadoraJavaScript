var Calculadora = {
  init : function(){
    this.listenKeyClick();
  },
  listenKeyClick: function(){
    var keys = document.querySelectorAll(".tecla");
    for (var i = 0; i < keys.length; i++) {
      keys[i].addEventListener('click', function(e) {
          e.preventDefault()
          var self = this;
          self.style.padding = "1%";
          setTimeout(function(){
            self.style.padding = "";
          }, 200);
      });
    }
  }
}

Calculadora.init();
