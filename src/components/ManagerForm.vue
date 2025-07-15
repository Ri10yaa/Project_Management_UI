<script setup>
import { ref, onMounted } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import { useManagerStore } from '@/stores/Manager';

const snackBar = useSnackbar()
const form = ref({})
const isLoading = ref(false);
const mgrStore = useManagerStore()
const isEditing = ref(false)
const editId = ref(-1)

onMounted(async () => {
    try {
        console.log('executed')
        const res = await mgrStore.getAllManagers();
        console.log(mgrStore.managers)
        if (!res.success) {
            snackBar.add({
                type: 'error',
                text: `${res?.message}`
            })
        }
    } catch (error) {
        snackBar.add({
            type: 'error',
            text: `${error.message}`
        })
    }

})


const formatDate = (date) => {
    const d = new Date(date)
    const formatted = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')
        }/${d.getFullYear()}`;
    return formatted

}
const addData = async (data) => {
    data.dob = formatDate(data.dob)
    isLoading.value = true;
    let res = null;
    if(!isEditing){
        res = await mgrStore.postMgrdata(data);
    }
    else{
        console.log("editing")
        res = await mgrStore.updateMgr(editId.value, data)
    }

    if (res?.success) {
        snackBar.add({
            type: 'success',
            text: 'Manager added or updated successfully!'
        })
        resetForm();
    }
    else if (res.status === 422) {
        for (const [key, value] of Object.entries(res.data)) {
            snackBar.add({
                type: 'error',
                text: `${value}`
            })
        }
    }
    else {
        snackBar.add({
            type: 'error',
            text: `${res?.message}`
        })
    }
    isLoading.value = false;
    
}

function resetForm() {
    form.value = {
        mgrName: '',
        dob: null,
        salary: null,
        email: '',
        phno: null
    }
}

function submitForm() {
    addData(form.value)
    
}

async function handleDelete(id) {
    console.log("Deleting:", id)
    const res = await mgrStore.deleteMgr(id);
    if (res?.success) {
        snackBar.add({
            type: 'success',
            text: 'Manager deleted successfully!'
        })
    }
    else {
        snackBar.add({
            type: 'error',
            text: `${res?.message}`
        })
    }
}

async function handleEdit(mgr){
    form.value = mgr
    isEditing.value = true
    editId.value = mgr.mgrId
}

</script>

<template>
    <div style="display: block;">
        <div class="form-container">
            <h2>Add Manager</h2>
            <form v-on:submit.prevent="submitForm">
                <div>
                    <label>
                        Name:
                        <input type="text" v-model="form.mgrName" minlength="3" maxlength="30" required />
                    </label>
                </div>

                <div>
                    <label>
                        Date of Birth:
                        <input type="date" v-model="form.dob" pattern="\d{2}-\d{2}-\d{4}" required />
                    </label>
                </div>

                <div>
                    <label>
                        Email:
                        <input type="email" v-model="form.email" required />
                    </label>
                </div>

                <div>
                    <label>
                        Phone Number:
                        <input type="tel" v-model="form.phno" minlength="10" maxlength="10" required />
                    </label>
                </div>

                <div>
                    <label>
                        Salary:
                        <input type="text" v-model="form.salary" inputmode="numeric" pattern="\d*.\d*" required />
                    </label>
                </div>
                <button type="submit">
                    Submit

                </button>
            </form>
        </div>
        <div class="list-container">
            <table v-if="mgrStore.managers.length > 0">
                <thead>
                    <tr>
                        <th v-for="col in Object.keys(mgrStore.managers[0])" :key="col" style="align-content: center">
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(itm, index) in mgrStore.managers" :key="index">
                        <td v-for="col in Object.keys(mgrStore.managers[0])" :key="itm">{{ itm[col] }}</td>
                        <td> <button style="color: #555879; font-weight: bolder; background: none;"
                                @click="handleEdit(itm)">Edit</button></td>
                        <td> <button style="color: red; background: none; font-weight: bolder;"
                                @click="handleDelete(itm.mgrId)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <vue3-snackbar top right :duration="5000" :limit="80" shadow></vue3-snackbar>
</template>

<style scoped>
.form-container {
    width: fit-content;
    padding: 20px;
    margin: 20px;
    margin-left: -80px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #98a1bc;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
    color: #555879;
}

.form-container h2 {
    color: #555879;
}

form div {
    width: 400px;
}

input {
    padding: 2px;
    width: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    height: 35px;
}

button {
    padding: 8px 12px;
    background-color: #f4ebd3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 60px;
}

button:hover {
    background-color: #F8F8F8;
}

.list-container {
    width: fit-content;
    padding: 20px;
    margin-left: -80px;
    border-radius: 8px;
    background-color: #ded3c4;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
}

table {
    border-radius: 8px;
    border-spacing: 0;
    color: #555879;
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
    background-color: #98a1bc;
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