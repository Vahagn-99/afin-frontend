<template>
  <Dialog
      staticBackdrop
      :open="true"
  >
    <Dialog.Panel>
      <div >
        <div class="py-2 px-5 flex items-center justify-between  border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="mr-auto text-base font-bold my-2 text-[14px]">Загрузить файл</h2>
          <Lucide icon="X" class=" cursor-pointer "
                  @click="close"/>
        </div>
        <div class="p-5">
          <slot>

          </slot>
        </div>
        <div class="px-5 mt-4 text-center flex gap-2 justify-end">
          <div class="flex justify-end items-center gap-2 mb-4">
            <Button variant="secondary" class="bg-[#213343] text-white px-4  font-normal" @click="importFile">
              Загрузить
            </Button>
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
const emit=defineEmits(['import-file','close'])

function importFile(){
  emit('import-file')

}

function close(){
  emit('close')
}
</script>