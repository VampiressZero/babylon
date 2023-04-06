import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core';

/** Main camera of the scene. */
export class MainCamera {

  /**
   * Creates main camera for scene.
   * @param scene Main scene.
   * @param canvas Canvas.
   */
  public static create(scene: Scene, canvas: HTMLCanvasElement): UniversalCamera {
    const camera = new UniversalCamera('mainCamera', new Vector3(110, 80, -220), scene);
    camera.attachControl(canvas, true);
    camera.rotation = new Vector3(0.2, -0.5, 0);
    // console.log(camera.position);

    return camera;
  }
}
