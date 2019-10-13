import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components';
import { colors } from '~planner/constants';
import { Icon, IconType } from '../Icon';
import { LargeText } from '../Typography';

export const ScreenWrapper = styled(ScrollView)`
  padding: 20px;
  padding-bottom: -20px;
`;

const Wrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 0;
  max-height: 50px;
`;

interface Props {
  title?: string;
}

export const ModalWrapper: React.FC<Props> = ({ children, title }) => {
  const { goBack } = useNavigation();

  return (
    <>
      <Wrapper>
        {title && <LargeText>{title}</LargeText>}
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => goBack()}>
          <Icon type={IconType.CLOSE} size={30} color={colors.primary} />
        </TouchableOpacity>
      </Wrapper>
      {children}
    </>
  );
};
