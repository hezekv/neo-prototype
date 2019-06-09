import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#004b8d',
    success: '#00aa7e',
    info: '#00a4d2',
    error: '#d31245'
  }
})
