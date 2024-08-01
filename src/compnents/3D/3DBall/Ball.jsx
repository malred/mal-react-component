import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
} from "@react-three/drei";

// 加载进度条
import CanvasLoader from "../Loader";

const Ball = (props) => {
    // 纹理
    const [decal] = useTexture([props.imgUrl]);

    const {size, ...rest} = props

    let scale = 0
    switch (size) {
        case 'lg':
            scale = 3
            break
        case 'md':
            scale = 2.75
            break
        case 'sm':
            scale = 2
            break
        default:
            scale = 2.75
            break
    }

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            {/* 环境光 */}
            <ambientLight intensity={0.25}/>
            <directionalLight position={[0, 0, 0.05]}/>
            {/*<mesh castShadow receiveShadow scale={2.75}>*/}
            <mesh castShadow receiveShadow scale={scale}>
                {/* 20面体 */}
                <icosahedronBufferGeometry args={[1, 1]}/>
                <meshStandardMaterial
                    color={"#fff8eb"}
                    polygonOffset
                    polygonOffsetFactor={-5}
                    flatShading
                />
                <Decal
                    map={decal}
                    position={[0, 0, 1]}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    flatShading
                />
            </mesh>
        </Float>
    );
};

const BallCanvas = ({icon, size, key, ...rest}) => {
    let sizeClass = ''
    switch (size) {
        case 'lg':
            sizeClass += 'w-32 h-32'
            break
        case 'md':
            sizeClass += 'w-28 h-28'
            break
        case 'sm':
            sizeClass += 'w-20 h-20'
            break
        default:
            sizeClass += 'w-28 h-28'
            break
    }

    return (
        <div className={sizeClass} key={key}>
            <Canvas
                frameloop="demand"
                // 保留视图缓冲区
                gl={{preserveDrawingBuffer: true}}
            >
                {/* suspense可以等待加载 */}
                {/* 加载模型,fallback是没加载完成时执行的回调 */}
                <Suspense fallback={<CanvasLoader/>}>
                    {/* 轨道控制 */}
                    <OrbitControls enableZoom={false}/>
                    {/* 3D模型 */}
                    <Ball imgUrl={icon} size={size} {...rest} />
                </Suspense>
                {/* 预加载 */}
                <Preload all/>
            </Canvas>
        </div>
    );
};

export default BallCanvas;
