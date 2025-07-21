import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useManagerStore = defineStore('manager', () => {

  const managers = ref([])
  const mgrCols = [
    {label: 'Manager ID', key: 'mgrId'},
    {label: 'Manager Name', key: 'mgrName'},
    {label: 'Date of Birth', key: 'dob'},
    {label: 'Email', key: 'email'},
    {label: 'Phone', key: 'phno'},
    {label: 'Salary', key: 'salary'},
]
  const token = ref(localStorage.getItem('token'))


  const getAllManagers = async () =>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/mgr/all`,{
            headers:{
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Authorization': `Bearer ${token.value}`,
            }
        })
        managers.value = res.data.data
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data
        }
    }
  }

  const getAllMgrIds = async () =>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/mgr/all/id`,{
            headers:{
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Authorization': `Bearer ${token.value}`,
            }
        })
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data
        }
    }
  }

  const postMgrdata = async (data: {
    mgrName: string
    dob: Date
    salary: number
    phno: number
    email: string
  }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/mgr`, data, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Authorization': `Bearer ${token.value}`,
        },
      })
      await getAllManagers()
      return res.data

    } catch (error) {
      let validationErrors = Object()
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response?.data
        errors.forEach((element : {field: string, message: string}) => {
          validationErrors[element.field] = element.message
        })

        return { success: false, status: 422, data: validationErrors }
      } else if (axios.isAxiosError(error)) {
        return error.response?.data
      }
    }
  }

  const updateMgr = async (id: number, data:{
    mgrName: string
    dob: Date
    salary: number
    phno: number
    email: string
  }) =>{
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/mgr/${id}`, data, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Authorization': `Bearer ${token.value}`,
        },
      })
      console.log("Entered into store function")
      await getAllManagers()
      return res.data
    } catch (error) {
      let validationErrors = Object()
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response?.data
        errors.forEach((element : {field: string, message: string}) => {
          validationErrors[element.field] = element.message
        })

        return { success: false, status: 422, data: validationErrors }
      } else if (axios.isAxiosError(error)) {
        return error.response?.data
      }
    }
  }

  const deleteMgr = async (id: number) =>{
    try{
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/mgr/${id}`,{
          headers:{
            'x-api-key': import.meta.env.VITE_API_KEY,
            'Authorization': `Bearer ${token.value}`,
          }
        })
        await getAllManagers()
        return res.data 
    }catch(error){
      if(axios.isAxiosError(error)){
        return error.response?.data
      }
    }

  }

  return { managers, mgrCols, postMgrdata, getAllManagers, deleteMgr, updateMgr, getAllMgrIds }


})
