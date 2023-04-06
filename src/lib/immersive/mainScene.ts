import { Color3, Engine, MeshBuilder, Scene, StandardMaterial, Texture, UniversalCamera } from '@babylonjs/core';
import { baseObjects } from 'src/utils';

import { MainCamera } from './mainCamera';
import { MainLight } from './mainLight';
import { addMaterial } from './mainMaterial';

/** Main scene of the app. */
export class MainScene {

  private readonly engine: Engine;

  /** Scene. */
  public readonly scene: Scene;

  /** Camera. */
  public readonly camera: UniversalCamera;

  public constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);

    this.engine.runRenderLoop(() => this.scene.render());
    this.camera = MainCamera.create(this.scene, canvas);
    MainLight.create(this.scene);
    this.createGround();

    baseObjects(this.scene);
    // console.log(baseObjects());

    // const ball = MeshBuilder.CreateSphere('phere', { diameter: 50 });
    // console.log(ball);
    // const ball = MeshBuilder.CreateSphere('ball', { diameter: 20 });
    // ball.material = addMaterial(ball, 'ball', {
    //   diffuse: '/textures/ForestLeaves/diffuse.png',
    //   ao: '/textures/ForestLeaves/ao.png',
    //   normal: '/textures/ForestLeaves/normal.png',
    //   rough: '/textures/ForestLeaves/rough.png',
    //   displacement: '/textures/ForestLeaves/displacement.png',
    // });
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  // Dumb ground. Just to show something at scene
  private createGround(): void {
    const ground = MeshBuilder.CreateGround('ground', { width: 250, height: 250 });
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.Random();
    ground.material = material;
  }
}
