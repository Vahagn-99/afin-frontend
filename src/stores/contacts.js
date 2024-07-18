import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "../../apiClient.js";

export const useContactStore = defineStore('contact', () => {

    const contacts=ref([])
    const errors=ref([])
    const page = ref(1)
    const per_page = ref(20)
    const meta = ref({})
    const query=ref({sorts:{},filters:{}})
    const managers =ref([])
    const branches =ref([])
    const analytics =ref([])
    const getContacts = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        const response = await apiClient.get(`contacts`,{
            params: query.value
        });

        contacts.value=response.data.data
        meta.value = response.data.meta
        analytics.value = [...new Set(contacts.value.map(contact => contact.analytic))];
    }

    const getManagers = async () => {
        query.value.page = page.value
        query.value.per_page = per_page.value
        const response = await apiClient.get(`managers`,{
            params: query.value
        });

        const data=response.data.data
        meta.value = response.data.meta
        managers.value = [...new Set(data.map(contact => contact.name))];
        branches.value = [...new Set(data.map(contact => contact.branch))];

    }

    return {
        contacts,
        errors,
        page,
        meta,
        per_page,
        query,
        managers,
        branches,
        analytics,
        getContacts,
        getManagers
    };
});