import { usePlane } from "@react-three/cannon"

import { groundTexture } from "../../images/textures"
import { useStore } from '../../hooks/useStore'
import { useCallback } from "react"


const Ground = () => {
  const [ref] = usePlane(() => ({
    // filp it 90'
    rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0]
  }))

  const [addCube] = useStore((state) => [state.addCube])

  groundTexture.repeat.set(100, 100)

  const handlePlayerClick = useCallback((event) => {
    event.stopPropagation()
    const [x, y, z] = Object.values(event.point).map((values) => Math.ceil(values))

    addCube(x, y, z)
  }, [addCube])

  return (
    <mesh ref={ref} onClick={handlePlayerClick}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}

export default Ground