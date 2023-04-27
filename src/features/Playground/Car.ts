import { FC, memo, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { MainScene } from 'lib/immersive/mainScene';
import { addFigures, baseObjects, createPhysics } from 'lib/utils';
import { Color3, KeyboardEventTypes, Mesh, MeshBuilder, Scene, ShadowGenerator, StandardMaterial } from '@babylonjs/core';

// interface Props {

//   /** Scene. */
//   readonly scene: Scene;

//   /** Shadow generation. */
//   readonly shadowGenerator: ShadowGenerator;
// }

export const createCar = (scene: Scene, shadowGenerator: ShadowGenerator) => {
  // const [car, setCar] = useState<Mesh>(MeshBuilder.CreateBox(`box`, {
  //   height: 2,
  //   width: 4,
  //   depth: 2,
  // }));
  const car = MeshBuilder.CreateBox(`box`, {
      height: 2,
      width: 4,
      depth: 2,
  });

  // useEffect(() => {
    console.log(3, car);

    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.Green();
    car.material = material;
    car.position.y = 10;
    shadowGenerator.getShadowMap()?.renderList?.push(car);
    car.physicsImpostor = createPhysics(car, 100);

    scene.onKeyboardObservable.add(kbInfo => {
        // console.log(car.getAbsolutePosition());
        // console.log(car.getAbsolutePivotPoint());

        switch (kbInfo.type) {
          case KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              case 'a':
              case 'A':
                car.position.z += 0.5;
                break;
              case 'd':
              case 'D':
                car.position.z -= 0.5;
                break;
              case 's':
              case 'S':
                car.position.x -= 0.5;
                break;
              case 'w':
              case 'W':
              // carCreate.physicsImpostor?.applyImpulse(
              //   new Vector3(1000, 0, 0),
              //   new Vector3(2, 0, 0),
              // );
                car.position.x += 0.5;
                break;
            }
            break;
        }
      });

  // }, []);

  // return null;
};

// export const Car = memo(CarComponent);
