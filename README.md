# Vue Battleships

A simple and fun Battleships game

[👉Play now](https://rndware.github.io/vue-battleships/#/)

<img src="https://github.com/rndware/vue-battleships/blob/main/media/battleships-screenshot-light-mode.png" width="65%" />

<img src="https://github.com/rndware/vue-battleships/blob/main/media/battleships-screenshot-dark-mode.png" width="65%" />

## Highlights

- Built with **Vue 3**, **Composition API** and **TypeScript**
- Architected scalable component library using **Atomic Design Principles** and **Single File Components (SFCs)**
- Engineered for high configurability
- Achieved comprehensive test coverage using **Vitest**
- Eliminated unnecessary third-party dependencies, reducing bundle size and minimising security vulnerabilities
- Seperated grid logic from `useBattleshipsGame` to be more **SOLID**
- Automatically switches between light and dark modes based upon system settings
- Optimized Vue components for brevity and clarity using slots where possible
- Includes immersive sound effects

## TO-DO

- Add `rgba` colors to CSS custom properties
- Rationalize unit usage (`rem` vs `px`) across the app
- Remove `any` types in unit tests

## Consider

- Converting `div` based grid to a `table` for accessibility

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
