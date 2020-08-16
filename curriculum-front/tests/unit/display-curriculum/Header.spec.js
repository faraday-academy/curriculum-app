import { mount, shallowMount } from '@vue/test-utils'
import Header from '@/components/display-curriculum/Header.vue'

describe('display-curriculum/Header.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Header, {
      propsData: {
        editField: '', // name, goal, or description
        selectedCurriculum: { name: 'Learn Vue.js' },
        toggleEdit: () => {},
        saveEdit: () => {},
        cancelEdit: () => {}
      }
    })
    expect(wrapper).toMatchSnapshot()
  })

  test('that title edit mode can display properly', () => {
    const wrapper = shallowMount(Header, {
      propsData: {
        editField: 'name',
        selectedCurriculum: { name: 'Learn Vue.js' },
        toggleEdit: () => {},
        saveEdit: () => {},
        cancelEdit: () => {}
      }
    })

    const input = wrapper.find('[data-test="name-edit-field"]')
    expect(input.exists()).toBe(true)
  })
})
