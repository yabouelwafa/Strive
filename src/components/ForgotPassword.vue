<template>
  <v-container class="d-flex flex-row" fill-height>
    <div class="mx-auto">
      <h2 class="mb-3 ml-2 font-weight-light">Forgot Password?</h2>
      <v-card width="800px" height="250px">
        <v-card-title>Please enter your Email</v-card-title>
        <v-card-subtitle
          >Make sure the email is the one associated with your
          account</v-card-subtitle
        >
        <v-card-actions>
          <v-text-field class="mb-" label="Email" outlined></v-text-field>
        </v-card-actions>
        <v-btn class="pl-6" color="primary" block>Enter</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>
