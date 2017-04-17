const GameMenu = function() {};

GameMenu.prototype = {
    menuConfig: {
        startY: 290,
        startX: 40
    },

    init: function() {
        this.titleText = game.make.text(game.world.centerX, 75, " Awesome Jelly", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },

    addMenuOption: function(text, callback) {
        const optionStyle = {
            font: '30pt TheMinion',
            fill: 'white',
            stroke: 'rgba(0,0,0,0)',
            align: 'left',
            strokeThickness: 4
        };
        const txt = game.add.text(this.menuConfig.startX, (this.optionCount * 70) + this.menuConfig.startY, text, optionStyle);
        txt.stroke = "rgba(0,0,0,0)";
        txt.strokeThickness = 4;
        const onOver = function(target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        const onOut = function(target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };

        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);
        this.optionCount++;
    },

    create: function() {
        if (music.name !== "dangerous" && playMusic) {
            music.stop();
            music = game.add.audio('dangerous');
            music.loop = true;
            music.play();
        }
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);

        this.addMenuOption('Start', function() {
            game.state.start("Game");
        });
        this.addMenuOption('Controls', function() {
            game.state.start("Controls");
        });
        this.addMenuOption('Options', function() {
            game.state.start("Options");
        });
    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
