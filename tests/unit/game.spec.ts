import { mount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Game.vue', () => {
  it('check start game when the button is clicked', async () => {
    const wrapper = mount(Game);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.vm.gameStarted).toBe(true);
  });

  it('check stop button', async () => {
    const wrapper = mount(Game);
    const button = wrapper.find('button');
    await button.trigger('click');
    await button.trigger('click');
    expect(wrapper.vm.gameStarted).toBe(false);
  });

  it('check increments points when a topo is clicked', async () => {
    const wrapper = mount(Game);
    const button = wrapper.find('button');
    await button.trigger('click');
    const topo = wrapper.find('img');
    await topo.trigger('click');
    expect(wrapper.vm.points).toBeGreaterThan(0);
  });
});
