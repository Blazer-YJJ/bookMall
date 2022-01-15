<template>
    <div class="goods-list">
        <goods-list-item v-for="(item, index) in goods" :product="item" :key="index" ></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
    name: "GoodsList",
    props: {
        goods: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;                /* 自动填充换行 */
        justify-content: space-around;  /* 设置四周环绕 */
        padding: 10px;
        margin-bottom: 50px;
    }
</style>