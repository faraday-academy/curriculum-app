import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/home/Header.vue'

describe('home/Header.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Header, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
