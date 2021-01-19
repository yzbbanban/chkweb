// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/dialog.css'
import animated from 'animate.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(animated)

const errorHandler = (error, vm)=>{
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
}

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
