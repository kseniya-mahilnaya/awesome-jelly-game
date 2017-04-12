const themeOverride = {
    levelBtn: {
        image: '../../assets/img/level-box.png',
        font: { size: '45px', family: 'Skranji', color: 'white' },
        anchor: {x:0.5, y:0.5}
    },
}


const gameWidth = 960;
const gameHeight = 600;
let mainScreen;

function setupGUI() {
    EZGUI.components.playBtn.on('click', function() {
        document.getElementById('guiCanvas').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
        game.state.add('play', PlayState);
        game.state.add('loading', LoadingState);
        game.state.start('loading');
    });

    EZGUI.components.optionsBtn.on('click', function() {
        mainScreen.visible = true;
        const dlg = EZGUI.components.dialog1;
        dlg.visible = true;
        dlg.position.x = (gameWidth - dlg.settings.width) / 2;
        dlg.position.y = -20 - dlg.settings.height;
        const targetY = (gameHeight - dlg.settings.height) / 2;
        dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.Out);
    });

          const hideBtn = EZGUI.components.dialog1HideBtn;
          hideBtn.on('click', function () {
              const targetY = gameHeight + 200;
              const dlg = EZGUI.components.dialog1;
              dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.In, function () {
                  dlg.visible = false;
              });
          });

          hideBtn.on('mousedown', function () {
              const ow = hideBtn.width;
              const oh = hideBtn.height;
              hideBtn.animateSizeTo(ow * 1.2, oh * 1.2, 200, EZGUI.Easing.Back.Out, function () {
                  hideBtn.animateSizeTo(ow, oh, 200);
              });
          });

    const hideBtn2 = EZGUI.components.dialog2HideBtn;
    hideBtn2.on('click', function () {
        const targetY = gameHeight + 20;
        const dlg = EZGUI.components.dialog2;
        dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.In, function () {
            dlg.visible = false;
        });
    });

    hideBtn2.on('mousedown', function () {
        const ow = hideBtn2.width;
        const oh = hideBtn2.height;
        hideBtn2.animateSizeTo(ow * 1.2, oh * 1.2, 200, EZGUI.Easing.Back.Out, function () {
            hideBtn2.animateSizeTo(ow, oh, 200);
        });
    });

    const hideBtn3 = EZGUI.components.dialog3HideBtn;
    hideBtn3.on('click', function () {
        const targetY = gameHeight + 20;
        const dlg = EZGUI.components.dialog3;
        dlg.animatePosTo(dlg.position.x, targetY, 800, EZGUI.Easing.Back.In, function () {
            dlg.visible = false;
        });
    });

    hideBtn3.on('mousedown', function () {
        const ow = hideBtn3.width;
        const oh = hideBtn3.height;
        hideBtn3.animateSizeTo(ow * 1.2, oh * 1.2, 200, EZGUI.Easing.Back.Out, function () {
            hideBtn3.animateSizeTo(ow, oh, 200);
        });
    });


}



EZGUI.Theme.load(['../../assets/metalworks-theme/metalworks-theme.json'], function () {
    EZGUI.themes['metalworks'].override(themeOverride);

    mainScreen = EZGUI.create(mainScreenJSON, 'metalworks');

    const dlg1  = EZGUI.create(dialog1JSON, 'metalworks');
    dlg1.visible=false;
    const dlg2  = EZGUI.create(dialog2JSON, 'metalworks');
    dlg2.visible=false;
    const dlg3  = EZGUI.create(dialog3JSON, 'metalworks');
    dlg3.visible=false;


    setupGUI();
});

let game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'guiCanvas', { preload: preload, create: create });

const resources = [
    '../../assets/img/orange-btn.png',
    '../../assets/img/panel-650x400.png',
    '../../assets/img/controls.png',
    '../../assets/img/lvlcomplete.png',
    '../../assets/img/star2.png',
    '../../assets/img/gameOver.png',
    '../../assets/img/star-gameOver.png'
];



  function preload() {
      for (let i = 0; i < resources.length; i++) {
          game.load.image(resources[i], resources[i]);
      }

      game.load.onLoadComplete.add(EZGUI.Compatibility.fixCache, game.load, null, resources);
  }

  function create() {

  }
