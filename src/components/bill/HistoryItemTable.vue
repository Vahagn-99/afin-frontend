<template>
   <div class="px-4">
     <div class="flex items-center gap-6 mb-8 justify-between">
       <div class="flex items-center gap-6 w-full">
         <div @click="closeBillTable" class="border h-[38px] rounded-lg px-8 py-2 w-[120px] flex items-center gap-2  cursor-pointer">
           <Lucide icon="ArrowLeft" class="text-black"/> Назад
         </div>
         <p class="font-medium text-gray-400">
                   {{name}}
         </p>
       </div>
       <div class="flex items-center justify-center w-full">
         <ul class="flex font-normal ml-0 p-1 rounded-md w-full justify-end">
           <li class="relative cursor-pointer w-1/4 text-center py-1.5" @click="changeTable('bill')"
               :class="showTab.bill?'dct-right-tab-active':''"> Счета
           </li>
           <li class="relative cursor-pointer w-1/4 text-center py-1.5" @click="changeTable('opened_bill')"
               :class="showTab.opened_bill?'dct-right-tab-active':''">
             Открытие сделки
           </li>

           <li class="relative cursor-pointer w-1/4 text-center py-1.5" @click="changeTable('closed_bill')"
               :class="showTab.closed_bill?'dct-right-tab-active':''">
             Закрытие сделки
           </li>
         </ul>
       </div>
     </div>
     <div>

       <BillHistory v-if="showTab.bill"/>
       <ClosedBillHistory v-if="showTab.closed_bill"/>
       <OpenedBillHistory v-if="showTab.opened_bill"/>
     </div>

   </div>
</template>
<script setup>

import {onMounted, ref} from "vue";
import Button from "@/base-components/Button/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import BillHistory from "@/components/history/BillHistory.vue";
import ClosedBillHistory from "@/components/history/ClosedBillHistory.vue";
import OpenedBillHistory from "@/components/history/OpenedBillHistory.vue";
import {linkTo} from "@/helper/function.js";
import {useRoute} from "vue-router";
import {useHistoryState} from "@/stores/history.js";
import {storeToRefs} from "pinia";
const isLoading=ref(false)
const router = useRoute();
const id=ref(null);
const showTab=ref({
  bill:true,
  opened_bill:false,
  closed_bill:false,
})

function changeTable(name){
  for (const tabName in showTab.value) {
    showTab.value[tabName] = tabName === name;
  }
}

function closeBillTable(){
  linkTo('history')
}

const historyStore=useHistoryState()
const {historyList}=storeToRefs(historyStore)
const name=ref('')
onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;
  await historyStore.getHistoryList()
  name.value=historyList.value.find(item=>item.id==id).name
})


</script>