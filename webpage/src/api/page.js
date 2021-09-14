import request from "@/utils/request"

export function getTips() {
    return request({
        url: "/tips/get",
        method: "GET",
    })
}
