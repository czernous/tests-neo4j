import styled, { CSSObject } from 'styled-components';
import { ISliderProps } from './slider.types';
import { tokens } from '@neo4j-ndl/base';

type IStyledSlider = Omit<ISliderProps, 'label' | 'onValueUpdate'> & Pick<HTMLInputElement, 'defaultValue'>;

const SliderSettings = {
  thumbSize: 14,
  trackSize: 3,
  thumbBg: tokens.theme.light.palette.primary.bg.strong,
  trackBg: tokens.theme.light.palette.primary.border.weak,
  progressBg: tokens.theme.light.palette.primary.bg.strong,
};

const calculatePercentage = (value: number, min: number, max: number) => ((value + min) / (max - min)) * 100;

export const StyledSlider = styled.input<IStyledSlider>(({ ...props }) => {
  const percentage = calculatePercentage(Number(props?.defaultValue), props.min, props.max);
  const thumbStyles: CSSObject = {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    '-ms-appearance': 'none',
    appearance: 'none',
    width: SliderSettings.thumbSize,
    height: SliderSettings.thumbSize,
    backgroundColor: SliderSettings.thumbBg,
    borderRadius: `${SliderSettings.thumbSize / 2}px`,
    border: 'none',
    marginTop: `${((SliderSettings.thumbSize - SliderSettings.trackSize) / 2) * -1}px`,
    cursor: 'pointer',
  };

  const trackStyles: CSSObject = {
    height: SliderSettings.trackSize,
    backgroundColor: SliderSettings.trackBg,
    borderRadius: SliderSettings.trackSize / 2,
  };

  const progressStyles: CSSObject = {
    height: SliderSettings.trackSize,
    backgroundColor: SliderSettings.progressBg,
    borderRadius: `${SliderSettings.trackSize / 2}px 0 0 ${SliderSettings.trackSize / 2}px`,
  };

  return {
    '-webkit-appearance': 'none',
    ' -moz-appearance': 'none',
    appearance: 'none',
    height: SliderSettings.thumbSize,
    margin: 0,
    padding: 0,

    '&::-webkit-slider-thumb': thumbStyles,
    '&::-moz-range-thumb': thumbStyles,
    '&::-ms-thumb': thumbStyles,

    '&::-webkit-slider-runnable-track': {
      height: SliderSettings.trackSize,
      backgroundImage: `linear-gradient(
          90deg,
          ${SliderSettings.progressBg} ${percentage}%,
          ${SliderSettings.trackBg} ${percentage}%
        )`,
      borderRadius: `${SliderSettings.trackSize}px`,
    },
    '&::-moz-range-track': trackStyles,
    '&:: -ms - track': trackStyles,

    '&::-moz-range-progress': progressStyles,
    '&::-ms-fill-lower': progressStyles,
    '&:focus': {
      outline: 'none',
    },
  };
});

export const StyledSliderWrapper = styled.div({
  display: 'flex',
});
