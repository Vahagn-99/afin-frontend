import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useRatingHistoryStore = defineStore('rating_history', () => {

    const histories=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})
    
    const getRatingsHistory = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        query.value.filters=removeNullOrEmpty(query.value.filters)
        
        const response = await apiClient.get(`managers/ratings/histories`,{
            params: query.value
        });
        histories.value=response.data.data
        meta.value = response.data.meta
    }

    return {
        histories,
        errors,
        page,
        meta,
        per_page,
        query,
        getRatingsHistory,
    };
});