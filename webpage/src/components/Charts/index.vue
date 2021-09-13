<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts/core"
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
} from "echarts/components"
import { LineChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import resize from "./mixins/resize"

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
])
export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: "chart",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "600px",
        },
        color: {
            type: String,
            default: "#9AC8E2",
        },
        title: String,
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },

    methods: {
        initChart() {
            this.chart = echarts.init(this.$el)

            let option = {
                title: {
                    text: this.title,
                    left: "center",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                grid: {
                    x: 0,
                    x2: 0,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                },
                yAxis: {
                    type: "value",
                },

                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320, 1245, 2353464, 45758, 124, 55],
                        type: "line",
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: this.color,
                                },
                                {
                                    offset: 1,
                                    color: "#fff",
                                },
                            ]),
                        },
                        itemStyle: {
                            normal: {
                                color: this.color,
                                lineStyle: {
                                    color: this.color,
                                },
                            },
                        },
                        smooth: true,
                    },
                ],
            }

            this.chart.setOption(option)
        },
    },
}
</script>

<style>
</style>
