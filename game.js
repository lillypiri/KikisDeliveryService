let SCALE_FACTOR = 4;

let game = new Phaser.Game(250, 150, Phaser.CANVAS, 'game');

// TODO 
// score / timer?
// make it longer

// Kiki variables
let kiki;
let isPlaying = true;
let isFacing = 'right';

// Stars
let babystar;
let babystartwo;
let babystarthree;
let babystarfour;
let star;
let startwo;
let bigstar;
let bigstartwo;
let bigstarthree;

// Groups
let obstacleGroup;
let collectedGroup;

// Trees
let superbabytree;
let babytree;
let babytreetwo;
let babytreethree;
let tree;
let treetwo;
let treethree;
let treefour;

// Crows
let bird;
let birdtwo;
let birdthree;
let flock;

// Geese
let goose;
let goosetwo;
let goosethree;
let geeseflock;

// Kiki carry items
let cage;
let parcel;
let radio;
let pretzel;

// Geese carry items
let gooseitems;
let goosecage;
let gooseparcel;
let goosepretzel;

let clocktower; 

// Collected items
let collected = [];

// Sounds
let pickUp;
let hit;

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
    this.load.spritesheet("pretzel", "pretzel.png", 5, 5, 2);

    this.load.spritesheet("clocktower", "clocktower.png", 40, 150, 1);

    // audio
    this.load.audio('pickup', "pickup.wav");
    this.load.audio('hit', "hit.wav");
    
    }

    // Add stuff to your scene
    create() {
        // reset this array to be empty - it not being cleared was causing the carry issue
        collected = [];

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#5e36fb';
        game.world.setBounds(0, 0, 700, 170);

        babystar = this.add.sprite(50, 30, "babystar");
        babystartwo = this.add.sprite(250, 45, "babystar");
        babystarthree = this.add.sprite(350, 45, "babystar");
        babystarfour = this.add.sprite(280, 20, "babystar");
        star = this.add.sprite(300, 60, "star");
        startwo = this.add.sprite(400, 70, "star");

        this.smallConstellation = [babystar, star, startwo, babystartwo, babystarthree, babystarfour];
        this.smallConstellation.forEach((item) => {
            item.animations.add('twinkle', [0, 1], 2, true);
            item.animations.play('twinkle');
        });


        bigstar = this.add.sprite(150, 50, "bigstar");
        bigstartwo = this.add.sprite(450, 60, "bigstar");
        bigstarthree = this.add.sprite(200, 80, "bigstar");

        this.bigConstellation = [bigstar, bigstartwo, bigstarthree];
        this.bigConstellation.forEach((item) => {
            item.animations.add('twinkle', [0, 1, 2, 3], 4, true);
            item.animations.play('twinkle');
        });

        superbabytree = this.add.sprite(120, 140, "superbabytree");
        babytree = this.add.sprite(100, 120, "babytree");
        babytreetwo = this.add.sprite(170, 125, "babytree");
        babytreethree = this.add.sprite(320, 125, "babytree");

        this.smallTrees = [superbabytree, babytree, babytreetwo, babytreethree];
        this.smallTrees.forEach((item) => {
            item.animations.add('cute', [0, 1, 2], 3, true);
            item.animations.play('cute');
        });

        obstacleGroup = this.add.group();
        obstacleGroup.enableBody = true;
        obstacleGroup.physicsBodyType = Phaser.Physics.ARCADE;

        tree = obstacleGroup.getFirstDead(true, 40, 100, "tree");
        treetwo = obstacleGroup.getFirstDead(true, 280, 110, "fangtree");
        treethree = obstacleGroup.getFirstDead(true, 200, 95, "fangtree");
        treefour = obstacleGroup.getFirstDead(true, 350, 95, "tree");

        this.bigTrees = [tree, treetwo, treethree, treefour];
        this.bigTrees.forEach((item) => {
            item.animations.add('angery', [0, 1, 2], 5, true);
            item.animations.play('angery');
            item.body.setSize(5, 70, 10,4);
        });

        bird = obstacleGroup.getFirstDead(true, 500, 70, "bird");
        birdtwo = obstacleGroup.getFirstDead(true, 300, 30, "bird");
        birdthree = obstacleGroup.getFirstDead(true, 400, 100, "bird");

        let flock = [bird, birdtwo, birdthree];

        flock.forEach((item) => {
            item.animations.add('flap', [0, 1], 4, true);
            item.animations.play('flap');
            game.physics.arcade.enable(item);
        })


        goose = this.add.sprite(500, 70, "goose");
        goosetwo = this.add.sprite(500, 80, "goose");
        goosethree = this.add.sprite(500, 30, "goose");


        geeseflock = [goose, goosetwo, goosethree];
        geeseflock.forEach((item) => {
            item.animations.add('flap', [0, 1], 4, true);
            item.animations.play('flap');
            game.physics.arcade.enable(item);
        })

        // carry items
        collectedGroup = game.add.group();
        collectedGroup.enableBody = true;
        collectedGroup.physicsBodyType = Phaser.Physics.ARCADE;

        cage = collectedGroup.getFirstDead(true, 500, 105, "cage");
        cage.animations.add('idle', [0,1], 2, true);
        
        parcel = collectedGroup.getFirstDead(true, 500, 110, "parcel");
        parcel.animations.add('idle', [0,1], 2, true);

        pretzel = collectedGroup.getFirstDead(true, 500, 105, "pretzel");
        pretzel.animations.add('idle', [0,1], 2, true);


        clocktower = this.add.sprite(495, 40, "clocktower");

        // Kiki sprite 
        kiki = this.add.sprite(20, 90, "kiki");
        kiki.animations.add('right', [0,1], 2, true);
        kiki.animations.add('idleright', [2, 3], 2, true);
        kiki.animations.add('left', [4, 5], 2, true);
        kiki.animations.add('idleleft', [6, 7], 2, true);
        kiki.animations.play('idleright');
        game.physics.arcade.enable(kiki);


        radio = this.add.sprite(32, 97, "radio");
        radio.animations.add('idle', [0,1], 2, true);
        radio.animations.play('idle');

        // goose items

        goosecage = this.add.sprite(500, 76, "cage");
        gooseparcel = this.add.sprite(500, 84, "parcel");
        goosepretzel = this.add.sprite(500, 34, "pretzel");

        gooseitems = [goosecage, gooseparcel, goosepretzel];
        gooseitems.forEach((item) => {
            item.animations.add('idle', [0,1], 2, true);
            item.animations.play('idle');
            game.physics.arcade.enable(item);
        });

        game.camera.follow(kiki);

        // audio
        pickUp = this.add.audio('pickup');
        pickUp.volume = 0.5;

        hit = this.add.audio('hit');
        hit.volume = 0.5;


    }

    // Called once per frame to move stuff around 
    update() {
        game.physics.arcade.collide(kiki, obstacleGroup, function(kiki, obstacle) {
            hit.play();
            game.state.start('game');
        });

        game.physics.arcade.collide(collectedGroup, obstacleGroup, function(collectedItem, obstacle) {
            hit.play();
            game.state.start('game');
        });

        game.physics.arcade.collide(kiki, goose, function (kiki, goose) {
            if (collected.indexOf(cage) >= 0) return;
            pickUp.play();
            cage.animations.play('idle');
            collected.push(cage);
            goosecage.kill();
        });
    
        game.physics.arcade.collide(kiki, goosetwo, function (kiki, goosetwo) {
            if (collected.indexOf(parcel) >= 0) return;
            pickUp.play();
            collected.push(parcel);
            parcel.animations.play('idle');
            gooseparcel.kill();
        });

        game.physics.arcade.collide(kiki, goosethree, function (kiki, goosethree) {
            if (collected.indexOf(pretzel) >= 0) return;
            pickUp.play();
            collected.push(pretzel);
            pretzel.animations.play('idle');
            goosepretzel.kill();
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

            if (kiki.x > 250) {
                goosethree.x -=1;
                goosepretzel.x = (goosethree.x + 2);
            }

            // drop off the items
            if (kiki.x > 500) {
                collected.map( x => {
                    x.kill();
                })
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
    }
}

game.state.add('game', Game);
game.state.start('game');