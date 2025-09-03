import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Effector, EffectorRef } from './Effector';
import { ComponentInfo } from '../ComponentInfo';

let countClick = 0;

const phrases = [
  'Ты сделал отличную работу!',
  'Продолжай в том же духе!',
  'Ты очень талантлив!',
  'У тебя получится!',
  'Ты настоящий профессионал!',
  'Ты великолепен!',
  'Молодец, я горжусь тобой!',
  'Не переставай верить в себя!',
  'Ты очень целеустремленный!',
  'У тебя будущее безгранично!',
];

const Wrapper = () => {
  const effector = useRef<EffectorRef>();
  return (
    <ComponentInfo
      title="Эффектор"
      desc={`Это компонент Effector. Создает множество порталов, которые анимированно исчезают и размонтируются`}
    >
      <Effector ref={effector} />
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={(e) =>
            effector.current.show(<div style={{ userSelect: 'none' }}>{++countClick}</div>, {
              x: e.clientX,
              y: e.clientY,
            })
          }
        >
          Нажми на меня
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={(e) =>
            effector.current.show(<div style={{ userSelect: 'none' }}>🐱‍👓</div>, {
              x: e.clientX,
              y: e.clientY,
            })
          }
        >
          И на меня
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={(e) =>
            effector.current.show(<div style={{ userSelect: 'none' }}>{phrases[++countClick % phrases.length]}</div>, {
              x: e.clientX,
              y: e.clientY,
            })
          }
        >
          И на меня не забудь
        </button>
      </div>
    </ComponentInfo>
  );
};

const meta: Meta<typeof Effector> = {
  title: 'Components/Effector',
  component: Wrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {};
