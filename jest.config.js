module.exports = {
  testMatch: ['<rootDir>/__test__/**/*.{test.js, spec.js}', '<rootDir>/src/**/*.{test.js, spec.js}'],
  collectCoverageFrom: ['src/**/*.{js, jsx}'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass|jpg|jpeg|png|gif|webp|svg|jp?g|png|svg|gif|raw|webp|mpg|mp4|mp3|avi|ogv|ogg|wmv|amv|webm)$':
      'identity-obj-proxy'
  },
  clearMocks: true,
  transformIgnorePatterns: [
    '<rooDir>/node_modules/',
    '<rooDir>/build/',
    '<rooDir>/public/',
    '<rooDir>/webpack/',
    '<rooDir>/.github/',
    '<rootDir>/coverage',
    '.babelrc',
    '.eslintrc',
    '.stylelintrc',
    '.prettierrc',
    '.browserslistrc',
    '.editorconfig',
    'babel.custom.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE.md',
    '.gitignore'
  ],
  coveragePathIgnorePatterns: [
    '<rooDir>/node_modules/',
    '<rooDir>/build/',
    '<rooDir>/public/',
    '<rooDir>/webpack/',
    '<rooDir>/.github/',
    '<rootDir>/coverage',
    '.babelrc',
    '.eslintrc',
    '.stylelintrc',
    '.prettierrc',
    '.browserslistrc',
    '.editorconfig',
    'babel.custom.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE.md',
    '.gitignore'
  ],
  modulePathIgnorePatterns: [
    '<rooDir>/node_modules/',
    '<rooDir>/bower_components/',
    '<rooDir>/build/',
    '<rooDir>/public/',
    '<rooDir>/webpack/',
    '<rooDir>/.github/',
    '<rootDir>/coverage',
    '.babelrc',
    '.eslintrc',
    '.stylelintrc',
    '.prettierrc',
    '.browserslistrc',
    '.editorconfig',
    'babel.custom.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE.md',
    '.gitignore'
  ],
  testPathIgnorePatterns: [
    '<rooDir>/node_modules/',
    '<rooDir>/bower_components/',
    '<rooDir>/build/',
    '<rooDir>/public/',
    '<rooDir>/webpack/',
    '<rooDir>/.github/',
    '<rootDir>/coverage',
    '.babelrc',
    '.eslintrc',
    '.stylelintrc',
    '.prettierrc',
    '.browserslistrc',
    '.editorconfig',
    'babel.custom.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE.md',
    '.gitignore'
  ],
  watchPathIgnorePatterns: [
    '<rooDir>/node_modules/',
    '<rooDir>/bower_components/',
    '<rooDir>/build/',
    '<rooDir>/public/',
    '<rooDir>/webpack/',
    '<rooDir>/.github/',
    '<rootDir>/coverage',
    '.babelrc',
    '.eslintrc',
    '.stylelintrc',
    '.prettierrc',
    '.browserslistrc',
    '.editorconfig',
    'babel.custom.config.js',
    'postcss.config.js',
    'webpack.config.js',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE.md',
    '.gitignore'
  ]
}
