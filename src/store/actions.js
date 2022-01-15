import { cartList } from "../network/cart";

const actions = {
	updateCart({commit}) {
		cartList().then(res => {
			commit('addCart', {count: res.data.length || 0});
		})
	}
};

export default actions;