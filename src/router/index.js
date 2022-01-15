import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('../views/home/Home');                    // 首页
const Detail = () => import('../views/detail/Detail');              // 商品详情
const Profile = () => import('../views/profile/Profile');           // 用户中心
const Register = () => import('../views/profile/Register');         // 用户注册
const Login = () => import('../views/profile/Login');               // 用户登陆
const ShopCart = () => import('../views/shopcart/ShopCart');        // 购物车
const CateGory = () => import('../views/category/CateGory');        // 商品分类
const AddressList = () => import('../views/profile/AddressList');   // 收货地址管理
const AddressEdit = () => import('../views/profile/AddressEdit');   // 收货地址编辑
import store from '../store';
import { Notify } from "vant";

const routes = [
	{
		path: '/',
		name: 'DefaultHome',
		component: Home,
		meta: {
			title: 'BLAZER商城-首页'
		}
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			title: 'BLAZER商城-首页'
		}
	},
	{
		path: '/detail',
		name: 'Detail',
		component: Detail,
		meta: {
			title: 'BLAZER商城-商品详情'
		}
	},
	{
		path: '/category',
		name: 'CateGory',
		component: CateGory,
		meta: {
			title: 'BLAZER商城-商品分类'
		}
	},
	{
		path: '/shopcart',
		name: 'ShopCart',
		component: ShopCart,
		meta: {
			title: 'BLAZER商城-购物车',
			isAuthRequired: true
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: {
			title: 'BLAZER商城-个人中心',
			isAuthRequired: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			title: 'BLAZER商城-用户注册'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			title: 'BLAZER商城-用户登陆'
		}
	},
	{
		path: '/addresslist',
		name: 'AddressList',
		component: AddressList,
		meta: {
			title: 'BLAZER商城-收货地址'
		}
	},
	{
		path: '/addressedit',
		name: 'AddressEdit',
		component: AddressEdit,
		meta: {
			title: 'BLAZER商城-地址编辑'
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});
// 在跳转之前  路由守卫
router.beforeEach((to, from, next) => {
	// 设置网页标题名称
	document.title = to.meta.title;
	// 判断需要授权并且未登录
	if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
		Notify('尚未登陆，请您先登录');
		return next('/login');
	} else {
		next();
	}
});

export default router
