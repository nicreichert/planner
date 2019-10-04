import * as React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { colors } from '../../../../constants';
import { BaseProps } from '../types';

export const Arrow = ({ width = 60, size, height = 60, color = colors.black }: BaseProps) => (
  <Svg width={size || width} height={size || height} viewBox="0 0 60 60">
    <Polygon
      fill={color}
      points="15.561,0 14.146,1.414 42.439,29.707 14.146,58 15.561,59.414 45.268,29.707 "
    />
  </Svg>
);
