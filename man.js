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

const handleRun = (delta, speedScale) => {
    if (isJumping) {
        man.src = `./images/jump.png`;
        return;
    }

    console.log(delta, speedScale, currentFrameTime, manFrame, MAN_FRAME_COUNT);
    if (currentFrameTime <= FRAME_TIME) {
        setTimeout(() => {
            manFrame = (manFrame + 1) % MAN_FRAME_COUNT;
            man.src = `./images/run-${manFrame}.png`;
            currentFrameTime -= FRAME_TIME;
        }, 500);
    }

    currentFrameTime += delta * speedScale;
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
    setCustomProperty(man, "--bottom", 0);

    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
};

export const updateMan = (delta, speedScale) => {
    handleRun(delta, speedScale);
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
