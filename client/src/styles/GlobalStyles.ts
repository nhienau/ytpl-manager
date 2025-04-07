import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &,
  &.light {
    --color-neutral-50: #fafafa;
    --color-neutral-100: #f5f5f5;
    --color-neutral-200: #e5e5e5;
    --color-neutral-300: #d4d4d4;
    --color-neutral-400: #a3a3a3;
    --color-neutral-500: #737373;
    --color-neutral-600: #525252;
    --color-neutral-700: #404040;
    --color-neutral-800: #262626;
    --color-neutral-900: #171717;
    --color-neutral-950: #0a0a0a;

    /* red, yellow, green, blue */
    --color-red-50: #fef2f2;
    --color-red-100: #fee2e2;
    --color-red-200: #fecaca;
    --color-red-300: #fca5a5;
    --color-red-400: #f87171;
    --color-red-500: #ef4444;
    --color-red-600: #dc2626;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-red-900: #7f1d1d;
    --color-red-950: #450a0a;

    --backdrop-color: rgba(0, 0, 0, 0.2);

    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  &.dark {
    --color-neutral-50: #0a0a0a;
    --color-neutral-100: #171717;
    --color-neutral-200: #262626;
    --color-neutral-300: #404040;
    --color-neutral-400: #525252;
    --color-neutral-500: #737373;
    --color-neutral-600: #a3a3a3;
    --color-neutral-700: #d4d4d4;
    --color-neutral-800: #e5e5e5;
    --color-neutral-900: #f5f5f5;
    --color-neutral-950: #fafafa;
    
    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.4);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }
}

@font-face {
  font-family: "Geist";
  src: url("/fonts/Geist/variable-ttf/GeistVF.ttf") format("truetype"),
    url("/fonts/Geist/variable-woff/GeistVF.woff") format("woff"),
    url("/fonts/Geist/variable-woff/GeistVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Dark mode toggle transition */
  transition: background-color 0.3s, border 0.3s;
}

body {
  /* font-family: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: var(--color-neutral-50);
  color: var(--color-neutral-800);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

input,
button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
