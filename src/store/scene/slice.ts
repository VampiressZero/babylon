import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { MainScene } from 'lib/immersive/mainScene';

import { initialState } from './state';

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setScene(state, action: { payload: MainScene; }) {
      state.scene = action.payload as unknown as WritableDraft<MainScene>;
    },
  },
});

export const { setScene } = sceneSlice.actions;
