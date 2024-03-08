import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilKeyHashSet } from './keys';

export const defaultDescState = atom<string>({
  key: recoilKeyHashSet.defaultDesc,
  default: '',
});

export const useDefaultDescState = () => {
  return useRecoilValue(defaultDescState);
};

export const useDefaultDescMutators = () => {
  return useSetRecoilState(defaultDescState);
};
