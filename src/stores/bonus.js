import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";
import {fakeBonuses, removeNullOrEmpty} from "@/helper/function.js";

export const useBonusStore = defineStore('bonus', () => {

    const bonuses=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({filters:{}})
    const getBonuses = async () => {
        bonuses.value=[]
        query.value.filters=removeNullOrEmpty(query.value.filters)
        let response={}
        if(query.value.filters.date){
            response = await apiClient.get(`managers/bonuses/monthly`,{
                params: query.value
            });
        }else{
            response = await apiClient.get(`managers/bonuses/current`,{
                params: query.value
            });
        }

        bonuses.value=response.data
        bonuses.value=fakeBonuses(bonuses.value)
    }

    return {
        bonuses,
        errors,
        page,
        meta,
        per_page,
        query,
        getBonuses,
    };
});