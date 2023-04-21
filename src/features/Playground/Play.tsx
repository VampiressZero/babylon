import { FC, memo, MutableRefObject, useCallback, useEffect } from 'react';
import { MainScene } from 'lib/immersive/mainScene';
import { addFigures, baseObjects } from 'lib/utils';
import { ShadowGenerator } from '@babylonjs/core';

interface Props {

  /** Shadow generation. */
  readonly shadowGenerator: ShadowGenerator;

  /** Number of figures. */
  readonly countFigure: number;
}

export const PlayComponent: FC<Props> = ({ shadowGenerator, countFigure }) => {

  useEffect(() => {
    // addFigures(countFigure, shadowGenerator);
  }, [addFigures, countFigure]);

  return null;
};

export const Play = memo(PlayComponent);
