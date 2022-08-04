const canvas = document.querySelector("canvas");

canvas.width = 1024;
canvas.height = 576;

//-------------------------------//
const g = 0.7;
const c = canvas.getContext("2d");
//window.addEventListener('resize', function() {
//  canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
//});
c.fillRect(0, 0, canvas.width, canvas.height);

class sprite {

    constructor({ position, imageSource, scale, framesMax, offset = { x: 0, y: 0 } }) {

        this.position = position;
        // this.width = width;
        // this.height = height;
        this.image = new Image();
        this.image.src = imageSource;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;


        this.draw = () => {

            c.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale);
        }

        this.animateFrames = () => {

            this.framesElapsed++;

            if (this.framesElapsed % this.framesHold === 0) {

                if (this.framesCurrent < this.framesMax - 1) {

                    this.framesCurrent++;
                } else {
                    this.framesCurrent = 0;
                }
            }
        }
        var playerhealth = ['./health/hero100.png']
            //expects a flipped pngsheet
        this.animateFramesLeft = () => {

            this.framesElapsed++;

            if (this.framesElapsed % this.framesHold === 0) {

                if (this.framesCurrent > 0) {

                    this.framesCurrent--;
                } else {
                    this.framesCurrent = this.framesMax - 1;
                }
            }
        }

        this.update = () => {

            this.draw();
            this.animateFrames();
        }
    }
};

const background = new sprite({

    position: {
        x: 0,
        y: 0
    },
    imageSource: '../bg_demo.png',
    scale: 1,
    framesMax: 1,
});

class fighter extends sprite {

    constructor({
        position,
        velocity,
        color,
        offset,
        imageSource,
        scale,
        framesMax,
        sprites,
        attackBox
    }) {

        super({
            position,
            imageSource,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.color = color;
        this.attackBox = {
            position: this.position,
            width: attackBox.width,
            height: attackBox.height,
            offset: {
                x: attackBox.offset.x,
                y: attackBox.offset.y
            }
        }
        this.isAttacking = false;
        // this.offset = offset;
        this.health = 45;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 6;
        this.sprites = sprites;
        this.dead = false;

        for (const sprity in sprites) {

            sprites[sprity].image = new Image();
            sprites[sprity].image.src = sprites[sprity].imageSource;
        }

        this.update = (key) => {

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.draw();

            if (!this.dead) {
                switch (key) {
                    case 'right':
                        this.animateFrames();
                        break;

                    case 'left':
                        this.animateFramesLeft();
                        break;
                };
            };

            //draw attack box here
            // c.fillRect(
            //     this.attackBox.position.x + this.attackBox.offset.x, 
            //     this.attackBox.position.y,
            //     this.attackBox.width,
            //     this.attackBox.height
            // );

            if (this.position.y + this.height + this.velocity.y > canvas.height - 57) {

                this.velocity.y = 0;
            } else {
                this.velocity.y += g;
            }
        }

        this.attack = () => {

            this.isAttacking = true;

            //keep attacking as it is not a stamina relastic game
            //or maybe we should only allow single attacks...
            //hmm this is quite a dilemma...
            //okay let's make it single press attack, to make it
            //more dynamic
            setTimeout(() => {

                this.isAttacking = false;
            }, 100);
        }

        this.switchSprite = (sprity) => {

            if (
                this === player &&
                this.image === this.sprites.attack1.image &&
                this.framesCurrent < this.sprites.attack1.framesMax - 1
            ) return;

            if (
                this === player &&
                this.image === this.sprites.getHit.image &&
                this.framesCurrent < this.sprites.getHit.framesMax - 1
            ) return;

            if (
                this === player &&
                this.image === this.sprites.death.image &&
                this.framesCurrent <= this.sprites.death.framesMax - 1
            ) {

                if (this.framesCurrent === this.sprites.death.framesMax - 1) {

                    player.dead = true;
                }

                return;
            } else if (
                this === enemy &&
                this.image === this.sprites.attack1.image &&
                this.framesCurrent > 0
            ) return;

            else if (
                this === enemy &&
                this.image === this.sprites.death.image &&
                this.framesCurrent >= 0
            ) {

                if (this.framesCurrent === 0) {

                    enemy.dead = true;
                }

                return;
            }
            // } else if (
            //     this === enemy &&
            //     this.image === this.sprites.crouch.image &&
            //     this.framesCurrent >= 0
            // ) {

            //     if (this.framesCurrent === 0) {

            //         enemy.dead = true;
            //     }

            //     return;
            // }

            switch (sprity) {

                case 'idle':

                    if (this.image !== this.sprites.idle.image) {

                        this.framesMax = this.sprites.idle.framesMax;
                        this.image = this.sprites.idle.image;
                        // this.framesCurrent = 0;
                    }

                    break;

                case 'runRight':

                    if (this.image !== this.sprites.runRight.image) {

                        this.framesMax = this.sprites.runRight.framesMax;
                        this.image = this.sprites.runRight.image;
                        // this.framesCurrent = 0;
                    }

                    break;

                case 'runLeft':

                    if (this.image !== this.sprites.runLeft.image) {

                        this.framesMax = this.sprites.runLeft.framesMax;
                        this.image = this.sprites.runLeft.image;
                        // this.framesCurrent = 0;
                    }

                    break;

                case 'jumpRight':

                    if (this.image !== this.sprites.jumpRight.image) {

                        this.framesMax = this.sprites.jumpRight.framesMax;
                        this.image = this.sprites.jumpRight.image;
                        // this.framesCurrent = 0;

                    }

                    break;

                    // case 'crouch':

                    //     if (this.image !== this.sprites.crouch.image) {

                    //         this.framesMax = this.sprites.crouch.framesMax;
                    //         this.image = this.sprites.crouch.image;
                    //         this.framesCurrent = 0;
                    //     }

                    break;
                    /*case 'dash':

                    if (this.image !== this.sprites.dash.image) {
    
                        this.framesMax = this.sprites.dash.framesMax;
                        this.image = this.sprites.dash.image;
                        // this.framesCurrent = 0;
                       }

                        break;
    */
                case 'jumpLeft':

                    if (this.image !== this.sprites.jumpLeft.image) {

                        this.framesMax = this.sprites.jumpLeft.framesMax;
                        this.image = this.sprites.jumpLeft.image;
                        this.framesCurrent = 0;
                    }

                    break;

                case 'getHit':

                    if (this.image !== this.sprites.getHit.image) {

                        this.framesMax = this.sprites.getHit.framesMax;
                        this.image = this.sprites.getHit.image;
                        this.framesCurrent = 0;
                    }

                    break;

                case 'attack1':

                    if (this.image !== this.sprites.attack1.image) {

                        this.framesMax = this.sprites.attack1.framesMax;
                        this.image = this.sprites.attack1.image;

                        if (this === player) {

                            this.framesCurrent = 0;
                        } else if (this === enemy) {

                            this.framesCurrent = this.framesMax - 1;
                        }
                    }

                    break;

                case 'death':

                    if (this.image !== this.sprites.death.image) {

                        this.framesMax = this.sprites.death.framesMax;
                        this.image = this.sprites.death.image;

                        if (this === player) {

                            this.framesCurrent = 0;
                        } else if (this === enemy) {

                            this.framesCurrent = this.framesMax - 1;
                        }
                    }

                    break;
            }
        }
    }
}

const player = new fighter({

    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    color: "blue",
    offset: 0,
    imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Idle.png",
    scale: 4,
    offset: { x: 215, y: 190 },
    framesMax: 10,
    sprites: {
        idle: { //we need to invoke the last key used
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Idle.png",

            framesMax: 10,
        },

        runRight: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Run.png",

            framesMax: 6
        },
        /*dash:{
            imageSource:""
            framesmax:2
        },*/
        runLeft: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/RunLeft.png",

            framesMax: 6
        },

        jumpRight: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Jump.png",

            framesMax: 2
        },

        jumpLeft: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/JumpLeft.png",

            framesMax: 2
        },

        attack1: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Attack1.png",

            framesMax: 4,
        },

        attack2: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Attack2.png",

            framesMax: 4,
        },

        attack3: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Attack3.png",

            framesMax: 5,
        },

        getHit: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Get Hit.png",

            framesMax: 3,
        },

        death: {
            imageSource: "../mc/Medieval Warrior Pack 3/Sprites/Death.png",

            framesMax: 9,
        }
    },

    attackBox: {
        width: 150,
        height: 50,
        offset: {
            x: 115,
            y: 0
        }
    }
});

const enemy = new fighter({

    position: { x: 800, y: 100 },
    velocity: { x: 0, y: 0 },
    color: "red",
    // scale: 1, 
    offset: 50,
    imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Idle.png",
    scale: 4,
    offset: { x: 215, y: 170 },
    framesMax: 10,
    sprites: {
        idle: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Idle.png",

            framesMax: 10,
        },

        runRight: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Run_right.png",

            framesMax: 10
        },

        runLeft: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Run.png",

            framesMax: 10
        },

        jumpRight: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Jump.png",

            framesMax: 3
        },

        jumpLeft: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Jump_left.png",

            framesMax: 3
        },
        //can add crouch for enemy
        //can add dash for enemy
        attack1: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Attack_left.png",

            framesMax: 4,
        },

        attack2: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Idle.png",

            framesMax: 4,
        },

        attack3: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Idle.png",

            framesMax: 5,
        },

        getHit: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Hit_left.png",

            framesMax: 1,
        },

        death: {
            imageSource: "../knight/Colour1/NoOutline/120x80_PNGSheets/_Death_left.png",

            framesMax: 10,
        },

        // crouch: {
        //     imageSource: "../projects/canvas/HTML Canvas/knight/Colour1/NoOutline/120x80_PNGSheets/CrouchFull.png",
        //     framesmax: 3
        // },
    },

    attackBox: {
        width: 150,
        height: 50,
        offset: {
            x: -170,
            y: 0
        }
    }
});

const keys = {

    a: {
        pressed: false,
    },
    s: {
        pressed: false
    },
    /*f:{
        pressed:false
    },*/
    d: {
        pressed: false,
    },

    w: {
        pressed: false,
    },

    ArrowLeft: {
        pressed: false,
    },

    //ArrowDown:{
    //  pressed:false,
    //},

    ArrowRight: {
        pressed: false,
    },

    ArrowUp: {
        pressed: false,
    },
}

function rectCollision(rect1, rect2) {

    return (
        //actually going to the enemy
        rect1.attackBox.position.x + rect1.attackBox.width + rect1.attackBox.offset.x >= rect2.position.x &&

        //not showing in attack for being ahead of the enemy
        rect1.attackBox.position.x + rect1.attackBox.offset.x <= rect2.position.x + rect2.width &&

        //showing attacking if attack box is hitting the enemy
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    )
}

function resolveGame(person1, person2) {

    const resolveGameScreen = document.getElementById("resolve-game");
    resolveGameScreen.style.zIndex = 5;

    if (person2.health === 0) {

        person2.switchSprite("death");
        resolveGameScreen.textContent = "You killed the enemy!";
    } else if (person1.health === 0) {

        person1.switchSprite("death");
        resolveGameScreen.textContent = "You died!";
    }
}

//the transparency animaiton effect
// 1 -> 2 -> 3 ->
//      |
// 1 -> #

let rotateKey;

function animate() {

    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update('right');
    player.update('right');
    enemy.update(rotateKey);

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    rotateKey = 'left';

    //also implement "left idle" later
    if (!(keys.a.pressed) && !(keys.d.pressed)) {

        player.switchSprite('idle');
    }

    if (keys.d.pressed && !(keys.a.pressed)) {

        player.velocity.x = 5;
        player.switchSprite('runRight');
    } else if (keys.a.pressed && !(keys.d.pressed)) {

        player.velocity.x = -5;
        player.switchSprite('runLeft');
    }
    if (keys.s.pressed) {
        enemy.switchSprite('crouch');
    }

    if (player.velocity.y < 0) {

        player.switchSprite('jumpRight');
    }

    if (player.velocity.y < 0 && keys.a.pressed && !(keys.d.pressed)) {

        player.switchSprite('jumpLeft');
    } else if (keys.a.pressed && keys.d.pressed) {
        player.velocity.x = 0;
        player.switchSprite("idle");

        //do what you have always done
        //stand with pride

        //tip for last boss...
        //he is powerful,
    }

    if (!(keys.a.pressed) && !(keys.d.pressed)) {

        enemy.switchSprite('idle');
    }

    if (keys.ArrowRight.pressed && !(keys.ArrowLeft.pressed)) {

        rotateKey = 'right';
        enemy.velocity.x = 5;
        enemy.switchSprite("runRight");
    } else if (keys.ArrowLeft.pressed && !(keys.ArrowRight.pressed)) {

        rotateKey = 'left';
        enemy.velocity.x = -5;
        enemy.switchSprite("runLeft");
    }

    if (enemy.velocity.y < 0) {

        enemy.switchSprite("jumpLeft");
    }

    if (enemy.velocity.y < 0 && keys.ArrowRight.pressed && !(keys.ArrowLeft.pressed)) {

        enemy.switchSprite('jumpRight');
        //can add crouch for enemy
    } else if (keys.ArrowLeft.pressed && keys.ArrowRight.pressed) {

        enemy.velocity.x = 0;
        enemy.switchSprite("idle");
    }

    if (enemy.isAttacking) {

        rotateKey = 'left';
    }

    //detect for collision
    //should we allow the characters
    //to go through each other or
    //not, ...
    if (rectCollision(player, enemy) && player.isAttacking) {

        //hit achieved
        // console.log("player");
        enemy.switchSprite("getHit");
        player.isAttacking = false;

        const enemyHP = document.getElementById("enemy-hp");
        enemy.health -= 5;

        enemyHP.style.width = `${enemy.health}%`;
    }

    if (rectCollision(enemy, player) && enemy.isAttacking) {

        //hit achieved
        // console.log("enemy");
        player.switchSprite("getHit");
        enemy.isAttacking = false;

        const playerHP = document.getElementById("player-hp");
        player.health -= 5;

        playerHP.style.width = `${player.health}%`;

        //how to not push away the sys
        const flexContainer = document.getElementById("up-elements-wrap");

        flexContainer.style.left = `${112 + ((45 - player.health)*8)}px`;
    }

    if (player.health === 0 || enemy.health === 0) {

        resolveGame(player, enemy);
    }

    // player.switchSprite("idle");
    // enemy.switchSprite("idle");
}

animate();

window.addEventListener('keydown', (event) => {

    if (!player.dead && !enemy.dead) {

        switch (event.key) {

            case 'a':
                keys.a.pressed = true;
                break;
            case 's':
                keys.s.pressed = true;
                break;

            case 'd':
                keys.d.pressed = true;
                break;

            case 'h':
                player.attack();
                player.switchSprite("attack1");
                break;

                //later implement ducking
            case 'w':
                player.velocity.y = -20;
                break;

            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                break;

            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                break;

                //later implement ducking
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;

            case '/':
                enemy.attack();
                enemy.switchSprite("attack1");
                break;
        };
    };
});

window.addEventListener('keyup', (event) => {

    switch (event.key) {

        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = true;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    };
});