import React from 'react';

export default function Cubelet({ position, colors }) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]} />
            {colors.map((color, index) => (
                <meshBasicMaterial key={index} attachArray="material" color={color} />
            ))}
        </mesh>
    );
}
