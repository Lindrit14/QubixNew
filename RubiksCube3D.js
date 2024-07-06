// RubiksCube3D.js
import React, { useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

const faceColors = ['U', 'L', 'F', 'R', 'B', 'D'];

const RubiksCube3D = ({ cubeState, rotation }) => {
    const [springProps, setSpringProps] = useSpring(() => ({ rotation: [0, 0, 0] }));

    useEffect(() => {
        setSpringProps({ rotation });
    }, [rotation, setSpringProps]);

    const faces = useMemo(() => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const materials = {};

        faceColors.forEach(face => {
            if (cubeState[face]) {
                materials[face] = cubeState[face].map(color => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
            }
        });

        return { geometry, materials };
    }, [cubeState]);

    const positions = [
        { face: 'U', position: [0, 1.5, 0], rotation: [-Math.PI / 2, 0, 0] },
        { face: 'L', position: [-1.5, 0, 0], rotation: [Math.PI, - Math.PI / 2, Math.PI] },
        { face: 'F', position: [0, 0, 1.5], rotation: [0, 0, 0] },
        { face: 'R', position: [1.5, 0, 0], rotation: [0, Math.PI / 2, 0] },
        { face: 'B', position: [0, 0, -1.5], rotation: [0, Math.PI, 0] },
        { face: 'D', position: [0, -1.5, 0], rotation: [Math.PI / 2, 0, 0] },
    ];

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <animated.group rotation={springProps.rotation}>
                {positions.map(({ face, position, rotation }) => (
                    <group position={position} rotation={rotation} key={face}>
                        {faces.materials[face]?.map((material, index) => (
                            <mesh geometry={faces.geometry} material={material} key={index} position={[
                                (index % 3) - 1,
                                1 - Math.floor(index / 3),
                                0
                            ]}>
                                <lineSegments geometry={new THREE.EdgesGeometry(faces.geometry)}>
                                    <lineBasicMaterial attach="material" color="black" />
                                </lineSegments>
                            </mesh>
                        ))}
                    </group>
                ))}
            </animated.group>
        </Canvas>
    );
};

export default RubiksCube3D;