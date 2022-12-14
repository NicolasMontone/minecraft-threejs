import { useCallback, useEffect, useState } from "react"

function mapActionToKey(key) {
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
    }
    return keyActionMap[key]
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
    })

    const handleKeyDown = useCallback((event) => {
        const action = mapActionToKey(event.code)
        if (!action) {
            // key not supported, just return
            return
        }

        setActions((prev) => {
            return ({
                ...prev,
                [action]: true
            })
        })
    }, [])

    const handleKeyUp = useCallback((e) => {
        const action = mapActionToKey(e.code)
        if (!action) {
            // key not supported, just return
            return
        }
        setActions((prev) => {
            return ({
                ...prev,
                [action]: false
            })
        })
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return actions
}