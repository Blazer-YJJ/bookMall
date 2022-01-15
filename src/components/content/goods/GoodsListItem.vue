<template>
    <div class="goods-list-item" @click="itemClick">
        <img v-lazy="product.cover_url">
        <div class="goods-info">
            <p>{{ product.title }}</p>
            <span class="price"><small>￥</small>{{ product.price }}</span>
            <span class="collect">{{ product.collects_count }}</span>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: "GoodsListItem",
    props: {
        product: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    setup(props) {
        const router = useRouter();

        return {
            itemClick: () => {
                router.push({path: '/detail', query: {id: props.product.id}});
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .goods-list-item {
        width: 46%;
        padding-bottom: 30px;
        position: relative;

        img {
            width: 100%;
            border-radius: 5px;
            margin-bottom: 5px;
        }
        .goods-info {
            font-size: 12px;
            position: absolute;
            bottom: 5px;
            left: 0;
            right: 0;
            overflow: hidden;
            text-align: center;

            p {
                overflow: hidden;
                text-overflow: ellipsis;    /* 设置标题过长省略 */
                margin-bottom: 5px;
            }
            .price {
                color: red;
                margin-right: 50px;
            }
            .collect {
                position: relative;
                color: var(--color-text);
            }
            .collect::before {
                content: '';
                position: absolute;
                left: 10px;
                width: 14px;
                height: 14px;
                background: url('~assets/images/start.png') 0 0/14px 14px;
            }
        }
    }
</style>