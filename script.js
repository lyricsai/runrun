import {updateGround} from "./ground.js";

const worldElem = document.querySelector('[data-world');

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const setPixelToWorldScale = () => {
    let worldToPixelScale;
    if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
};

let lastTime;
const updateFrame = (time) => {

    if(!lastTime) {
        lastTime = time;
        window.requestAnimationFrame(updateFrame);
        return;
    }

    const delta = time - lastTime;

    updateGround(delta);

    lastTime = time;
    window.requestAnimationFrame(updateFrame);
};

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
window.requestAnimationFrame(updateFrame);
