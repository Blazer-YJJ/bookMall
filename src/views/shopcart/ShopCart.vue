<template>
    <div class="shop-cart">
        <nav-bar>
            <template v-slot:left></template>
            <template v-slot:center>购物车（{{ $store.state.cartCount }}）</template>
            <template v-slot:right></template>
        </nav-bar>
        <div class="cart-box">
            <div class="cart-body">
                <van-checkbox-group ref="checkboxGroup" @change="groupChange" v-model="result">
                    <van-swipe-cell right-width="50" v-for="(item, index) in list" :key="index">
                        <div class="good-item">
                            <van-checkbox :name="item.id" />
                            <div class="good-img"><img src="~assets/images/3.jpg" alt=""></div>
                            <div class="good-desc">
                                <div class="good-title">
                                    <span class="good-name">{{ item.goods.title }}</span>
                                    <span class="good-num">库存：x{{ item.goods.stock }}</span>
                                </div>
                                <div class="good-btn">
                                    <div class="price"><small>￥</small>{{ item.goods.price + '.00' }}</div>
                                    <van-stepper class="sttepper"
                                                 integer :min="1"
                                                 :max="item.goods.stock"
                                                 :model-value="item.num"
                                                 :name="item.id"
                                                 async-change
                                                 @change="onChange"
                                    />
                                </div>
                            </div>
                        </div>
                        <template #right>
                            <van-button square
                                        icon="delete"
                                        type="danger"
                                        class="delete-button"
                                        style="height: 100%"
                                        @click="deleteGoods(item.id)"
                            >
                            </van-button>
                        </template>
                    </van-swipe-cell>
                </van-checkbox-group>
            </div>
            <van-submit-bar class="submit-all"
                            :price="total * 100"
                            button-text="结算"
                            @submit="onSubmit"
                            style="margin-bottom: 60px;"
            >
                <van-checkbox @click="checkAllClick" v-model:checked="checkAll">全选</van-checkbox>
            </van-submit-bar>
            <div class="empty" v-if="!list.length">
                <img class="empty-img" style="width: 100px" src="~assets/images/cart.png" alt="空购物车">
                <div class="title">您的购物车空空如也</div>
                <van-button round color="#10D752" type="primary" block @click="goToHome">前往选购</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { cartList, cartNum, cartDel, cartChecked } from 'network/cart';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { reactive, toRefs, onMounted, computed } from 'vue';
import { Toast } from 'vant';

export default {
    name: "ShopCart",
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        // 数据模型
        const state = reactive({
            list: [],
            result: [],
            checkAll: true
        });
        // 初始化购物车数据
        const init = () => {
            Toast.loading({message: '加载中...', forbidClick: true});

            cartList('include=goods').then(res => {
                state.list = res.data;
                state.result = res.data.filter(n => n.is_checked == 1).map(item => item.id);
                Toast.clear();
            })
        };
        // 异步商品数量修改
        const onChange = (value, detail) => {
            // 减缓修改的速度
            Toast.loading({message: '修改中...', forbidClick: true});

            cartNum(detail.name, {num: value}).then(res => {
                // 将onMounted中的list的的list改变
                state.list.forEach(item => {
                    if (item.id == detail.value) {
                        item.num = value;
                    }
                })

                Toast.clear();
            })
        };
        // 复选框改变处理
        const groupChange = (result) => {
            // 判断商品是否全部勾选
            if (result.length == state.list.length) {
                state.checkAll = true;                          // 商品全选则下方的全选按钮为真
            } else {
                state.checkAll = false;                         // 商品非全选则下方的全选按钮为假
            }

            state.result = result;                              // 将改变的值赋予state.result
            cartChecked({cart_ids: result});                    // 改变数据表中的选中状态
        };
        // 前往购物
        const goToHome = () => {
            router.push({path: '/home'});
        };
        // 商品全选
        const checkAllClick = () => {
            if (!state.checkAll) {
                // 全选，将所有商品复选框全部勾选
                state.result = state.list.map(item => item.id);
                state.checkAll = true;

            } else {
                // 取消全选，取消所有商品复选框的勾选
                state.result = [];
                state.checkAll = false;
            }
        };
        // 商品删除
        const deleteGoods = (id) => {
            cartDel(id).then(res =>{
                init();                                         // 重新初始化
                store.dispatch('updateCart');              // 改变vuex中的状态数量
            })
        };
        // 商品总价计算
        const total = computed(() => {
            let sum = 0;

            state.list.filter(item => state.result.includes(item.id))
                .forEach(item => {
                    sum += parseInt(item.num) * parseFloat(item.goods.price);
                })

            return sum;
        });
        // 提交，创建订单
        const onSubmit = () => {
            if (state.result.length == 0) {
                Toast('请选择至少一件商品下单');
            } else {
                Toast.loading('正在跳转至订单页面');
                router.push({path: '/creatorder'});
            }
        };

        onMounted(() => {
            init();
        });

        return {
            ...toRefs(state),
            goToHome,
            onChange,
            groupChange,
            checkAllClick,
            deleteGoods,
            total,
            onSubmit
        }
    }
}
</script>

<style scoped lang="scss">
    .cart-box {
        .cart-body {
            padding: 45px 0 0 0;

            .van-checkbox-group {
                background-color: #f3f3f3;
                margin-bottom: 20px;
            }

            .good-item {
                display: flex;
                padding-left: 10px;

                .van-checkbox {
                    padding-right: 10px;
                }
                .good-img {
                    img {
                        width: 100px;
                        height: auto;
                    }
                }
                .good-desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex: 1;
                    padding: 20px;

                    .good-title {
                        display: flex;
                        justify-content: space-between;

                        .good-name {
                            flex: 1;
                            width: 120px;
                        }
                        .good-num {
                            flex: 1;
                        }
                    }
                    .good-btn {
                        display: flex;

                        .price {
                            flex: 1;
                        }
                        .sttepper {
                            flex: 1;
                        }
                    }
                }
            }
        }
        .empty {
            padding-top: 100px;

            .title {
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 16px;
                color: #8B7D6B;
            }
            .van-button {
                width: 80%;
                margin: 0 auto;
            }
        }
    }
</style>
