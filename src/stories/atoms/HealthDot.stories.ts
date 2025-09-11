import type { Meta, StoryObj } from '@storybook/vue3'
import HealthDot from '@/components/atoms/HealthDot.vue'

const meta: Meta<typeof HealthDot> = {
  title: 'Components/Atoms/HealthDot',
  component: HealthDot,
  parameters: {
    docs: {
      description: {
        component:
          'A simple health indicator dot that can be either filled (alive/healthy) or empty (dead/unhealthy). Uses CSS custom properties for sizing and colors with smooth transitions.',
      },
    },
  },
  argTypes: {
    filled: {
      control: 'boolean',
      description: 'Whether the dot should appear filled (alive) or empty (dead)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    filled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An empty health dot representing a dead or unhealthy state. Shows with gray background color.',
      },
    },
  },
}

export const Filled: Story = {
  args: {
    filled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A filled health dot representing an alive or healthy state. Shows with green background color.',
      },
    },
  },
}

export const HealthBar: Story = {
  render: () => ({
    components: { HealthDot },
    template: `
      <div style="display: flex; align-items: center; gap: 4px;">
        <span style="margin-right: 8px; font-size: 14px; color: var(--gray-700, #374151);">Health:</span>
        <HealthDot :filled="true" />
        <HealthDot :filled="true" />
        <HealthDot :filled="true" />
        <HealthDot :filled="false" />
        <HealthDot :filled="false" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Example of multiple health dots used together to create a health bar interface, showing 3 out of 5 health points.',
      },
    },
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { HealthDot },
    data() {
      return {
        isAlive: false,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <HealthDot :filled="isAlive" />
          <span style="font-size: 14px; color: var(--gray-700, #374151);">
            Status: {{ isAlive ? 'Alive' : 'Dead' }}
          </span>
        </div>
        <button
          @click="isAlive = !isAlive"
          style="
            padding: 8px 16px;
            background-color: var(--blue-500, #3b82f6);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          "
        >
          Toggle Health
        </button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing the smooth transition animation when the health state changes. Click the button to toggle between alive and dead states.',
      },
    },
  },
}

export const MultipleStates: Story = {
  render: () => ({
    components: { HealthDot },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 80px; font-size: 14px; color: var(--gray-700, #374151);">Full Health:</span>
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 80px; font-size: 14px; color: var(--gray-700, #374151);">Half Health:</span>
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
          <HealthDot :filled="true" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 80px; font-size: 14px; color: var(--gray-700, #374151);">Low Health:</span>
          <HealthDot :filled="true" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 80px; font-size: 14px; color: var(--gray-700, #374151);">No Health:</span>
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
          <HealthDot :filled="false" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Different health states showing various combinations of filled and empty dots to represent different health levels.',
      },
    },
  },
}
