import {defineStore} from "pinia";
import {ref} from "vue";
import centerClient from "../../centerClient.js";
import apiClient from "../../apiClient.js";
import {removeNullOrEmpty} from "@/helper/function.js";

export const useBillStore = defineStore('bill', () => {

    const bills=ref([])
    const importObject=ref({
        file:null,
        currencies:{
            eur:null,
            usd:null,
            cny:null
        }
    })

    const errors=ref([])
    const status=ref('pending')

    const getImportStatus=async ()=>{
        const response =await apiClient.get(`import/status`)
        status.value=response.data.status
        console.log(status.value)
    }
    const importFile = async (close, setLoading) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', importObject.value.file);
            formData.append('currencies[eur]', importObject.value.currencies.eur);
            formData.append('currencies[usd]', importObject.value.currencies.usd);
            formData.append('currencies[cny]', importObject.value.currencies.cny);

            await apiClient.post(`import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            errors.value = [];
            await getImportStatus();

            const checkStatusInterval = setInterval(async () => {
                await getImportStatus();
                console.log(status.value, 21);
                if (status.value !== 'pending') {
                    clearInterval(checkStatusInterval);
                    window.parent.success('Файл успешно загружен !');
                    setLoading(false);
                    close();
                    await getBills()
                }
            }, 2000);
        } catch (e) {
            errors.value = e.response.data.errors;
            window.parent.failed();
            setLoading(false);
        }
    }
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})
    const getBills = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        query.value.filters=removeNullOrEmpty(query.value.filters)
        console.log(query.value.filters)
        const response = await apiClient.get(`transactions`,{
            params: query.value
        });

        bills.value=response.data.data
        meta.value = response.data.meta
    }

    return {
        bills,
        errors,
        importObject,
        page,
        meta,
        per_page,
        query,
        getBills,
        importFile
    };
});