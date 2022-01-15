<template>
    <div class="tab-control">
        <div class="tab-control-item"
             v-for="(item, index) in titles"
             :key="index"
             @click="itemClick(index)"
             :class="{active: index == currentIndex}"
        >
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    setup(props, {emit}) {
        let currentIndex = ref(0);
        const itemClick = (index) => {
            currentIndex.value = index;
            emit('tabClick', index);
        };

        return {
            currentIndex,
            itemClick
        }
    }
}
</script>

<style scoped lang="scss">
    .tab-control {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        width: 100%;
        background-color: #FFFFFF;
        position: sticky;       /* 设置滑动固定 */
        top: 45px;
        z-index: 10;
        box-shadow: 0px 3px 2px rgba(100, 100, 100, 0.15);

        .tab-control-item {
            flex: 1;

            span {
                padding: 5px;
            }
        }
        .active {
            color: var(--color-tint);

            span {
                border-bottom: 3px solid var(--color-tint);
            }
        }
    }
</style>