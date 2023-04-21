import { MutableRefObject, useEffect, useRef, FC, Fragment, memo, useState, useCallback } from 'react';
import { addFigures, baseObjects } from 'lib/utils';
import { MainScene } from 'lib/immersive/mainScene';

import { SettingsMenu } from '../SettingsMenu';

import styles from './Playground.module.css';
import { Play } from './Play';

export const PlaygroundComponent: FC = () => {

  const [countFigure, setCountFigure] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainSceneRef = useRef<MainScene | null>(null);
  const [mainScene, setMainScene] = useState<MainScene | null>(null);

  const handleChangeCountFigure = (count: number) => {
    setCountFigure(count);
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      mainSceneRef.current = new MainScene(canvasRef.current);
      setMainScene(mainSceneRef.current);
    }

    return () => mainSceneRef.current?.erase();
  }, []);

  useEffect(() => {
    mainScene && addFigures(countFigure, mainScene.shadowGenerator);
    
  }, [countFigure, mainScene]);

  // const onclick = () => {
  //   console.log(scene, 1);

  //   // console.log(
  //   //   sceneRef.current?.camera.position,
  //   //   sceneRef.current?.camera.rotation,
  //   // );
  // };
  console.log(countFigure);

  return (
    <Fragment>
      <canvas
        // onClick={onclick}
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
