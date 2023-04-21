import {
  Color3,
  Engine,
  GroundMesh,
  MeshBuilder,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  UniversalCamera,
} from '@babylonjs/core';
import { GROUND_SIZE } from 'lib/constants';

import { MainCamera } from './mainCamera';
import { MainLight } from './mainLight';

/** Main scene of the app. */
export class MainScene {

  private readonly engine: Engine;

  /** Scene. */
  public readonly scene: Scene;

  /** Camera. */
  public readonly camera: UniversalCamera;

  /** Shadow generator. */
  public readonly shadowGenerator: ShadowGenerator;

  /** Ground. */
  public readonly ground: GroundMesh;

  public constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);
    this.scene.enablePhysics();

    this.engine.runRenderLoop(() => this.scene.render());
    this.camera = MainCamera.create(this.scene, canvas);
    const light = MainLight.create(this.scene);

    // new Texture('photoDome', )
    this.ground = this.createGround();
    this.ground.receiveShadows = true;

    this.shadowGenerator = new ShadowGenerator(1024, light);
    this.shadowGenerator.useBlurExponentialShadowMap = true;
    this.shadowGenerator.useKernelBlur = true;
    this.shadowGenerator.blurKernel = 64;

  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  // Dumb ground. Just to show something at scene
  private createGround(): GroundMesh {
    const ground = MeshBuilder.CreateGround('ground', { width: GROUND_SIZE, height: GROUND_SIZE });

    // ground.material = addMaterial(ground, 'ball', {
    //   diffuse: '/textures/ForestLeaves/diffuse.png',
    //   ao: '/textures/ForestLeaves/ao.png',
    //   normal: '/textures/ForestLeaves/normal.png',
    //   rough: '/textures/ForestLeaves/rough.png',
    //   displacement: '/textures/ForestLeaves/displacement.png',
    // });
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.White();
    ground.material = material;
    return ground;
  }
}
