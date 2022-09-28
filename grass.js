import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCusomProperty.js";

const SPEED = 0.01;
const grassElems = document.querySelectorAll("[data-grass]");

export const setupGrass = () => {
    setCustomProperty(grassElems[0], "--left", 0);
    setCustomProperty(grassElems[1], "--left", 150);
    setCustomProperty(grassElems[2], "--left", 300);
};

export const updateGrass = (delta, speedScale) => {
    grassElems.forEach((elem) => {
        incrementCustomProperty(
            elem,
            "--left",
            -1 * delta * SPEED * speedScale
        );

        if (getCustomProperty(elem, "--left") <= -300) {
            incrementCustomProperty(elem, "--left", 600);
        }
    });
};
