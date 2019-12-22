import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { colors } from '~planner/constants'
import { BaseProps } from '../types'

export const Tick = ({ width = 60, size, height = 60, color = colors.black }: BaseProps) => (
  <Svg width={size || width} height={size || height} viewBox="0 0 60 60">
    <G fill={color}>
      <Path d="M52,21c-0.553,0-1,0.447-1,1v32H2V5h49v1c0,0.553,0.447,1,1,1s1-0.447,1-1V3H0v53h53V22C53,21.447,52.553,21,52,21z" />
      <Path
        d="M58.707,7.293c-0.391-0.391-1.023-0.391-1.414,0L27,37.586l-13.07-13.07c-0.391-0.391-1.023-0.391-1.414,0
		s-0.391,1.023,0,1.414l13.777,13.777C26.488,39.902,26.744,40,27,40s0.512-0.098,0.707-0.293l31-31
		C59.098,8.316,59.098,7.684,58.707,7.293z"
      />
    </G>
  </Svg>
)
