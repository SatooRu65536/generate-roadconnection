export interface Point {
  id: number;
  lat: number;
  lng: number;
  desc: string;
}

export type SelectPoint = [number, number];

export interface Path {
  id: number;
  pointIds: SelectPoint;
}
