<template>
    <div>
        <nav-bar>
            <template v-slot:center>个人中心</template>
        </nav-bar>
        <div class="user-cards">
            <div class="user-info">
                <div class="user-logo">
                    <img src="~assets/images/icon.png">
                </div>
                <div class="user-desc">
                    <span>用户名：{{ user.name }}</span><br>
                    <span>邮箱：{{ user.email }}</span><br>
                    <span>个性签名：{{ signature }}</span>
                </div>
            </div>
        </div>
        <ul class="user-list">
            <li class="list-item" @click="goTo('/collection')">
                <span>个人收藏</span>
                <img src="~assets/images/goTo.png">
            </li>
            <li class="list-item" @click="goTo('/orders')">
                <span>个人订单</span>
                <img src="~assets/images/goTo.png">
            </li>
            <li class="list-item" @click="goTo('/account')">
                <span>账号管理</span>
                <img src="~assets/images/goTo.png">
            </li>
            <li class="list-item" @click="goTo('/addresslist')">
                <span>地址管理</span>
                <img src="~assets/images/goTo.png">
            </li>
            <li class="list-item" @click="goTo('/aboutus')">
                <span>关于我们</span>
                <img src="~assets/images/goTo.png">
            </li>
        </ul>
        <div style="width: 90%; margin: 0 auto; padding-top: 10vh">
            <van-button round block color="red" @click="toLogout">
                退出账户
            </van-button>
        </div>

    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {useRouter} from 'vue-router';
import {logout, getUser} from "network/user";
import {Toast} from "vant";
import {useStore} from "vuex";
import {onMounted, reactive, toRefs} from "vue";

export default {
    name: "Profile",
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            user: {}
        });
        const signature = '积极向上';
        // 获取用户信息
        onMounted(() => {
            getUser().then(res => {
                console.log(res);
                state.user = res;
            })
        });
        // 列表跳转
        const goTo = (path, query) => {
            router.push({path, query: query || {}});
        };
        // 账户退出
        const toLogout = () => {
            logout().then(res => {
                if (res.status == '204') {
                    Toast.success('成功退出！');

                    window.localStorage.setItem('token', '');       // 清除token

                    store.commit('setIsLogin', false);

                    setTimeout(() => {
                        router.push({path: '/login'});              // 回到登陆界面
                    }, 1000);
                }
            });
        };

        return {
            signature,
            toLogout,
            ...toRefs(state),
            goTo
        }
    }
}
</script>

<style scoped lang="scss">
.user-cards {
    width: 96%;
    height: 100px;
    background-color: var(--color-height-text);
    margin: 50px auto 0px auto;
    border-radius: 25px;

    .user-info {

        .user-logo {
            float: left;
            margin-left: 10px;
            width: 20%;
            height: 100px;
            line-height: 155px;
        }

        .user-desc {
            float: right;
            text-align: left;
            width: 75%;
            height: 100px;
            line-height: 33px;

            span {
                margin-left: 10px;
                font-size: 16px;
            }
        }
    }
}

.user-list {
    margin: 60px auto 0px auto;
    width: 90vw;
    height: 40vh;
    text-align: left;

    .list-item {
        padding-bottom: 60px;

        span {
            font-size: 16px;
            float: left;
        }

        img {
            float: right;
            width: 20px;
            height: 20px;
        }
    }
}
</style>