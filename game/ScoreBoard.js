PlayState._createHud = function() {
    const NUMBERS_STR = '0123456789X ';
    this.starFont = this.game.add.retroFont('font:numbers', 20, 30,
        NUMBERS_STR, 6);

    this.keyIcon = this.game.make.image(700, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);

    const starIcon = this.game.make.image(this.keyIcon.width + 795, 0, 'icon:star');
    const starScoreImg = this.game.make.image(starIcon.x + starIcon.width + 5,
        20, this.starFont);
    starScoreImg.anchor.set(0, 0.5);

    this.hud = this.game.add.group();
    this.hud.add(starIcon);
    this.hud.add(starScoreImg);
    this.hud.add(this.keyIcon);
    this.hud.position.set(10, 10);
};

PlayState._createHudHeart = function() {
    const NUMBERS_STR = '0123456789X ';
    this.heartFont = this.game.add.retroFont('font:numbers', 20, 30,
        NUMBERS_STR, 6);
    const heartIcon = this.game.make.image(34 + 707, 5, 'icon:heart');
    const heartScoreImg = this.game.make.image(heartIcon.x + heartIcon.width + 5,
        20, this.heartFont);
    heartScoreImg.anchor.set(0, 0.5);

    this.hudHeart = this.game.add.group();
    this.hudHeart.add(heartIcon);
    this.hudHeart.add(heartScoreImg);
    this.hudHeart.position.set(10, 10);
};
