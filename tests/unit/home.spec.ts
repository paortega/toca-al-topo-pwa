import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import sinon from 'sinon'; // Importamos sinon

describe('Home.vue', () => {
  let mockRouter: any; // Definimos explícitamente el tipo de mockRouter

  beforeEach(() => {
    mockRouter = {
      push: sinon.spy() // Usamos sinon para crear un mock de router.push
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
    
    sinon.assert.calledWith(mockRouter.push, { name: 'game', params: { username: 'Test User' }}); // Usamos sinon para verificar el llamado a router.push
  });
});
