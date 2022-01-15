<template>
    <div class="register">
        <nav-bar>
            <template v-slot:center>用户登陆</template>
        </nav-bar>
        <div class="content">
            <div class="user-comm">
                <img class="user-logo" src="~assets/images/userLogo.png">
            </div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="email"
                    name="email"
                    label="email"
                    placeholder="email"
                    :rules="[{ required: true, message: '请填写邮箱地址' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <div class="link-login" @click="toRegister">
                        没有账号？立即注册
                    </div>
                    <van-button round block
                                type="info"
                                native-type="submit"
                                color="#42bbaa"
                    >
                        立即登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { reactive, toRefs } from "vue";
import { Toast } from "vant";
import { login } from "network/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: "Login",
    components: {
        NavBar
    },
    setup() {
        const userInfo = reactive({
            email: '',
            password: ''
        });
        const router = useRouter();
        const store = useStore();
        const onSubmit = () => {
            login(userInfo).then((res) => {
                console.log(res);
                // 将token保存至本地 window.localStorage setItem(key, value) getItem(key)
                window.localStorage.setItem('token', res.access_token);
                // 在Vuex中临时保存 isLogin
                store.commit('setIsLogin', true);

                Toast.success('登陆成功！');
                // 登陆完成后清空表单
                userInfo.email = '';
                userInfo.password = '';

                setTimeout(() => {
                    router.go(-1);
                }, 1000);
            });
            // router.push({path: '/profile'});
        }
        const toRegister = () => {
            router.push({path: '/register'});
        }

        return {
            ...toRefs(userInfo),
            onSubmit,
            toRegister
        }
    }
}
</script>

<style scoped lang="scss">
    .register {
        .content {
            margin-top: 50px;

            .user-comm {
                text-align: center;
                margin-bottom: 100px;

                .user-logo {
                    margin-top: 50px;
                }
            }
            .link-login {
                font-size: 14px;
                margin-bottom: 20px;
                color: #42b983;
                display: inline-block;
            }
        }
    }
</style>