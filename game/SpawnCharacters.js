PlayState._spawnCharacters = function(data) {
    // spawn foes
    data.foes.forEach(function(foe) {
        let sprite = new Foe(this.game, foe.x, foe.y);
        this.foes.add(sprite);
    }, this);

    // spawn jelly
    this.jelly = new Jelly(this.game, data.jelly.x, data.jelly.y);
    this.game.add.existing(this.jelly);
};

PlayState._spawnMovingPlatforms = function(data) {
    // spawn foes
    data.movingPlatforms.forEach(function(platform) {
        let sprite = new MovingPlatforms(this.game, platform.x, platform.y, platform.image);
        this.movingPlatforms.add(sprite);
        sprite.body.allowGravity = false;
        sprite.body.immovable = true;
    }, this);
};

PlayState._spawnSurface = function(surface) {
    let sprite = this.surface.create(
        surface.x, surface.y, surface.image);
};


PlayState._spawnPlatform = function(platform) {
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

PlayState._spawnEnemyWall = function(x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);
    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

PlayState._spawnStar = function(star) {
    let sprite = this.stars.create(star.x, star.y, 'star');
    sprite.anchor.set(0.5, 0.5);

    // physics (so we can detect overlap with the jelly)
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;

    // animations
    sprite.animations.add('rotate', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true); // 6fps, looped
    sprite.animations.play('rotate');
};

PlayState._spawnKey = function(x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    // enable physics to detect collisions, so the jelly can pick the key up
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;

    // add a small 'up & down' animation via a tween
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({
            y: this.key.y + 6
        }, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};

PlayState._spawnDoor = function(x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
};
