<script setup>
let name = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);

const { $userStore, $generalStore, $errorsStore } = useNuxtApp();
const { registerErrors } = storeToRefs($errorsStore);

const register = async () => {
  registerErrors.value.email = [];
  registerErrors.value.name = [];
  registerErrors.value.password = [];

  try {
    if (isValidEmail(email.value)) {
      await $userStore.getTokens();
      await $userStore.register(
        name.value,
        email.value,
        password.value,
        confirmPassword.value
      );
      await $userStore.getUser();

      $generalStore.isLoginOpen = false;
    }else{
        registerErrors.value.email[0] = notValidEmailMessage;
    }
  } catch (error) {
    registerErrors.value = error.response.data.errors;
  }
};
</script>

<template>
  <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Full name"
      v-model:input="name"
      inputType="text"
      :autoFocus="true"
      :error="
        registerErrors?.name?.length > 0 ? registerErrors.name[0]  : ''
      "
    />
  </div>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
      :error="
        registerErrors?.email?.length > 0 ?  registerErrors.email[0] : ''
      "
    />
  </div>

  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      :error="
        registerErrors?.password?.length > 0 ?  registerErrors.password[0] : ''
      "
    />
  </div>

  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Confirm password"
      v-model:input="confirmPassword"
      inputType="password"
    />
  </div>

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !email || !password || !confirmPassword"
      :class="
        !name || !email || !password || !confirmPassword
          ? 'bg-gray-200'
          : 'bg-primary'
      "
      @click="register"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>
