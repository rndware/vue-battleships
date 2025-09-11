import type { Meta, StoryObj } from '@storybook/vue3'
import InfoLabel from '@/components/atoms/InfoLabel.vue'

const meta: Meta<typeof InfoLabel> = {
  title: 'Components/InfoLabel',
  component: InfoLabel,
  parameters: {
    docs: {
      description: {
        component: 'A styled label component for displaying information text. Provides consistent styling with smaller font size, gray color, and bottom margin. Uses slot for flexible content.'
      }
    }
  },
  argTypes: {
    default: {
      control: 'text',
      description: 'The content to display inside the label',
      table: {
        type: { summary: 'string | VNode' }
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'Information Label'
  },
  render: (args) => ({
    components: { InfoLabel },
    setup() {
      return { args }
    },
    template: '<InfoLabel>{{ args.default }}</InfoLabel>'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Basic info label with simple text content.'
      }
    }
  }
}
