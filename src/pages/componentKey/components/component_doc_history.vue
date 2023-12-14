<template>
    <q-card class="my-card mw50vw q-px-md w50vw">
        <q-card-section class="no-padding">
            <div class="row">
                <div class="text-weight-bolder lh50">历史版本</div>
                <q-space />
                <q-btn flat round icon="close" v-close-popup />
            </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-py-md q-gutter-y-md">
            <q-btn color="primary" class="q-mr-md" glossy @click="uploadDoc" label="上传组件文档" />
            <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
                table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom>
                <template v-slot:body-cell-version="props">
                    <q-td :props="props">
                        {{ props.row.version }}
                        <q-chip v-if="props.row.version == detail_obj.enable_version" dense color="orange"
                            text-color="white">当前版本</q-chip>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn color="primary" class="q-mr-md" glossy @click="queryDoc(props.row.path)" label="查看" />
                        <q-btn color="secondary" class="q-mr-md" glossy @click="downloadDoc(props.row)" label="下载" />
                    </q-td>
                </template>
            </q-table>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn v-close-popup color="deep-orange" glossy label="关闭" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import moment from "moment";
import { api_componentKey } from 'src/api';
import { handle_upload } from 'src/api/module/componentKey';

const props = defineProps({ detail_obj: { type: Object } })

const columns = [
    { name: "version", align: "left", label: "版本号", field: "version" },
    { name: "createdAt", align: "left", label: "创建时间", field: "createdAt", format: (v) => (v ? moment(v).format("YYYY-MM-DD HH:mm:ss ") : ""), },
    { name: "handle", align: "left", label: "操作", field: "handle", style: "width: 160px", },
]

const table_data = ref([])

onMounted(() => {
    findHistoryList()
})

/**
 * 查找文档历史版本列表
 */
async function findHistoryList() {
    const { component_name, project } = props.detail_obj
    const { data } = await api_componentKey.handle_read_doc_history({ name: component_name, project })
    table_data.value = data.data
}

/**
 * 查看文档
 *
 * @param {Object} path
 */
function queryDoc(path) {
  open(this.$config.get_cdn_url(path))
}

/**
 * 上传组件文档
 */
async function uploadDoc() {
    const filesHandle = await window.showOpenFilePicker({
        types: [{ accept: { 'application/json': ['.json'] } }],
    });

    const [fileHandle] = filesHandle
    const file = await fileHandle.getFile();

    const formData = new FormData()
    formData.append('file', file)
    formData.append('project', props.detail_obj.project)

    const { data } = await handle_upload(formData)
    props.detail_obj.enable_version = data.data
    findHistoryList()
}

/**
 * 组件文档下载
 *
 * @param {Object} row 
 */
function downloadDoc(row) {
    let url = this.$config.get_cdn_url(row.path)
    fetch(url).then((res) => res.blob().then((blob) => {
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = row.name + '.doc.json'
        a.target = '_blank'
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    }))
}

</script>
