module.exports = {
  app: {
    title: 'WAOS Dev',
    subtitle: 'welcome to demo.',
    description: 'Vue - Boilerplate Front : Vuetify, Axios, Jest, Cypress (Alpha) ',
    keywords: 'vue, vuetify, axios, jest, cypress',
  },
  port: 8080, // only available for dev env
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    base: 'api',
    endPoints: {
      auth: 'auth',
      users: 'users',
      tasks: 'tasks',
    },
  },
  cookie: {
    prefix: 'waos',
  },
  vuetify: {
    theme: {
      dark: 'auto', // dark theme true / false / auto (based on prefers-color-scheme)
      flat: true, // flat by default
      footer: false, // display footer
      signin: true, // display signin link
      signup: true, // display signup link
      snackbar: { // kind of notifications on requests
        status: true, // activate for error
        methods: ['post', 'put'], // show on sucess depends of methods
        sucessColor: 'secondary',
        errorColor: 'error',
      },
      navigation: {
        displayIfLogged: false, // show nav only if user is logged (easy for one page site)
        background: undefined, // url / undefined
        selectBorder: 'secondary', // color / undefined
      },
      themes: {
        dark: {
          primary: '#34495e',
          secondary: '#3498db',
          background: '#1F1F1F',
          surface: '#282A2E',
          error: '#CF6679',
          onPrimary: '#FFFFFF',
          onSecondary: '#000000',
          onBackground: '#FFFFFF',
          onSurface: '#FEFEFE',
          onError: '#000000',
        },
        light: {
          primary: '#34495e',
          secondary: '#e67e22',
          background: '#f3f3f6',
          surface: '#ffffff',
          error: '#B00020',
          onPrimary: '#ffffff',
          onSecondary: '#1d1d1f',
          onBackground: '#1d1d1f',
          onSurface: '#1d1d1f',
          onError: '#FFFFFF',
        },
      },
      options: {
        customProperties: true,
      },
    },
    icons: {
      iconfont: 'fa',
    },
    drawer: {
      model: null,
      type: 'mini', // default / permanent / temporary / mini
      clipped: true, // fixed
      floating: true,
      mini: true, // mini or full
    },
  },
};
