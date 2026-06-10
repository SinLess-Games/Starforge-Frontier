import { useEffect, useRef } from 'react';
import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    scene.clearColor.set(0.015, 0.018, 0.028, 1);

    const camera = new ArcRotateCamera(
      'main-camera',
      Math.PI / 4,
      Math.PI / 3,
      12,
      Vector3.Zero(),
      scene,
    );

    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 40;

    new HemisphericLight('main-light', new Vector3(0, 1, 0), scene);

    const ground = MeshBuilder.CreateGround(
      'prototype-ground',
      {
        width: 12,
        height: 12,
      },
      scene,
    );

    const groundMaterial = new StandardMaterial('ground-material', scene);
    groundMaterial.diffuseColor = new Color3(0.12, 0.15, 0.18);
    ground.material = groundMaterial;

    const shipCore = MeshBuilder.CreateBox(
      'starter-ship-core',
      {
        width: 2.4,
        height: 0.7,
        depth: 4,
      },
      scene,
    );

    shipCore.position.y = 0.7;

    const shipMaterial = new StandardMaterial('ship-material', scene);
    shipMaterial.diffuseColor = new Color3(0.35, 0.42, 0.55);
    shipCore.material = shipMaterial;

    const cockpit = MeshBuilder.CreateSphere(
      'starter-ship-cockpit',
      {
        diameter: 0.9,
        segments: 24,
      },
      scene,
    );

    cockpit.position = new Vector3(0, 1.05, -1.3);

    const cockpitMaterial = new StandardMaterial('cockpit-material', scene);
    cockpitMaterial.diffuseColor = new Color3(0.15, 0.45, 0.85);
    cockpit.material = cockpitMaterial;

    engine.runRenderLoop(() => {
      shipCore.rotation.y += 0.002;
      cockpit.rotation.y += 0.002;
      scene.render();
    });

    const resize = () => {
      engine.resize();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="hud">
        <h1>Starforge Frontier</h1>
        <p>Prototype initialized: Babylon.js + React + Vite + TypeScript.</p>
      </section>

      <canvas ref={canvasRef} className="game-canvas" />
    </main>
  );
}
