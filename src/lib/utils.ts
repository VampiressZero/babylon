import { Mesh, MeshBuilder, StandardMaterial, Texture, Color3, ShadowGenerator, PhysicsImpostor, Vector3 } from '@babylonjs/core';
import { sample, random } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { GROUND_SIZE } from './constants';

import { TexturesUrl } from './models';

/** */
enum ShapeImpostor {
  'sphere' = PhysicsImpostor.SphereImpostor,
  'box' = PhysicsImpostor.BoxImpostor,
  'cylinder' = PhysicsImpostor.CylinderImpostor,
  'cone' = PhysicsImpostor.CylinderImpostor,
}

export const baseObjects = () => {
  const randomSize = random(1.5, 3.5);
  const randomDiameterTop = random(0, 1.5);

  // const randomRadius = random(0, 1);

  const boxCreate = () => MeshBuilder.CreateBox(`box`, {
    height: randomSize,
    width: randomSize,

    // updatable: true
  });
  const sphereCreate = () => MeshBuilder.CreateSphere(
    `sphere`,
    { diameter: randomSize },
  );
  const cylinderCreate = () => MeshBuilder.CreateCylinder(
    `cylinder`,
    { diameter: randomSize },
  );
  const coneCreate = () => MeshBuilder.CreateCylinder(
    `cone`,
    { diameter: randomSize, diameterTop: randomDiameterTop },
  );

  // const ribbonCreate = () => MeshBuilder.CreateCapsule(
  //   `ribbon${uuidv4()}`,
  //   { height: randomSize, radius: randomRadius },
  //   scene,
  // );

  const arrayObjects = [boxCreate, sphereCreate, cylinderCreate, coneCreate];

  const objectCreate = sample(arrayObjects) ?? boxCreate;
  // const objectCreate = sphereCreate;

  const object = objectCreate();
  object.position.y = object.getBoundingInfo().boundingBox.maximumWorld.y + random(1, 5);

  const maxPosition = GROUND_SIZE / 2 - 2;
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
    object.physicsImpostor = createPhysics(object, 5);
    // car.intersectsMesh(object, true);
  }
};

/**
 * Creates physics for an object.
 * @param object Object.
 */
export const createPhysics = (object: Mesh, mass: number): PhysicsImpostor => {
  const name = object.name || ShapeImpostor.box;
  const typeImpostor = name as keyof typeof ShapeImpostor;

  const physicsImpostor = new PhysicsImpostor(
    object,
    ShapeImpostor[typeImpostor],
    {
      mass,
    },
  );
  return physicsImpostor;
};

// object.material = addMaterial(object, 'ball', {
//   diffuse: '/textures/ForestLeaves/diffuse.png',
//   ao: '/textures/ForestLeaves/ao.png',
//   normal: '/textures/ForestLeaves/normal.png',
//   rough: '/textures/ForestLeaves/rough.png',
//   displacement: '/textures/ForestLeaves/displacement.png',
// });
// this.ground.addChild(object);
