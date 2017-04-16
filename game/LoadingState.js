// =============================================================================
// Loading state
// =============================================================================

const LoadingState = {};

LoadingState.init = function() {
    // keep crispy-looking pixels
    this.game.renderer.renderSession.roundPixels = true;
};

LoadingState.preload = function() {
    this.game.load.json('level:0', 'data/level00.json');
    this.game.load.json('level:1', 'data/level01.json');
    this.game.load.json('level:2', 'data/level02.json');

    this.game.load.image('font:numbers', 'images/numbers.png');

    this.game.load.image('icon:star', 'images/star_icon.png');
    this.game.load.image('icon:heart', 'images/heart.png');

    this.game.load.image('score_board', 'images/score_board.png');

    this.game.load.image('background-level-0', 'images/background-level-0.png');
    this.game.load.image('background-level-1', 'images/background-level-1.jpg');
    this.game.load.image('background-level-2', 'images/background-level-2.png');

    this.game.load.image('invisible-wall', 'images/invisible_wall.png');

    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('ground-level-1', 'images/ground-level-1.png');
    this.game.load.image('ground-level-2', 'images/ground-level-2.png');

    this.game.load.image('surface', 'images/surface.png');
    this.game.load.image('surface-level-2', 'images/surface-level-2.png');

    this.game.load.image('pink_platform:8x1', 'images/pink_platform_8x1.png');
    this.game.load.image('pink_platform:6x1', 'images/pink_platform_6x1.png');
    this.game.load.image('pink_platform:4x1', 'images/pink_platform_4x1.png');
    this.game.load.image('pink_platform:2x1', 'images/pink_platform_2x1.png');
    this.game.load.image('pink_platform:1x1', 'images/pink_platform_1x1.png');

    this.game.load.image('platform:8x1', 'images/platform_8x1.png');
    this.game.load.image('platform:6x1', 'images/platform_6x1.png');
    this.game.load.image('platform:4x1', 'images/platform_4x1.png');
    this.game.load.image('platform:2x1', 'images/platform_2x1.png');
    this.game.load.image('platform:1x1', 'images/platform_1x1.png');

    this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'images/grass_1x1.png');
    this.game.load.image('key', 'images/key.png');

    this.game.load.spritesheet('decoration', 'images/decor.png', 75, 34);
    this.game.load.spritesheet('jelly', 'images/drops.png', 27, 23);
    this.game.load.spritesheet('star', 'images/star_animated.png', 24, 22);
    this.game.load.spritesheet('foe', 'images/enemy.png', 39, 32);
    this.game.load.spritesheet('door', 'images/door.png', 36, 36);
    this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
    this.game.load.spritesheet('ms', 'images/my-sprites.png', 84, 42, 2);

    this.game.load.audio('sfx:jump', 'audio/jump.wav');
    this.game.load.audio('sfx:star', 'audio/star.wav');
    this.game.load.audio('sfx:key', 'audio/key.wav');
    this.game.load.audio('sfx:stomp', 'audio/stomp.mp3');
    this.game.load.audio('sfx:door', 'audio/door.wav');
    this.game.load.audio('bgm', ['audio/bgm.mp3', 'audio/bgm.ogg']);
};


LoadingState.create = function() {
    this.game.state.start('play', true, false, {
        level: 0
    });
};

game.state.add('loading', LoadingState);
