import { ChangeEvent, useState } from 'react';
import { ISliderProps } from './slider.types';
import { StyledSlider } from './slider.styles';
import { Flex, Typography } from '@neo4j-ndl/react';

const Slider = ({ ...props }: ISliderProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setValue(val);
    props.onValueUpdate(val);
  };

  return (
    <Flex gap="5">
      <Flex flexDirection="row" justifyContent="space-between">
        <Typography variant="subheading-small" htmlFor={props.id} as="label">
          {props.label}
        </Typography>
        <Typography variant="subheading-small" className="n-text-baltic-50">
          {value}
        </Typography>
      </Flex>
      <StyledSlider
        type="range"
        id={props.id}
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        defaultValue={String(value)}
        onChange={handleChange}
      />
    </Flex>
  );
};

export default Slider;
