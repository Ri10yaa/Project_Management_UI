<script setup>
import { defineEmits, watchEffect } from 'vue';
import { ref } from 'vue';

const emit = defineEmits(['editData', 'editEmp', 'delEmp'])
const props = defineProps(['cols', 'data', 'table'])

const columns = ref([...props.cols])
const data = ref([...props.data])

function delData(obj){
    if(props.table === 'mgr'){
        emit('delMgr',obj)
    }
    else if(props.table === 'emp'){
        emit('delEmp',obj)
    }
}

watchEffect(() => {
    columns.value = [...props.cols]
    data.value = [...props.data]
})

</script>

<template>
    <h2 style="margin-left: 30px; margin-bottom: 10px;">{{  props.table === 'mgr' ? 'Managers' : 'Employees'  }}</h2>
    <div class="list-container"  v-if="data.length > 0">
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.key" style="align-content: center">
                        {{ col.label }}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="itm in data" :key="itm.mgrId">
                    <td v-for="col in columns" :key="col.key">{{ itm[col.key] === null ? 'NULL' : itm[col.key] }}</td>
                    <td> <span><button style="color: #222831; font-weight: bolder; background: none; border: none;"
                                @click="emit('editData',itm)">Edit</button> </span>
                        <span><button style="color: #00ADB5; background: none; font-weight: bolder; border: none;"
                                @click="delData(itm)">Delete</button></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else style="margin: 20px;">
        No {{ props.table === 'mgr' ? 'Managers' : 'Employees' }} found!
    </div>
</template>

<style scoped>
.list-container {
    width: fit-content;
    padding: 20px;
    border-radius: 8px;
    background-color: #393e4647;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
}

table {
    border-radius: 8px;
    border-spacing: 0;
    color: #222831;
    margin-top: 10px;
}

td {
    padding: 10px;
    width: inherit;
    text-align: center;
}

tr {
    width: inherit;
    padding: 20px;
}

thead tr {
    background-color: #00ADB5;
    font-size: 16px;
    font-style: normal;
    font: 1em sans-serif;
    gap: 0;
    height: 30px;
}

thead th {
    padding: 10px;
}

thead tr:first-child th:first-child {
    border-top-left-radius: 8px;
}

thead tr:first-child th:last-child {
    border-top-right-radius: 8px;
}

tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}

tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
}

thead th:not(:last-child) {
    border-right: 1px solid black;
}

tbody tr:not(:last-child) {
    border-bottom: 1px solid #555879;
}
</style>