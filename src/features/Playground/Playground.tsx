import { MutableRefObject, useEffect, useRef, FC, Fragment, memo, useState, useCallback } from 'react';
import { addFigures, baseObjects, createPhysics } from 'lib/utils';
import { MainScene } from 'lib/immersive/mainScene';

import { Color3, Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';

import { SettingsMenu } from '../SettingsMenu';

import styles from './Playground.module.css';
import { Play } from './Play';

export const PlaygroundComponent: FC = () => {

  const [countFigure, setCountFigure] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainSceneRef = useRef<MainScene | null>(null);
  const [mainScene, setMainScene] = useState<MainScene | null>(null);
  const [car, setCar] = useState<Mesh | null>(null);

  const handleChangeCountFigure = (count: number) => {
    setCountFigure(count);
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      mainSceneRef.current = new MainScene(canvasRef.current);
      setMainScene(mainSceneRef.current);
      const carCreate = MeshBuilder.CreateBox(`box`, {
        height: 2,
        width: 4,
        depth: 2,
      });
      setCar(carCreate);
      const material = new StandardMaterial('groundMaterial');
      material.diffuseColor = Color3.Green();
      carCreate.material = material;
      carCreate.position.y = 10;
      mainSceneRef.current.shadowGenerator.getShadowMap()?.renderList?.push(carCreate);
      carCreate.physicsImpostor = createPhysics(carCreate);

    }

    return () => mainSceneRef.current?.erase();
  }, []);

  useEffect(() => {
    mainScene?.shadowGenerator.getShadowMap() && addFigures(countFigure, mainScene.shadowGenerator);
  }, [countFigure, mainScene]);

    const onclick = () => {
    // const object = mainScene?.scene.meshes[1];

    // object?.physicsImpostor && object.physicsImpostor.applyForce(
    //   new Vector3(400, 0, 0),
    //   object.getAbsolutePosition(),
    // );

  //   // console.log(
  //   //   sceneRef.current?.camera.position,
  //   //   sceneRef.current?.camera.rotation,
  //   // );
  };

  return (
    <Fragment>
      <canvas
        onClick={onclick}
        className={styles.scene}
        ref={canvasRef} />
      <SettingsMenu
        msc={mainSceneRef}
        countFigure={countFigure}
        onChangeCountFigure={handleChangeCountFigure} />
      { mainScene && <Play countFigure={countFigure} shadowGenerator={mainScene.shadowGenerator} /> }
    </Fragment>
  );
};

export const Playground = memo(PlaygroundComponent);
