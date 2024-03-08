import { Marker, Popup } from 'react-leaflet';
import { Point } from '@/type';
import { LeafletEventHandlerFnMap, icon } from 'leaflet';
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

function triangle(fill: string, stroke: string) {
  const svg = `
    <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M34.4545 0.500004L18 29L1.54552 0.500001L34.4545 0.500004Z"
          fill="${fill}"
          stroke="${stroke}"
      />
    </svg>
  `;
  return `data:image/svg+xml,${svg}`;
}

function getMarkerImage(isSelect: boolean, desc: string) {
  if (isSelect) return triangle('black', 'yellow');
  if (desc === 'facility') return triangle('royalblue', 'yellow');
  if (desc.includes('entrance')) return triangle('green', 'yellow');
  return triangle('yellow', 'black');
}

const PointMarker = (props: PointMarkerProps) => {
  const { point, isSelect } = props;
  const { dragPoint, editDesc, deletePoint } = usePointsMutators();
  const { selectPoint } = useSelectPointsIdsMutators();

  const markerIcon = icon({
    iconUrl: getMarkerImage(isSelect, point.desc),
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
