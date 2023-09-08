import { BASE_URL, TIME_OUT } from './config'
import Request from './request'

export const http = new Request({ 
	baseURL: BASE_URL, 
	timeout: TIME_OUT 
})
