import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useHistoryClosedBillStore = defineStore('history_closed_bill', () => {

    const closed_bills=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})

    const getClosedBills = async (id) => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        query.value.filters=removeNullOrEmpty(query.value.filters)

        const response = await apiClient.get(`archives/${id}/positions/closed`,{
            params: query.value
        });

        closed_bills.value=response.data.data
        meta.value = response.data.meta
    }

    return {
        closed_bills,
        errors,
        page,
        meta,
        per_page,
        query,
        getClosedBills,
    };
});