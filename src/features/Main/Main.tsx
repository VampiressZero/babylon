import { MainScene } from 'lib/immersive/mainScene';
import { useEffect, useRef, FC, Fragment, memo, useState } from 'react';
import { setScene } from 'store/scene/slice';

import { Playground } from '../Playground';
import { SettingsMenu } from '../SettingsMenu';

export const MainComponent: FC = () => {

  const [countFigure, setCountFigure] = useState(3);

  const handleChangeCountFigure = (count: number) => {
    setCountFigure(count);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<MainScene | null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      const scene = new MainScene(canvasRef.current);
      sceneRef.current = scene;
      setScene(scene);

      // const object = baseObjects(scene.scene);

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
  return (
    <Fragment>
      <Playground countFigure={countFigure} />
      <SettingsMenu
        countFigure={countFigure}
        onChangeCountFigure={handleChangeCountFigure} />
    </Fragment>
  );
};

export const Main = memo(MainComponent);
