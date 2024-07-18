<template>
  <FilterModal @close-filter="closeFilter" @filter="emit('filter')" @clear="emit('clear')">
    <template #default>
      <div>
        <FormLabel>Сотрудник</FormLabel>
        <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="query.filters.manager_name">
          <option value=""></option>
          <option :value="manager" v-for="(manager, key) in managers" :key="key">{{manager}}</option>
        </FormSelect>
      </div>
      <div class="mt-4">
        <FormLabel>Отдел</FormLabel>
        <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="query.filters.manager_branch">
          <option value=""></option>
          <option :value="branch" v-for="(branch, key) in branches" :key="key">{{branch}}</option>
        </FormSelect>
      </div>
    </template>
  </FilterModal>
</template>
<script setup>

import FilterModal from "@/slots/FilterModal.vue";
import {FormSelect} from "@/base-components/Form/index.ts";
import {FormLabel} from "@/base-components/Form/index.ts";
import {useBillStore} from "@/stores/bill.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useContactStore} from "@/stores/contacts.js";
import {useMonthlyRatingStore} from "@/stores/rating_monthly.js";
const emit=defineEmits(['close-filter','filter','clear'])
const ratingStore=useMonthlyRatingStore()
const {query}=storeToRefs(ratingStore)
function closeFilter(){
  emit('close-filter')
}
const contactStore=useContactStore()
const {managers,branches}=storeToRefs(contactStore)

onMounted(async () => {
  await contactStore.getManagers()
})
</script>