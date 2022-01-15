import { createStore } from 'vuex';
import mutations from './mutations';
import getter from './getter'
import actions from './actions';

const state = {
	user: {
		isLogin: window.localStorage.getItem('token') ? true : false
	},
	cartCount: 0
};

export default createStore({
	state,
	mutations,
	actions,
	getter
})
