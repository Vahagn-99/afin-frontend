<template>
  <ImportModal @close="close" @import-file="importFile">
    <template #default>
      <div>
        <FormLabel>Excel файл (xlsx) <span class="text-red-600 text-[14px]">*</span></FormLabel>
        <FileUploader @getFileValue="getFileValue"/>
      </div>
      <div class="mt-4">
        <FormLabel>Доллара к Рублю <span class="text-red-600 text-[14px]">*</span></FormLabel>
        <FormInput v-model="importObject.currencies.usd"/>
      </div>
      <div class="mt-4">
        <FormLabel>Евро к Рублю <span class="text-red-600 text-[14px]">*</span></FormLabel>
        <FormInput v-model="importObject.currencies.eur"/>
      </div>
      <div class="mt-4">
        <FormLabel>Юаня к Рублю <span class="text-red-600 text-[14px]">*</span></FormLabel>
        <FormInput v-model="importObject.currencies.cny"/>
      </div>
      <div class="w-full h-full" v-if="isLoading">
        <div class="absolute h-full flex justify-center items-center w-full top-0 left-0 bg-[#f1f6fb] z-50">
          <div class="flex flex-col items-center justify-center">
            <LoadingIcon icon="bars" class="!w-10 !h-10 block mt-4 mb-4" color="#213343"/>
            <span>Идет загрузка...</span>
          </div>
        </div>
      </div>
    </template>
  </ImportModal>
  <Dialog :open="isFailedNotification">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="text-red-600 w-[30px] h-[28px]"/>
        <div class="mt-2 text-slate-500">
          Что-то пошло не так
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <Dialog :open="isSuccessNotification">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-green-500" />
        <div class="mt-2 text-slate-500">
          {{successText}}
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
</template>
<script setup>
import {FormLabel} from "@/base-components/Form/index.ts";
import {FormInput} from "@/base-components/Form/index.ts";
import ImportModal from "@/slots/ImportModal.vue";
import FileUploader from "@/components/FileUploader.vue";
import {useBillStore} from "@/stores/bill.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import LoadingIcon from "@/base-components/LoadingIcon/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import {Dialog} from "@/base-components/Headless/index.ts";
const emit=defineEmits(['close'])
const billStore=useBillStore()
const {importObject}=storeToRefs(billStore)
const isLoading=ref(false)
const successText=ref(null)
const isSuccessNotification=ref(false)
const isFailedNotification=ref(false)

const success=(text)=>{
  successText.value=text
  isSuccessNotification.value=true
  setTimeout(() => {
    isSuccessNotification.value=false
  }, 1500)
}

const failed=()=>{
  isFailedNotification.value=true
  setTimeout(() => {
    isFailedNotification.value=false
  }, 1500)
}
const close= () =>{
  emit('close')
}
async function importFile() {
  await billStore.importFile(close,setLoading,success,failed)
}

function setLoading(val){
  isLoading.value=val

}
function getFileValue(file){
  importObject.value.file=file
}

</script>