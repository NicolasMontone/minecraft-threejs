import React from 'react'

import { useBox } from '@react-three/cannon'

import * as textures from '../../images/textures'

const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        position,
        type: 'Static'
    }))

    const cubeTexture = textures[texture + 'Texture']

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach={'geometry'} />
            <meshStandardMaterial map={cubeTexture} attach={'material'} />
        </mesh>
    )
}

export default Cube