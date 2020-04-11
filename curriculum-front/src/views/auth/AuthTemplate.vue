<template>
  <v-row class="auth-wrapper">
    <v-col sm="6" offset-sm="3">
      <v-form class="create-form">
        <v-card>
          <v-card-subtitle>
            <slot name="title"></slot>
          </v-card-subtitle>
          <v-card-text>
            <slot name="form"></slot>
          </v-card-text>
          <v-card-actions>
            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
