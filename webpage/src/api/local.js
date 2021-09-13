import request from "@/utils/request"

export function getForecast(query) {
    return request({
        url: "/local/forecast",
        method: "GET",
        params: query,
    })
}
