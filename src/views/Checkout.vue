<script lang="ts" setup>
import { useCounterBooks } from "../stores/books.ts";
import { computed, reactive, onUnmounted } from "vue";
import { Customer } from "../types";
import { useRouter } from "vue-router";

import OrderSummary from "../components/OrderSummary.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Alert from "../components/Alert.vue";

const bookStore = useCounterBooks();
const router = useRouter()

const customer: Customer = reactive({
  fname: "Johny",
  lname: "Dee",
  email: "johnydee@gmail.com",
  contact: "123414213",
  address: "Blkdasdw 2112",
  country: "Singapore",
  city: "NY",
  zipcode: "32321",
});

const handleSubmitPayload = async (): Promise<void> => {
  const response = await bookStore.checkout();
  if (response) {
    router.push('/thank-you')
    bookStore.$state.cart = []
  }
};

const formIsValid = computed(() => {
  return Object.values(customer).every((value) => value);
});

onUnmounted(() => {
  bookStore.clearError()
})
</script>
<template>
  <div class="flex flex-wrap -mx-4">
    <div class="w-full xl:w-8/12 mb-8 xl:mb-0 px-4">
      <Alert v-if="bookStore.$state.error" type="error" :message="`${bookStore.$state.error}`" />
      <form>
        <div class="flex flex-wrap -mx-4 mb-6">
          <Input label="Firstname" :value="customer.fname" @set-input-value="(val: string) => customer.fname = val"
            type="text" placeholder="Enter your firstname" class-name="w-full md:w-1/2 px-4 mb-6 md:mb-0" />
          <Input label="Lastname" :value="customer.lname" @set-input-value="(val: string) => customer.lname = val"
            type="text" placeholder="Enter your lastname" class-name="w-full md:w-1/2 px-4 mb-6 md:mb-0" />
        </div>
        <div class="flex flex-wrap -mx-4 mb-6">
          <Input label="Email" :value="customer.email" @set-input-value="(val: string) => customer.email = val"
            type="email" placeholder="Enter your email address" class-name="w-full md:w-1/2 px-4 mb-6 md:mb-0" />
          <Input label="Contact" :value="customer.contact" @set-input-value="(val: string) => customer.contact = val"
            type="text" placeholder="Enter your contact number" class-name="w-full md:w-1/2 px-4 mb-6 md:mb-0" />
        </div>
        <div class="mb-6">
          <Input label="Address" :value="customer.address" @set-input-value="(val: string) => customer.address = val"
            type="text" placeholder="Enter your address" class-name="w-full" />
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <Input label="Country" :value="customer.country" @set-input-value="(val: string) => customer.country = val"
            type="text" placeholder="Enter your country" class-name="w-full md:w-2/5 px-3 mb-6 md:mb-0" />
          <Input label="City" :value="customer.city" @set-input-value="(val: string) => customer.city = val" type="text"
            placeholder="Enter your city" class-name="w-full md:w-2/5 px-3 mb-6 md:mb-0" />
          <Input label="Zipcode" :value="customer.zipcode" @set-input-value="(val: string) => customer.zipcode = val"
            type="text" placeholder="" class-name="w-full md:w-1/5 px-3" />
        </div>
      </form>
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <OrderSummary>
        <template #call-to-action>
          <Button @handle-click="handleSubmitPayload" :disabled="!formIsValid"
            class="block w-full py-2 bg-black hover:bg-gray-500 text-center text-white font-bold font-heading rounded-md">
            <span class="text">Place Order</span>
          </Button>
        </template>
      </OrderSummary>
    </div>
  </div>
</template>
