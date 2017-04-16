let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
const Main = function() {};
const gameOptions = {
    playSound: true,
    playMusic: true
};
let musicPlayer;

Main.prototype = {
    preload: function() {
        game.load.image('stars', 'assets/images/stars.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('splash', 'states/Splash.js');
        game.load.script('jelly', 'game/Jelly.js');
        game.load.script('foe', 'game/Foe.js');
        game.load.script('loadingState', 'game/LoadingState.js');
        game.load.script('movingPlatforms', 'game/MovingPlatforms.js');
        game.load.script('spawnCharacters', 'game/SpawnCharacters.js');
        game.load.script('collisions', 'game/Collisions.js');
        game.load.script('levels', 'game/Levels.js');
        game.load.script('scoreBoard', 'game/ScoreBoard.js');
    },

    create: function() {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

// =============================================================================
// Play state
// =============================================================================

const PlayState = {};
const LEVEL_COUNT = 3;
const LIVES = 2;
const GRAVITY = 1200;
const JUMP_HOLD = 200; // ms

PlayState.init = function(data) {
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP
    });

    this.hasKey = false;
    this.level = (data.level || 0) % LEVEL_COUNT;
};

PlayState.create = function() {
    // fade in (from black)
    this.camera.flash('#000000');

    // create sound entities
    if (gameOptions.playSound) {
        this.sfx = {
            jump: this.game.add.audio('sfx:jump'),
            star: this.game.add.audio('sfx:star'),
            key: this.game.add.audio('sfx:key'),
            stomp: this.game.add.audio('sfx:stomp'),
            door: this.game.add.audio('sfx:door')
        };
    } else {
        this.sfx = {
            jump: this.game.add.audio(''),
            star: this.game.add.audio(''),
            key: this.game.add.audio(''),
            stomp: this.game.add.audio(''),
            door: this.game.add.audio('')
        };
    }

    this.bgm = this.game.add.audio('bgm');
    if (gameOptions.playMusic && gameOptions.playSound) {
        this.bgm.loopFull();
    }

    // create level entities and decoration
    this.game.add.image(0, 0, `background-level-${this.level}`);
    this.game.add.image(700, 5, 'score_board');
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));

    // create UI score boards
    this._createHud();
    this._createHudHeart();
};

PlayState.update = function() {
    this._handleCollisions();
    this._handleInput();

    // update scoreboards
    this.starFont.text = `x${this.starPickupCount}`;
    this.heartFont.text = `x${this.lives + 1}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
};

PlayState.shutdown = function() {
    this.bgm.stop();
};

// =============================================================================
// entry point
// =============================================================================
game.state.add('Main', Main);
game.state.add('play', PlayState);
game.state.start('Main');
