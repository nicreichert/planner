import asyncStorage from '@react-native-community/async-storage';
import { Group } from '../../types';

const DATA_KEY = '__GROUPS__';

export const loadGroups = async () => {
  const data = await asyncStorage.getItem(DATA_KEY);

  return JSON.parse(data || '') as Array<Group>;
};

export const setGroupsData = (data: Array<Group>) => {
  asyncStorage.setItem(DATA_KEY, JSON.stringify(data));
};

export const addGroup = async (group: Group) => {
  const data = await loadGroups();
  data.push(group);
  asyncStorage.setItem(DATA_KEY, JSON.stringify(data));
};
