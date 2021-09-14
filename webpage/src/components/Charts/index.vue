<template>
    <div :class="className" class="chat-area" />
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
                    x: 70,
                    x2: 10,
                    y2: 20,
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
                        lineStyle: {
                            color: this.color,
                        },
                        itemStyle: {
                            color: this.color,
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

<style scoped>
@media only screen and (max-device-width: 800px) {
    .chat-area {
        height: 300px;
    }
}

@media screen and (min-width: 500px) {
    .chat-area {
        height: 600px;
    }
}

.chat-area {
    width: 100%;
}
</style>
