<template>
    <div class="home-swiper">
        <van-swipe class="my-swipe" :autoplay="1500" indicator-color="white" v-if="banners.length">
            <van-swipe-item v-for="item in banners" :key="item.id">
                <img v-lazy="item.img_url">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped lang="scss">
.van-swipe-item {
    width: 100%;
    height: 160px;

    img {
        width: 100%;
        height: auto;
    }
}
</style>