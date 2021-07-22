import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      themes: {
        light: {
          primary: '#002e5d',
          secondary: '#666666',
          accent: '#5F7C9B',
          error: '#B3041A',
          info: '#2196F3',
          success: '#66B200',
          warning: '#B3041A',
        }
      },
      dark: false
    }
  });
