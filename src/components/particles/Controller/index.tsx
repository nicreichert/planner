import { Header, Icon, IconType } from '@planner/components';
import { colors } from '@planner/constants';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const Controller: React.FC<Props> = ({ children, onPressLeft, onPressRight }) => (
  <Header>
    <TouchableOpacity onPress={onPressLeft}>
      <View style={{ transform: [{ rotateZ: '180deg' }] }}>
        <Icon type={IconType.ARROW} size={20} color={colors.primaryText} />
      </View>
    </TouchableOpacity>
    {children}
    <TouchableOpacity onPress={onPressRight}>
      <Icon type={IconType.ARROW} size={20} color={colors.primaryText} />
    </TouchableOpacity>
  </Header>
);
