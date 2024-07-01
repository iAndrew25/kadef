import kontra from '../lib/kontra.js';

class Portal {
    constructor(props) {
        this.portal = kontra.Sprite({
            ...props,
            // color: 'red',
        });
        this.direction = props.direction;
    }

    getPortal = () => this.portal;

    render = () => this.portal.render();
}

export default Portal;
