import { nanoid } from "nanoid";
import create from "zustand";

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [],
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