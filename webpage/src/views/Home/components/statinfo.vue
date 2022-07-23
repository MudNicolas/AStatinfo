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
                <div class="realtime-interval">{{ realtime | normalFormatTime }}</div>
            </div>
            <div class="item" v-for="e of forecast" :key="e.title">
                <span class="title">预计{{ e.number | bigNumberTransform }}粉时间</span>
                <span class="forecast">
                    {{ e.forecast | normalFormatTime(e.number, currentVal) }}
                </span>
            </div>
        </div>
        <div class="explanation" v-if="sig">sig={{ sig }}, r={{ r }}</div>
        <div class="toolbar">
            <span class="tip">数据查看范围</span>
            <span class="range-picker">
                <el-date-picker
                    v-model="timeRange"
                    :picker-options="quickRangeOptions"
                    type="datetimerange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    @change="timeRangeChange"
                ></el-date-picker>
            </span>
            <div class="devided-picker">
                <el-date-picker
                    v-model="timeRange[0]"
                    size="small"
                    type="datetime"
                    placeholder="开始时间"
                ></el-date-picker>
                ~
                <el-date-picker
                    v-model="timeRange[1]"
                    size="small"
                    type="datetime"
                    placeholder="截止时间"
                ></el-date-picker>
                <el-button
                    size="mini"
                    type="primary"
                    @click="timeRangeChange(timeRange)"
                    style="margin-top: 8px"
                    :loading="buttonLoading"
                >
                    狠狠地查看
                </el-button>
            </div>
        </div>
        <div v-loading="chartDataLoading" class="chart-area">
            <Charts
                :color="person.color"
                :title="generateChartTitle()"
                :chartData="echartData"
                v-if="!chartDataLoading"
            />
        </div>
    </div>
</template>

<script>
import countTo from "vue-count-to"
import Charts from "@/components/Charts"
import dayjs from "dayjs"
import { getRealTimeFansNumber } from "@/api/remote"
import { getForecast, getChartData } from "@/api/local"
import { normalFormatTime, bigNumberTransform } from "@/utils"

export default {
    props: {
        person: Object,
    },
    components: { countTo, Charts },
    filters: {
        normalFormatTime: (v, targetNumber, currentVal) => {
            if (!v) return
            let d = new Date(v)
            if (new Date(v).toString() === "Invalid Date") return
            if (currentVal > targetNumber) return "拿下！"
            return `${normalFormatTime(new Date(v), "{y}年{m}月{d}日 {h}:{i}:{s}")}`
        },
        bigNumberTransform: v => {
            return ` ${bigNumberTransform(v)} `
        },
    },
    mounted() {
        this.realtimeInterval = setInterval(() => {
            this.realtime = dayjs().format()
        }, 1000)
    },
    data() {
        return {
            realtime: dayjs().format(),
            realtimeInterval: null,
            chartDataLoading: false,
            buttonLoading: false,
            forecast: [
                {
                    number: 500000,
                    forecast: "--",
                },
                {
                    title: 1000000,
                    value: "--",
                },
                {
                    title: 7000000000,
                    value: "--",
                },
            ],
            quickRangeOptions: {
                shortcuts: [
                    {
                        text: "一小时内",
                        onClick(picker) {
                            const start = dayjs().add(-1, "hour")
                            const end = dayjs()
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "两小时内",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs().add(-2, "hour")
                            picker.$emit("pick", [start, end])
                        },
                    },
                    {
                        text: "今日",
                        onClick(picker) {
                            const end = dayjs()
                            const start = dayjs()
                                .set("hour", 0)
                                .set("minute", 0)
                                .set("second", 0)
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
            currentVal: 0,
            interval: null,
            echartData: {
                xData: [],
                yData: [],
            },
            newFansNumber: 0,
            sig: 0,
            r: 0,
        }
    },

    created() {
        this.changeAvatarpersonalColor()
        this.getRealTimeFansNumber()
        this.getForecast()
        this.getChartData()
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
            if (start >= end) {
                return this.$message.error("时间魔法不可取")
            }
            if ((end - start) / (1000 * 60 * 60) < 1) {
                return this.$message.error("最小时间粒度为1小时")
            }
            this.getChartData()
        },
        getRealTimeFansNumber() {
            getRealTimeFansNumber({ name: this.person.name })
                .then(res => {
                    let { follower } = res
                    this.startVal = this.endVal
                    this.endVal = follower
                    this.currentVal = follower
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getForecast() {
            getForecast({ name: this.person.name })
                .then(res => {
                    let { result, sig, r } = res
                    this.forecast = result
                    this.sig = sig
                    this.r = r
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getChartData() {
            this.chartDataLoading = true
            this.buttonLoading = true
            let formatTimeRange = this.timeRange.map(e => {
                if (e.toDate) return e.toDate()
                return e
            })
            let query = { name: this.person.name, timeRange: formatTimeRange }
            getChartData(query)
                .then(res => {
                    let { chatData, newFansNumber } = res
                    let formatXData = chatData.map(e => {
                        return normalFormatTime(new Date(e.time), "{y}/{m}/{d} {h}:{i}")
                    })
                    let formatYData = chatData.map(e => {
                        return e.numberFollowers
                    })
                    this.echartData = {
                        xData: formatXData,
                        yData: formatYData,
                    }
                    this.newFansNumber = newFansNumber
                    this.chartDataLoading = false
                    this.buttonLoading = false
                })
                .catch(err => {
                    console.log(err)
                    this.buttonLoading = false
                })
        },
        generateChartTitle() {
            return this.newFansNumber >= 0
                ? `${this.person.fansName}(+${this.newFansNumber})`
                : `${this.person.fansName}(-${Math.abs(this.newFansNumber)})`
        },
    },
    beforeDestroy() {
        clearInterval(this.interval)
        clearInterval(this.realtimeInterval)
    },
}
</script>

<style lang="scss" scoped>
$personalColor: var(--border-color, #fff);

@media (max-width: 768px) {
    .container {
        padding: 20px 10px;
    }
    .header {
        flex-direction: column;
    }
    .chart-area {
        height: 300px;
    }

    .range-picker {
        display: none;
    }
}

@media (min-width: 769px) {
    .container {
        padding: 80px;
    }
    .header {
        flex-direction: row;
    }
    .chart-area {
        height: 600px;
    }

    .devided-picker {
        display: none;
    }
}

.header {
    display: flex;
    flex-wrap: wrap;

    .info {
        display: flex;
        align-items: center;

        .avatar {
            border-radius: 50%;
            width: 100px;
            height: 100px;
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
            margin-bottom: 6px;
        }
        .content {
            display: flex;
            align-items: center;
            margin-top: 6px;
        }
        .forecast {
            margin-top: 6px;
            text-align: center;
        }
    }
}
.explanation {
    color: #909399;
    font-size: 13px;
    letter-spacing: 1px;
    margin: 40px 0px;
}
.realtime-interval {
    color: #606266;
    font-size: 16px;

    margin-top: 10px;
}
.toolbar {
    color: #606266;
    .tip {
        margin-right: 14px;
    }
}

.devided-picker {
    margin-top: 8px;
}
</style>

<style>
@media (min-width: 769px) {
    .el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner {
        width: 350px;
        margin-top: 8px;
    }
}

@media (max-width: 768px) {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 0px;
    }
}
</style>
