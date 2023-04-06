import { MeshBuilder, Scene } from '@babylonjs/core';
import { sample } from 'lodash';

import { addMaterial } from './lib/immersive/mainMaterial';

export const baseObjects = (scene: Scene) => {
  const objectSize = 20;
  const objectDiameter = 50;

  const box = MeshBuilder.CreateBox('box', {updatable: true }, scene);
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: objectDiameter, updatable: true }, scene);
  const cylinder = MeshBuilder.CreateCylinder('cylinder', { diameter: objectDiameter, updatable: true }, scene);
  const cone = MeshBuilder.CreateCylinder('cone', { diameter: objectDiameter, diameterTop: 0, updatable: true }, scene);
  const ribbon = MeshBuilder.CreateCapsule('ribbon', { height: 20, radius: 7, updatable: true }, scene);

  const arrayObjects = [box, sphere, cylinder, cone, ribbon];
  const object = sample(arrayObjects) ?? box;
  box.material = addMaterial(box, 'ball', {
    diffuse: '/textures/ForestLeaves/diffuse.png',
    ao: '/textures/ForestLeaves/ao.png',
    normal: '/textures/ForestLeaves/normal.png',
    rough: '/textures/ForestLeaves/rough.png',
    displacement: '/textures/ForestLeaves/displacement.png',
  });
  console.log(object);

  return object;
};
