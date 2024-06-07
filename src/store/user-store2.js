import {create} from 'zustand';
import axios from "axios";

export const getUserByPhoneNumber = async (phoneNumber) => {
  const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/users?phoneNumber=${phoneNumber}`)
  const users = await response.data
  let result = null
  if(users.length > 0) {
    result = users[0].id
  }
  return result
}
export const getAuthCode = async () => {
  const response = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/auth-code`)
  return await response.data
}
export const useUserStore = create((set, get) => ({
  phoneNumber: '',
  firstName: '',
  secondName: '',
  lastName: '',
  birthDate: '',
  email: '',
  city: '',
  code: '0000',
  setPhoneNumber: (phoneNumber) => {
    set({phoneNumber})
  },
  setCode: (code) => {
    set({code})
  },
  setData: (data) => {
    set({...data})
  },
  register: async () => {
    const data = get()
    const response = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/users`, {...data })
  },
  getUser: async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/user/profile`, {
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYXJjZWxvbmEubS13b3Jrcy5ydSIsInN1YiI6InJlZnJlc2giLCJpYXQiOjE3MTc1MTQyNDgsImV4cCI6MTcyMDEwNjI0OCwidXNlciI6IjcifQ.BM6OesSQKayVi-bDZIUvcpOjqqjOKpXc_Np7tgV5cGk'
      }
    })
    const userInfo = response.data.data;

    set({
      phoneNumber: userInfo.phone,
      firstName: userInfo.firstName,
      secondName: userInfo.secondName,
      lastName: userInfo.lastName,
      birthDate: userInfo.birthDate,
      email: userInfo.email,
      city: userInfo.city,
    })
  },
}))
