import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { Point } from '@/type';
import { recoilKeyHashSet } from './keys';
import { localStorageKeyHashSet } from '@/foundation/keys';
import { getLocalStorage, setLocalStorage } from '@/foundation/localstorage';

const pointsKey = localStorageKeyHashSet.point;
const pointsState = atom<Point[]>({
  key: recoilKeyHashSet.points,
  default: getLocalStorage(pointsKey) || [],
  effects_UNSTABLE: [
    ({ onSet }) => onSet((newPoints) => setLocalStorage(pointsKey, newPoints)),
  ],
});

export const usePointsState = () => {
  return useRecoilValue(pointsState);
};

export const usePointsMutators = () => {
  const setPoints = useSetRecoilState(pointsState);

  const addPoint = (lat: number, lng: number) => {
    setPoints((prev) => {
      const maxId = prev.reduce(
        (acc, cur) => (acc > cur.id ? acc : cur.id),
        100
      );
      const newPoint: Point = {
        id: maxId + 1,
        lat,
        lng,
        desc: '',
      };
      return [...prev, newPoint];
    });
  };

  const dragPoint = (id: number, lat: number, lng: number) => {
    setPoints((prev) => {
      const newPoints = prev.map((p) => {
        if (p.id === id) return { ...p, lat, lng };
        return p;
      });
      return newPoints;
    });
  };

  const editDesc = (id: number, desc: string) => {
    setPoints((prev) => {
      const newPoints = prev.map((p) => {
        if (p.id === id) return { ...p, desc };
        return p;
      });
      return newPoints;
    });
  };

  const deletePoint = (id: number) => {
    setPoints((prev) => {
      const newPoints = prev.filter((p) => p.id !== id);
      return newPoints;
    });
  };

  return { addPoint, dragPoint, editDesc, deletePoint } as const;
};
