import {incrementCustomProperty} from "./updateCusomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll('[data-ground]');

export const updateGround = (delta) => {
    groundElems.forEach(el => {
        incrementCustomProperty(el, '--left', delta * SPEED * (-1));
    });
};