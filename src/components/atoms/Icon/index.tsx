import * as React from 'react'
import * as Icons from './components'
import { BaseProps, IconType } from './types'

export { IconType } from './types'

type IconKeys = keyof typeof Icons

export interface Props extends BaseProps {
  type: IconType
}

export const Icon = ({ type, ...rest }: Props) => {
  const Component = Icons[type as IconKeys]
  return <Component {...rest} />
}
