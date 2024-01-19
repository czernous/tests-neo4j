export interface ISliderProps {
  min: number;
  max: number;
  label: string;
  name: string;
  id: string;
  step?: number;
  onValueUpdate: (value: number) => void;
}
