import {
  MutableRefObject,
  useEffect,
  useRef,
  FC,
  Fragment,
  memo,
  useState,
  useCallback,
} from 'react';
import { addFigures, baseObjects, createPhysics } from 'lib/utils';
import { MainScene } from 'lib/immersive/mainScene';

import {
  Color3,
  KeyboardEventTypes,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';

import { SettingsMenu } from '../SettingsMenu';

import styles from './Playground.module.css';
import { Play } from './Play';
import { createCar } from './Car';

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
      createCar(mainSceneRef.current?.scene, mainSceneRef.current.shadowGenerator);
    }

    return () => mainSceneRef.current?.erase();
  }, []);

  useEffect(() => {
    mainScene?.shadowGenerator.getShadowMap() &&
      addFigures(countFigure, mainScene.shadowGenerator);
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
      <canvas onClick={onclick} className={styles.scene} ref={canvasRef} />
      <SettingsMenu
        msc={mainSceneRef}
        countFigure={countFigure}
        onChangeCountFigure={handleChangeCountFigure}
      />
      {mainScene?.shadowGenerator && (
        <Fragment>
          <Play
            countFigure={countFigure}
            shadowGenerator={mainScene.shadowGenerator} />
          {/* <Car
            scene={mainScene.scene}
            shadowGenerator={mainScene.shadowGenerator} /> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export const Playground = memo(PlaygroundComponent);
