import { Scene } from '@babylonjs/core';
import { Button, TextField } from '@mui/material';
import { MainCamera } from 'lib/immersive/mainCamera';
import { MainScene } from 'lib/immersive/mainScene';
import { FC, memo } from 'react';

import styles from './SettingsMenu.module.css';

interface Props {

  /** Number of figures. */
  readonly countFigure: number;

  /** Change the number of figures. */
  readonly onChangeCountFigure: (count: number) => void;
}

const SettingsMenuComponent: FC<Props> = ({
  countFigure,
  onChangeCountFigure,
}) => {

  const resetPositionCamera = () => {

  }
  console.log();

  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      <div className={styles['settings__reset-camera']}>
        <Button
          onClick={resetPositionCamera}
          sx={{ textTransform: 'none', m: '15px 0', p: '0' }}
        >
            Reset camera position
        </Button>

      </div>
      <div className={styles.settings__table}>
        <div className={`${styles['settings__table-row']} ${styles['settings__table-center']}`}>
          <div className={styles.settings__name}>
            Number of figures
          </div>
          <div>
            <TextField
              className={styles['settings__input-number']}
              type="number"
              variant="standard"
              onChange={event => onChangeCountFigure(Number(event.target.value))}
              value={countFigure}
            />
          </div>
        </div>
        <hr className={styles['settings__table-separator']} />
        <div className={styles['settings__table-row']}>
          <div className={styles.settings__name}>
            Car
          </div>
          <div>
            x: 09, y: 98
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsMenu = memo(SettingsMenuComponent);
