"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { playSound } from "@/lib/audio";

// 1. 3D React Atom with central core and 3 orbiting electron rings
function React3DAtom({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speed = hovered ? 2.5 : 1;
    groupRef.current.rotation.y += delta * 0.7 * speed;
    groupRef.current.rotation.x += delta * 0.4 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group
        ref={groupRef}
        position={position}
        scale={hovered ? 1.15 : 1}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playSound("pop");
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Nucleus Core */}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? "#34d399" : "#06b6d4"}
            emissive={hovered ? "#059669" : "#0891b2"}
            emissiveIntensity={0.6}
            distort={0.3}
            speed={3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbit Ring 1 */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.85, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Orbit Ring 2 */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.85, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Orbit Ring 3 */}
        <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
          <torusGeometry args={[0.85, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 2. 3D Next.js Prism Monolith with metallic beveled styling
function Nextjs3DMonolith({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = hovered ? 2.5 : 0.8;
    meshRef.current.rotation.y += delta * 0.5 * speed;
    meshRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.15;
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? [0.95, 0.95, 0.95] : [0.8, 0.8, 0.8]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playSound("pop");
        }}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#18181b"}
          emissive={hovered ? "#38bdf8" : "#27272a"}
          emissiveIntensity={hovered ? 0.7 : 0.25}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

// 3. 3D TypeScript Hologram Cube with circuitry glow
function TypeScript3DCube({ position }: { position: [number, number, number] }) {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    const speed = hovered ? 2.2 : 0.7;
    cubeRef.current.rotation.x += delta * 0.6 * speed;
    cubeRef.current.rotation.y += delta * 0.7 * speed;
  });

  return (
    <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh
        ref={cubeRef}
        position={position}
        scale={hovered ? 0.85 : 0.7}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playSound("pop");
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#2563eb"}
          emissive="#1d4ed8"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// 4. Central 3D Developer Laptop Station with animated screen
function LaptopWorkstation({ position }: { position: [number, number, number] }) {
  const workstationGroup = useRef<THREE.Group>(null!);
  const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    if (!workstationGroup.current) return;
    const t = clock.getElapsedTime();
    // Gentle hovering sway
    workstationGroup.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
    workstationGroup.current.rotation.y = Math.sin(t * 0.6) * 0.12;

    if (screenGlowRef.current) {
      screenGlowRef.current.emissiveIntensity = 0.5 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <group ref={workstationGroup} position={position}>
      {/* Laptop Base (Keyboard Deck) */}
      <mesh position={[0, -0.25, 0.45]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2.5, 0.08, 1.6]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, -0.2, 0.9]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.7, 0.02, 0.45]} />
        <meshStandardMaterial color="#27272a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Keyboard Area */}
      <mesh position={[0, -0.2, 0.35]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2.2, 0.02, 0.65]} />
        <meshStandardMaterial color="#09090b" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Laptop Lid & Screen */}
      <group position={[0, -0.2, -0.35]} rotation={[0.3, 0, 0]}>
        {/* Outer Shell */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.5, 1.7, 0.06]} />
          <meshStandardMaterial color="#18181b" metalness={0.92} roughness={0.25} />
        </mesh>

        {/* Inner Screen Display (Emissive Code Glow) */}
        <mesh position={[0, 0.85, 0.035]}>
          <planeGeometry args={[2.3, 1.5]} />
          <meshStandardMaterial
            ref={screenGlowRef}
            color="#0f172a"
            emissive="#10b981"
            emissiveIntensity={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Screen Top WebCam Indicator */}
        <mesh position={[0, 1.63, 0.036]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  );
}

// Main 3D Workspace Scene
export function DeveloperWorkspace3D() {
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 0.3, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 0.2, 0.05);
  });

  return (
    <group rotation={[0.05, 0, 0]}>
      {/* Dynamic 3D Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={2.5} color="#10b981" distance={12} />
      <pointLight position={[4, 2, 2]} intensity={2.5} color="#38bdf8" distance={12} />
      <pointLight position={[0, -2, -3]} intensity={2} color="#8b5cf6" distance={10} />

      {/* Central Interactive Laptop Station */}
      <LaptopWorkstation position={[0, -0.3, 0]} />

      {/* Floating 3D Tech Badges Orbiting the Station */}
      <React3DAtom position={[-2.4, 1.4, 0.4]} />
      <Nextjs3DMonolith position={[2.4, 1.2, 0.2]} />
      <TypeScript3DCube position={[1.8, -1.2, 0.8]} />
    </group>
  );
}
