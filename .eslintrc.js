module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['import'],
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'prettier',
  ],
  // rules: {
  //   'vue/script-setup-uses-vars': 0,
  //   'vue/no-v-html': 0,
  //   'no-console': 0,
  //   'no-useless-constructor': 0,
  //   'import/named': 0,
  //   camelcase: 0,
  //   'prettier/prettier': [
  //     'error',
  //     {
  //       endOfLine: 'auto',
  //     },
  //   ],
  // },
};
