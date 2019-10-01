import { Text } from 'react-native';
import styled from 'styled-components';
import { space, SpaceProps, textAlign, TextAlignProps } from 'styled-system';
import { colors } from '../../../constants/theme';

interface Alt extends SpaceProps, TextAlignProps {
  alt?: boolean;
}

export const BaseText = styled(Text)<Alt>`
  color: ${({ alt }) => (alt ? colors.white : colors.primaryText)};
  ${space};
  ${textAlign};
`;

export const SmallText = styled(BaseText)`
  font-size: 12px;
`;

export const MediumText = styled(BaseText)`
  font-size: 18px;
`;

export const LargeText = styled(BaseText)`
  font-size: 28px;
`;
