import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import sinon from 'sinon';

describe('Home.vue', () => {
  let mockRouter: any;
  beforeEach(() => {
    mockRouter = {
      push: sinon.spy()
    };
  });

  it('check username and change Game router', async () => {
    const wrapper = mount(Home, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    const button = wrapper.find('button');
    
    await wrapper.find('input[type="text"]').setValue('Test User');
    await button.trigger('click');
    sinon.assert.calledWith(mockRouter.push, { name: 'game', params: { username: 'Test User' }});
  });
});
