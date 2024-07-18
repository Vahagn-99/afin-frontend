import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useOpenedBillStore = defineStore('opened_bill', () => {

    const opened_bills=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})

    const getOpenedBills = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        query.value.filters=removeNullOrEmpty(query.value.filters)

        const response = await apiClient.get(`positions/opened`,{
            params: query.value
        });

        opened_bills.value=response.data.data
        meta.value = response.data.meta
    }

    return {
        opened_bills,
        errors,
        page,
        meta,
        per_page,
        query,
        getOpenedBills,
    };
});