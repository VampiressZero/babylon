import {
  Color3,
  CubeTexture,
  Engine,
  GroundMesh,
  HDRCubeTexture,
  IShadowLight,
  Mesh,
  MeshBuilder,
  PhysicsHelper,
  PhysicsImpostor,
  PolygonMeshBuilder,
  Scene,
  ShadowGenerator,
  Sound,
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
  public readonly ground: Mesh;

  /** Physics helper. */
  public readonly physicsHelper: PhysicsHelper;

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
        restitution: 0.5,

        // friction: 0.1,
      },
    );
    this.createSky();
    this.physicsHelper = new PhysicsHelper(this.scene);
    const backgroundMusic = new Sound('Background music', '/sounds/background music.mp3', this.scene, null, {
      autoplay: false,
    });

    // const polygonMeshBuilder = 
    // new PolygonMeshBuilder('polytri', corners, this.scene, earcut);
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  private createSky(): void {
    const sky = MeshBuilder.CreateSphere('sky', { diameter: 1000 });
    const skyMaterial = new StandardMaterial('skyBox');
    skyMaterial.backFaceCulling = false;

    // skyMaterial.reflectionTexture = new HDRCubeTexture('textures/sky/sky.hdr', this.scene, 1000);
    // skyMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyMaterial.diffuseColor = new Color3(0, 0, 0);
    skyMaterial.specularColor = new Color3(0, 0, 0);
    sky.material = skyMaterial;
  }

  private createShadowGenerator(light: IShadowLight): ShadowGenerator {
    const shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;

    // shadowGenerator.usePercentageCloserFiltering = true;
    return shadowGenerator;
  }

  private createGround(): Mesh {
    const ground = MeshBuilder.CreateBox('ground', { width: GROUND_SIZE, depth: GROUND_SIZE, height: 0.5 });

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
