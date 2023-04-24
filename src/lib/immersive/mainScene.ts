import {
  Color3,
  CubeTexture,
  Engine,
  GroundMesh,
  HDRCubeTexture,
  IShadowLight,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Texture,
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

    // const plugin = new CannonJSPlugin();
    // this.scene.enablePhysics(new Vector3(0, -10, 0), plugin);

    // new Texture('photoDome', )

    this.engine.runRenderLoop(() => this.scene.render());
    this.camera = MainCamera.create(this.scene, canvas);

    const light = MainLight.create(this.scene);
    this.shadowGenerator = this.createShadowGenerator(light);


    this.ground = this.createGround();
    this.ground.physicsImpostor = new PhysicsImpostor(
      this.ground,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        restitution: 2,
        friction: 0.5,
      },
    );
    this.createSky();
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  private createSky(): void {
    const sky = MeshBuilder.CreateSphere('sky', { diameter: 1000.0 });
    const skyMaterial = new StandardMaterial('skyBox');
    skyMaterial.backFaceCulling = false;
    skyMaterial.reflectionTexture = new HDRCubeTexture('textures/sky/sky.hdr', this.scene, 1000);
    skyMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyMaterial.specularColor = new Color3(0, 0, 0);
    sky.material = skyMaterial;
  }

  private createShadowGenerator(light: IShadowLight): ShadowGenerator {
    const shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;
    return shadowGenerator;
  }

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
    ground.receiveShadows = true;
    return ground;
  }
}
