var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 315,
    startX: 480
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, " Awesome Jelly", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', stroke: 'rgba(0,0,0,0)', align: 'center', strokeThickness: 4};
    var txt = game.add.text(this.menuConfig.startX, (this.optionCount * 70) + this.menuConfig.startY, text, optionStyle);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    txt.anchor.setTo(0.5);
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
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      music.volume = playMusic ? 1 : 0;
      gameOptions.playMusic = playMusic;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
      music.mute = playSound ? false : true;
      gameOptions.playSound = playSound;
    });
    this.addMenuOption('Back', function () {
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
