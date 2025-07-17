import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const empCols = [
    {label: 'Employee Name', key: 'empName'},
    {label: 'Date of Birth', key: 'dob'},
    {label: 'Email', key: 'email'},
    {label: 'Phone', key: 'phno'},
    {label: 'Salary', key: 'salary'},
    {label:'Designation', key: 'designation'},
    {label:'Manager ID',key:'mgrId'}
]


  const getAllEmployees = async () =>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/emp/all`,{
            headers:{
                'x-api-key': import.meta.env.VITE_API_KEY,
            }
        })
        employees.value = res.data.data
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data
        }
    }
  }

  const postEmpdata = async (data: {
    empName: string
    dob: Date
    salary: number
    phno: number
    email: string
    des: string
    mgrId: number
  }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/emp`, data, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      })
      await getAllEmployees()
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

  const updateEmp = async (id: number, data:{
    empName: string
    dob: Date
    salary: number
    phno: number
    email: string
    des: string
    mgrId: number
  }) =>{
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/emp/${id}`, data, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      })
      
      await getAllEmployees()
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

  const deleteEmp = async (id: number) =>{
    try{
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/emp/${id}`,{
          headers:{
            'x-api-key': import.meta.env.VITE_API_KEY,
          }
        })
        await getAllEmployees()
        return res.data 
    }catch(error){
      if(axios.isAxiosError(error)){
        return error.response?.data
      }
    }

  }

  return { employees, empCols, postEmpdata, getAllEmployees, deleteEmp, updateEmp}


})
