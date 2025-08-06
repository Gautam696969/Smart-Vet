export default {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    // You can add custom rules here if needed
    // Example: "prettier/prettier": "error"
  }
}
