import request from "@/utils/request"

export function getRealTimeFansNumber(query) {
    return request({
        url: "/remote/fans/realtime",
        method: "GET",
        params: query,
    })
}
