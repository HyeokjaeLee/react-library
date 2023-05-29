import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '..';
import { useSubscribedState } from '../../../hooks';

import type { InputProps, InputContainerProps, InputWrapProps } from '.';

type MetaProps = InputProps &
  Pick<InputWrapProps, 'size' | 'theme'> &
  Pick<InputContainerProps, 'validationMessage'>;

const GROUPS = {
  INPUT: {
    table: {
      category: 'Input',
    },
  },
  CONTAINER: {
    table: {
      category: 'Input.Container',
    },
  },
  WRAP: {
    table: {
      category: 'Input.Wrap',
    },
  },
};

const HIDDEN = {
  table: {
    disable: true,
  },
};

export default {
  title: 'atoms/Input',
  component: Input,
  args: {
    placeholder: 'placeholder',
    validationMessage: '',
  },
  argTypes: {
    //* Input.Container
    ref: HIDDEN,
    onChange: HIDDEN,
    validationMessage: {
      ...GROUPS.CONTAINER,
    },

    //* Input.Wrap
    size: {
      ...GROUPS.WRAP,
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    theme: {
      ...GROUPS.WRAP,
      control: {
        type: 'radio',
      },
      options: ['light', 'dark'],
      defaultValue: 'light',
    },

    //* Input
    placeholder: {
      ...GROUPS.INPUT,
      control: 'text',
      description: 'placeholder',
    },
    type: {
      ...GROUPS.INPUT,
      control: 'select',
    },
    value: {
      ...GROUPS.INPUT,
      control: 'text',
    },
    disabled: {
      ...GROUPS.INPUT,
      options: ['readonly', true, false],
      control: {
        type: 'radio',
      },
    },
  },
} satisfies Meta<MetaProps>;

type Story = StoryObj<MetaProps>;

export const Default: Story = {
  render: ({
    //* Input.Container
    validationMessage,
    //* Input.Wrap
    size,
    theme,
    //* Input
    value,
    onChange,
    ...args
  }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputValue, setInputValue] = useSubscribedState(value);
    return (
      <Input.Container validationMessage={validationMessage}>
        <Input.Wrap size={size} theme={theme}>
          <Input
            {...args}
            value={inputValue}
            onChange={(value) => {
              setInputValue(value);
              onChange?.(value);
            }}
          />
        </Input.Wrap>
      </Input.Container>
    );
  },
};
