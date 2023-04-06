import { Mesh, StandardMaterial, Texture } from '@babylonjs/core';

interface TexturesUrl {

  /** Url of displacement. */
  readonly displacement: string;

  /** Url of normal. */
  readonly normal: string;

  /** Url of AO. */
  readonly ao: string;

  /** Url of rough. */
  readonly rough: string;

  /** Url of diffuse. */
  readonly diffuse: string;
}

/**
 * Add material in object.
 * @param object Object.
 * @param name Name object.
 * @param texture Url of textures.
 */
export function addMaterial(object: Mesh, name: string, texture: TexturesUrl): StandardMaterial {

  object.applyDisplacementMap(texture.displacement, 0, 3);

  const material = new StandardMaterial(`${name}Material`);

  material.diffuseTexture = new Texture(texture.diffuse);
  material.ambientTexture = new Texture(texture.ao);

  material.bumpTexture = new Texture(texture.normal);
  material.invertNormalMapX = true;
  material.invertNormalMapY = true;

  material.specularTexture = new Texture(texture.rough);
  material.specularPower = 10;

  return material;
}
