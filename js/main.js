// =============================================================================
// Sprites
// =============================================================================

//
// jelly
//
function Jelly(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'jelly');

    // anchor
    this.anchor.set(0.5, 0.5);
    // physics properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    // animations
    this.animations.add('stop', [0]);
    this.animations.add('run', [8, 9, 10, 11], 8, true); // 8fps looped
    this.animations.add('jump', [1]);
    this.animations.add('fall', [3]);
    this.animations.add('die', [0, 0, 12, 12, 13, 13, 14, 14, 15, 15], 12); // 12fps no loop
    // starting animation
    this.animations.play('stop');
}

// inherit from Phaser.Sprite
Jelly.prototype = Object.create(Phaser.Sprite.prototype);
Jelly.prototype.constructor = Jelly;

Jelly.prototype.move = function (direction) {
    // guard
    if (this.isFrozen) { return; }

    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;

    // update image flipping & animations
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Jelly.prototype.jump = function () {
    const JUMP_SPEED = 400;
    let canJump = this.body.touching.down && this.alive && !this.isFrozen;

    if (canJump || this.isBoosting) {
        this.body.velocity.y = -JUMP_SPEED;
        this.isBoosting = true;
    }

    return canJump;
};

Jelly.prototype.stopJumpBoost = function () {
    this.isBoosting = false;
};

Jelly.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

Jelly.prototype.update = function () {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

Jelly.prototype.freeze = function () {
    this.body.enable = false;
    this.isFrozen = true;
};

Jelly.prototype.die = function () {
    this.alive = false;
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};

// returns the animation name that should be playing depending on
// current circumstances
Jelly.prototype._getAnimationName = function () {
    let name = 'stop'; // default animation

    // dying
    if (!this.alive) {
        name = 'die';
    }
    // frozen & not dying
    else if (this.isFrozen) {
        name = 'stop';
    }
    // jumping
    else if (this.body.velocity.y < 0) {
        name = 'jump';
    }
    // falling
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
        name = 'fall';
    }
    else if (this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }

    return name;
};

//
// foe (enemy)
//

function Foe(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'foe');

    // anchor
    this.anchor.set(0.5);
    // animation
    this.animations.add('crawl', [1, 2, 3, 4], 8, true);
    this.animations.add('die', [0, 9, 10, 0, 9, 10, 9, 10, 9, 9, 10, 9, 10, 9, 10, 9, 10], 12);
    this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Foe.SPEED;
}

Foe.SPEED = 70;

// inherit from Phaser.Sprite
Foe.prototype = Object.create(Phaser.Sprite.prototype);
Foe.prototype.constructor = Foe;

Foe.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Foe.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Foe.SPEED; // turn right
    }
};

Foe.prototype.die = function () {
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};


function MovingPlatforms(game, x, y, image) {
    Phaser.Sprite.call(this, game, x, y, image);

    // anchor
    this.anchor.set(0.5);

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = MovingPlatforms.SPEED;
}

MovingPlatforms.SPEED = 100;

// inherit from Phaser.Sprite
MovingPlatforms.prototype = Object.create(Phaser.Sprite.prototype);
MovingPlatforms.prototype.constructor = MovingPlatforms;

MovingPlatforms.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -MovingPlatforms.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = MovingPlatforms.SPEED; // turn right
    }
};


// =============================================================================
// Loading state
// =============================================================================

const LoadingState = {};

LoadingState.init = function () {
    // keep crispy-looking pixels
    this.game.renderer.renderSession.roundPixels = true;
};

LoadingState.preload = function () {
    this.game.load.json('level:0', 'data/level00.json');
    this.game.load.json('level:1', 'data/level01.json');
    this.game.load.json('level:2', 'data/level02.json');

    this.game.load.image('font:numbers', 'images/numbers.png');

    this.game.load.image('icon:star', 'images/star_icon.png');

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


LoadingState.create = function () {
    this.game.state.start('play', true, false, {level: 0});
};

// =============================================================================
// Play state
// =============================================================================

const PlayState = {};

const LEVEL_COUNT = 3;

PlayState.init = function (data) {
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP
    });

    this.starPickupCount = 0;
    this.hasKey = false;
    this.level = (data.level || 0) % LEVEL_COUNT;


};
const LIVES = 2;

PlayState.lives = LIVES;

PlayState.create = function () {
    // fade in (from black)
    this.camera.flash('#000000');

    // create sound entities
    this.sfx = {
        jump: this.game.add.audio('sfx:jump'),
        star: this.game.add.audio('sfx:star'),
        key: this.game.add.audio('sfx:key'),
        stomp: this.game.add.audio('sfx:stomp'),
        door: this.game.add.audio('sfx:door')
    };

    this.bgm = this.game.add.audio('bgm');
    this.bgm.loopFull();


    // create level entities and decoration
    this.game.add.image(0, 0, `background-level-${this.level}`);

    const button = this.game.add.button(45, 25, 'ms', function backToMenu() {
        this.game.destroy();
        document.getElementById('guiCanvas').style.display = 'block';
        const child = document.querySelector("#game canvas");
        document.getElementById('game').removeChild(child);

    }, this, 0, 0, 1, 0);
        button.anchor.x = .5;
        button.anchor.y = .5;
        button.input.useHandCursor = true;


    this.game.add.image(792, 5, 'score_board');

    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));

    // create UI score boards
    this._createHud();
};

PlayState.update = function () {

    this._handleCollisions();
    this._handleInput();

    // update scoreboards
    this.starFont.text = `x${this.starPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;

};

PlayState.shutdown = function () {
    this.bgm.stop();
};

PlayState._handleCollisions = function () {
    this.game.physics.arcade.collide(this.foes, this.platforms);
    this.game.physics.arcade.collide(this.foes, this.enemyWalls);
    this.game.physics.arcade.collide(this.jelly, this.movingPlatforms);
    this.game.physics.arcade.collide(this.jelly, this.platforms);

    // jelly vs stars (pick up)
    this.game.physics.arcade.overlap(this.jelly, this.stars, this._onJellyVsStar,
        null, this);
    // jelly vs key (pick up)
    this.game.physics.arcade.overlap(this.jelly, this.key, this._onJellyVsKey,
        null, this);
    // jelly vs door (end level)
    this.game.physics.arcade.overlap(this.jelly, this.door, this._onJellyVsDoor,
        // ignore if there is no key or the player is on air
        function (jelly, door) {
            return this.hasKey && jelly.body.touching.down;
        }, this);
    // collision: jelly vs enemies (kill or die)
    this.game.physics.arcade.overlap(this.jelly, this.foes,
        this._onJellyVsEnemy, null, this);
};

PlayState._handleInput = function () {
    if (this.keys.left.isDown) { // move jelly left
        this.jelly.move(-1);
    }
    else if (this.keys.right.isDown) { // move jelly right
        this.jelly.move(1);
    }
    else { // stop
        this.jelly.move(0);
    }

    // handle jump
    const JUMP_HOLD = 200; // ms
    if (this.keys.up.downDuration(JUMP_HOLD)) {
        let didJump = this.jelly.jump();
        if (didJump) { this.sfx.jump.play(); }
    }
    else {
        this.jelly.stopJumpBoost();
    }
};

PlayState._onJellyVsKey = function (jelly, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
};

PlayState._onJellyVsStar = function (jelly, star) {
    this.sfx.star.play();
    star.kill();
    this.starPickupCount++;
};

PlayState._onJellyVsEnemy = function (jelly, enemy) {
    // the jelly can kill enemies when is falling (after a jump, or a fall)
    if (jelly.body.velocity.y > 0) {

        enemy.die();
        jelly.bounce();
        this.sfx.stomp.play();
    }
    else { // game over -> play dying animation and restart the game

        jelly.die();
        this.sfx.stomp.play();
            this.lives--;
            jelly.events.onKilled.addOnce(function () {
                if (this.lives !== -1) {
                    this.game.state.restart(true, false, {level: this.level});
                } else {
                    this.bgm.stop();
                    document.getElementById('guiCanvas').style.display = 'block';
                    const child = document.querySelector("#game canvas");
                    document.getElementById('game').removeChild(child);
                    const dlg = EZGUI.components.dialog3;
                    dlg.visible = true;
                    dlg.position.x = (gameWidth - dlg.settings.width) / 2;
                    dlg.position.y = -20 - dlg.settings.height;
                    const targetY = (gameHeight - dlg.settings.height) / 2;
                    dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.Out);
                    this.lives = LIVES;
                }
            }, this);

        enemy.body.touching = enemy.body.wasTouching;
    }
};

PlayState._onJellyVsDoor = function (jelly, door) {
    // 'open' the door by changing its graphic and playing a sfx
    door.frame = 1;
    this.sfx.door.play();

    // play 'enter door' animation and change to the next level when it ends
    jelly.freeze();
    this.game.add.tween(jelly)
        .to({x: this.door.x, alpha: 0}, 500, null, true)
        .onComplete.addOnce(this._goToNextLevel, this);
};

PlayState._goToNextLevel = function () {

    this.camera.fade('#000000');
    if (this.level !== 2) {
        this.camera.onFadeComplete.addOnce(function () {


            // change to next level
            this.game.state.restart(true, false, {
                level: this.level + 1
            });
        }, this);
    } else {
        this.bgm.stop();
        document.getElementById('guiCanvas').style.display = 'block';
        const child = document.querySelector("#game canvas");
        document.getElementById('game').removeChild(child);
        const dlg = EZGUI.components.dialog2;
        dlg.visible = true;
        dlg.position.x = (gameWidth - dlg.settings.width) / 2;
        dlg.position.y = -20 - dlg.settings.height;
        const targetY = (gameHeight - dlg.settings.height) / 2;
        dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.Out);


    }
};

PlayState._loadLevel = function (data) {
    // create all the groups/layers that we need
    this.bgDecoration = this.game.add.group();
    this.platforms = this.game.add.group();

    this.surface = this.game.add.group();
    this.movingPlatforms = this.game.add.group();

    this.stars = this.game.add.group();
    this.foes = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.enemyWalls.visible = false;

    // spawn jelly and enemies
    this._spawnCharacters({jelly: data.jelly, foes: data.foes});
    this._spawnMovingPlatforms({movingPlatforms: data.movingPlatforms});

    // spawn level decoration
    data.decoration.forEach(function (deco) {
        this.bgDecoration.add(
            this.game.add.image(deco.x, deco.y, 'decoration', deco.frame));
    }, this);


    // spawn platforms
    data.platforms.forEach(this._spawnPlatform, this);

    // spawn surfaces
    data.surface.forEach(this._spawnSurface, this);

    // spawn important objects
    data.stars.forEach(this._spawnStar, this);
    this._spawnKey(data.key.x, data.key.y);
    this._spawnDoor(data.door.x, data.door.y);

    // enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
};

PlayState._spawnCharacters = function (data) {
    // spawn foes
    data.foes.forEach(function (foe) {
        let sprite = new Foe(this.game, foe.x, foe.y);
        this.foes.add(sprite);
    }, this);

    // spawn jelly
    this.jelly = new Jelly(this.game, data.jelly.x, data.jelly.y);
    this.game.add.existing(this.jelly);
};

PlayState._spawnMovingPlatforms = function (data) {
    // spawn foes
    data.movingPlatforms.forEach(function (platform) {
        let sprite = new MovingPlatforms(this.game, platform.x, platform.y, platform.image);
        this.movingPlatforms.add(sprite);
        sprite.body.allowGravity = false;
        sprite.body.immovable = true;
    }, this);


};

PlayState._spawnSurface = function (surface) {
    let sprite = this.surface.create(
        surface.x, surface.y, surface.image);
};


PlayState._spawnPlatform = function (platform) {
    let sprite = this.platforms.create(
        platform.x, platform.y, platform.image);

    // physics for platform sprites
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;

    // spawn invisible walls at each side, only detectable by enemies
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState._spawnEnemyWall = function (x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);
    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

PlayState._spawnStar = function (star) {
    let sprite = this.stars.create(star.x, star.y, 'star');
    sprite.anchor.set(0.5, 0.5);

    // physics (so we can detect overlap with the jelly)
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;

    // animations
    sprite.animations.add('rotate', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true); // 6fps, looped
    sprite.animations.play('rotate');
};

PlayState._spawnKey = function (x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    // enable physics to detect collisions, so the jelly can pick the key up
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;

    // add a small 'up & down' animation via a tween
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};

PlayState._spawnDoor = function (x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
};

PlayState._createHud = function () {
    const NUMBERS_STR = '0123456789X ';
    this.starFont = this.game.add.retroFont('font:numbers', 20, 30,
        NUMBERS_STR, 6);

    this.keyIcon = this.game.make.image(793, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);

    let starIcon = this.game.make.image(this.keyIcon.width + 800, 0, 'icon:star');
    let starScoreImg = this.game.make.image(starIcon.x + starIcon.width + 5,
        starIcon.height / 2, this.starFont);
    starScoreImg.anchor.set(0, 0.5);

    this.hud = this.game.add.group();
    this.hud.add(starIcon);
    this.hud.add(starScoreImg);
    this.hud.add(this.keyIcon);
    this.hud.position.set(10, 10);
};

// =============================================================================
// entry point
// =============================================================================
