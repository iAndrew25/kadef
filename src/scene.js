import kontra from '../lib/kontra.js'

class Scene {
    constructor(sceneType) {
        this.sceneType = sceneType;
        this.tileEngine = null;
    }

    init = () => {
        const map = kontra.dataAssets[`maptile-${this.sceneType}`];
        this.tileEngine = kontra.TileEngine(map)
    }

    layerCollidesWith = () => {
        return this.tileEngine.layerCollidesWith;
    }

    render = () => {
        this.tileEngine.render();
    }
}

export default Scene;