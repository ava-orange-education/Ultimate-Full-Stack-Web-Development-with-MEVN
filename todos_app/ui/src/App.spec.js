import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';

describe('MyComponent', () => {
  it('emits custom event when button is clicked', async () => {
    const wrapper = mount(MyComponent);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('customEvent')).toBeTruthy();
  });
});