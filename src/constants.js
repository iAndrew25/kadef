const Sizes = {
    canvasHeight: 240,
    canvasWidth: 240,
    portalHorizontalWidth: 4,
    portalHorizontalHeight: 16,
    portalVerticalWidth: 16,
    portalVerticalHeight: 4,
}

const heroPositionOffset = 16;

const PortalPositions = {
    LEFT: {
        x: 0,
        y: 112,
        width: Sizes.portalHorizontalWidth,
        height: Sizes.portalHorizontalHeight,
        heroX: heroPositionOffset,
        heroY: 112,
        direction: 'LEFT'
    },
    RIGHT: {
        x: Sizes.canvasWidth - Sizes.portalHorizontalWidth,
        y: 112,
        width: Sizes.portalHorizontalWidth,
        height: Sizes.portalHorizontalHeight,
        heroX: Sizes.canvasWidth - Sizes.portalHorizontalWidth - heroPositionOffset,
        heroY: 112,
        direction: 'RIGHT'
    },
    TOP: {
        x: 112,
        y: 0,
        width: Sizes.portalVerticalWidth,
        height: Sizes.portalVerticalHeight,
        heroX: 112 + 8/2,
        heroY: heroPositionOffset,
        direction: 'TOP'
    },
    BOTTOM: {
        x: 112,
        y: Sizes.canvasHeight - Sizes.portalVerticalHeight,
        width: Sizes.portalVerticalWidth,
        height: Sizes.portalVerticalHeight,
        heroX: 112 + 8/2,
        heroY: Sizes.canvasHeight - Sizes.portalVerticalHeight - heroPositionOffset,
        direction: 'BOTTOM'
    }
}

const PortalTravelPosition = {
    'LEFT': PortalPositions.RIGHT,
    'RIGHT': PortalPositions.LEFT,
    'TOP': PortalPositions.BOTTOM,
    'BOTTOM': PortalPositions.TOP
}

export {
    PortalPositions,
    PortalTravelPosition,
    Sizes
};
