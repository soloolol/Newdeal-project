<template>
  <v-container>
    <v-card>
      <v-card-title>Login form</v-card-title>
        <v-card-text>
          <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/">Login</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'Login',

    data: () => ({

    }),
  }
</script>
