<template>
  <div class="flex items-center justify-center">
    <label
        for="file-upload"
        class="border h-[38px] rounded-lg w-full flex items-center justify-between"
    >
        <span class="ml-4 w-full"><span v-if="fileName">{{ fileName }}</span></span>
      <span class="w-[250px] cursor-pointer bg-[#213343] flex items-center justify-center float-right text-center h-[38px] text-white px-4 py-2 rounded-lg">
        Выберите файл
      </span>
    </label>
    <input
        id="file-upload"
        type="file"
        class="hidden"
        @change="handleFileUpload"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileName = ref('');
const emit=defineEmits(['getFileValue'])
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file)
  if (file) {
    fileName.value = file.name;
    emit('getFileValue',file)
    // Further file processing can be done here
  }
};
</script>

