<template>
    <q-markup-table v-if="props.detail_obj" dense flat bordered class="text-left">
        <tbody>
            <q-tr v-for="(v, k) in cols" :key="k">
                <q-td class="q-px-md w120">{{ v }}:</q-td>
                <q-td class="q-px-md w100">{{ props.detail_obj[k] }}</q-td>
            </q-tr>
        </tbody>
    </q-markup-table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({ detail_obj: Object })

const cols = { total: '总计', disabled: '禁用', enable: '启用', abandoned: '已废弃' }
</script>

