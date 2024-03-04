import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { ReactElement } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import InnerMap from './InnerMap';
import styled from 'styled-components';
import PointMarker from './PointMarker';
import { usePointsState } from '@/store/points';

const CustomMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
`;

const Map = (): ReactElement => {
  const points = usePointsState();

  return (
    <CustomMapContainer
      center={new LatLng(35.183372060122736, 137.11430385463038)}
      zoom={17}
      scrollWheelZoom
      doubleClickZoom={false}
    >
      <InnerMap />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <PointMarker key={p.id} point={p} />
      ))}
    </CustomMapContainer>
  );
};

export default Map;
