import {
  useEffect,
  useRef,
  FC,
  Fragment,
  memo,
  useState,
} from 'react';
import { addFigures } from 'lib/utils';
import { MainScene } from 'lib/immersive/mainScene';

import {
  IPointerEvent,
  Mesh,
  PickingInfo,
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
  const [touchCoordinates, setTouchCoordinates] = useState<{x: number; z: number;} | null>(null);
  const [car, setCar] = useState<Mesh | null>(null);

  const handleChangeCountFigure = (count: number) => {
    setCountFigure(count);
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      mainSceneRef.current = new MainScene(canvasRef.current);
      setMainScene(mainSceneRef.current);
      setCar(createCar(mainSceneRef.current?.scene, mainSceneRef.current.shadowGenerator));

      mainSceneRef.current.scene.onPointerDown = (_evt: IPointerEvent, pickResult: PickingInfo) => {
        if (pickResult.hit && pickResult.pickedPoint) {
          setTouchCoordinates({ x: pickResult.pickedPoint.x, z: pickResult.pickedPoint.z });
        }
      };
    }

    return () => mainSceneRef.current?.erase();
  }, []);

  useEffect(() => {
    mainScene?.shadowGenerator.getShadowMap() &&
      addFigures(countFigure, mainScene.shadowGenerator);
  }, [countFigure, mainScene]);

  useEffect(() => {
    console.log(touchCoordinates, car);

    if (touchCoordinates !== null && car !== null) {
      // console.log(car.physicsImpostor?.restitution);
      // console.log(car.physicsImpostor?.getLinearVelocity());
      // const origin = new Vector3(10, 0, 0);
      // const radiusOrEventOptions = 5;
      // mainScene?.physicsHelper.applyRadialExplosionImpulse(
      //   origin,

      //   radiusOrEventOptions,

      //   // strength: 20,
      //   // falloff: PhysicsRadialImpulseFalloff.Linear,

      // );

      car.physicsImpostor?.setLinearVelocity(new Vector3(25, 0, 0));
      console.log(car.physicsImpostor?.getLinearVelocity());

      // car.speed
      // console.log(touchCoordinates);
    }

  }, [car, touchCoordinates]);

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
