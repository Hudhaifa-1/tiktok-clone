<script setup>
const { $errorsStore } = useNuxtApp();
const { loginErrors } = storeToRefs($errorsStore);

let email = ref(null);
let password = ref(null);

const { $userStore, $generalStore } = useNuxtApp();

const login = async () => {
  loginErrors.value.email = [];

  try {
    if (isValidEmail(email.value)) {
      await $userStore.getTokens();
      await $userStore.login(email.value, password.value);
      await $userStore.getUser();

      $generalStore.isLoginOpen = false;
    } else {
      loginErrors.value.email[0] = notValidEmailMessage;
    }
  } catch (error) {
    loginErrors.value = error.response.data.errors;
  }
};
</script>

<template>
  <div class="text-center text-[28px] mb-4 font-bold">Log in</div>

  <div class="px-6 pb-1.5 text-normal">Email address</div>
  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
      :error="loginErrors?.email?.length > 0 ? loginErrors.email[0] : ''"
    />
  </div>

  <div class="px-6 pb-2">
    <BaseInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
    />
  </div>

  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-primary'"
      @click="login"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Log in
    </button>
  </div>
</template>
`
