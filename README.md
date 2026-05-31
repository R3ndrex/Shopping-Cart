# ShopFlow

A modern shopping cart application built with React, TypeScript, and Vite.
The app fetches products from the EscuelaJS API and lets users browse items, add them to the cart, adjust quantities, and complete a purchase flow.

## Features

- Product list with pagination
- Cart counter in the top navigation
- Add items to cart from the store page
- Increase, decrease, or remove cart items
- Image fallback for broken product images
- Purchase confirmation modal
- Route-level error page for unexpected failures

## Tech Stack

- React 19
- TypeScript
- React Router
- Vite
- Tailwind CSS
- Heroicons
- Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint
- `npm run test` - run tests with Vitest UI

## Data Source

Product data comes from the [EscuelaJS API](https://api.escuelajs.co/api/v1/products).

## Credits

- Icons from [Heroicons](https://heroicons.com/)
- Shopping bag icon from [Material Design Icons](https://pictogrammers.com/library/mdi/icon/shopping/)

## Screenshots

![Store Page](https://i.imgur.com/w8MnN4Q.png?raw=true)
![Cart Page](https://i.imgur.com/e0tazPq.png?raw=true)
