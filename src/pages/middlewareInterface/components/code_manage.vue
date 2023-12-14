<template>
    <q-card class="my-card mw60vw q-px-md w60vw">
        <q-card-section class="no-padding">
            <div class="row">
                <div class="text-weight-bolder lh40">code 码管理</div>
                <q-space />
                <q-btn flat round icon="close" v-close-popup />
            </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-py-md q-gutter-y-md">
            <q-btn color="secondary" glossy class="q-mr-md" @click="add_one_data" label="新建" />
            <table class="table_layout q-table q-table__card">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>code码</th>
                        <th>描述</th>
                        <th>排序</th>
                        <th style="width:100px">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, i) in table_data" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td><q-input v-model="v.code" class="col" filled dense /></td>
                        <td><q-input v-model="v.desc" class="col" filled dense /></td>
                        <td><q-input v-model.number="v.order" type="number" class="col" filled dense /></td>
                        <td>
                            <q-btn color="deep-orange" glossy v-if="$config.show_delete" @click="handle_delete(i)"
                                label="删除" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn color="primary" @click="handle_conform_edit" label="确定" />
            <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    emits: ['emit-edit'],

    props: { interface: Object },

    data: () => ({ table_data: [] }),

    created() {
        this.table_data = structuredClone(this.interface.code_state_list)
    },

    methods: {
        add_one_data() {
            this.table_data.push({ code: '', desc: '', order: 1 })
        },

        handle_delete(index) {
            this.table_data.splice(index, 1)
        },

        validataInputs() { },

        handle_conform_edit() {
            this.$emit('emit-edit', { id: this.interface.id, code_state_list: this.table_data.sort((v1, v2) => v1.order - v2.order) })
        },

        handle_cancel_edit() { },
    }
}

</script>

<style lang="scss" scoped>
.table_layout {
    td {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
}
</style>