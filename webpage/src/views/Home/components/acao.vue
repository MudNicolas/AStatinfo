<template>
    <div class="container">
        <div class="wrapper">
            <img :src="i" v-for="i of config.image" draggable="false" />
            <div class="label">{{ label }}</div>
            <div class="tip">
                {{ tip }}
            </div>
        </div>
    </div>
</template>

<script>
import config from "@/config/cao.json"
export default {
    data() {
        return {
            config,
            label: "喜欢我阿草的力反馈银屯吗",
            tip: "点击小姐姐查看近期数据",
        }
    },
}
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    justify-content: center;

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .label {
            letter-spacing: 6px;
            position: absolute;
            color: #fff;
            font-size: 30px;
            text-shadow: #333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0;
        }

        .tip {
            letter-spacing: 3px;
            color: #333;
            font-size: 20px;
            user-select: none;
        }
    }
}
</style>
