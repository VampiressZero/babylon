import { Color3, DirectionalLight, Scene, Vector3 } from '@babylonjs/core';

/** Main light of the scene. */
export class MainLight {

  /**
   * Creates main source of light for scene.
   * @param scene Main scene.
   */
  public static create(scene: Scene): DirectionalLight {
    const hemiLight = new DirectionalLight('mainLight', new Vector3(45, -45, 0), scene);
    hemiLight.intensity = 0.5;
    hemiLight.specular = new Color3(0.722, 0.843, 1);
    // hemiLight.range = 1000;

    return hemiLight;
  }
}
