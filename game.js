const TILE_SIZE = 32;

const config = {
  type: Phaser.AUTO,

  width: 640,
  height: 360,

  backgroundColor: '#4488aa',

  fps: {
    target: 30
  },

  scene: {
    preload,
    create,
    update
  }
};

new Phaser.Game(config);

let player;
let cursors;
let onigirikun;

let moving = false;

let tKey;
let messageText;

function preload() {

  this.load.image('player', 'assets/player.png');
  this.load.image('onigirikun', 'assets/onigirikun.png');

}

function create() {

  player = this.add.sprite(320, 240, 'player');

  player.setScale(0.2);

  cursors = this.input.keyboard.createCursorKeys();

  onigirikun = this.add.sprite(298, 240, 'onigirikun');

  tKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.T
  );

  messageText = this.add.text(20, 20, '', {
    fontSize: '24px',
    fill: '#ffffff'
  });

}

function update() {

  if (moving) {
    return;
  }

  if (cursors.left.isDown) {
    movePlayer(-1, 0);
  }

  else if (cursors.right.isDown) {
    movePlayer(1, 0);
  }

  else if (cursors.up.isDown) {
    movePlayer(0, -1);
  }

  else if (cursors.down.isDown) {
    movePlayer(0, 1);
  }

  if (Phaser.Input.Keyboard.JustDown(tKey)) {

    const distance = Phaser.Math.Distance.Between(
      player.x,
      player.y,
      onigirikun.x,
      onigirikun.y
    );

    if (distance < 40) {
      messageText.setText('こんにちは！');
    }
  }

}

function movePlayer(dx, dy) {

  moving = true;

  player.x += dx * TILE_SIZE;
  player.y += dy * TILE_SIZE;

  setTimeout(() => {
    moving = false;
  }, 150);

}