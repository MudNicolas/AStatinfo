import axios from "axios"
import { Message } from "element-ui"

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	withCredentials: false,
	timeout: 5000,
})

service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		let res = response.data
		let { code } = res
		if (code !== 20000) {
			Message({
				message: res.message || "Error",
				type: "error",
				duration: 5 * 1000,
			})
			return Promise.reject(new Error(res.message || "Error"))
		} else {
			return res.data

		}
	},
	error => {
		console.log(error)
		Message({
			message: error.message || "Error",
			type: "error",
			duration: 5 * 1000,
		})
		return Promise.reject(error)
	}
)

export default service
