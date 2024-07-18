<template>
  <div class="flex items-center justify-center w-full px-6 h-screen">
    <div class="px-6 py-8 w-[510px] bg-white rounded-lg border">
      <div class="w-full">
        <div class="text-[24px] font-bold mb-6 text-center">
          Вход в <span class="text-[#213343] font-bold">АФИН</span>
        </div>
        <div>
          <FormLabel>Логин</FormLabel>
          <FormInput  type="text"
                      v-model="user.email"/>
          <small class="text-[#ff0000]" v-if="errors.email">{{errors.email[0]}}</small>
        </div>
         <div class="mt-4">
           <FormLabel>Пароль</FormLabel>
           <FormInput  type="password"
                       v-model="user.password"/>
           <small class="text-[#ff0000]" v-if="errors.password">{{errors.password[0]}}</small>
         </div>

        <div class="flex items-center justify-end">
          <Button
              @click="login"
              class="mt-6 bg-[#213343] text-white px-12"
          >Войти</Button>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import {useProfileStore} from "@/stores/profile.js";
import {storeToRefs} from "pinia";
import {FormInput, FormLabel} from "@/base-components/Form/index.ts";
import Button from "@/base-components/Button/index.ts";
const profileStore=useProfileStore()
const {user,errors}=storeToRefs(profileStore)

function login(){
  profileStore.login()
}
</script>