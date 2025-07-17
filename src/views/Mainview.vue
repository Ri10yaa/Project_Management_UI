<script setup>
import EmployeeForm from '@/components/EmployeeForm.vue';
import ListComp from '@/components/ListComp.vue'
import ManagerForm from '@/components/ManagerForm.vue'
import { useAuthStore } from '@/stores/auth';
import { useEmployeeStore } from '@/stores/Employee';
import { useManagerStore } from '@/stores/Manager'
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useSnackbar } from 'vue3-snackbar';


const snackBar = useSnackbar()
const show = ref('mgr')
const cols = ref([])
const data = ref([])
const isEditing = ref(false)
const editItm = ref({})
const mgrStore = useManagerStore()
const empStore = useEmployeeStore()
const auth = useAuthStore()
const router = useRouter()

auth.me()
console.log(auth.user)
async function logout() {
    await auth.logout()
    router.push({ name: 'login' })
}

onUpdated(async () => {
    try {
        if (show.value === 'mgr') {
            const res = await mgrStore.getAllManagers()
            if (res?.success) {
                cols.value = mgrStore.mgrCols
                data.value = mgrStore.managers
            }
            else {
                snackBar.add({
                    type: 'error',
                    text: `${res?.message}`
                })
            }
        }
        else if (show.value === 'emp') {
            const res = await empStore.getAllEmployees()
            if (res?.success) {
                cols.value = empStore.empCols
                data.value = empStore.employees
            }
            else {
                snackBar.add({
                    type: 'error',
                    text: `${res?.message}`
                })
            }
        }



    } catch (error) {
        snackBar.add({
            type: 'error',
            text: `${error.message}`
        })
    }
})


onMounted(async () => {
    const res = await mgrStore.getAllManagers()
    if (res?.success) {
        cols.value = mgrStore.mgrCols
        data.value = mgrStore.managers
    }
    else {
        snackBar.add({
            type: 'error',
            text: `${res?.message}`
        })
    }
})

const toggleForm = (value) => {
    show.value = value
}

const handleEdit = (obj) => {
    isEditing.value = true;
    editItm.value = obj
}

const handleDel = async (obj) => {
    let msg = '';
    let res = null;
    if (obj.mgrId !== undefined) {
        res = await mgrStore.deleteMgr(obj.mgrId);
        msg = 'Manager deleted successfully'
    }
    else if (obj.empId !== undefined) {
        res = await empStore.deleteEmp(obj.empId);
        msg = 'Employee deleted successfully'
    }
    if (res?.success) {
        snackBar.add({
            type: 'success',
            text: msg
        })
    }
    else {
        snackBar.add({
            type: 'error',
            text: `${res?.message}`
        })
    }
}
</script>

<template>
    <div v-if="auth.user">
        <div class="topbar">
            <form v-on:submit.prevent="logout">
            <button type="submit">Logout</button>
        </form>
        </div>
        <div class="container">
            <div class="navbar">
                <div @click="toggleForm('mgr')">Manager</div>
                <div @click="toggleForm('emp')">Employee</div>
            </div>
            <div class="main">
                <div class="form-container">
                    <ManagerForm v-if="show === 'mgr'" :isEditing="isEditing" :editItm="editItm" />
                    <EmployeeForm v-if="show === 'emp'" :isEditing="isEditing" :editItm="editItm" />
                </div>
                <div class="table-container">
                    <ListComp :cols="cols" :data="data" @editData="handleEdit" @delData="handleDel" />
                    <!-- <Table_cmp v-if="show ==='mgr'" :columns="empStore.empCols" :data="empStore.emps"/>
                <Table_cmp v-if="show === 'emp'" :columns="proCols" :data="pros" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    color: #273f4f;
    background-color: #EEEEEE;
    box-shadow:
        rgba(26, 26, 37, 0.25) 0px 30px 60px -12px,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    border-radius: 5px;
    margin: 10px;
    padding-top: 5px;
    width: fit-content;
}

.topbar{
    width: 100%;
    padding-left: 900px;
    margin:20px;
}

.topbar button{
    background-color: #00ADB5;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  font-weight: medium;
  font-size: large;
}

.topbar button:hover{
    color: #00ADB5;
  background: none;
}

.navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: fit-content;
    margin: 4px;
}

.navbar div {
    width: 100px;
    height: fit-content;
    padding: 4px;
    margin: 0px;
    text-align: center;
}

.navbar div:hover {
    border-bottom: 2px solid #00ADB5;
    border-radius: 2px;
}

.main {
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 10px;
}
</style>
