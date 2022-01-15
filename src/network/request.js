import axios from 'axios';
import router from "../router";
import {Notify, Toast} from "vant";

export function request(config) {
	// 基础rul
	const instance = axios.create({
		baseURL: 'https://api.shop.eduwork.cn/',
		timeout: 5000
	});
	
	// 请求拦截
	instance.interceptors.request.use(config => {
		// 需要认证的接口，在这设置
		const token = window.localStorage.getItem('token');     // 获取token的值
		
		if (token) {
			config.headers.Authorization = 'Bearer ' + token;
		}
		
		return config;                                              // 放行
	}, error => {
	
	})
	
	// 响应拦截
	instance.interceptors.response.use(res => {
		return res.data ? res.data : res;
	}, err => {
		// 未授权 自动跳转至login
		if (err.response.status == '401') {
			Toast.fail('未登录，请您先登录');
			
			setTimeout(() => {
				router.push({path: '/login'});
			}, 1000);
		}
		
		// 错误提示  获取第一个错误反馈用户
		Notify({
			type: 'danger',
			message: err.response.data.errors[Object.keys(err.response.data.errors)[0][0]]
		});
	})
	
	return instance(config);
	
}