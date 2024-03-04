import { usePointsState } from '@/store/points';
import { Path, Point } from '@/type';
import { LatLngExpression } from 'leaflet';
import { ReactElement } from 'react';
import { Polyline } from 'react-leaflet';

interface PathProps {
  path: Path;
}

const getPolyline = (path: Path, points: Point[]): LatLngExpression[] => {
  const coords = path.pointIds.map((id) => points.find((p) => p.id === id));
  if (!coords[0] || !coords[1]) return [];
  const polyline: LatLngExpression[] = [coords[0], coords[1]];
  return polyline;
};

const Route = (props: PathProps): ReactElement => {
  const { path } = props;
  const points = usePointsState();
  const polyline = getPolyline(path, points);

  return (
    <>
      <Polyline positions={polyline} />
    </>
  );
};

export default Route;
