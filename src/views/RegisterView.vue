<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification()
const router = useRouter()
const auth = useAuthStore()

const form = ref({
    username: '',
    password: ''
})
async function submit() {
    const res = await auth.register(form.value)
    if (res !== undefined && !res?.success) {
        res.message.forEach(element => {
            notify({
                text: element.message,
                type: 'error'
            })
        });

    }
    else {
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <div class="form-container">
        <h2> Register </h2>
        <form v-on:submit.prevent="submit">
            <label>
                <span>Username</span>
                <input type="text" v-model="form.username" placeholder="username" />
            </label>

            <label>
                <span>Password</span>
                <input type="password" v-model="form.password" minlength="8" />
            </label>
            <button type="submit">Register</button>
        </form>
    </div>

</template>

<style scoped>
.form-container {
    width: fit-content;
    padding: 40px;
    margin: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #EEEEEE;
    box-shadow: #393E46 0px 5px 15px;
    font-size: large;
    height: 370px;
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
    border-radius: 5px;
    border: none;
}

input:focus {
    outline: 2px solid #00ADB5;
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
    color: #00ADB5;
}
</style>