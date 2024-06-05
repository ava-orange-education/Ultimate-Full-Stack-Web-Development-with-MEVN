// Header.spec.ts
import { mount } from '@vue/test-utils';
import { computed, toRefs } from 'vue'
import Header from '../../../components/Header.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

describe('Header.vue', () => {
  // Create a helper function for mounting the Header with options
  const mountHeader = (options = {}) => {
    setActivePinia(createPinia());
    const router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
    return mount(Header, {
      global: {
        plugins: [router],
      },
      props: {
        title: 'Test Title',
      },
      ...options,
    });
  };

  it('displays the provided title', () => {
    const wrapper = mountHeader();
    expect(wrapper.text()).toContain('Test Title');
  });

  it('displays the profile name from the store', () => {
    // Mock your store logic here, this example assumes you have a functioning store
    // Since this is a test, you should mock the store's return values
    const wrapper = mountHeader();
    // This assumes your store's `getProfileName` computed property returns 'John Doe'
    expect(wrapper.text()).toContain('John Doe'); // Replace 'John Doe' with the expected name
  });

  it('navigates to home on logout click', async () => {
    const wrapper = mountHeader();
    await wrapper.find('.btn-outline-danger').trigger('click');
    // Since navigation can be asynchronous, ensure it's completed before making assertions
    await wrapper.vm.$nextTick();
    // Check if the router navigates to the expected path
    expect(wrapper.vm.$route.path).toBe('/'); // This assumes your router is configured correctly
  });
});
