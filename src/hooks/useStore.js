import { nanoid } from "nanoid";
import create from "zustand";

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [{
        key: nanoid(),
        pos: [1, 1, 1],
        texture: 'dirt'
    },
    {
        key: nanoid(),
        pos: [2, 1, 1],
        texture: 'wood'
    }],
    addCube: (x, y, z) => {
        set((current) => ({
            cubes: [...current.cubes, {
                key: nanoid(),
                pos: [x, y, z],
                texture: current.texture
            }],

        }))
    },
    removeCube: () => { },
    setTexture: () => { },
    saveWorld: () => { },
    resetWorld: () => { },
}))