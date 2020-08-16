import { mount } from '@vue/test-utils'
import SecondSection from '@/components/home/SecondSection.vue'

describe('SecondSection.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(SecondSection)
    expect(wrapper).toMatchSnapshot()
  })
})
