import { create } from "zustand";
import axios from 'axios'
import  toast  from "react-hot-toast";

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
    },
    
    deleteProduct : async (id) => {
        set({isLoading : true})
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products : prev.products.filter(product => product.id !== id)}))
            toast.success(`Product deleted successfully`)
        } catch (error) {
            console.log(`Error in DeleteProduct Function`, error)
            toast.error("Something went wrong")
        }finally{
            set({isLoading : false})
        }
    }

}))

 