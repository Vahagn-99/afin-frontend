<template>
  <Dialog
      staticBackdrop
      :open="true"
  >
    <Dialog.Panel>
      <div >
        <div class="py-2 px-5 flex items-center justify-between  border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="mr-auto text-base font-bold my-2 text-[14px] ">Закрыть месяц</h2>
          <Lucide icon="X" class=" cursor-pointer "
                  @click="closeModal"/>
        </div>
        <div class="p-5">
          <div>
            <FormLabel>Месяц отчета</FormLabel>
            <FormInput type="month" v-model="closeMonthObject.month"/>
          </div>
        </div>
        <div class="px-5 mt-4 text-center flex gap-2 justify-end">
          <div class="flex justify-end items-center gap-2 mb-4">
            <Button variant="secondary" class="bg-[#213343] text-white px-4  font-normal" @click="save">
              Применить
            </Button>
          </div>
        </div>
      </div>
      <div class="w-full h-full" v-if="isLoading">
        <div class="absolute h-full flex justify-center items-center w-full top-0 left-0 bg-[#f1f6fb] z-50">
          <div class="flex flex-col items-center justify-center">
            <LoadingIcon icon="bars" class="!w-10 !h-10 block mt-4 mb-4" color="#213343"/>
            <span>Идет загрузка...</span>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
</template>
<script setup>
import {Dialog} from "@/base-components/Headless/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import Button from "@/base-components/Button/index.ts";
import {FormInput, FormLabel} from "@/base-components/Form/index.ts";
import {useHistoryState} from "@/stores/history.js";
import {storeToRefs} from "pinia";
import {useBillStore} from "@/stores/bill.js";
import LoadingIcon from "@/base-components/LoadingIcon/index.ts";
import {ref} from "vue";
const historyStore=useHistoryState()
const {closeMonthObject}=storeToRefs(historyStore)
const emit=defineEmits(['save','close-modal'])
const isLoading=ref(false)
const billStore=useBillStore()

async function save() {
  isLoading.value=true
  await historyStore.closeMonth()
  setTimeout(async () => {
    closeModal()
    isLoading.value = false
    await billStore.getBills()
  },5000)
}

function closeModal(){
  emit('close-modal')
}
</script>