import request from "@/utils/request"

export function getForecast(query) {
    return request({
        url: "/local/forecast",
        method: "GET",
        params: query,
    })
}

export function getChartData(query) {
    return request({
        url: "/local/chart",
        method: "GET",
        params: query,
    })
}
