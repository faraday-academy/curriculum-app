import { mount } from '@vue/test-utils'
import Header from '@/components/home/Header.vue'

describe('home/Header.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Header)
    expect(wrapper).toMatchSnapshot()
  })
})
