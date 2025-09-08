# Vue Battleships

A simple and fun Battleships game

<img src="https://github.com/rndware/vue-battleships/blob/main/media/battleships-screenshot.png" width="65%" />

- Clean, maintainable CSS using BEM and custom properties
- Built with configurability in mind
- Comprehensive Vitest coverage for components, composables, and helpers
- Organised with the [Atomic Design Methadology](https://atomicdesign.bradfrost.com/chapter-2/) for scalable architecture
- Includes immersive sound effects
- Written in TypeScript for full type safety

TO-DO:

- Add grba colours to CSS custom properties
- Rationalize unit usage (rem vs px) across the app
- Remove `any` types on unit tests

Consider:
- Convert `div` grid to `table` for accessibility
- 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
