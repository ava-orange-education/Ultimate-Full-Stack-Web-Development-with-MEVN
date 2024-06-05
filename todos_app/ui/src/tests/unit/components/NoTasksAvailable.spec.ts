// NoTasksAvailable.spec.js
import { mount } from '@vue/test-utils';
import NoTasksAvailable from '../../../components/NoTasksAvailable.vue';

describe('NoTasksAvailable.vue', () => {
  // Test to ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = mount(NoTasksAvailable);
    expect(wrapper.text()).toContain("No Tasks Available");
  });

});
