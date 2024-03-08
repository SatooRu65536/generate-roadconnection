import { usePathesMutators } from '@/store/pathes';
import { usePointsState } from '@/store/points';
import { Path, Point } from '@/type';
import { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
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
  const { deletePath } = usePathesMutators();
  const points = usePointsState();
  const polyline = getPolyline(path, points);

  const eventHandlers: LeafletEventHandlerFnMap = {
    click: () => deletePath(path.id),
  };

  return (
    <>
      <Polyline eventHandlers={eventHandlers} positions={polyline} />
    </>
  );
};

export default Route;
