import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { colors } from '~planner/constants'
import { BaseProps } from '../types'

export const List = ({ width = 60, size, height = 60, color = colors.black }: BaseProps) => (
  <Svg width={size || width} height={size || height} viewBox="0 0 60 60">
    <G fill={color}>
      <Path d="M0,0.5v59h60v-59H0z M58,57.5H2v-55h56V57.5z" />
      <Path d="M25,15.5h23c0.552,0,1-0.447,1-1s-0.448-1-1-1H25c-0.552,0-1,0.447-1,1S24.448,15.5,25,15.5z" />
      <Path d="M25,31.5h23c0.552,0,1-0.447,1-1s-0.448-1-1-1H25c-0.552,0-1,0.447-1,1S24.448,31.5,25,31.5z" />
      <Path d="M25,47.5h23c0.552,0,1-0.447,1-1s-0.448-1-1-1H25c-0.552,0-1,0.447-1,1S24.448,47.5,25,47.5z" />
      <Path d="M20,9.5H10v10h10V9.5z M18,17.5h-6v-6h6V17.5z" />
      <Path d="M20,25.5H10v10h10V25.5z M18,33.5h-6v-6h6V33.5z" />
      <Path d="M20,41.5H10v10h10V41.5z M18,49.5h-6v-6h6V49.5z" />
    </G>
  </Svg>
)
