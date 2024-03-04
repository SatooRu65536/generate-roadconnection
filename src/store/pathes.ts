import { getLocalStorage, setLocalStorage } from '@/foundation/localstorage';
import { Path } from '@/type';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilKeyHashSet } from './keys';

const pathesKey = 'pathes';
export const pathesState = atom<Path[]>({
  key: recoilKeyHashSet.pathes,
  default: getLocalStorage(pathesKey) ?? [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet((newPoints) => setLocalStorage(pathesKey, newPoints)),
  ],
});

export const usePathesState = () => {
  return useRecoilValue(pathesState);
};

export const usePathesMutators = () => {
  const setPathes = useSetRecoilState(pathesState);

  const addPath = (pointIds: [number, number]) => {
    setPathes((prev) => {
      const maxId = prev.reduce((acc, cur) => (acc > cur.id ? acc : cur.id), 0);
      const newPath: Path = {
        id: maxId + 1,
        pointIds,
      };
      return [...prev, newPath];
    });
  };

  const deletePath = (id: number) => {
    setPathes((prev) => {
      const newPoints = prev.filter((p) => p.id !== id);
      return newPoints;
    });
  };

  return { addPath, deletePath } as const;
};
