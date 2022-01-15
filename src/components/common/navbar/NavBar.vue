<template>
    <div class="nav-bar">
        <div class="left" @click="goBack">
            <slot name="left" >
                <img src="~assets/images/jiantou.png">
            </slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: "NavBar",
    setup() {
        const router = useRouter();
        const goBack = () => {          // 回退
            router.go(-1);
        };

        return {
            goBack
        }
    }
}
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    background-color: var(--color-height-text);
    height: 45px;
    line-height: 45px;
    color: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    text-align: center;
    box-shadow: 0px 2px 0px rgba(100, 100, 100, 0.15);

    .left {
        img {
            width: 45px;
            padding: 10px;
        }
    }
    .left, .right {
        width: 60px;
    }
    .center {
        flex: 1;
    }
}
</style>