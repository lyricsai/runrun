import { handleStart } from "./script.js";
import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCusomProperty.js";

const man = document.querySelector(".man");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.002;
const MAN_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let manFrame;
let currentFrameTime;
let yVelocity;

const src = ["./images/run-0.png", "./images/run-1.png"];
let selectedSrc;
let lastTime;

const handleRun = (speedScale, time) => {
    if (isJumping) {
        man.src = `./images/jump.png`;
        return;
    }
    if (time - lastTime > 200 / speedScale) {
        man.src = src[0];
        if (selectedSrc === 0) {
            console.log(0);
            man.src = src[1];
            selectedSrc = 1;
        } else {
            console.log(1);
            man.src = src[0];
            selectedSrc = 0;
        }
        lastTime = time;
    }
};
const handleJump = (delta) => {
    if (!isJumping) return;

    incrementCustomProperty(man, "--bottom", yVelocity * delta);
    if (getCustomProperty(man, "--bottom") <= 0) {
        setCustomProperty(man, "--bottom", 0);
        isJumping = false;
    }
    yVelocity -= GRAVITY * delta;
};

const onJump = (e) => {
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
};

export const setupMan = () => {
    yVelocity = 0;
    isJumping = false;
    manFrame = 0;
    currentFrameTime = 0;
    selectedSrc = 0;
    lastTime = 0;
    setCustomProperty(man, "--bottom", 0);

    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
};

export const updateMan = (delta, speedScale, time) => {
    handleRun(speedScale, time);
    handleJump(delta);
};

export const getmanRect = () => {
    return man.getBoundingClientRect();
};

export const setmanLose = () => {
    man.src = "./images/stay.png";
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true });
        document.querySelector("[data-start]").classList.remove("hide");
    }, 100);
};
