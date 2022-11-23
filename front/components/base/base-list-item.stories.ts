import BaseListItem from './base-list-item.vue';
import BaseCheckbox from '../base/base-checkbox.vue';

import { Story, Meta } from '@storybook/vue3';

export default {
  title: 'Base/ListItem',
  component: BaseListItem,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { BaseListItem, BaseCheckbox },
  setup() {
    return { args };
  },
  template: '<BaseListItem v-bind="args">item</BaseListItem>',
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  color: 'red',
  backgroundColor: '#00ffff80',
};
