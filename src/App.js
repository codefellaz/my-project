import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { nanoid } from 'nanoid';
import { useStore } from './store';

function Model({ url }) {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

function LudoDice() {
  const active = useStore(state => state.activeDice);
  const diceValue = useStore(state => state.diceValue);
  const mesh = useRef();
  const [id] = useState(() => nanoid());
  useFrame(() => (mesh.current.rotation.y += 0.01));
  return (
    <group>
      <Model url="/ludo-dice.glb" />
      <Html>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem', color: active ? 'white' : 'grey', backgroundColor: active ? 'grey' : 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid black' }}>
          {diceValue}
        </div>
      </Html>
      <mesh ref={mesh} position={[0, 0.3, 0.2]} scale={active ? 1.5 : 1}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={active ? 'lightblue' : 'grey'} />
      </mesh>
    </group>
  );
}

function App() {
  const activeDice = useStore(state => state.activeDice);
  const diceValue = useStore(state => state.diceValue);

  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Suspense fallback={<Html>Loading...</Html>}>
          <LudoDice />
        </Suspense>
      </Canvas>
      {activeDice && (
        <div style={{ position: 'fixed', bottom: '1rem', left: '1rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid black' }}>
          Dice: {diceValue}
        </div>
      )}
    </div>
  );
}

export default App;