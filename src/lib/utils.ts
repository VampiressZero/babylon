import { Mesh, MeshBuilder, StandardMaterial, Texture, Color3, ShadowGenerator, PhysicsImpostor } from '@babylonjs/core';
import { sample, random } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { GROUND_SIZE } from './constants';

import { TexturesUrl } from './models';

export const baseObjects = () => {
  const randomSize = random(1.5, 3.5);
  const randomdiameterTop = random(0, 1.5);

  // const randomRadius = random(0, 1);

  const boxCreate = () => MeshBuilder.CreateBox(`box${uuidv4()}`, {
    height: randomSize,
    width: randomSize,

    // updatable: true
  });
  const sphereCreate = () => MeshBuilder.CreateSphere(
    `sphere${uuidv4()}`,
    { diameter: randomSize },
  );
  const cylinderCreate = () => MeshBuilder.CreateCylinder(
    `cylinder${uuidv4()}`,
    { diameter: randomSize },
  );
  const coneCreate = () => MeshBuilder.CreateCylinder(
    `cone${uuidv4()}`,
    { diameter: randomSize, diameterTop: randomdiameterTop },
  );

  // const ribbonCreate = () => MeshBuilder.CreateCapsule(
  //   `ribbon${uuidv4()}`,
  //   { height: randomSize, radius: randomRadius },
  //   scene,
  // );

  const arrayObjects = [boxCreate, sphereCreate, cylinderCreate, coneCreate];
  // const objectCreate = sample(arrayObjects) ?? boxCreate;
  const objectCreate = sphereCreate;


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
export const addMaterial = (object: Mesh, name: string, texture: TexturesUrl): StandardMaterial => {
  const material = new StandardMaterial(`${name}Material${uuidv4()}`);

  material.diffuseTexture = new Texture(texture.diffuse);
  material.ambientTexture = new Texture(texture.ao);

  material.bumpTexture = new Texture(texture.normal);
  material.invertNormalMapX = true;
  material.invertNormalMapY = true;

  material.specularTexture = new Texture(texture.rough);
  material.specularPower = 10;

  return material;
};

/**
 * Add figures to the scene.
 * @param countFigure Number of figures.
 * @param shadowGenerator Shadow generation.
 */
export const addFigures = (countFigure: number, shadowGenerator: ShadowGenerator): void => {
  for (let i = 0; i < countFigure; i++) {
    const object = baseObjects();
    shadowGenerator.getShadowMap()?.renderList?.push(object);
    object.physicsImpostor = new PhysicsImpostor(
      object,
      PhysicsImpostor.SphereImpostor,
      {
        mass: 1,
      },
    );
  }

  console.log(shadowGenerator.getShadowMap()?.renderList);

};

// const object = baseObjects(scene.scene);

// object.material = addMaterial(object, 'ball', {
//   diffuse: '/textures/ForestLeaves/diffuse.png',
//   ao: '/textures/ForestLeaves/ao.png',
//   normal: '/textures/ForestLeaves/normal.png',
//   rough: '/textures/ForestLeaves/rough.png',
//   displacement: '/textures/ForestLeaves/displacement.png',
// });
// this.ground.addChild(object);
