import { request } from "./request";

// 添加地址接口
export function addressAdd(params) {
	return request({
		url: '/api/address',
		method: 'post',
		params
	});
}

// 更新地址接口
export function addressUpdate(id, params) {
	return request({
		url: `/api/address/${id}`,
		method: 'put',
		params
	});
}

// 删除地址接口
export function addressDelete(id) {
	return request({
		url: `/api/address/${id}`,
		method: 'delete'
	});
}

// 地址列表接口
export function addressList() {
	return request({
		url: '/api/address',
		method: 'get'
	});
}

// 地址详情接口
export function addressDetail(id) {
	return request({
		url: `/api/address/${id}`,
		method: 'get'
	});
}

// 默认地址接口
export function addressDefault() {
	return request({
		url: `/api/address/${id}/default`,
		method: 'patch'
	});
}