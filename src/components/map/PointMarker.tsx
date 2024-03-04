import { Marker, Popup } from 'react-leaflet';
import { Point } from '@/type';
import { LeafletEventHandlerFnMap, icon } from 'leaflet';
import triangle from '@/assets/triangle.svg';
import styled from 'styled-components';
import { usePointsMutators } from '@/store/points';
import { ChangeEvent } from 'react';

const PopupTitle = styled.h3`
  text-align: center;
`;

type PointMarkerProps = {
  point: Point;
};

const PointMarker = (props: PointMarkerProps) => {
  const { point } = props;
  const { dragPoint, editDesc } = usePointsMutators();

  const markerIcon = icon({
    iconUrl: triangle,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });

  const eventHandlers: LeafletEventHandlerFnMap = {
    dragend: (e) => {
      const latlng = e.target.getLatLng();
      dragPoint(point.id, latlng.lat, latlng.lng);
    },
  };

  const descHandle = (e: ChangeEvent<HTMLInputElement>) => {
    editDesc(point.id, e.target.value);
  };

  return (
    <>
      {point && (
        <Marker
          icon={markerIcon}
          position={[point.lat, point.lng]}
          eventHandlers={eventHandlers}
          draggable
        >
          <Popup>
            <PopupTitle>[{point.id}]</PopupTitle>
            <input
              type="text"
              placeholder="説明"
              value={point.desc}
              onChange={descHandle}
            />
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default PointMarker;
