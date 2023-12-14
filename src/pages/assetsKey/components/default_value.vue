<script>
import { createVNode as h } from 'vue'
import { api_clientVersion } from 'src/api/index.js'

export default {
    props: { value: String, project: Number },

    data: () => ({ cache_image_prefix: '' }),

    render() {
        if (this.value.startsWith('url(')) {
            if (!this.cache_image_prefix) return
            return h('img', {
                class: 'thumbnail_image',
                width: '50',
                height: '50',
                src: this.cache_image_prefix
                    + this.value
                        .replace(/url\(|"|\)/g, '')
                        .replace(/\/\d{4}(-\d{2}){5}\//, '/')
            })
        } else if (/^#[a-fA-F0-9]{3,6}|^rgba/.test(this.value)) {
            return h('div', { class: 'block_color', style: { backgroundColor: this.value } })
        } else if (/^linear\-gradient/.test(this.value)) {
            return h('div', { class: 'block_color', style: { backgroundImage: this.value } })
        }
        return
    },

    created() {
        this.get_client_version_url()
    },

    methods: {

        /**
         * 获取 客户端  h5 版本
         */
        async get_client_version_url() {
            const url = await api_clientVersion.handle_read({ 1: 'h5', 2: 'pc' }[this.project])
            this.cache_image_prefix = url
        },

    }
};
</script>

<style scoped>
.block_color {
    width: 50px;
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 5px;
}
</style>