// CreateTask.spec.ts
import { mount } from '@vue/test-utils';
import CreateTask from '../../../components/CreateTask.vue';

describe('CreateTask.vue', () => {
  // Test to ensure the component renders the button with the correct name from props
  it('displays the button with the correct text from props', () => {
    const btnName = 'Create New Task';
    const wrapper = mount(CreateTask, {
      props: { btnName }
    });
    expect(wrapper.text()).toContain(btnName);
  });

  // Test to ensure the custom event "createTask" is emitted when the button is clicked
  it('emits the "createTask" event when the button is clicked', async () => {
    const wrapper = mount(CreateTask, {
      props: { btnName: 'Create New Task' }
    });
    await wrapper.find('.btn-pink').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('createTask');
    expect(wrapper.emitted().createTask.length).toBe(1);
  });
});
