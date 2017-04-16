PlayState._goToNextLevel = function() {
    this.camera.fade('#000000');
    if (this.level !== 2) {
        this.camera.onFadeComplete.addOnce(function() {


            // change to next level
            this.game.state.restart(true, false, {
                level: this.level + 1
            });
        }, this);
    } else {
        this.game.state.start("GameWin");
    }
};

PlayState._loadLevel = function(data) {
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
    this._spawnCharacters({
        jelly: data.jelly,
        foes: data.foes
    });
    this._spawnMovingPlatforms({
        movingPlatforms: data.movingPlatforms
    });

    // spawn level decoration
    data.decoration.forEach(function(deco) {
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
    this.game.physics.arcade.gravity.y = GRAVITY;
};
