<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import { useEmployeeStore } from '@/stores/Employee';

const snackBar = useSnackbar()
const form = ref({})
const isLoading = ref(false);
const empStore = useEmployeeStore()

const props = defineProps(['isEditing', 'editItm'])
const isEditing = ref(props.isEditing)
const editItm = ref(props.editItm)
const emit = defineEmits(['dataUpdated'])

watchEffect(()=>{
    resetForm()
    isEditing.value = props.isEditing
    editItm.value = props.editItm
    form.value = editItm.value
    if (editItm.value) {
        form.value = { ...editItm.value } 
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
    console.log(data.dob)
    isLoading.value = true;
    let res = null;

    if (!isEditing.value) {
        res = await empStore.postEmpdata(data);
    }
    else {
        res = await empStore.updateEmp(editItm.value.empId, data)
    }

    if (res?.success) {
        console
        snackBar.add({
            type: 'success',
            text: 'Employee added or updated successfully!'
        })
        emit('dataUpdated')
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
        empName: '',
        dob: null,
        salary: null,
        email: '',
        phno: null,
        designation: '',
        mgrId: null
    }
}

function submitForm() {
    addData(form.value)
}

</script>

<template>
    <div style="display: block;">
        <div class="form-container">
            <h2>Add Employee</h2>
            <form v-on:submit.prevent="submitForm">
                <div>
                    <label>
                        Name:
                        <input type="text" v-model="form.empName" minlength="3" maxlength="30" required />
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

                <div>
                    <label>
                        Designation:
                        <input type="text" v-model="form.designation" required />
                    </label>
                </div>

                <div>
                    <label>
                        Manager ID:
                        <input type="number" v-model="form.mgrId" required />
                    </label>
                </div>
                <button type="submit">
                    Submit

                </button>
            </form>
        </div>
    </div>

    <vue3-snackbar top right :duration="5000" :limit="80" shadow></vue3-snackbar>
</template>

<style scoped>
.form-container {
    width: fit-content;
    padding: 10px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #EEEEEE;
    font-size: large;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
    color: #222831;
}

.form-container h2 {
    color: #222831;
    margin-top: -25px;
    font-size: 24px;
}

form div {
    width: 350px;
}

input {
    padding: 2px;
    width: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    height: 35px;
    border-radius: 5px;
    border: none;
}
input:focus{
    outline: 2px solid #00ADB5 ;
}

button {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #00ADB5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;
    font-size: 17px;
    margin-top: 10px;
}

button:hover {
    background: none;
    color: #00ADB5 ;
}

</style>