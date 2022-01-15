<template>
    <div class="home">
        {{ banner }}
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getHomeAllData } from '../network/home';
// @ is an alias to /src

export default {
    name: 'Home',
    setup() {
        const banner = ref([]);

        onMounted(() => {
            getHomeAllData().then(res => {
                banner.value = res.slides;
            }).catch(err => {

            })
        });

        return {
            banner
        }
    },
    components: {}
}
</script>
