import BaseCheckbox from './base-checkbox.vue';
import { Story, Meta } from '@storybook/vue3';

export default {
  title: 'Base/BaseCheckbox',
  component: BaseCheckbox,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { BaseCheckbox },
  setup() {
    return { args };
  },
  template: '<BaseCheckbox v-bind="args">チェックボックス</BaseCheckbox>',
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true,
};

export const Large = Template.bind({});
Large.args = {
  modelValue: true,
  large: true,
};

export const Small = Template.bind({});
Small.args = {
  modelValue: true,
  small: true,
};

export const NoChecked = Template.bind({});
NoChecked.args = {
  modelValue: false,
};
