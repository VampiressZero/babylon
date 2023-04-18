import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Color3 } from '@babylonjs/core';
import { sample, random } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { GROUND_SIZE } from './constants';

import { TexturesUrl } from './models';

export const baseObjects = (scene: Scene) => {
  const randomSize = random(1.5, 3.5);
  const randomSizeDiameter = randomSize / 2;
  const randomdiameterTop = random(0, 1.5);
  // const randomRadius = random(0, 1);

  const boxCreate = () => MeshBuilder.CreateBox(`box${uuidv4()}`, {
    height: randomSize,
    width: randomSize,
    // updatable: true
  }, scene);
  const sphereCreate = () => MeshBuilder.CreateSphere(
    `sphere${uuidv4()}`,
    { diameter: randomSizeDiameter },
    scene,
  );
  const cylinderCreate = () => MeshBuilder.CreateCylinder(
    `cylinder${uuidv4()}`,
    { diameter: randomSizeDiameter },
    scene,
  );
  const coneCreate = () => MeshBuilder.CreateCylinder(
    `cone${uuidv4()}`,
    { diameter: randomSizeDiameter, diameterTop: randomdiameterTop },
    scene,
  );
  // const ribbonCreate = () => MeshBuilder.CreateCapsule(
  //   `ribbon${uuidv4()}`,
  //   { height: randomSize, radius: randomRadius },
  //   scene,
  // );

  const arrayObjects = [boxCreate, sphereCreate, cylinderCreate, coneCreate];
  const objectCreate = sample(arrayObjects) ?? boxCreate;

  const object = objectCreate();
  object.position.y = object.getBoundingInfo().boundingBox.maximumWorld.y;

  const maxPosition = GROUND_SIZE / 2;
  object.position.x = random(-maxPosition, maxPosition);
  object.position.z = random(-maxPosition, maxPosition);

  const material = new StandardMaterial('groundMaterial');
  material.diffuseColor = Color3.Random();
  object.material = material;

  return object;
};

/**
 * Add material in object.
 * @param object Object.
 * @param name Name object.
 * @param texture Url of textures.
 */
export function addMaterial(object: Mesh, name: string, texture: TexturesUrl): StandardMaterial {
  const material = new StandardMaterial(`${name}Material${uuidv4()}`);

  material.diffuseTexture = new Texture(texture.diffuse);
  material.ambientTexture = new Texture(texture.ao);

  material.bumpTexture = new Texture(texture.normal);
  material.invertNormalMapX = true;
  material.invertNormalMapY = true;

  material.specularTexture = new Texture(texture.rough);
  material.specularPower = 10;

  return material;
}
