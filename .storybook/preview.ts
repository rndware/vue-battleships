import type { Preview } from '@storybook/vue3-vite'

import '../src/assets/css/main.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
