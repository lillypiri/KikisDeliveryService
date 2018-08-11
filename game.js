var SCALE_FACTOR = 4;

var game = new Phaser.Game(250, 150, Phaser.CANVAS, 'game', { 
  preload: preload, 
  create: create, 
  update: update 
});

var kiki;
var isPlaying = true;
var isFacing = 'right';

var babystar;
var star;
var bigstar;

var babytree;
var tree;

var bird;

// carry items
var cage;
var parcel;

// Cache any assets needed in the game
function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.scale.setUserScale(SCALE_FACTOR, SCALE_FACTOR);
  game.renderer.renderSession.roundPixels = false;
  Phaser.Canvas.setImageRenderingCrisp(game.canvas);

  this.load.spritesheet("kiki", "kiki2.png", 18, 18, 8);

  this.load.spritesheet("bird", "bird.png", 7, 7, 2);

  this.load.spritesheet("babytree", "babytree.png", 17, 52, 3);
  this.load.spritesheet("tree", "tree.png", 25, 75, 3);

  this.load.spritesheet("babystar", "babystar.png", 3, 3, 2);
  this.load.spritesheet("star", "star.png", 5, 5, 2);
  this.load.spritesheet("bigstar", "bigstar.png", 7, 7, 4);

  this.load.spritesheet("cage", "cage.png", 7, 7, 2);
  this.load.spritesheet("parcel", "parcel.png", 5, 5, 2);
  
}

// Add stuff to your scene
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    

    game.stage.backgroundColor = '#5e36fb';
    game.world.setBounds(0, 0, 500, 170);

    babytree = this.add.sprite(100, 120, "babytree");
    babytree.animations.add('cute', [0, 1, 2], 3, true);
    babytree.animations.play('cute');
    game.physics.arcade.enable(babytree);

    tree = this.add.sprite(40, 100, "tree");
    tree.animations.add('angery', [0, 1, 2], 5, true);
    tree.animations.play('angery');
    game.physics.arcade.enable(tree);

    babystar = this.add.sprite(50, 30, "babystar");
    babystar.animations.add('twinkle', [0, 1], 2, true);
    babystar.animations.play('twinkle');
    
    star = this.add.sprite(200, 120, "star");
    star.animations.add('twinkle', [0, 1], 2, true);
    star.animations.play('twinkle');

    bigstar = this.add.sprite(150, 50, "bigstar");
    bigstar.animations.add('twinkle', [0, 1, 2, 3], 4, true);
    bigstar.animations.play('twinkle');

    bird = this.add.sprite(500, 70, "bird");
    bird.animations.add('flap', [0, 1], 4, true);
    bird.animations.play('flap');
    game.physics.arcade.enable(bird);



    // Kiki sprite 
    kiki = this.add.sprite(20, 90, "kiki");
    kiki.animations.add('right', [0,1], 2, true);
    kiki.animations.add('idleright', [2, 3], 2, true);
    kiki.animations.add('left', [4, 5], 2, true);
    kiki.animations.add('idleleft', [6, 7], 2, true);
    kiki.animations.play('idleright');
    game.physics.arcade.enable(kiki);

    // carry items
    cage = this.add.sprite(26, 105, "cage");
    cage.animations.add('idle', [0,1], 2, true);
    cage.animations.play('idle');

    parcel = this.add.sprite(27, 110, "parcel");
    parcel.animations.add('idle', [0,1], 2, true);
    parcel.animations.play('idle');

    game.camera.follow(kiki);
}

// Called once per frame to move stuff around 
function update() {

    game.physics.arcade.collide(kiki, tree, function (kiki, tree) {
        // console.log("collision"
    });

    game.physics.arcade.collide(kiki, bird, function (kiki, bird) {
        console.log("bird collision")
    });
   
  if (isPlaying) {

    bird.x -=1;

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && kiki.x < (game.world.bounds.width - kiki.width) ){
        isFacing = "right";
        kiki.x +=1;
        cage.x = (kiki.x + 6);
        parcel.x = (kiki.x + 7);
        kiki.animations.play('right'); 
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && kiki.x > 0 ){
        isFacing = "left";
        kiki.x -= 1;
        cage.x = (kiki.x + 6);
        parcel.x = (kiki.x + 7);
        kiki.animations.play('left');
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && kiki.y > 0 ) {
        kiki.y -= 1;
        cage.y = (kiki.y + 14);
        parcel.y = (kiki.y + 19);
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && kiki.y < game.world.bounds.height - kiki.height ) {
        kiki.y += 1;
        cage.y = (kiki.y + 14);
        parcel.y = (kiki.y + 19);
      } else if (isFacing === 'right') {
        kiki.animations.play('idleright');
      } else if (isFacing === 'left') {
        kiki.animations.play('idleleft');
      }
  }
}