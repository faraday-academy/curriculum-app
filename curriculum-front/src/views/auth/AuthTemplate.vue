<template>
  <v-row class="auth-wrapper mt-10">
    <v-col md="4" offset-md="4" sm="6" offset-sm="3" cols="12">
      <v-form class="create-form">
        <v-card variant="outlined">
          <v-card-title class="mb-2">
            <h3 class="title">
              <slot name="title"></slot>
            </h3>
          </v-card-title>
          <v-card-text class="pb-0">
            <slot name="form"></slot>
          </v-card-text>
          <v-card-actions class="pl-1">
            <v-col>
              <slot name="actions"></slot>
              <slot name="link"></slot>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
