import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const ScreenWrapper = styled(ScrollView)<SpaceProps>`
  padding: 20px;
  flex: 1;
  ${space};
`;
