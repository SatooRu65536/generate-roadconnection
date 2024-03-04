import { usePathesState } from '@/store/pathes';
import { usePointsState } from '@/store/points';
import { Path, Point } from '@/type';
import { ReactElement } from 'react';
import styled from 'styled-components';

const ExportButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const getRoutesCsv = (path: Path, points: Point[]): string | undefined => {
  const point = path.pointIds.map((id) => points.find((p) => p.id === id));
  if (!point[0] || !point[1]) return '';
  const distance =
    Math.sqrt(
      (point[0].lat - point[1].lat) ** 2 + (point[0].lng - point[1].lng) ** 2
    ) * 10000;
  return `${point[0].id},${point[1].id},${distance}\n`;
};

const getPointsCsv = (points: Point[]): string => {
  return points.map((p) => `${p.id},${p.lat},${p.lng}\n`).join('');
};

const Export = (): ReactElement => {
  const pathes = usePathesState();
  const points = usePointsState();

  const handleClick = () => {
    const routesCsv = pathes.map((p) => getRoutesCsv(p, points)).join('');
    const pointsCsv = getPointsCsv(points);
    download(routesCsv, 'routes.csv');
    download(pointsCsv, 'points.csv');
  };

  const download = (csvText: string, filename: string) => {
    const blob = new Blob([csvText], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  return <ExportButton onClick={handleClick}>Export</ExportButton>;
};

export default Export;
