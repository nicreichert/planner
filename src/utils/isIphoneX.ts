import { Dimensions, Platform, ScaledSize } from 'react-native'

function isIPhoneXSize(dim: ScaledSize) {
  return dim.height === 812 || dim.width === 812
}

function isIPhoneXrSize(dim: ScaledSize) {
  return dim.height === 896 || dim.width === 896
}

export function isIphoneX() {
  const dim = Dimensions.get('window')

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}
