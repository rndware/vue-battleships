import type { Meta, StoryObj } from '@storybook/vue3'
import InputSection from '@/components/organisms/InputSection.vue'

const meta: Meta<typeof InputSection> = {
  title: 'Components/Organisms/InputSection',
  component: InputSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `InputSection` component combines a coordinate input with action buttons for firing and muting. It manages its own `v-model` binding for coordinate values, supports disabling firing, and emits a `submit` event when input is confirmed.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description:
        'The current coordinate input value. Synced via `v-model`.',
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Disables firing when `true`. Input still accepts text but firing is blocked.',
    },
    placeholder: {
      control: { type: 'text' },
      description:
        'Placeholder text shown inside the coordinate input when empty.',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description:
        'Emitted when the input value changes via typing.',
    },
    onSubmit: {
      action: 'submit',
      description:
        'Emitted when the user confirms input (enter key or fire button).',
    },
  },
}

export default meta
type Story = StoryObj<typeof InputSection>

export const Default: Story = {
  args: {
    modelValue: '',
    disabled: false,
    placeholder: 'Enter coordinate…',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'B5',
    disabled: false,
    placeholder: 'Enter coordinate…',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'C7',
    disabled: true,
    placeholder: 'Enter coordinate…',
  },
}
