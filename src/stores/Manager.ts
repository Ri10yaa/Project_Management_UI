import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useManagerStore = defineStore('manager', () => {
  const managers = ref([])
    const mgrCols = ['Manager ID', 'Name', 'Date of Birth', 'Email']
  const getAllManagers = async () =>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/mgr/all`,{
            headers:{
                'x-api-key': import.meta.env.VITE_API_KEY,
            }
        })
        managers.value = res.data.data
        console.log(managers)
        return res
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
          }
        })
        await getAllManagers()
        return res 
    }catch(error){
      if(axios.isAxiosError(error)){
        return error.response?.data
      }
    }

  }

  return { managers, postMgrdata, getAllManagers, deleteMgr, updateMgr}


})
