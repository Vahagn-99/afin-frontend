<template>
  <Dialog
      staticBackdrop
      :open="true"
  >
    <Dialog.Panel class="px-5 pb-5 pt-8">
      <div class="text-center">
        <div class="mb-8 text-[16px] font-medium">
          Вы действительно хотите выйти?
        </div>
        <div class="px-5 text-center flex gap-2 justify-center">
          <Button
              type="button"
              @click="closeModal"
              class="w-24 mr-1 "
          >
            Отменить
          </Button>
          <Button
              type="button"
              class="w-24 mr-1 bg-[#213343] text-white"
              @click="logout"
          >
            Да
          </Button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>

</template>
<script setup>
import {Dialog} from "@/base-components/Headless";
import Button from "@/base-components/Button/Button.vue";
import {useProfileStore} from "@/stores/profile.js";

const emit = defineEmits(["close-modal"]);
const profileStore=useProfileStore()
function closeModal(){
  emit('close-modal')
}

async function logout() {
  await profileStore.logout()
}
</script>