import * as React from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { Flex, border, FlameFlexProps, BorderProps } from '../Core';

export interface InputGroupAddonProps extends FlameFlexProps, BorderProps {}
const InputGroupAddon = styled(Flex)<InputGroupAddonProps>`
  padding: ${themeGet('space.1')} ${themeGet('space.2')};
  text-align: center;
  background-color: ${themeGet('groupStyles.addon.background')};
  border: solid 1px ${themeGet('groupStyles.addon.borderColor')};
  border-radius: ${themeGet('radii.radius-1')};
  align-items: center;
  ${border};
`;

const InputGroup: React.FC = ({ children, ...restProps }) => {
  const nextChildren = React.Children.map(children, (child: any, index) => {
    if (index === 0) {
      return React.cloneElement(child, {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      });
    }

    if (index === React.Children.count(children) - 1 && React.Children.count(children) === 2) {
      return React.cloneElement(child, {
        borderLeft: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      });
    }

    if (index === React.Children.count(children) - 1) {
      return React.cloneElement(child, {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      });
    }

    return React.cloneElement(child, {
      borderLeft: 0,
      borderRight: 0,
      borderRadius: 0,
    });
  });

  return <Flex {...restProps}>{nextChildren}</Flex>;
};

export interface SpacedGroupProps extends FlameFlexProps {}
const SpacedGroup: React.FC<SpacedGroupProps> = ({ flexDirection, children, ...restProps }) => {
  const nextChildren = React.Children.map(children, (child: any, index) => {
    if (flexDirection && flexDirection === 'column') {
      return <Flex mt={index !== 0 ? 1 : undefined}>{child}</Flex>;
    }

    if (flexDirection && flexDirection === 'column-reverse') {
      return <Flex mb={index !== 0 ? 1 : undefined}>{child}</Flex>;
    }

    return <Flex ml={index !== 0 ? 1 : undefined}>{child}</Flex>;
  });

  return (
    <Flex flexDirection={flexDirection} {...restProps}>
      {nextChildren}
    </Flex>
  );
};

const BeThereOrBeSquare = InputGroup;

export { SpacedGroup, InputGroup, InputGroupAddon, BeThereOrBeSquare };
