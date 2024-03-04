import { Marker } from 'react-leaflet';
import { Point } from '@/type';

type PointMarkerProps = {
  point: Point;
};

const PointMarker = (props: PointMarkerProps) => {
  const { point } = props;

  return <>{point && <Marker position={[point.lat, point.lng]}></Marker>}</>;
};

export default PointMarker;
