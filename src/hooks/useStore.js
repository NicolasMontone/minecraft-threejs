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
    removeCube: (x, y, z) => {
        set((current) => ({
            cubes: current.cubes.filter((cube) => {
                const [currentCubeX, currentCubeY, currentCubeZ,] = cube.pos
                return currentCubeX !== x || currentCubeY !== y || currentCubeZ !== z
            }),
        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => { },
    resetWorld: () => { },
}))