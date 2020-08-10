import { shallowMount } from '@vue/test-utils'
import Header from '@/components/display-curriculum/Header.vue'

describe('Header.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = shallowMount(Header, {
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

    // TODO: find by a test id instead of class here
    // const input = wrapper.find('.name-edit-field')
    const input = wrapper.find('[data-test="name-edit-field"]')
    expect(input.exists()).toBe(true)
  })
})
