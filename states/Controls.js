var Controls = function(game) {};

Controls.prototype = {

  preload: function () {
    game.load.image('controls', 'assets/images/controls.png');
    this.optionCount = 1;
  },

  addCredit: function(task, author) {

  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(40, (this.optionCount * 80) + 420, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    this.stage.disableVisibilityChange = true;
    /*if (gameOptions.playMusic) {
      musicPlayer.stop();
      musicPlayer = game.add.audio('exit');
      musicPlayer.play();
  }*/
    var bg = game.add.sprite(0, 0, 'options-bg');
    game.add.image(230, 90, 'controls');
    this.addMenuOption('Back', function (e) {
    game.state.start("GameMenu");
    });
  }

};
