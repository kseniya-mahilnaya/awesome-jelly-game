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

MovingPlatforms.prototype.update = function() {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -MovingPlatforms.SPEED; // turn left
    } else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = MovingPlatforms.SPEED; // turn right
    }
};
