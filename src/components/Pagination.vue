<template>
  <div
      class="flex mt-6 justify-end items-center intro-y"
  >
    <Pagination class="mr-8">
      <Pagination.Link class="h-full">
        <Lucide icon="ChevronLeft" class="w-4 h-4"
                :class="page===1?'!pointer-events-none !opacity-40 !cursor-not-allowed':''"
                @click="changePage(page-1>=1?page-1:1)"/>
      </Pagination.Link>
      <Pagination.Link v-if="page>3" @click="changePage(1)">
        1
      </Pagination.Link>
      <Pagination.Link v-if="page>4">
        ...
      </Pagination.Link>
      <Pagination.Link v-for="n in visiblePages()" :class="page===n?'!box font-medium !text-white bg-[#213343]':''" :key="n"
                       @click="changePage(n)">{{ n }}
      </Pagination.Link>
      <Pagination.Link v-if="meta.last_page-page>3">
        ...
      </Pagination.Link>
      <Pagination.Link v-if="meta.last_page-page>3" @click="changePage(meta.last_page)">
        {{ meta.last_page }}
      </Pagination.Link>
      <Pagination.Link class="h-full">
        <Lucide icon="ChevronRight" class="w-4 h-4"
                :class="page===meta.last_page?'!pointer-events-none !opacity-40 !cursor-not-allowed':''"
                @click="changePage(page+1<=meta.last_page?page+1:meta.last_page)"/>
      </Pagination.Link>
    </Pagination>
    <FormSelect class="w-[100px] mt-3 !box sm:mt-0" @change="changeCount">
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </FormSelect>
  </div>
</template>

<script setup>
import {FormSelect} from "./../base-components/Form";
import Pagination from "./../base-components/Pagination";
import Lucide from "./../base-components/Lucide";
const emit=defineEmits(['changeCount','changePage'])
const props=defineProps({
  page:Number,
  per_page:Number,
  meta:Object
})

function changeCount(e){
  emit('changeCount',e.target.value)
}
function changePage(p){
  emit('changePage',p)
}
function visiblePages() {
  console.log(props.meta,props.page)
  const range = 2; // Number of pages to show on each side of the active page
  const start = Math.max(1, props.page - range);
  const end = Math.min(props.meta.last_page, props.page + range);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

</script>