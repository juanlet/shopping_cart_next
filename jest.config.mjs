import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.test.{ts,tsx}',
    '!app/**/layout.tsx',
    '!app/**/page.tsx',
    '!app/components/Provider.tsx', 
    '!app/lib/types.ts',       
    '!jest.config.mjs',
    '!jest.setup.js',
    '!app/store/store.ts',
  ],
}
 
export default createJestConfig(config)