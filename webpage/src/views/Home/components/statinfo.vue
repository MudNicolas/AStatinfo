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
                <countTo :startVal="startVal" :endVal="endVal" :duration="2000"></countTo>
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
                <el-date-picker
                    v-model="timeRange"
                    :picker-options="quickRange"
                    type="datetimerange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    @change="timeRangeChange"
                ></el-date-picker>
            </span>
        </div>
        <Charts :color="person.color" :title="person.fansName" />
    </div>
</template>

<script>
import countTo from "vue-count-to"
import Charts from "@/components/Charts"
import dayjs from "dayjs"
import { getRealTimeFansNumber } from "@/api/remote"

export default {
    props: {
        person: Object,
    },
    components: { countTo, Charts },
    data() {
        return {
            quickRange: {
                shortcuts: [
                    {
                        text: "今日",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().set("hour", 0).set("minute", 0).set("second", 0)
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "一周内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-7, "day")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "一个月内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-1, "month")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "三个月内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-3, "month")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "半年内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-6, "month")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "一年内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-1, "year")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "十年内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-10, "year")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "一伯年内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-100, "year")
                            picker.$emit("pick", [start, end])
                        },
                    },
                ],
            },
            timeRange: [dayjs().add(-7, "day"), dayjs()],
            startVal: 0,
            endVal: 0,
            interval: null,
        }
    },

    created() {
        this.changeAvatarpersonalColor()
        this.getRealTimeFansNumber()
        this.interval = setInterval(this.getRealTimeFansNumber, 1000 * 10)
    },
    methods: {
        changeAvatarpersonalColor() {
            document
                .getElementsByTagName("body")[0]
                .style.setProperty("--border-color", this.person.color)
        },
        dayjs,
        timeRangeChange(nv) {
            if (!nv[0]) {
                return
            }
            let start = nv[0]
            let end = nv[1]
            if ((end - start) / (1000 * 60 * 60) < 1) {
                return this.$message.error("最小时间粒度为1小时")
            }
        },
        getRealTimeFansNumber() {
            getRealTimeFansNumber({ name: this.person.name })
                .then(res => {
                    let { data } = res
                    this.startVal = this.endVal
                    this.endVal = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    beforeDestroy() {
        clearInterval(this.interval)
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
    color: #606266;
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


