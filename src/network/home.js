import { request } from './request';

export function getHomeAllData() {
	return request({
		url: '/api/index',
		method: 'get'
	});
}

export function getHomeGoodsData(type='sales', page=1) {
	return request({
		url: '/api/goods?' + type + '=1&page=' + page,
		method: 'get'
	});
}
