import React, { useCallback } from 'react'

import { useBox } from '@react-three/cannon'

import * as textures from '../../images/textures'
import { useStore } from '../../hooks/useStore'

const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        position,
        type: 'Static'
    }))

    const [addCube, removeCube] = useStore(({ addCube, removeCube }) => [addCube, removeCube])


    const cubeTexture = textures[texture + 'Texture']

    const handleCubeClick = useCallback((event) => {
        event.stopPropagation()

        // note: / by 2 because each face has 2 triangules
        const clickedFace = Math.floor(event.faceIndex / 2)

        const { x, y, z } = ref.current.position

        if (event.altKey) {
            removeCube(x, y, z)
            return
        }

        if (clickedFace === 0) {
            addCube(x + 1, y, z)
            return
        }
        if (clickedFace === 1) {
            addCube(x - 1, y, z)
            return
        }
        if (clickedFace === 2) {
            addCube(x, y + 1, z)
            return
        }
        if (clickedFace === 3) {
            addCube(x, y - 1, z)
            return
        }
        if (clickedFace === 4) {
            addCube(x, y, z + 1)
            return
        }
        if (clickedFace === 5) {
            addCube(x, y, z - 1)
            return
        }
    }, [])

    return (
        <mesh ref={ref} onClick={handleCubeClick}>
            <boxBufferGeometry attach={'geometry'} />
            <meshStandardMaterial map={cubeTexture} attach={'material'} />
        </mesh>
    )
}

export default Cube