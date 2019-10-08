import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { ButtonWrapper } from '../Button';

const dim = Dimensions.get('window');

const size = dim.width === 320 ? '35px' : '45px';

export const DayButton = styled(ButtonWrapper)`
  flex-grow: 0;
  padding: 0;

  min-height: ${size};
  min-width: ${size};
  max-height: ${size};
  max-width: ${size};

  border-radius: 10px;
`;
