<template>
    <div id="home">
        <nav-bar>
            <template v-slot:center>BLAZER商城</template>
        </nav-bar>

        <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>

        <div class="wrapper">
            <div class="content">
                <div ref="banref">
                    <home-swiper :banners="banners"></home-swiper>
                    <recommend-view :recommends="recommends"></recommend-view>
                </div>
                <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
                <goods-list :goods="showGoods"></goods-list>
            </div>
        </div>

        <back-top v-show="isBackTopShow" @bTop="bTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from "./ChildComps/HomeSwiper";
import NavBar from "components/common/navbar/NavBar";
import RecommendView from "./ChildComps/RecommendView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/common/backtop/BackTop";
import { getHomeAllData, getHomeGoodsData } from "../../network/home";
import BScroll from 'better-scroll';
import ObserveDom from '@better-scroll/observe-dom';
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from 'vue';

export default {
    name: "Home",
    setup() {
        const recommends = ref([]);
        // 商品列表数据模型
        let goods = reactive({
            sales: {page: 1, list: []},
            recommend: {page: 1, list: []},
            price: {page: 1, list: []}
        });
        let currentType = ref('sales');
        const showGoods = computed(() => {
            return goods[currentType.value].list;           // 只访问list列表
        });
        BScroll.use(ObserveDom);
        let bscroll = reactive({});
        let isTabFixed = ref(false);
        let isBackTopShow = ref(false);
        let banref = ref(null);
        let banners = ref([]);                        // 轮播图

        onMounted(() => {
            getHomeAllData().then(res => {
               recommends.value = res.goods.data;
               banners.value = res.slides;
            });

            getHomeGoodsData('sales').then(res => {
                goods.sales.list = res.goods.data;
            });

            getHomeGoodsData('recommend').then(res => {
                goods.recommend.list = res.goods.data;
            });

            getHomeGoodsData('price').then(res => {
               goods.price.list = res.goods.data;
            });

            // 创建BetterScroll对象
            bscroll = new BScroll(document.querySelector('.wrapper'), {
                probeType: 3,       // 0、1、2、3：只要在运动就会触发Scroll事件
                click: true,        // 是否允许点击
                pullUpLoad: true,   // 上拉加载更多，默认是false
                ObserveDom: true
            });

            // 触发滚动事件
            bscroll.on('scroll', (position) => {
                // 设置设置返回顶部、滚动固定
                isBackTopShow.value = isTabFixed.value = (-position.y) > banref.value.offsetHeight;
            });

            // 上拉触发事件pullingUp
            bscroll.on('pullingUp', () => {
                bscroll.refresh();
                const page = goods[currentType.value].page + 1;

                getHomeGoodsData(currentType.value, page).then(res => {
                    goods[currentType.value].list.push(...res.goods.data);
                    goods[currentType.value].page += 1;
                });

                // 完成上拉，等待数据请求成功并将新数据展示
                bscroll.finishPullUp();

                // 重新计算高度
                bscroll.refresh();
            });
        });

        const tabClick = (index) => {
            let types = ['sales', 'recommend', 'price'];

            currentType.value = types[index];       // 选择商品内容

            nextTick(() => {
                // 重新计算高度
                bscroll && bscroll.refresh();
            });
        };

        // 监听任何一个变量的变化
        watchEffect(() => {
            nextTick(() => {
                // 重新计算高度
                bscroll && bscroll.refresh();
            });
        });

        // 返回顶部
        const bTop = () => {
            bscroll.scrollTo(0, 0, 1000);     // 滚动到0，0坐标,1000:1秒
        };

        return {
            recommends,
            tabClick,
            goods,
            showGoods,
            isTabFixed,
            isBackTopShow,
            banref,
            bTop,
            banners
        }
    },
    components: {
        HomeSwiper,
        NavBar,
        RecommendView,
        TabControl,
        GoodsList,
        BackTop
    }
}
</script>

<style scoped>
    #home {
        height: 100vh;
        position: relative;
    }
    .wrapper {
        position: absolute;
        top: 45px;
        bottom: 50px;
        left: 0px;
        right: 0px;
        overflow: hidden;
    }
    .content {

    }
    .banners img {
        width: 100%;
        height: auto;
        margin-top: 45px;
    }
</style>