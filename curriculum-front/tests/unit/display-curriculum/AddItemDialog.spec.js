import { mount } from '@vue/test-utils'
import AddItemDialog from '@/components/display-curriculum/AddItemDialog.vue'

describe('AddItemDialog.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(AddItemDialog, {
      stubs: {
        VDialog: {
          template: '<div></div>'
        }
      },
      propsData: {
        saveItem: () => {},
        toggleDialog: () => {},
        sectionIndex: 0,
        dialog: {
          type: '',
          show: false,
          name: '',
          url: '',
          isEditing: false,
          itemIndex: null,
          sectionIndex: null
        }
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
