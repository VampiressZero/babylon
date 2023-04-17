import { DirectionalLight, MeshBuilder, Vector3 } from '@babylonjs/core';
import { FC, Fragment, memo, useEffect, useRef } from 'react';
import { MainScene } from 'src/lib/immersive/mainScene';

import styles from './SettingsMenu.module.css';

const SettingsMenuComponent: FC = () => {

  console.log();

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export const SettingsMenu = memo(SettingsMenuComponent);
