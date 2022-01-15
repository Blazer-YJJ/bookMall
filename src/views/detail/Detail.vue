<template>
    <div class="detail">
        <nav-bar>
            <template v-slot:left></template>
            <template v-slot:center>商品详情-{{ id }}</template>
            <template v-slot:right></template>
        </nav-bar>
        <van-image class="goods-big-img"
            width="100%"
            height="auto"
            lazy-load
            :src="detail.cover_url"
        />
        <van-card style="text-align: left"
            :price="detail.price + '.00'"
            :desc="detail.description"
            :title="detail.title"
        >
            <template #tags>
                <van-tag plain type="danger">新书</van-tag>
                <van-tag plain type="danger">{{ detail.sales > 1 ? 'Hot' : '值得一看' }}</van-tag>
            </template>
            <template #footer>
                <van-button size="mini"><van-button type="warning" @click="handleAddCart">加入购物车</van-button></van-button>
                <van-button size="mini"><van-button type="danger" @click="goToCart">立即购买</van-button></van-button>
            </template>
        </van-card>
        <van-tabs v-model="active">
            <van-tab title="概述">
                <div class="content" v-html="detail.details"></div>
            </van-tab>
            <van-tab title="评论">
                <div class="comments">
                    暂无评论。。。。。
                </div>
            </van-tab>
            <van-tab title="相关商品">
                <goods-list :goods="like_goods"></goods-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted, reactive, toRefs } from "vue";
import { getDetail } from "network/detail";
import { cartAdd } from "network/cart";
import { Toast } from "vant";

export default {
    name: "Detail",
    components: {
        NavBar,
        GoodsList
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        let id = ref(0);
        let goodsName = reactive({
            detail: {},
            like_goods: []
        });
        let active = ref(1);

        onMounted(() => {
            id.value = route.query.id;

            getDetail(id.value).then(res => {
                console.log(res);
                goodsName.detail = res.goods;
                goodsName.like_goods = res.like_goods;
            });
        });
        // 添加购物车
        const handleAddCart = () => {
            cartAdd({goods_id: goodsName.detail.id, num: 1}).then(res => {
                console.log(res);
                if (res.status == '204' || res.status == '201') {
                    Toast.success('商品已添加至购物车');
                    store.dispatch('updateCart');       // 设置store中cartCount的数量
                }
            })
        };
        // 立即购买
        const goToCart = () => {
            cartAdd({goods_id: goodsName.detail.id, num: 1}).then(res => {
                if (res.status == '204' || res.status == '201') {
                    Toast.success('正在跳转购买页面');
                    store.dispatch('updateCart');       // 设置store中cartCount的数量
                    router.push({path: '/shopcart'});
                }
            })
        };

        return {
            id,
            ...toRefs(goodsName),
            active,
            handleAddCart,
            goToCart
        }
    }
}
</script>

<style scoped lang="scss">
    .detail {
        margin-bottom: 45px;

        .goods-big-img {
            margin-top: 45px;
        }
        .comments {
            margin-top: 40px;
        }
    }

</style>