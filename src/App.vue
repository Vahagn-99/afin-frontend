<script setup >
import {RouterView } from 'vue-router'
import Lucide from "@/base-components/Lucide/index.ts";
import {Dialog} from "@/base-components/Headless/index.ts";
import {ref} from "vue";
const successText=ref(null)
const isSuccessNotification=ref(false)
const isFailedNotification=ref(false)

window.success = function(text){
  successText.value=text
  isSuccessNotification.value=true
  setTimeout(() => {
    isSuccessNotification.value=false
  }, 1500)
}

window.failed = function(){
  isFailedNotification.value=true
  setTimeout(() => {
    isFailedNotification.value=false
  }, 1500)
}

</script>

<template>
  <RouterView />
  <div class="fixed top-[12px] right-[12px] h-[50px] px-10 border rounded-lg bg-white hidden"
       style="transition: display 0.5s;">
    <div class="flex items-center justify-start"
                  style="padding-top:11px;padding-bottom:11px">
      <Lucide icon="CheckCircle" class="text-green-500 w-[30px] h-[28px]"/>
      <div class="ml-3 ">
        <div class="font-medium">Файл успешно загружен !</div>
      </div>
    </div>
  </div>
  <div class="fixed top-[12px] right-[12px] h-[50px] px-6 border rounded-lg bg-white hidden" id="failed-notification"
       style="transition: display 0.5s;">
    <div class="flex items-center justify-start"
                  style="padding-top:11px;padding-bottom:11px">
      <div class="ml-3 ">
        <div class="font-medium"></div>
      </div>
    </div>
  </div>
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

