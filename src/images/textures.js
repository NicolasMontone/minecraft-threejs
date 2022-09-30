import { TextureLoader } from "three";

import {
    dirtImg,
    grassImg,
    glassImg,
    woodImg,
    logImg,
} from "./images";


const dirtTexture = new TextureLoader(dirtImg)
const grassTexture = new TextureLoader(grassImg)
const groundTexture = new TextureLoader(grassImg)
const logTexture = new TextureLoader(logImg)
const glassTexture = new TextureLoader(glassImg)
const woodTexture = new TextureLoader(woodImg)

export {
    dirtTexture,
    grassTexture,
    groundTexture,
    logTexture,
    glassTexture,
    woodTexture
}