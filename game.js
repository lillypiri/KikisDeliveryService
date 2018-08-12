let SCALE_FACTOR = 4;

let game = new Phaser.Game(250, 150, Phaser.CANVAS, 'game');

//TODO 
// end sprite/area 
// game over / restart

// nice to have
// fx
// score

let kiki;
let isPlaying = true;
let isFacing = 'right';

let babystar;
let star;
let bigstar;

// Trees
let superbabytree;
let babytree;
let babytreetwo;
let babytreethree;
let tree;
let treetwo;
let treethree;
let treefour;

let bird;
let birdtwo;
let birdthree;

let flock;

let goose;
let goosetwo;

// carry items
let cage;
let parcel;
let radio;

// goose items
let goosecage;
let gooseparcel;

let pickUp;
let hit;

let collected = [];

class Game {

    // Cache any assets needed in the game
    preload() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(SCALE_FACTOR, SCALE_FACTOR);
    game.renderer.renderSession.roundPixels = false;
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);

    this.load.spritesheet("kiki", "kiki2.png", 18, 18, 8);

    this.load.spritesheet("bird", "bird.png", 7, 7, 2);
    this.load.spritesheet("goose", "goose.png", 9, 9, 2);

    this.load.spritesheet("superbabytree", "fetustree.png", 10, 31, 3)
    this.load.spritesheet("babytree", "babytree.png", 17, 52, 3);
    this.load.spritesheet("tree", "tree.png", 25, 75, 3);
    this.load.spritesheet("fangtree", "fangtree.png", 25, 75, 3);

    this.load.spritesheet("babystar", "babystar.png", 3, 3, 2);
    this.load.spritesheet("star", "star.png", 5, 5, 2);
    this.load.spritesheet("bigstar", "bigstar.png", 7, 7, 4);

    this.load.spritesheet("cage", "cage.png", 7, 7, 2);
    this.load.spritesheet("parcel", "parcel.png", 5, 5, 2);
    this.load.spritesheet("radio", "radio.png", 5, 5, 2);

    // audio
    this.load.audio('pickup', "pickup.wav");
    this.load.audio('hit', "hit.wav");
    
    }

    // Add stuff to your scene
    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        

        game.stage.backgroundColor = '#5e36fb';
        game.world.setBounds(0, 0, 500, 170);

        babystar = this.add.sprite(50, 30, "babystar");
        babystar.animations.add('twinkle', [0, 1], 2, true);
        babystar.animations.play('twinkle');
        
        star = this.add.sprite(200, 110, "star");
        star.animations.add('twinkle', [0, 1], 2, true);
        star.animations.play('twinkle');

        bigstar = this.add.sprite(150, 50, "bigstar");
        bigstar.animations.add('twinkle', [0, 1, 2, 3], 4, true);
        bigstar.animations.play('twinkle');


        superbabytree = this.add.sprite(120, 140, "superbabytree");
        superbabytree.animations.add('cute', [0, 1, 2], 3, true);
        superbabytree.animations.play('cute');
        game.physics.arcade.enable(superbabytree);

        babytree = this.add.sprite(100, 120, "babytree");
        babytree.animations.add('cute', [0, 1, 2], 3, true);
        babytree.animations.play('cute');
        game.physics.arcade.enable(babytree);

        babytreetwo = this.add.sprite(170, 125, "babytree");
        babytreetwo.animations.add('cute', [0, 1, 2], 3, true);
        babytreetwo.animations.play('cute');
        game.physics.arcade.enable(babytreetwo);

        babytreethree = this.add.sprite(320, 125, "babytree");
        babytreethree.animations.add('cute', [0, 1, 2], 3, true);
        babytreethree.animations.play('cute');
        game.physics.arcade.enable(babytreethree);

        tree = this.add.sprite(40, 100, "tree");
        tree.animations.add('angery', [0, 1, 2], 5, true);
        tree.animations.play('angery');
        game.physics.arcade.enable(tree);
        tree.body.setSize(5, 70, 10,4);

        treetwo = this.add.sprite(280, 110, "fangtree");
        treetwo.animations.add('angery', [0, 1, 2], 5, true);
        treetwo.animations.play('angery');
        game.physics.arcade.enable(treetwo);
        treetwo.body.setSize(5, 70, 10,4);

        treethree = this.add.sprite(200, 95, "fangtree");
        treethree.animations.add('angery', [0, 1, 2], 5, true);
        treethree.animations.play('angery');
        game.physics.arcade.enable(treethree);
        treethree.body.setSize(5, 70, 10,4);

        treefour = this.add.sprite(350, 95, "tree");
        treefour.animations.add('angery', [0, 1, 2], 5, true);
        treefour.animations.play('angery');
        game.physics.arcade.enable(treefour);
        treefour.body.setSize(5, 70, 10,4);

        bird = this.add.sprite(500, 70, "bird");
        birdtwo = this.add.sprite(300, 30, "bird");
        birdthree = this.add.sprite(400, 100, "bird");

        let flock = [bird, birdtwo, birdthree];

        flock.forEach((item) => {
            item.animations.add('flap', [0, 1], 4, true);
            item.animations.play('flap');
            game.physics.arcade.enable(item);
        })


        goose = this.add.sprite(500, 70, "goose");
        goose.animations.add('flap', [0, 1], 4, true);
        goose.animations.play('flap');
        game.physics.arcade.enable(goose);

        goosetwo = this.add.sprite(500, 80, "goose");
        goosetwo.animations.add('flap', [0, 1], 4, true);
        goosetwo.animations.play('flap');
        game.physics.arcade.enable(goosetwo);


        // Kiki sprite 
        kiki = this.add.sprite(20, 90, "kiki");
        kiki.animations.add('right', [0,1], 2, true);
        kiki.animations.add('idleright', [2, 3], 2, true);
        kiki.animations.add('left', [4, 5], 2, true);
        kiki.animations.add('idleleft', [6, 7], 2, true);
        kiki.animations.play('idleright');
        game.physics.arcade.enable(kiki);

        // carry items
        cage = this.add.sprite(500, 105, "cage");
        cage.animations.add('idle', [0,1], 2, true);
        
        parcel = this.add.sprite(500, 110, "parcel");
        parcel.animations.add('idle', [0,1], 2, true);

        radio = this.add.sprite(32, 97, "radio");
        radio.animations.add('idle', [0,1], 2, true);
        radio.animations.play('idle');

        // goose items

        goosecage = this.add.sprite(500, 76, "cage");
        goosecage.animations.add('idle', [0,1], 2, true);
        goosecage.animations.play('idle');

        gooseparcel = this.add.sprite(500, 84, "parcel");
        gooseparcel.animations.add('idle', [0,1], 2, true);
        gooseparcel.animations.play('idle');

        game.camera.follow(kiki);

        // audio
        pickUp = this.add.audio('pickup');
        pickUp.volume = 0.5;

        hit = this.add.audio('hit');
        hit.volume = 0.5;


    }

    // Called once per frame to move stuff around 
    update() {
        let obstacles = [tree, treetwo, treethree, treefour, bird, birdtwo, birdthree];

        obstacles.forEach((item) => {
            game.physics.arcade.collide(kiki, item, function (kiki, item) {
                hit.play();
                game.state.start('game');
            });
        });

        game.physics.arcade.collide(kiki, goose, function (kiki, goose) {
            if (collected.indexOf(cage) >= 0) return;

            console.log("goose collision")
            pickUp.play();
            // cageCollected = true; 
            collected.push(cage);
            cage.animations.play('idle');
            goosecage.kill();
        });
    
        game.physics.arcade.collide(kiki, goosetwo, function (kiki, goosetwo) {
            if (collected.indexOf(parcel) >= 0) return;

            console.log("goosetwo collision")
            pickUp.play();
            // cageCollected = true; 
            collected.push(parcel);
            console.log("about to play parcel animation");
            parcel.animations.play('idle');
            gooseparcel.kill();
        });

        if (isPlaying) {
            let flock = [bird, birdtwo, birdthree];
            flock.map(x => { x.x -=1 })

            if (kiki.x > 120){
                goose.x -=1;
                goosecage.x = (goose.x + 2);
            } 
            
            if (kiki.x > 200) {
                goosetwo.x -=1;
                gooseparcel.x = (goosetwo.x +2);
            }

            if (goose.x === 0) {
                goose.kill();
            }

            if (goosetwo.x === 0) {
                goosetwo.kill();
            }

            let isMoving = false;
            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && kiki.x < (game.world.bounds.width - kiki.width) ){
                isFacing = "right";
                kiki.x +=1;    
                radio.x = (kiki.x + 12);
                kiki.animations.play('right'); 
                isMoving = true;
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && kiki.x > 0 ){
                isFacing = "left";
                kiki.x -= 1;
                radio.x = (kiki.x + 1);
                kiki.animations.play('left');
                isMoving = true;
            }
            
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && kiki.y > 0 ) {
                kiki.y -= 1;
                radio.y = (kiki.y + 7);
                isMoving = true;
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && kiki.y < game.world.bounds.height - kiki.height ) {
                kiki.y += 1;
                radio.y = (kiki.y + 7);
                isMoving = true;
            } 
            
            if (!isMoving) {
                kiki.animations.play('idle' + isFacing);
            } 
        }

        let nextY = kiki.y + kiki.height;
        collected.forEach((item) => {
            item.x = kiki.x +4; 
            item.y = nextY;
            nextY += item.height; 
        })
    }

    render() {
        // game.debug.body(tree);
        // game.debug.body(treetwo);
        // game.debug.body(treethree);
        // game.debug.body(treefour);
        // game.debug.body(bird);
    }
}

game.state.add('game', Game);
game.state.start('game');