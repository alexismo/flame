import * as React from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { Box } from '../Core';
import { BaseLabel, LabelProps, FormHelper } from '../FormField/FormField';

const RadioLabel: React.FC<LabelProps> = ({ description, disabled, children, ...restProps }) => {
  return (
    <Box>
      <BaseLabel color={disabled ? 'disabled' : undefined} {...restProps}>
        {children}
      </BaseLabel>
      {description && <FormHelper ml="1.75rem">{description}</FormHelper>}
    </Box>
  );
};

const WrapperRadio = styled('div')`
  position: relative;
  line-height: 1rem;
`;

const Checkmark = styled('div')`
  position: relative;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  border-radius: ${themeGet('radii.radius-circle')};
  background-color: transparent;
  border: solid 1px ${themeGet('radioStyles.border')};
  box-sizing: border-box;
  overflow: hidden;
  background: ${themeGet('radioStyles.background')};
  margin-right: ${themeGet('space.2')};
`;

const Centermark = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${themeGet('space.1')};
  height: ${themeGet('space.1')};
  border-radius: ${themeGet('radii.radius-circle')};
  background: ${themeGet('radioStyles.background')};
`;

const RadioInput = styled('input')`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0;
  left: 0;
  opacity: 0;
  padding: 0;
  margin: 0;
  z-index: 1;

  &:checked + ${Checkmark} {
    background: ${themeGet('radioStyles.checked.background')};
    border-color: ${themeGet('radioStyles.checked.border')};
  }

  &:not(:checked) + ${Checkmark} > ${Centermark} {
    display: none;
  }

  &:focus + ${Checkmark} {
    box-shadow: ${themeGet('radioStyles.focus.boxShadow')};
  }

  &[disabled] + ${Checkmark} {
    opacity: 0.5;
    box-shadow: none;
  }
`;

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  css?: any;
}
const BaseRadio = React.forwardRef<HTMLInputElement, RadioProps>(({ ...restProps }, ref) => (
  <WrapperRadio>
    <RadioInput ref={ref} type="radio" {...restProps} />
    <Checkmark>
      <Centermark data-testid="radio-centermark" />
    </Checkmark>
  </WrapperRadio>
));

interface FormRadioProps extends RadioProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  css?: any;
}
const Radio = React.forwardRef<HTMLInputElement, FormRadioProps>(
  ({ label, id, description, disabled, ...restProps }, ref) => {
    return (
      <React.Fragment>
        <RadioLabel htmlFor={id} disabled={disabled} description={description}>
          <BaseRadio ref={ref} id={id} disabled={disabled} {...restProps} />
          {label}
        </RadioLabel>
      </React.Fragment>
    );
  },
);

export { BaseRadio, RadioLabel, Radio };
