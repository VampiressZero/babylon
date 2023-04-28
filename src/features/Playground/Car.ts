import {
  Color3,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  PhysicsJoint,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import * as earcut from 'earcut';

export const createCar = (
  scene: Scene,
  shadowGenerator: ShadowGenerator,
): Mesh => {
  // const car = MeshBuilder.CreateBox(`box`, {
  //     height: 2,
  //     width: 4,
  //     depth: 2,
  // });
  const outline = [new Vector3(-3, 0, -1), new Vector3(2, 0, -1)];

  // curved front
  for (let i = 0; i < 20; i++) {
    outline.push(
      new Vector3(
        2 * Math.cos((i * Math.PI) / 40),
        0,
        2 * Math.sin((i * Math.PI) / 40) - 1,
      ),
    );
  }

  // top
  outline.push(new Vector3(0, 0, 1));
  outline.push(new Vector3(-3, 0, 1));

  const car = MeshBuilder.ExtrudePolygon(
    'car',
    { shape: outline, depth: 2 },
    scene,
    earcut,
  );

  const material = new StandardMaterial('groundMaterial');
  material.diffuseColor = Color3.Green();
  car.material = material;
  material.emissiveColor = new Color3(0.07, 0.5, 0.56);
  material.wireframe = true;
  car.position.y = 10;
  const wheelRB = MeshBuilder.CreateCylinder('wheelRB', {
    diameter: 1.25,
    height: 0.5,
  });
  // car.forceSharedVertices();
  const blueMat = new StandardMaterial('blue', scene);
  blueMat.diffuseColor = Color3.Blue();
  wheelRB.material = blueMat;
  wheelRB.parent = car;
  wheelRB.position.z = -1;
  wheelRB.position.x = -2;
  wheelRB.position.y = 0.35;

  const wheelRF = wheelRB.clone('wheelRF');
  wheelRF.position.x = 1;

  const wheelLB = wheelRB.clone('wheelLB');
  wheelLB.position.y = -2 - 0.35;

  const wheelLF = wheelRF.clone('wheelLF');
  wheelLF.position.y = -2 - 0.35;

  // const mesh = Mesh.MergeMeshes([car, wheelRB, wheelRF, wheelLB, wheelLF]) ?? car;

  shadowGenerator.getShadowMap()?.renderList?.push(car);
  const physicsImpostor = new PhysicsImpostor(
    car,
    PhysicsImpostor.BoxImpostor,
    {
      mass: 100000,
      restitution: 0,
    },
  );
  const physicsImpostorWheelRB = new PhysicsImpostor(
    wheelRB,
    PhysicsImpostor.CylinderImpostor,
    {
      mass: 100,
      restitution: 0,
    },
  );
  const physicsImpostorWheelRF = new PhysicsImpostor(
    wheelRF,
    PhysicsImpostor.CylinderImpostor,
    {
      mass: 100,
      restitution: 0,
    },
  );
  const physicsImpostorWheelLB = new PhysicsImpostor(
    wheelLB,
    PhysicsImpostor.CylinderImpostor,
    {
      mass: 100,
      restitution: 0,
    },
  );
  const physicsImpostorWheelLF = new PhysicsImpostor(
    wheelLF,
    PhysicsImpostor.CylinderImpostor,
    {
      mass: 100,
      restitution: 0,
    },
  );

  const joint = new PhysicsJoint(PhysicsJoint.LockJoint, {});

  car.physicsImpostor && wheelRB.physicsImpostor?.addJoint(car.physicsImpostor, joint);
  // wheelRF.physicsImpostor && car.physicsImpostor?.addJoint(wheelRF.physicsImpostor, joint);
  // wheelLB.physicsImpostor && car.physicsImpostor?.addJoint(wheelLB.physicsImpostor, joint);
  // wheelLF.physicsImpostor && car.physicsImpostor?.addJoint(wheelLF.physicsImpostor, joint);

  car.physicsImpostor = physicsImpostor;
  wheelRB.physicsImpostor = physicsImpostorWheelRB;
  wheelRF.physicsImpostor = physicsImpostorWheelRF;
  wheelLB.physicsImpostor = physicsImpostorWheelLB;
  wheelLF.physicsImpostor = physicsImpostorWheelLF;
  car.rotation = new Vector3(-Math.PI / 2, 0, 0);
  return car;
};
