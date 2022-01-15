import {request} from './request';

// 添加购物车接口
export function cartAdd(data) {
	return request({
		url: '/api/carts',
		method: 'post',
		data
	});
}

// 购物车列表接口
export function cartList(data = '') {
	return request({
		url: '/api/carts?' + data,
		method: 'get',
		data
	});
}

// 改变购物车商品数量接口
export function cartNum(id, data) {
	return request({
		url: `/api/carts/${id}`,
		method: 'put',
		data
	});
}

// 商品选中接口
export function cartChecked(data) {
	return request({
		url: '/api/carts/checked',
		method: 'patch',
		data
	})
}

// 删除购物车商品接口
export function cartDel(id) {
	return request({
		url: `/api/carts/${id}`,
		method: 'delete'
	});
}
