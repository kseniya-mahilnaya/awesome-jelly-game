const GameWin = function(game) {};

GameWin.prototype = {

    preload: function() {
        this.optionCount = 1;
    },

    addMenuOption: function(text, callback) {
        const optionStyle = {
            font: '30pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            srokeThickness: 4
        };
        const txt = game.add.text(160, (this.optionCount * 70) + 360, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
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
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;


    },

    create: function() {
        game.add.sprite(0, 0, 'gamewin-bg');
        const titleStyle = {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        };
        const scoreStyle = {
            fill: 'white',
            align: 'center'
        };
        const text = game.add.text(game.world.centerX, 60, " You Win!", titleStyle);
        const scoreText = game.add.text(game.world.centerX, 110, `Your score is ${PlayState.starPickupCount}`, scoreStyle);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5);
        scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        scoreText.anchor.set(0.5);
        music.play();
        this.addMenuOption('Play Again', function(e) {
            this.game.state.start("Game");

        });
        this.addMenuOption('Main Menu', function(e) {
            this.game.state.start("GameMenu");
        })
    }
};
