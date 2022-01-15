<template>
    <div class="categord">
        <nav-bar>
            <template v-slot:left></template>
            <template v-slot:center>商品分类</template>
        </nav-bar>
        <div id="main-box">
            <!-- 商品排序 -->
            <div class="order-tab">
                <van-tabs v-model="active" @click="clickTab">
                    <van-tab title="销量"></van-tab>
                    <van-tab title="价格"></van-tab>
                    <van-tab title="评论"></van-tab>
                </van-tabs>
            </div>
            <!-- 左选项卡 -->
            <van-sidebar class="left-menu" v-model="activeKey">
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item v-for="itemFather in categories.slice(0, 4)"
                                       :key="itemFather.id"
                                       :title="itemFather.name"
                                       :name="itemFather.name"
                    >
                        <van-sidebar-item v-for="itemSon in itemFather.children"
                                          :key="itemSon.id"
                                          :title="itemSon.name"
                                          @click="getGoods(itemSon.id)"
                        />
                    </van-collapse-item>
                </van-collapse>
            </van-sidebar>
            <!-- 右排序以及商品内容 -->
            <div class="goods-list">
                <div class="content">
                    <van-card class="book-item"
                        v-for="item in showGoods"
                        :key="item.id"
                        @click="itemClick(item.id)"
                        :num="item.comments_count"
                        :tag="item.comments_count >= 0 ? 'Hot' : 'Good'"
                        :price="item.price"
                        desc="这是一本值得购买的书"
                        :title="item.title"
                        :thumb="item.cover_url"
                        :lazy-load="true"
                        origin-price="199"
                    />
                </div>
            </div>
        </div>
        <back-top @click="bTop" v-show="isBackTopShow"></back-top>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import BScroll from 'better-scroll';
import BackTop from "components/common/backtop/BackTop";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from 'vue';
import { getCategory, getCategoryGoods } from "network/category";
import { useRouter } from 'vue-router';
import { getHomeGoodsData } from "network/home";

export default {
    name: "CateGory",
    components: {
        NavBar,
        BackTop
    },
    setup() {
        let activeKey = ref(0);
        let categories = ref([]);
        let activeNames = ref(1);
        let active = ref(1);
        // 当前的排序
        let currentOrder = ref('sales');
        // 当前的分类id
        let currentCid = ref(0);
        // 数据模型
        const goods = reactive({
            sales: {page: 1, list: []},
            price: {page: 1, list: []},
            comments_count: {page: 1, list: []}
        });
        let isBackTopShow = ref(false);
        const router = useRouter();

        // 显示数据
        const showGoods = computed(() => {
            return goods[currentOrder.value].list;
        });

        // 获取数据
        const init = () => {
            getCategoryGoods('sales', currentCid.value).then(res => {
                goods.sales.list = res.goods.data;
            });

            getCategoryGoods('price', currentCid.value).then(res => {
                goods.price.list = res.goods.data;
            });

            getCategoryGoods('comments_count', currentCid.value).then(res => {
                goods.comments_count.list = res.goods.data;
            });
        };

        let bscroll = reactive({});

        // 挂载
        onMounted(() => {
            getCategory().then(res => {
                categories.value = res.categories;
            });

            init();

            // 创建BetterScroll对象
            bscroll = new BScroll(document.querySelector('.goods-list'), {
                probeType: 3,
                click: true,
                pullUpLoad: true
            });

            // 注册滚动事件
            bscroll.on('scroll', (position) => {
                isBackTopShow.value = (-position.y) > 300;
            });

            // 上拉加载数据
            bscroll.on("pullingUp",() => {
                const page = goods[currentOrder.value].page + 1;

                getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
                    goods[currentOrder.value].list.push(...res.goods.data);
                    goods[currentOrder.value].page += 1;
                });

                // 完成上拉，等待数据请求完成，要将新数据展示出来
                bscroll.finishPullUp();

                // 重新计算高度
                nextTick(() => {
                    // 重新计算高度
                    bscroll && bscroll.refresh();
                });

                // return page;
            });
        });

        // 排序选项卡
        const clickTab = (index) => {
            let orders = ['sales', 'price', 'comments_count'];

            currentOrder.value = orders[index];

            getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
                goods[currentOrder.value].list = res.goods.data;

                nextTick(() => {
                    // 重新计算高度
                    bscroll && bscroll.refresh();
                });
            });
        };

        // 通过分类获取商品
        const getGoods = (cid) => {
            init();
            currentCid.value = cid;
        };

        // 监听
        watchEffect(() => {
           nextTick(() => {
               // 重新计算高度
               bscroll && bscroll.refresh();
           });
        });

        // 返回顶部
        const bTop = () => {
            bscroll.scrollTo(0, 0, 1000);
        };

        return {
            activeKey,
            categories,
            activeNames,
            active,
            clickTab,
            currentOrder,
            getGoods,
            currentCid,
            goods,
            showGoods,
            bscroll,
            isBackTopShow,
            bTop,
            itemClick:(id) => {
                router.push({path: '/detail', query:{id}});
            },
        }
    }
}
</script>

<style scoped lang="scss">
.categord {
    #main-box {
        margin-top: 45px;
        display: flex;

        .order-tab {
            flex: 1;
            //background-color: #2c3e50;
            height: 50px;
            //width: 100%;
            z-index: 10;
            position: fixed;
            top: 45px;
            right: 0;
            left: 130px;
        }

        .left-menu {
            position: fixed;
            left: 0;
            top: 95px;
            //background-color: hotpink;
            width: 130px;
        }

        .goods-list {
            flex: 1;
            //background-color: orange;
            height: 200px;
            position: absolute;
            top: 95px;
            left: 130px;
            right: 0;
            height: 100vh;

            .content {
                padding-bottom: 45px;
            }
        }
    }
}

</style>