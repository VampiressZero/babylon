import { Color3, DirectionalLight, Scene, Vector3 } from '@babylonjs/core';

/** Main light of the scene. */
export class MainLight {

  /**
   * Creates main source of light for scene.
   * @param scene Main scene.
   */
  public static create(scene: Scene): DirectionalLight {
    const hemiLight = new DirectionalLight('mainLight', new Vector3(45, -45, 0), scene);
    hemiLight.intensity = 0.8;
    hemiLight.specular = Color3.Gray();

    return hemiLight;
  }
}
