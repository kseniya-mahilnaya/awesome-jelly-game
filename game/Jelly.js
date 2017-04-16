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

Jelly.prototype.move = function(direction) {
    // guard
    if (this.isFrozen) {
        return;
    }

    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;

    // update image flipping & animations
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    } else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Jelly.prototype.jump = function() {
    const JUMP_SPEED = 400;
    let canJump = this.body.touching.down && this.alive && !this.isFrozen;

    if (canJump || this.isBoosting) {
        this.body.velocity.y = -JUMP_SPEED;
        this.isBoosting = true;
    }

    return canJump;
};

Jelly.prototype.stopJumpBoost = function() {
    this.isBoosting = false;
};

Jelly.prototype.bounce = function() {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

Jelly.prototype.update = function() {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

Jelly.prototype.freeze = function() {
    this.body.enable = false;
    this.isFrozen = true;
};

Jelly.prototype.die = function() {
    this.alive = false;
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function() {
        this.kill();
    }, this);
};

// returns the animation name that should be playing depending on
// current circumstances
Jelly.prototype._getAnimationName = function() {
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
    } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }

    return name;
};

PlayState._handleInput = function() {
    if (this.keys.left.isDown) { // move jelly left
        this.jelly.move(-1);
    } else if (this.keys.right.isDown) { // move jelly right
        this.jelly.move(1);
    } else { // stop
        this.jelly.move(0);
    }
    // handle jump
    if (this.keys.up.downDuration(JUMP_HOLD)) {
        let didJump = this.jelly.jump();
        if (didJump) {
            this.sfx.jump.play();
        }
    } else {
        this.jelly.stopJumpBoost();
    }
};
