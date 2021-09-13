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
        <div class="toolbar">
            <span class="tip">数据查看范围</span>
            <span class="picker">
                <config-provider :locale="locale">
                    <range-picker
                        :show-time="true"
                        :ranges="quickRange"
                        v-model="timeRange"
                        @ok="timeRangeChange"
                    />
                </config-provider>
            </span>
        </div>
        <Charts :color="person.color" :title="person.fansName" />
    </div>
</template>

<script>
import countTo from "vue-count-to"
import Charts from "@/components/Charts"
import { DatePicker, Input as aInput, ConfigProvider, Message } from "ant-design-vue"
import moment from "moment"
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"

const { RangePicker } = DatePicker

export default {
    props: {
        person: Object,
    },
    components: { countTo, Charts, RangePicker, aInput, ConfigProvider },
    data() {
        return {
            locale: zhCN,
            quickRange: {
                今日: [moment("00:00:00", "HH:mm:ss"), moment()],
                一周内: [moment().day(-6), moment()],
                一个月内: [moment().add(-1, "month"), moment()],
                一季度内: [moment().add(-3, "month"), moment()],
                半年内: [moment().add(-6, "month"), moment()],
                一年内: [moment().add(-1, "year"), moment()],
                十年内: [moment().add(-10, "year"), moment()],
                一伯年内: [moment().add(-100, "year"), moment()],
            },
            timeRange: [moment().day(-6), moment()],
        }
    },

    created() {
        this.changeAvatarpersonalColor()
    },
    methods: {
        changeAvatarpersonalColor() {
            document
                .getElementsByTagName("body")[0]
                .style.setProperty("--border-color", this.person.color)
        },
        moment,
        timeRangeChange(nv) {
            console.log(nv)
            if (!nv[0]) {
                return
            }
            let start = nv[0]._d
            let end = nv[1]._d
            if ((end - start) / (1000 * 60 * 60) < 1) {
                Message.error("最小时间粒度为1小时")
            }
        },
    },
}
</script>

<style lang='scss' scoped>
$personalColor: var(--border-color, #fff);

@media only screen and (max-device-width: 800px) {
    .container {
        padding: 20px 10px;
    }
    .header {
        flex-direction: column;
    }
}

@media screen and (min-width: 500px) {
    .container {
        padding: 80px;
    }
    .header {
        flex-direction: row;
    }
}

.header {
    display: flex;

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

.toolbar {
    margin: 40px 0px;
    .tip {
        margin-right: 14px;
    }
}
</style>

<style >
.ant-calendar-time-picker-select::-webkit-scrollbar {
    width: 0px;
}
</style>
