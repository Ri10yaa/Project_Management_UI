<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const auth = useAuthStore()
const emit = defineEmits(['changeTable'])

function toggleForm(value){
    emit('changeTable',value);
}

async function logout() {
    await auth.logout()
    router.push({ name: 'login' })
}
</script>

<template>
     <div class="topbar">
        <p style="font-size: 24px;"> Project Management Portal</p>
        <div class="navbar">
                <div @click="toggleForm('mgr')">Manager</div>
                <div @click="toggleForm('emp')">Employee</div>
            </div>
            <form v-on:submit.prevent="logout" style="padding-left: 700px;">
            <button type="submit">Logout</button>
        </form>
        </div>
</template>

<style scoped>
/* .topbar{
    width: 100%;
    padding-left: 900px;
    margin-top: -57px ;
    margin-bottom:20px;
    color: black;
    position: sticky;
    border: 2px solid black;
} */

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #bebebe; /* or your desired color */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  z-index: 1000; /* makes sure it's on top */
  display: flex;
  justify-content:left;
  align-items: center;
  padding: 0 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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
  font-size: 16px;
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
    padding-left: 100px;
}

.navbar div {
    width: 100px;
    height: fit-content;
    padding: 4px;
    margin: 0px;
    text-align: center;
    font-size: 17px;
}

.navbar div:hover {
    border-bottom: 2px solid #00ADB5;
    border-radius: 2px;
}
</style>


<!-- <style scoped>
.topbar {
  width: 100%;
  background-color: black;
  padding: 16px;
  display: block;
  justify-content: flex-end;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  z-index: 1;
}

.logout-btn {
  background-color: #00bcd4;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.logout-btn:hover {
  background-color: #0097a7;
}
</style> -->