import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCusomProperty.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;

const createCactus = (delta, speedScale) => {
    let cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "./images/cactus.png";
    cactus.classList.add("cactus");
    worldElem.append(cactus);
    setCustomProperty(cactus, "--left", 100);
};

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const setupCactus = () => {
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach((el) => el.remove());
};

export const updateCactus = (delta, speedScale) => {
    document.querySelectorAll("[data-cactus]").forEach((el) => {
        incrementCustomProperty(el, "--left", delta * speedScale * SPEED * -1);
        if (getCustomProperty(el, "--left") <= -100) {
            el.remove();
        }
    });

    if (nextCactusTime <= 0) {
        createCactus(delta, speedScale);
        nextCactusTime =
            randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
            speedScale;
    }
    nextCactusTime -= delta;
};

export const getCactusRects = () => {
    return [...document.querySelectorAll("[data-cactus]")].map((el) => {
        return el.getBoundingClientRect();
    });
};
