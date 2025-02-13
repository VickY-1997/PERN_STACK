import { create } from "zustand";
import axios from 'axios'

const BASE_URL = `http://localhost:1997`

export const useProductStore = create((set) => ({
    products : [],
    isLoading : false,
    error : null,

    fetchProducts : async () => {
        set({ isLoading : true})
        try {
            const res = await axios.get(`${BASE_URL}/api/products`)
            set({products : res.data.data, error : null})
        } catch (error) {
            console.log(`error in fetching products`)
            if(error.status == 429) set({error : "Rate limit exceeded", products :[]});
            else set({error : "Something went wrong", products :[]})
        } finally{
            set({isLoading :false})
        }
    }
}))

