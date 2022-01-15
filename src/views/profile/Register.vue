<template>
    <div class="register">
        <nav-bar>
            <template v-slot:left></template>
            <template v-slot:center>用户注册</template>
            <template v-slot:right></template>
        </nav-bar>
        <div class="content">
            <div class="user-comm">
                <img class="user-logo" src="~assets/images/userLogo.png">
            </div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="name"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="password_confirmation"
                    type="password"
                    name="确认密码"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ required: true, message: '请再次确认输入密码' }]"
                />
                <van-field
                    v-model="email"
                    name="Email"
                    label="Email"
                    placeholder="Email"
                    :rules="[{ required: true, message: '请填写邮箱地址' }]"
                />
                <div style="margin: 16px;">
                    <div class="link-login" @click="toLogin">
                        已有账号，立即登录
                    </div>
                    <van-button round block
                                type="info"
                                native-type="submit"
                                color="#42bbaa"
                    >
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { ref, reactive, toRefs } from 'vue';
import { Notify, Toast } from 'vant';
import { register } from "network/user";
import { useRouter } from "vue-router";

export default {
    name: "Register",
    components: {
        NavBar
    },
    setup() {
        const userInfo = reactive({
            name: '',
            password: '',
            password_confirmation: '',
            email: ''
        });
        const router = useRouter();

        // 用户名：yangjijun 密码: aaaaaa 邮箱：yangjijun@qq.com
        const onSubmit = () => {
            // 表单验证
            if (userInfo.password != userInfo.password_confirmation) {
                Notify({ type: 'danger', message: '两次密码不一致' });
            } else {
                // 提交服务器
                register(userInfo).then(res => {
                    console.log(res);
                    if (res.status == '201') {
                        Toast.success('注册成功！');

                        // 跳转登录界面
                        setTimeout(() => {
                            router.push({path: '/login'});
                        }, 1000);
                    }

                    userInfo.password = '';
                    userInfo.password_confirmation = '';
                });
            }
        }
        const toLogin = () => {
            router.push({path: '/login'});
        }

        return {
            ...toRefs(userInfo),
            onSubmit,
            toLogin
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