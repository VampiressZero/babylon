import { DirectionalLight, MeshBuilder, Vector3 } from '@babylonjs/core';
import { FC, Fragment, memo, useEffect, useRef } from 'react';
import { MainScene } from 'src/lib/immersive/mainScene';

import styles from './SettingsMenu.module.css';

const SettingsMenuComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MainScene | null>(null);

  // const ball = scene?.current && MeshBuilder.CreateSphere('ball', { diameter: 2 }, scene.current.scene);
  // const light = scene?.current && new DirectionalLight('ligth', new Vector3(1, 0, 0), scene.current.scene);
  useEffect(() => {
    if (canvasRef.current != null) {
      scene.current = new MainScene(canvasRef.current);
    }

    return () => scene.current?.erase();
  }, []);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export const SettingsMenu = memo(SettingsMenuComponent);
