<template>
    <div class="address-edit">
        <nav-bar>
            <template v-slot:center>地址编辑</template>
        </nav-bar>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {ref, reactive, onMounted, toRefs} from 'vue';
import {useRouter} from 'vue-router';
import {tdist} from 'utils/address';
import {useStore} from 'vuex';
import {Toast} from 'vant';
import {
    addressAdd,
    addressUpdata,
    addressDelete,
    addressList,
    addressDefault
} from 'network/address';

export default {
    name: "AddressEdit",
    components: {NavBar},
    setup() {
        const router = useRouter();
        const store = useStore();
        const areaList = ref('0');
        const searchResult = ref([]);
        const state = reactive({
            areaList: {
                province_list: {},                  // 省份
                city_list: {},                      // 城市
                county_list: {}                     // 区县
            }
        });

        onMounted(() => {
            // 省市区列表构造
            let _province_list = {};
            let _city_list = {};
            let _county_list = {};

            // 省份
            tdist.getLev1().forEach(province => {
                _province_list[province.id] = province.text;
                // 城市
                tdist.getLev2(province.id).forEach(city => {
                    _city_list[city.id] = city.text;
                    // 区县
                    tdist.getLev3(city.id).forEach(county => {
                        _county_list[county.id] = county.text;
                    });
                });
            });

            state.areaList.province_list = _province_list;
            state.areaList.city_list = _city_list;
            state.areaList.county_list = _county_list;
        });

        const onSave = (content) => {
            const params = {
                name: content.name,                         // 收货名
                phone: content.tel,                         // 联系电话
                province: content.province,                 // 省份
                city: content.city,                         // 城市
                county: content.county,                     // 区县
                address: content.addressDetail,             // 详细地址
                is_default: content.isDefault ? 1 : 0       // 是否为默认地址
            };

            // 添加地址数据
            addressAdd(params);

            Toast.success('保存成功');
            setTimeout(() => {
                router.back();
            }, 1000);
        };
        const onDelete = () => {
            Toast.success("删除成功");
        };
        const onChangeDetail = () => {

        };

        return {
            areaList,
            searchResult,
            onSave,
            onDelete,
            onChangeDetail,
            ...toRefs(state)
        }
    }
}
</script>

<style scoped lang="scss">
.address-edit {
    .van-address-edit {
        margin-top: 50px;
    }
}
</style>