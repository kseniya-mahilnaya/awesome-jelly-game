const Splash = function() {};

Splash.prototype = {

    loadScripts: function() {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('gamemenu', 'states/GameMenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('gameover', 'states/GameOver.js');
        game.load.script('gamewin', 'states/GameWin.js');
        game.load.script('Controls', 'states/Controls.js');
        game.load.script('options', 'states/Options.js');
    },

    loadBgm: function() {
        game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },

    loadImages: function() {
        game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
        game.load.image('options-bg', 'assets/images/options-bg.jpg');
        game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
        game.load.image('gamewin-bg', 'assets/images/gamewin-bg.jpg');
    },

    loadFonts: function() {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function() {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 270, "loading");
        this.status = game.make.text(game.world.centerX - 50, 220, 'Loading...', {
            fill: 'white'
        });
    },

    preload: function() {
        game.add.sprite(0, 0, 'stars');
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();

    },

    addGameStates: function() {

        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("GameOver", GameOver);
        game.state.add("GameWin", GameWin);
        game.state.add("Controls", Controls);
        game.state.add("Options", Options);
    },

    addGameMusic: function() {
        music = game.add.audio('dangerous');
        music.loop = true;
        music.play();
    },

    create: function() {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();

        setTimeout(function() {
            game.state.start("GameMenu");
        }, 1000);
    }
};
