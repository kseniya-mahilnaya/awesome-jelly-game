const Game = function(game) {};

Game.prototype = {

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
        const txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
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
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);
        this.optionCount++;
    },

    create: function() {
        this.stage.disableVisibilityChange = false;
        game.add.sprite(0, 0, 'stars');
        this.addMenuOption('Next', function(e) {
            if (music) music.stop();
            this.game.state.start("loading");
        });
    }
};
