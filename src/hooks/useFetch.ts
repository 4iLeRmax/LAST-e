import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const defaultOptions = { refetchOnWindowFocus: false };

export const useFetch = (cashName: string, api: string, options?: {}) => {
  return useQuery(
    [cashName],
    async () => await axios.get(api),
    options !== undefined ? { ...options, ...defaultOptions} : defaultOptions,
  );
};
