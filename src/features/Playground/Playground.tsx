import { DirectionalLight, MeshBuilder, Vector3 } from '@babylonjs/core';
import { FC, Fragment, memo, useEffect, useRef } from 'react';
import { MainScene } from 'src/lib/immersive/mainScene';
import { baseObjects, addMaterial } from 'src/lib/utils';

import styles from './Playground.module.css';

const PlaygroundComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<MainScene | null>(null);
  useEffect(() => {
    if (canvasRef.current != null) {
      const scene = new MainScene(canvasRef.current);
      sceneRef.current = scene;

      const object = baseObjects(scene.scene);

      // object.material = addMaterial(object, 'ball', {
      //   diffuse: '/textures/ForestLeaves/diffuse.png',
      //   ao: '/textures/ForestLeaves/ao.png',
      //   normal: '/textures/ForestLeaves/normal.png',
      //   rough: '/textures/ForestLeaves/rough.png',
      //   displacement: '/textures/ForestLeaves/displacement.png',
      // });
      // this.ground.addChild(object);
    }

    return () => sceneRef.current?.erase();
  }, []);

  // const onclick = () => {
  //   console.log(
  //     sceneRef.current?.camera.position,
  //     sceneRef.current?.camera.rotation,
  //   );
  // };

  return <canvas
    // onClick={onclick}
    className={styles.scene}
    ref={canvasRef} />;
};

export const Playground = memo(PlaygroundComponent);
