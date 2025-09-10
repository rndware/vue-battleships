# Vue Battleships

A simple and fun Battleships game

[👉Play now](https://rndware.github.io/vue-battleships/#/)

<img src="https://github.com/rndware/vue-battleships/blob/main/media/battleships-screenshot.png" width="65%" />

- Clean, maintainable CSS using **BEM** and custom properties
- **Semantic design tokens** for a scalable design system
- Built with configurability in mind
- Comprehensive Vitest coverage for components, composables, and helpers
- Organized with the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for scalable architecture
- Includes immersive sound effects
- Written in **TypeScript** for full type safety

TO-DO:

- Add `rgba` colors to CSS custom properties
- Rationalize unit usage (`rem` vs `px`) across the app
- Remove `any` types in unit tests

Consider:
- Converting the `div`-based grid to a `table` for accessibility  

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
