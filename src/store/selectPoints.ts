import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilKeyHashSet } from './keys';
import { SelectPoint } from '@/type';
import { usePathesMutators } from './pathes';

const selectPointIds = atom<SelectPoint>({
  key: recoilKeyHashSet.selectPointIds,
  default: [0, 0],
});

export const useSelectPointsIdsState = () => {
  return useRecoilValue(selectPointIds);
};

export const useSelectPointsIdsMutators = () => {
  const setSelectPointIds = useSetRecoilState(selectPointIds);
  const selects = useSelectPointsIdsState();
  const { addPath } = usePathesMutators();

  const selectPoint = (id: number) => {
    const clonedIds = structuredClone(selects);
    clonedIds.push(id);
    if (clonedIds.length >= 2) clonedIds.shift();
    setSelectPointIds(clonedIds);
    addPath(clonedIds);
  };

  const unselectPoint = (id: number) => {
    setSelectPointIds((prev) => {
      const clonedIds = structuredClone(prev);
      const index = clonedIds.indexOf(id);
      if (index !== -1) clonedIds.splice(index, 1);
      return clonedIds;
    });
  };

  return { selectPoint, unselectPoint } as const;
};
