import React, { useCallback } from 'react';
import { Plugins } from '@capacitor/core';
import apiInstance from '../core/apiInstance';
import { Tea } from '../shared/models';

const images: Array<string> = [
  'green',
  'black',
  'herbal',
  'oolong',
  'dark',
  'puer',
  'white',
  'yellow',
];

export const useTea = () => {
  const getTeas = useCallback(async (): Promise<Array<Tea>> => {
    const url = '/tea-categories';
    const { data } = await apiInstance.get(url);

    return await Promise.all(
      data.map(async (item: any) => await fromJsonToTea(item)),
    );
  }, []);

  const getTeaById = useCallback(async (id: number): Promise<
    Tea | undefined
  > => {
    const url = `/tea-categories/${id}`;
    const { data } = await apiInstance.get(url);
    return await fromJsonToTea(data);
  }, []);

  const saveTea = async (tea: Tea): Promise<void> => {
    const { Storage } = Plugins;
    return Storage.set({
      key: `rating${tea.id}`,
      value: tea.rating?.toString() || '0',
    });
  };

  const fromJsonToTea = async (obj: any): Promise<Tea> => {
    const { Storage } = Plugins;
    const rating = await Storage.get({ key: `rating${obj.id}` });
    return {
      ...obj,
      image: require(`../assets/images/${images[obj.id - 1]}.jpg`).default,
      rating: parseInt(rating?.value || '0', 10),
    };
  };

  return { getTeas, getTeaById, saveTea };
};
