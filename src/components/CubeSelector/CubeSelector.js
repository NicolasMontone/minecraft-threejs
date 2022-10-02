import React, { useEffect, useState } from 'react'

import { useStore } from '../../hooks/useStore'
import { useKeyboard } from '../../hooks/useKeyboard'
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../../images/images'

import './CubeSelector.css'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
}

const CubeSelector = () => {
    const [isVisible, setIsVisible] = useState()

    const [activeTexture, setTexture] = useStore(({ texture, setTexture }) => [texture, setTexture])
    const {
        dirt,
        grass,
        glass,
        wood,
        log,
    } = useKeyboard()

    useEffect(() => {
        const textures = {
            dirt,
            grass,
            glass,
            wood,
            log
        }
        const pressedTexture = Object.entries(textures).find(([k, v]) => v)
        if (!pressedTexture) {
            return
        }

        setTexture(pressedTexture[0])
    }, [setTexture, dirt, grass, glass, wood, log])

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setIsVisible(false)
        }, 1000)

        setIsVisible(true)
        return () => {

            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    return isVisible ? (
        <div className={'CubeSelector absolute centered'}>
            {Object.entries(images).map(([textureKey, src]) => {
                return (<img
                    key={textureKey}
                    src={src}
                    alt={textureKey}
                    className={`${textureKey === activeTexture ? 'active' : ''}`}
                />)
            })}
        </div>
    ) : <></>
}

export default CubeSelector