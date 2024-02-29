import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Game from '@/views/Game.vue';
import sinon from 'sinon';

describe('Game.vue', () => {
  it('check increments points when a topo is clicked', async () => {
    const wrapper = mount(Game);
    const topo = wrapper.find('img');

    const incrementPointsStub = sinon.stub(wrapper.vm.$options.methods as any, 'incrementPoints');
    
    await topo.trigger('click');

    expect(incrementPointsStub.called).to.be.true; // Usamos to.be.true de Chai para realizar la aserción

    incrementPointsStub.restore();
  });
});
