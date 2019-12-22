import * as React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { Icon, Props as IconProps } from '../Icon'

const Wrapper = styled(TouchableOpacity)<SpaceProps>`
  ${space}
`

interface Props extends IconProps, SpaceProps {
  onPress: () => void
}

export const ButtonIcon = ({ onPress, ...rest }: Props) => {
  const [animatedValue] = React.useState(new Animated.Value(0))

  function handleAnimationPressIn(): void {
    Animated.spring(animatedValue, {
      toValue: 1,
    }).start()
  }

  function handleAnimationPressOut(): void {
    Animated.spring(animatedValue, {
      toValue: 0,
    }).start()
  }

  const gridIconStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.93],
        }),
      },
    ],
    shadowOffset: {
      width: 0,
      height: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 6],
      }),
    },
  }

  return (
    <Animated.View style={gridIconStyle}>
      <Wrapper
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handleAnimationPressIn}
        onPressOut={handleAnimationPressOut}
        {...(rest as SpaceProps)}
      >
        <Icon {...(rest as IconProps)} />
      </Wrapper>
    </Animated.View>
  )
}
