<template>
    <v-alert title="Mail Verification" type="info">
      Please, check your inbox and validate your email to be able to Sign In.
    </v-alert>
    <p class="text-body-1">Already verified?<RouterLink to="/signIn">Sign In</RouterLink></p>
</template>
  
<script setup>
</script>

<style scoped>
    .v-alert {
    margin-top: 40px;
    }
    p {
      margin-top: 40px;
    text-align: center;
    }
</style>