import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ButtonMute from '../../../components/atoms/ButtonMute.vue'

// Mock the useSounds composable
const toggleMuteMock = vi.fn();

vi.mock('@/composables/useSounds', () => ({
  useSounds: () => ({
    toggleMute: toggleMuteMock,
  }),
}));

describe('ButtonMute.vue', () => {
  beforeEach(() => {
    toggleMuteMock.mockClear();
  });

  it('renders with initial content', () => {
    const wrapper = mount(ButtonMute);
    expect(wrapper.text()).toBe('🔊 Mute');
  });

  it('toggles content and calls toggleMute when clicked', async () => {
    const wrapper = mount(ButtonMute);

    // First click
    await wrapper.find('button').trigger('click');
    expect(toggleMuteMock).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toBe('🔇 Unmute');

    // Second click
    await wrapper.find('button').trigger('click');
    expect(toggleMuteMock).toHaveBeenCalledTimes(2);
    expect(wrapper.text()).toBe('🔊 Mute');
  });

  it('renders slot content if provided', () => {
    const wrapper = mount(ButtonMute, {
      slots: {
        default: 'Custom Slot Content',
      },
    });
    expect(wrapper.text()).toBe('Custom Slot Content');
  });
});
