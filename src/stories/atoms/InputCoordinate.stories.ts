import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import InputCoordinate from '@/components/atoms/InputCoordinate.vue'

const meta: Meta<typeof InputCoordinate> = {
  title: 'Components/Atoms/InputCoordinate',
  component: InputCoordinate,
  parameters: {
    docs: {
      description: {
        component: 'A specialized input component for entering coordinates in games like Battleship. Accepts only letters A-J and numbers 0-9, automatically converts to uppercase, and limits input to 3 characters. Features centered text and focus states optimized for coordinate entry.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The current value of the input (v-model)',
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to show when input is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the input value changes',
      table: {
        type: { summary: '(value: string) => void' }
      }
    },
    onSubmit: {
      action: 'submit',
      description: 'Emitted when Enter key is pressed',
      table: {
        type: { summary: '() => void' }
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'A1'
  },
  render: (args) => ({
    components: { InputCoordinate },
    setup() {
      const value = ref(args.modelValue)
      return {
        args,
        value,
        onUpdate: (newValue: string) => {
          value.value = newValue
        },
        onSubmit: () => {
          console.log('Submit:', value.value)
        }
      }
    },
    template: `
      <InputCoordinate
        v-model="value"
        :placeholder="args.placeholder"
        @submit="onSubmit"
      />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Basic coordinate input with placeholder text. Try typing letters and numbers to see the automatic filtering and uppercase conversion.'
      }
    }
  }
}

export const WithValue: Story = {
  args: {
    modelValue: 'B5',
    placeholder: 'Enter coordinate'
  },
  render: (args) => ({
    components: { InputCoordinate },
    setup() {
      const value = ref(args.modelValue)
      return {
        args,
        value,
        onUpdate: (newValue: string) => {
          value.value = newValue
        }
      }
    },
    template: `
      <InputCoordinate
        v-model="value"
        :placeholder="args.placeholder"
      />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Input with a pre-filled coordinate value.'
      }
    }
  }
}

export const BattleshipGame: Story = {
  render: () => ({
    components: { InputCoordinate },
    setup() {
      const targetCoordinate = ref('')
      const attempts = ref<string[]>([])
      const message = ref('Enter your target coordinates')
      const isGameOver = ref(false)

      // Hidden ship locations for demo
      const ships = ['A1', 'A2', 'A3', 'E5', 'E6', 'G9']

      const fireShot = () => {
        if (!targetCoordinate.value || isGameOver.value) return

        const coordinate = targetCoordinate.value.toUpperCase()
        attempts.value.push(coordinate)

        if (ships.includes(coordinate)) {
          message.value = `🎯 HIT! You hit a ship at ${coordinate}!`
          if (attempts.value.filter(coord => ships.includes(coord)).length === ships.length) {
            message.value = `🏆 VICTORY! You sunk all ships in ${attempts.value.length} attempts!`
            isGameOver.value = true
          }
        } else {
          message.value = `💦 MISS! No ship at ${coordinate}`
        }

        targetCoordinate.value = ''
      }

      const resetGame = () => {
        attempts.value = []
        targetCoordinate.value = ''
        message.value = 'Enter your target coordinates'
        isGameOver.value = false
      }

      return {
        targetCoordinate,
        attempts,
        message,
        isGameOver,
        fireShot,
        resetGame
      }
    },
    template: `
      <div style="
        max-width: 400px;
        padding: 24px;
        background: var(--gray-50, #f9fafb);
        border-radius: 12px;
        border: 1px solid var(--gray-200, #e5e7eb);
      ">
        <h3 style="margin: 0 0 16px 0; color: var(--gray-900, #111827); text-align: center;">
          🚢 Battleship Demo
        </h3>

        <div style="text-align: center; margin-bottom: 20px;">
          <p style="
            margin: 0 0 16px 0;
            color: var(--gray-700, #374151);
            font-size: 14px;
          ">
            {{ message }}
          </p>

          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
            <InputCoordinate
              v-model="targetCoordinate"
              placeholder="A1"
              @submit="fireShot"
            />
            <button
              @click="fireShot"
              :disabled="!targetCoordinate || isGameOver"
              style="
                padding: 8px 16px;
                background-color: var(--blue-500, #3b82f6);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                disabled:opacity-50;
                disabled:cursor-not-allowed;
              "
            >
              🎯 Fire!
            </button>
          </div>

          <button
            @click="resetGame"
            style="
              padding: 6px 12px;
              background-color: var(--gray-500, #6b7280);
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
            "
          >
            Reset Game
          </button>
        </div>

        <div v-if="attempts.length > 0" style="margin-top: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: var(--gray-700, #374151);">
            Previous Attempts:
          </h4>
          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            font-size: 12px;
            font-family: monospace;
          ">
            <span
              v-for="attempt in attempts"
              :key="attempt"
              style="
                padding: 2px 6px;
                border-radius: 3px;
                color: white;
                font-weight: bold;
              "
              :style="{
                backgroundColor: ['A1', 'A2', 'A3', 'E5', 'E6', 'G9'].includes(attempt)
                  ? 'var(--red-500, #ef4444)'
                  : 'var(--gray-400, #9ca3af)'
              }"
            >
              {{ attempt }}
            </span>
          </div>
        </div>

        <p style="
          margin: 16px 0 0 0;
          font-size: 12px;
          color: var(--gray-500, #6b7280);
          text-align: center;
        ">
          Ships hidden at: A1-A3, E5-E6, G9 <br>
          Press Enter or click Fire to shoot!
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive Battleship game demo showing real-world usage. Try coordinates like A1, A2, A3, E5, E6, or G9 to hit ships. Press Enter in the input or click Fire to shoot!'
      }
    }
  }
}

export const ValidationDemo: Story = {
  render: () => ({
    components: { InputCoordinate },
    setup() {
      const coordinate = ref('')
      const validationMessage = ref('')

      const validateCoordinate = (value: string) => {
        if (!value) {
          validationMessage.value = 'Enter a coordinate'
          return false
        }

        if (value.length < 2) {
          validationMessage.value = 'Coordinate too short (min 2 characters)'
          return false
        }

        const letter = value[0]
        const number = value.slice(1)

        if (!/[A-J]/.test(letter)) {
          validationMessage.value = 'First character must be A-J'
          return false
        }

        if (!/^[0-9]+$/.test(number)) {
          validationMessage.value = 'Numbers only after the letter'
          return false
        }

        if (parseInt(number) > 10) {
          validationMessage.value = 'Number too high (max 10)'
          return false
        }

        validationMessage.value = '✅ Valid coordinate!'
        return true
      }

      const onUpdate = (value: string) => {
        coordinate.value = value
        validateCoordinate(value)
      }

      return {
        coordinate,
        validationMessage,
        onUpdate,
        validateCoordinate
      }
    },
    template: `
      <div style="max-width: 300px;">
        <div style="margin-bottom: 12px;">
          <label style="
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
            color: var(--gray-700, #374151);
          ">
            Enter Coordinate:
          </label>
          <InputCoordinate
            :model-value="coordinate"
            placeholder="A1"
            @update:model-value="onUpdate"
          />
        </div>

        <div style="
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          min-height: 20px;
        " :style="{
          backgroundColor: validationMessage.includes('✅')
            ? 'var(--green-50, #f0fdf4)'
            : 'var(--red-50, #fef2f2)',
          color: validationMessage.includes('✅')
            ? 'var(--green-700, #15803d)'
            : 'var(--red-700, #b91c1c)',
          border: validationMessage.includes('✅')
            ? '1px solid var(--green-200, #bbf7d0)'
            : '1px solid var(--red-200, #fecaca)'
        }">
          {{ validationMessage || 'Enter a coordinate to validate' }}
        </div>

        <div style="margin-top: 16px; font-size: 12px; color: var(--gray-500, #6b7280);">
          <strong>Rules:</strong><br>
          • First character: A-J<br>
          • Following characters: 0-9<br>
          • Max 3 characters total<br>
          • Invalid characters are filtered out
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Validation example showing real-time feedback on coordinate input. Try different combinations to see how validation works.'
      }
    }
  }
}
