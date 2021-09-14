import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import "./icons"

import { DatePicker, Button, Message, Loading } from "element-ui"

Message.install = function(Vue) {
    Vue.prototype.$message = Message
}

Vue.use(DatePicker)
Vue.use(Message)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Loading.directive)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app")
