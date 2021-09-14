<template>
    <div class="container">
        <ul>
            <li v-for="i of tips">{{ i }}</li>
        </ul>
    </div>
</template>

<script>
import { getTips } from "@/api/page"
export default {
    data() {
        return {
            tips: [],
        }
    },
    created() {
        this.getTips()
    },
    methods: {
        getTips() {
            getTips()
                .then(res => {
                    let { tips } = res
                    this.tips = tips
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
    .container {
        margin: 20px 10px 0px 0px;
    }
}

@media (min-width: 500px) {
    .container {
        margin: 20px 80px 0px 80px;
    }
}

.container {
    color: #909399;
    font-size: 13px;
    letter-spacing: 1px;
    li {
        margin-top: 4px;
    }
}
</style>
