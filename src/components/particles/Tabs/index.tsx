import * as React from 'react'
import { BaseText } from '~planner/components'
import { Tab, Wrapper } from './styled'

interface Props<T> {
  tabs: {
    label: string;
    value: T;
    onSelected?: () => void;
    children: React.ReactNode;
  }[];
  onChange: (t: T) => void;
  activeTab: T;
}

export const Tabs = <T extends any>({ tabs, activeTab, onChange }: Props<T>) => {
  const currentTab = tabs.find(t => t.value === activeTab)
  return (
    <>
      <Wrapper>
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            active={tab.value === activeTab}
            onPress={() => {
              tab.onSelected && tab.onSelected()
              onChange(tab.value)
            }}
          >
            <BaseText alt={tab.value === activeTab}>{tab.label}</BaseText>
          </Tab>
        ))}
      </Wrapper>
      {currentTab && currentTab.children}
    </>
  )
}
