import { Fragment, ReactElement } from 'react';
import { useMapEvents } from 'react-leaflet';
import { usePointsMutators } from '@/store/points';

const InnerMap = (): ReactElement => {
  const { addPoint } = usePointsMutators();

  useMapEvents({
    contextmenu: (e) => {
      const { lat, lng } = e.latlng;
      addPoint(lat, lng);
    },
  });

  return <Fragment />;
};

export default InnerMap;
