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

Foe.prototype.update = function() {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Foe.SPEED; // turn left
    } else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Foe.SPEED; // turn right
    }
};

Foe.prototype.die = function() {
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function() {
        this.kill();
    }, this);
};
