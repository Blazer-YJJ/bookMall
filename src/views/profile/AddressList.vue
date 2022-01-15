<template>
    <div class="address-list">
        <nav-bar>
            <template v-slot:center>收货地址</template>
        </nav-bar>
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "AddressList",
    components: {NavBar},
    setup() {
        const router = useRouter();
        const chosenAddressId = ref(1);
        const list = ref([
            {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true
            },
            {
                id: '2',
                name: '李四',
                tel: '1310000000',
                address: '浙江省杭州市拱墅区莫干山路 50 号'
            }
        ]);
        const onAdd = () => {
            Toast('地址新增');
            router.push({path: '/addressedit'});
        };
        const onEdit = (item, index) => {
            Toast('地址修改:' + index);
        };

        return {
            chosenAddressId,
            list,
            onAdd,
            onEdit
        }
    }
}
</script>

<style scoped lang="scss">
.address-list {
    .van-address-list {
        margin-top: 45px;

        /*深度选择器: /deep/*/
        /deep/.van-address-list__bottom {
            position: fixed;
            bottom: 60px;
        }
    }
}
</style>