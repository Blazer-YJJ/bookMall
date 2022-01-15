import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, Collapse, CollapseItem, Tab, Tabs,
	Card, Image as VanImage, Tag, Button, Form, Field, Toast, Checkbox, CheckboxGroup, Stepper, SwipeCell,
	SubmitBar, AddressEdit, AddressList } from 'vant';
createApp(App)
	.use(Swipe)
	.use(SwipeItem)
	.use(Lazyload, {loading: require('./assets/images/default.png')})
	.use(Sidebar)
	.use(SidebarItem)
	.use(Collapse)
	.use(CollapseItem)
	.use(Tab)
	.use(Tabs)
	.use(Card)
	.use(VanImage)
	.use(Tag)
	.use(Button)
	.use(Form)
	.use(Field)
	.use(Toast)
	.use(Checkbox)
	.use(CheckboxGroup)
	.use(Stepper)
	.use(SwipeCell)
	.use(SubmitBar)
	.use(AddressEdit)
	.use(AddressList)
	.use(Badge)
	.use(store)
	.use(router)
	.mount('#app')
