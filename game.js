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

let talking = false;
let talkIndex = 0;

let norinasionigirikun;
let spaceKey;

const messages = [
  'こんにちは！',
  'いい天気ですね',
  'おにぎりは好きですか？',
  'またね！'
];

function preload() {

  this.load.image('player', 'assets/player.png');
  this.load.image('onigirikun', 'assets/onigirikun.png');
  this.load.image('norinasionigirikun', 'assets/norinasionigirikun.png');

}

function create() {

  player = this.add.sprite(320, 240, 'player');

  cursors = this.input.keyboard.createCursorKeys();

  onigirikun = this.add.sprite(298, 240, 'onigirikun');

  tKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.T
  );

  spaceKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  messageText = this.add.text(20, 20, '', {
    fontSize: '24px',
    fill: '#ffffff'
  });

  norinasionigirikun = this.add.sprite(
    520,
    80,
    'norinasionigirikun'
  );

}

function update() {

  if (moving || talking) {
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

      talking = true;

      showNextMessage();

    }
  }

  if (Phaser.Input.Keyboard.JustDown(spaceKey)) {

    if (norinasionigirikun) {

      const distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        norinasionigirikun.x,
        norinasionigirikun.y
      );

      if (distance < 60) {

        norinasionigirikun.destroy();

        norinasionigirikun = null;

        messageText.setText('のりなしおにぎりくんをたおした！');

      }

    }

  }

}

function showNextMessage() {

  messageText.setText(messages[talkIndex]);

  talkIndex++;

  if (talkIndex >= messages.length) {

    talkIndex = 0;

    setTimeout(() => {
      messageText.setText('');
      talking = false;
    }, 1000);

    return;
  }

  tKey.once('down', () => {
    showNextMessage();
  });

}

function movePlayer(dx, dy) {

  moving = true;

  player.x += dx * TILE_SIZE;
  player.y += dy * TILE_SIZE;

  setTimeout(() => {
    moving = false;
  }, 150);

}