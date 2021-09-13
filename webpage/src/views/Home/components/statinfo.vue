<template>
    <div class="container">
        <div class="header">
            <div class="info">
                <img :src="person.avatar" class="avatar" />
                <div class="name">
                    <span>
                        {{ person.cname }}
                    </span>
                    <span>
                        {{ person.name }}
                    </span>
                </div>
            </div>
            <div class="item">
                <span class="title">{{ person.fansName }}</span>
                <svg-icon :icon-class="`${person.name}_FANS`" style="margin: 8px" />
                <countTo :startVal="0" :endVal="1000000" :duration="2000"></countTo>
            </div>
            <div class="item">
                <span class="title">预计五十万粉时间</span>
                <span class="forecast">2020.02.02</span>
            </div>
            <div class="item">
                <span class="title">预计百万粉时间</span>
                <span class="forecast">2020.02.02</span>
            </div>
            <div class="item">
                <span class="title">预计七十亿粉时间</span>
                <span class="forecast">2020.02.02</span>
            </div>
        </div>
        <range-picker />
        <Charts :color="person.color" :title="person.fansName" />
    </div>
</template>

<script>
import countTo from "vue-count-to"
import Charts from "@/components/Charts"
import { DatePicker, Input as aInput } from "ant-design-vue"
const { RangePicker } = DatePicker

export default {
    props: {
        person: Object,
    },
    components: { countTo, Charts, RangePicker, aInput },

    created() {
        this.changeAvatarpersonalColor()
    },
    methods: {
        changeAvatarpersonalColor() {
            document
                .getElementsByTagName("body")[0]
                .style.setProperty("--border-color", this.person.color)
        },
    },
}
</script>

<style lang='scss' scoped>
$personalColor: var(--border-color, #fff);

.container {
    padding: 80px;

    .header {
        display: flex;
        flex-wrap: nowrap;

        align-items: center;

        .info {
            display: flex;
            align-items: center;

            .avatar {
                border-radius: 50%;
                width: 100px;
                border: 6px solid $personalColor;
                margin-right: 16px;
            }

            .name {
                display: flex;
                flex-direction: column;
                letter-spacing: 6px;

                color: $personalColor;
                font-size: 30px;
            }
        }

        .item {
            border-left: 6px solid $personalColor;
            color: #606266;
            margin: 10px 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 30px;
            font-size: 24px;

            .title {
                font-size: 18px;
            }
            .content {
                display: flex;
                align-items: center;
            }
            .forecast {
                margin-top: 8px;
            }
        }
    }
}
</style>
