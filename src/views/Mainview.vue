<script setup>
import EmployeeForm from '@/components/EmployeeForm.vue';
import ListComp from '@/components/ListComp.vue'
import ManagerForm from '@/components/ManagerForm.vue'
import Topbar from '@/components/Topbar.vue';
import { useAuthStore } from '@/stores/auth';
import { useEmployeeStore } from '@/stores/Employee';
import { useManagerStore } from '@/stores/Manager'
import { onMounted, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification()
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

const fetchData = async () => {
    try {
        if (show.value === 'mgr') {
            const res = await mgrStore.getAllManagers()
            if (res.success) {
                cols.value = mgrStore.mgrCols
                data.value = mgrStore.managers
            } else {
                notify({
                    text: `${res.message}`,
                    type: 'error'
                })
            }
        } else if (show.value === 'emp') {
            const res = await empStore.getAllEmployees()
            if (res.success) {
                cols.value = empStore.empCols
                data.value = empStore.employees
            } else {
                notify({
                    text: `${res.message}`,
                    type: 'error'
                })

            }
        }
    } catch (error) {
        notify({
            text: `${error.message}`,
            type: 'error'
        })
    }
}

watchEffect(async () => {
    fetchData()
})


onMounted(async () => {
    const res = await mgrStore.getAllManagers()
    if (res.success) {
        cols.value = mgrStore.mgrCols
        data.value = mgrStore.managers
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
})

const toggleForm = (value) => {
    show.value = value
    fetchData()
}

const handleEdit = (obj) => {
    isEditing.value = true;
    editItm.value = obj
}

const handleMgrDel = async (obj) => {
    const res = await mgrStore.deleteMgr(obj.mgrId);
    if (res.success) {
        notify({
            text: 'Manager deleted successfully!',
            type: 'success'
        })
        fetchData()
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }

}

const handleEmpDel = async (obj) => {
    const res = await empStore.deleteEmp(obj.empId);
    if (res.success) {
        notify({
            text: 'Employee deleted successfully!',
            type: 'success'
        })
        fetchData()
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
}

const handleUpdate = () => {
    isEditing.value = false
    editItm.value = {}
    fetchData();
}

</script>

<template>
    <div v-if="auth.user">
        <Topbar @changeTable="toggleForm" />
        <div class="container">
            <div class="main">
                <div>
                    <ManagerForm v-if="show === 'mgr'" :isEditing="isEditing" :editItm="editItm"
                        @dataUpdated="handleUpdate" />
                    <EmployeeForm v-if="show === 'emp'" :isEditing="isEditing" :editItm="editItm"
                        @dataUpdated="handleUpdate" />
                </div>
                <div class="vl"></div>
                <div>
                    <ListComp :table="show" :cols="cols" :data="data" @editData="handleEdit" @delMgr="handleMgrDel"
                        @delEmp="handleEmpDel" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    color: #273f4f;
    background-color: #EEEEEE;
    box-shadow:
        rgba(26, 26, 37, 0.25) 0px 30px 60px -12px,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    border-radius: 5px;
    margin-left: -100px;
    padding-top: 5px;
    width: fit-content;
    margin-top: 70px;
    margin-bottom: 10px;
}



.vl {
    border-left: 2px solid #393e4647;
    height: auto;
    left: 50%;
    margin-left: -3px;
    top: 0;
    margin-bottom: 50px;
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
    flex-direction: row;
    padding: 5px;
    margin: 10px;
}
</style>