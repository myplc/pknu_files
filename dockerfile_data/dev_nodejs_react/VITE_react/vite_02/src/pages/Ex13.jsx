import { useState } from 'react'
const Ball = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })
    return (
        <div
            onPointerMove={(e) => {
                console.log(e.clientX, e.clientY)
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                })
            }}
            style={{
                //   position: 'relative',
                width: '100vw',
                height: '100vh'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    left: -10,
                    top: -10,
                    width: 20,
                    height: 20
                }}
            />
        </div>
    )
}

export default Ball
