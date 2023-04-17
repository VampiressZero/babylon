import { Color3, Engine, GroundMesh, MeshBuilder, Scene, StandardMaterial, UniversalCamera } from '@babylonjs/core';

import { MainCamera } from './mainCamera';
import { MainLight } from './mainLight';

/** Main scene of the app. */
export class MainScene {

  private readonly engine: Engine;

  /** Scene. */
  public readonly scene: Scene;

  /** Camera. */
  public readonly camera: UniversalCamera;

  /** Ground. */
  public readonly ground: GroundMesh;

  public constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);

    this.engine.runRenderLoop(() => this.scene.render());
    this.camera = MainCamera.create(this.scene, canvas);
    MainLight.create(this.scene);
    this.ground = this.createGround();
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  // Dumb ground. Just to show something at scene
  private createGround(): GroundMesh {
    const ground = MeshBuilder.CreateGround('ground', { width: 25, height: 25 });
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.White();
    ground.material = material;
    return ground;
  }
}
