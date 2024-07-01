import kontra from '../lib/kontra.js';

const directionMapper = Object.entries({
    arrowup: {
        spriteDirection: 'walkTop',
        direction: -1,
        axis: 'y',
    },
    arrowdown: {
        spriteDirection: 'walkBottom',
        direction: 1,
        axis: 'y',
    },
    arrowleft: {
        spriteDirection: 'walkLeft',
        direction: -1,
        axis: 'x',
    },
    arrowright: {
        spriteDirection: 'walkRight',
        direction: 1,
        axis: 'x',
    }
});

class Hero {
    constructor({x, y, speed, width, height, canvas}) {
        this.speed = speed;
        this.heroSprite = kontra.SpriteSheet({
            image: kontra.imageAssets[`./assets/characters`],
            frameWidth: 16,
            frameHeight: 16,
            animations: {
                idle: {
                    frames: 4,
                    frameRate: 0
                },
                walkLeft: {
                    frames: '15..17',
                    frameRate: 12
                },
                walkRight: {
                    frames: '27..29',
                    frameRate: 12
                },
                walkTop: {
                    frames: '39..41',
                    frameRate: 12
                },
                walkBottom: {
                    frames: '3..5',
                    frameRate: 12
                }                
            },            
        });
        this.hero = kontra.Sprite({
            animations: this.heroSprite.animations,
            x,
            y,
            width,
            height,
        });
    }

    getHero = () => this.hero;

    render = () => this.hero.render();

    update = (currentScene) => {
        const collisionBox = {
            y: this.hero.y + 4,
            x: this.hero.x + 4,
            width: this.hero.width - 8,
            height: this.hero.height - 8
        };

        const moveSprite = (direction, axis) => {
            collisionBox[axis] += direction * this.speed;
            if (currentScene.layerCollidesWith('collision', collisionBox)) {
                return;
            }
            this.hero[axis] += direction * this.speed;
            this.hero.advance();
        };
        
        directionMapper.forEach(([key, {direction, spriteDirection, axis}]) => {
            if (kontra.keyPressed(key)) {
                this.hero.playAnimation(spriteDirection);
                moveSprite(direction, axis);
            }
        });
    }
}

export default Hero;
