import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useMonthlyRatingStore = defineStore('monthly_rating', () => {

    const ratings=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})
    const getMonthlyRatings = async (month) => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        query.value.filters=removeNullOrEmpty(query.value.filters)

        const response = await apiClient.get(`managers/ratings/monthly/${month}`,{
            params: query.value
        });

       ratings.value=response.data.data
        meta.value = response.data.meta
    }


    return {
        ratings,
        errors,
        page,
        meta,
        per_page,
        query,
        getMonthlyRatings
    };
});