import type { Meta, StoryObj } from '@storybook/react';

import { Collapse, CollapseProps } from './Collapse';
import { ComponentInfo } from '../ComponentInfo';
import React from 'react';

const Wrapper = (props: CollapseProps) => (
  <ComponentInfo title="Collapse" desc={`Компонент использует useLayoutEffect и onTransitionEnd.`}>
    <Collapse {...props} />
  </ComponentInfo>
);

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Wrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    opened: true,
    children: `Это компонент Collapse. Он принимает только opened и children. Когда opened: true, дочерние компоненты
     сначала монтируются, а потом плавно появляются. В обратном случае наоборот, после скрытия дочерних компонентов,
      они размонтируются.`,
  },
};
