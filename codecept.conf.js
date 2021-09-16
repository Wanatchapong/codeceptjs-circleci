require('dotenv').config({ path: '.env' });

const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: false,
      windowSize: '1200x900',
    },
    REST: {
      endpoint: process.env.BASE_URL,
      onRequest: (request) => {
        // request.headers.Authorization = 'access-token';
      },
    },
    AssertWrapper: {
      require: 'codeceptjs-assert',
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs-circleci',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: false,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
};
