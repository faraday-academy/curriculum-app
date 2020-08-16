import { mount } from '@vue/test-utils'
import Sections from '@/components/display-curriculum/Sections.vue'

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren
  }
})

describe('Sections.vue', () => {
  test('if snapshot is correct', () => {
    const wrapper = mount(Sections, {
      stubs: {
        transition: transitionStub(),
        AddItemDialog: {
          template: '<div></div>'
        },
        ThemeProvider: {
          template: '<div></div>'
        },
        VDialog: {
          template: '<div></div>'
        }
      },
      propsData: {
        dialog: {
          type: '',
          show: false,
          name: '',
          url: '',
          isEditing: false,
          itemIndex: null,
          sectionIndex: null
        },
        selectedCurriculum: {
          sections: [
            {
              name: 'section 1',
              projects: [
                {
                  name: 'Project 1'
                }
              ],
              resources: [
                {
                  name: 'Resource 1'
                }
              ]
            },
            {
              name: 'section 2',
              projects: [
                {
                  name: 'Project 2'
                }
              ],
              resources: [
                {
                  name: 'Resource 2'
                }
              ]
            }
          ]
        },
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
