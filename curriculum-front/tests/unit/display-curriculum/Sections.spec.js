import { mount } from '@vue/test-utils'
import Sections from '@/components/display-curriculum/Sections.vue'

describe('Sections.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Sections, {
      propsData: {
        stubs: {
          AddItemDialog: {
            template: '<div></div>'
          }
        },
        dialog: {
          type: '',
          show: false,
          name: '',
          url: '',
          isEditing: false,
          itemIndex: null,
          sectionIndex: null
        },
        selectedCurriculum: {},
        toggleComplete: () => {},
        toggleDialog: () => {},
        saveItem: () => {},
        editItem: () => {},
        removeItem: () => {}
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
