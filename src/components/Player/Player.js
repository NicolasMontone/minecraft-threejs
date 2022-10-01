import { useEffect, useRef } from "react"

import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

import { useKeyboard } from "../../hooks/useKeyboard"

const JUMP_FORCE = 3

const SPEED = 3

const Player = () => {
    const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard()

    const { camera } = useThree()
    const [ref, { velocity: cameraVelocity, position: cameraPosition }] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0],
    }))

    const playerVelocity = useRef([0, 0, 0])
    useEffect(() => {
        cameraVelocity.subscribe((v) => playerVelocity.current = v)
    }, [cameraVelocity])

    const playerPosition = useRef([0, 0, 0])
    useEffect(() => {
        cameraPosition.subscribe((p) => playerPosition.current = p)
    }, [cameraPosition])

    useFrame(() => {
        camera.position.copy(new Vector3(playerPosition.current[0], playerPosition.current[1], playerPosition.current[2]))

        const direction = new Vector3()

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )

        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0,
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        cameraVelocity.set(direction.x, playerVelocity.current[1], direction.z)

        const isPlayerInGround = Math.abs(playerVelocity.current[1]) < 0.5
        if (jump && isPlayerInGround) {
            cameraVelocity.set(playerVelocity.current[0], JUMP_FORCE, playerVelocity.current[2])
        }
    })
    return (
        <mesh ref={ref} />
    )
}

export default Player