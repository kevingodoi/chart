export interface ChartSettings {
  width: number;
  height: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}
export interface CombinedDimensions {
  boundedHeight: number;
  boundedWidth: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  width: number;
  height: number;
}
export interface DataPoint {
  name: string;
  color: string;
  category: string;
  x: number;
  y: number;
}
