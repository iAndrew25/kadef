import kontra from '../lib/kontra.js';
import Hero from './hero.js';
import Portal from './portal.js'
import {PortalPositions, PortalTravelPosition} from './constants.js';

const heroPositionByScene = {
    home: {
        x: 100,
        y: 100
    },
    camp: {
        x: 50,
        y: 20
    }
}

class Scene {
    constructor({scene, direction}, canvas) {
        console.log('scene', scene)
        this.tileEngine = null;
        this.map = kontra.dataAssets[`./assets/tilemap-${scene}-new`];
        this.tileEngine = kontra.TileEngine(this.map);
        this.hero = new Hero({
            ...(direction ? {
                x: PortalTravelPosition[direction].heroX,
                y: PortalTravelPosition[direction].heroY
             } : heroPositionByScene[scene]),
            speed: 0.8,
            width: 16,
            height: 16,
            canvas
        });
        this.portals = Object.values(PortalPositions).map((portalData) => new Portal(portalData));
    }

    layerCollidesWith = (...args) => {
        return this.tileEngine.layerCollidesWith(...args);
    }

    update = () => {
        this.hero.update(this);
        this.portals.forEach(portal => {
            if(kontra.collides(this.hero.getHero(), portal.getPortal())) {
                console.log('Collision detected with portal');
                kontra.emit('newScene', {
                    scene: 'camp',
                    direction: portal.direction
                });
            };
        });
    }

    render = (...args) => {
        this.tileEngine.render(...args);
        this.hero.render();
        this.portals.forEach(portal => portal.render());
    }
}

export default Scene;