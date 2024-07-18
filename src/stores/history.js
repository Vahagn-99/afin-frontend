import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useHistoryState = defineStore('history', () => {

    const historyList=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})
    const closeMonthObject=ref({})
    const historyItem=ref({})

    const getHistoryList = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        const response = await apiClient.get(`archives`,{
            params: query.value
        });
        historyList.value=response.data.data
        meta.value = response.data.meta
    }

    const item_page = ref(1)
    const item_per_page = ref(20)
    const item_meta = ref({})
    const item_query=ref({sorts:{},filters:{}})
    const getHistoryItem = async (id) => {
        item_query.value.page = item_page.value
        item_query.value.per_page = item_per_page.value
        item_query.value.filters=removeNullOrEmpty(item_query.value.filters)
        const response = await apiClient.get(`archives/${id}/transactions`,{
            params:item_query.value
        });
        historyItem.value=response.data.data
        item_meta.value = response.data.meta
    }

    const closeMonth = async () => {
        try{
            await apiClient.post(`close`,closeMonthObject.value);
            errors.value=[]
            setTimeout(()=>{
                window.parent.success('Месяц успешно закрыт !');
            },5000)
        }
        catch (e){
            errors.value = e.response.data.errors;
            window.parent.failed();
        }
    }

    return {
        historyList,
        errors,
        page,
        meta,
        per_page,
        query,
        item_page,
        item_meta,
        item_per_page,
        item_query,
        closeMonthObject,
        getHistoryList,
        closeMonth,
        historyItem,
        getHistoryItem
    };
});