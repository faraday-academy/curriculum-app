import { mount } from '@vue/test-utils'
import Footer from '@/components/home/Footer.vue'

describe('Footer.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Footer)
    expect(wrapper).toMatchSnapshot()
  })
})
