import * as React from 'react';
import { BaseText } from '../../atoms';
import { Tab, Wrapper } from './styled';

interface Props<T> {
  tabs: Array<{
    label: string;
    value: T;
    onSelected?: () => void;
    children: React.ReactNode;
  }>;
  onChange: (t: T) => void;
  activeTab: T;
}

export const Tabs = <T extends any>({ tabs, activeTab, onChange }: Props<T>) => {
  return (
    <>
      <Wrapper>
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            active={tab.value === activeTab}
            onPress={() => {
              tab.onSelected && tab.onSelected();
              onChange(tab.value);
            }}
          >
            <BaseText alt={tab.value === activeTab}>{tab.label}</BaseText>
          </Tab>
        ))}
      </Wrapper>
      {tabs.find(t => t.value === activeTab)!.children}
    </>
  );
};
