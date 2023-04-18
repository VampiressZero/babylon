import { MainScene } from 'lib/immersive/mainScene';

/** Scene state. */
export interface MainSceneState {

  /** Scene. */
  scene: MainScene | null;
}

export const initialState: MainSceneState = {
  scene: null,
};

// export type State = typeof initialState;
