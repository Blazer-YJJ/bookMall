<template>
    <div class="back-top" @click="backtop">

    </div>
</template>

<script>
export default {
    name: "BackTop",
    setup(props, {emit}) {
        return {
            backtop: () => {
                emit('bTop');
            }
        }
    }
}
</script>

<style scoped>
    .back-top {
        width: 40px;
        height: 40px;
        position: fixed;
        bottom: 100px;
        right: 2px;
        background: #FCFCFC url('~assets/images/backTop.png') no-repeat center;
        background-size: 40px;
        z-index: 20;
        box-shadow: 5px 5px 5px #888888;
        border-radius: 50%;
    }
</style>