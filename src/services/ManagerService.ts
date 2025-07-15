import axios from 'axios'

export const postMgrdata = async (data: {
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
        return res.data
    } catch (error) {
        let validationErrors = {}
        if (axios.isAxiosError(error) && error.response?.status === 422) {
            const errors = error.response?.data
            errors.forEach((element) => {
                validationErrors[element.field] = element.message
            });

            return { succesa: false, status: 422, data: validationErrors };
        }
        else if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
    }
}

export const getAllMgr = async () => { }
