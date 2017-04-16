PlayState.starPickupCount = 0;
PlayState.lives = LIVES;

PlayState._handleCollisions = function() {
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
        function(jelly, door) {
            return this.hasKey && jelly.body.touching.down;
        }, this);
    // collision: jelly vs enemies (kill or die)
    this.game.physics.arcade.overlap(this.jelly, this.foes,
        this._onJellyVsEnemy, null, this);
};

PlayState._onJellyVsKey = function(jelly, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
};

PlayState._onJellyVsStar = function(jelly, star) {
    this.sfx.star.play();
    star.kill();
    this.starPickupCount++;
};

PlayState._onJellyVsEnemy = function(jelly, enemy) {
    // the jelly can kill enemies when is falling (after a jump, or a fall)
    if (jelly.body.velocity.y > 0) {

        enemy.die();
        jelly.bounce();
        this.sfx.stomp.play();
    } else { // game over -> play dying animation and restart the game

        jelly.die();
        this.sfx.stomp.play();
        this.lives--;
        jelly.events.onKilled.addOnce(function() {
            if (this.lives !== -1) {
                this.starPickupCount = 0;
                this.game.state.restart(true, false, {
                    level: this.level
                });
            } else {
                this.lives = LIVES;
                this.game.state.start("GameOver");
            }
        }, this);

        enemy.body.touching = enemy.body.wasTouching;
    }
};

PlayState._onJellyVsDoor = function(jelly, door) {
    // 'open' the door by changing its graphic and playing a sfx
    door.frame = 1;
    this.sfx.door.play();

    // play 'enter door' animation and change to the next level when it ends
    jelly.freeze();
    this.game.add.tween(jelly)
        .to({
            x: this.door.x,
            alpha: 0
        }, 500, null, true)
        .onComplete.addOnce(this._goToNextLevel, this);
};
