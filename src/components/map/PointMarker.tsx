import { Marker, Popup } from 'react-leaflet';
import { Point } from '@/type';
import { LeafletEventHandlerFnMap, icon } from 'leaflet';
import triangle from '@/assets/triangle.svg';
import triangleSelecte from '@/assets/triangleSelect.svg';
import styled from 'styled-components';
import { usePointsMutators } from '@/store/points';
import { ChangeEvent } from 'react';
import { useSelectPointsIdsMutators } from '@/store/selectPoints';

const PopupTitle = styled.h3`
  text-align: center;
`;

const DeleteButton = styled.button``;

type PointMarkerProps = {
  point: Point;
  isSelect: boolean;
};

const PointMarker = (props: PointMarkerProps) => {
  const { point } = props;
  const { dragPoint, editDesc, deletePoint } = usePointsMutators();
  const { selectPoint } = useSelectPointsIdsMutators();

  const markerIcon = icon({
    iconUrl: point.desc ? triangleSelecte : triangle,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });

  const eventHandlers: LeafletEventHandlerFnMap = {
    dragend: (e) => {
      const latlng = e.target.getLatLng();
      dragPoint(point.id, latlng.lat, latlng.lng);
    },
    contextmenu: () => {
      selectPoint(point.id);
    },
  };

  const deletehandle = () => {
    const isDelete = window.confirm('削除しますか？');
    if (isDelete) deletePoint(point.id);
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
            <DeleteButton onClick={deletehandle}>削除</DeleteButton>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default PointMarker;
