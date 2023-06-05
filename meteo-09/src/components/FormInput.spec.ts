import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormInput from './FormInput.vue';
import { computed, defineComponent, ref } from 'vue';

describe('FormInput', () => {
  it('tests validation', async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
        <FormInput
          name="test"
          v-model="formValue"
          :status="status"
        />
      `,
      setup () {
        const formValue = ref('test')
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            }
          } else {
            return {
              valid: false,
              message: 'error'
            }
          }
        })
        return {
          formValue,
          status
        }
      }
    })
    const wrapper = mount(Parent)
    expect(wrapper.find('.is-danger').text()).toBe('error')

    await wrapper.find('input').setValue('testtest')
    expect(wrapper.find('.is-danger').exists()).toBe(false)
  });

  it('renders some error', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'test',
        modelValue: 'test',
        status: {
          valid: false,
          message: 'error'
        },
      }
    })

    expect (wrapper.find('.is-danger').exists()).toBe(true)
  });
});

describe('FormInput', () => {
  it('renders no error', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'test',
        modelValue: 'test',
        status: {
          valid: true,
          message: ''
        },
      }
    })

    expect (wrapper.find('.is-danger').exists()).toBe(false)
  });
});
