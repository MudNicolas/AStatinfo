<template>
    <div class="home">
        <Nav :config="config" @updateKey="updateKey" />
        <transition name="slide" mode="out-in">
            <Acao v-if="!activeKey" />
            <Statinfo
                v-for="e of config"
                v-if="config[activeKey] && e.name === config[activeKey].name"
                :key="e.name"
                :person="config[activeKey]"
            />
        </transition>
        <Footer />
    </div>
</template>

<script>
import config from "@/config/conf.json"
import Nav from "./components/nav.vue"
import Acao from "./components/acao.vue"
import Statinfo from "./components/statinfo.vue"
import Footer from "./components/footer.vue"

export default {
    name: "Home",
    components: {
        Nav,
        Acao,
        Statinfo,
        Footer,
    },
    data() {
        return {
            config,
            activeKey: "",
        }
    },

    methods: {
        updateKey(v) {
            this.activeKey = v
        },
    },
}
</script>


<style lang="css" >
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>>

