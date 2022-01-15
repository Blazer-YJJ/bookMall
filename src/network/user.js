import { request } from "./request";

// 获取用户信息
export function getUser() {
	return request({
		url: '/api/user',
		method: 'get'
	});
}

// 账户注册接口
export function register(data) {
	return request({
		url: '/api/auth/register',
		method: 'post',
		data
	});
}

// 账户登陆接口
export function login(data) {
	return request({
		url: '/api/auth/login',
		method: 'post',
		data
	});
}

// 账户退出接口
export function logout(data) {
	return request({
		url: '/api/auth/logout',
		method: 'post',
		data
	});
}