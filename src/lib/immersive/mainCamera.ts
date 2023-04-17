import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core';

/** Main camera of the scene. */
export class MainCamera {

  /**
   * Creates main camera for scene.
   * @param scene Main scene.
   * @param canvas Canvas.
   */
  public static create(scene: Scene, canvas: HTMLCanvasElement): UniversalCamera {
    const camera = new UniversalCamera('mainCamera', new Vector3(-18, 10, -15), scene);
    // const camera = new UniversalCamera('mainCamera', new Vector3(-5.46, 0, 0), scene);

    camera.attachControl(canvas, true);
    camera.rotation = new Vector3(0.45, 0.85, 0);
    // camera.rotation = new Vector3(0.002072, 1.5874, 0);

    camera.speed = 0.5;
    camera.inverseRotationSpeed = 10;

    return camera;
  }
}
