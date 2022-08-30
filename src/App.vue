<template>
  <v-content>
    <v-container
        fluid
        fill-height
    >
      <v-layout
          align-center
          justify-center
      >
        <v-flex
            xs12
            sm8
            md4
        >
          <v-card class="elevation-12">
            <v-toolbar
                color="primary"
                dark
                flat
            >
              <v-toolbar-title>Short link</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                    label="URL:"
                    type="text"
                    v-model="url"
                    v-on:click="reset()"
                ></v-text-field>
                <a
                    :href="shortUrl"
                    class="subheading mx-3"
                    target="_blank"
                >
                  {{ shortUrl }}
                </a>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" @click="onSubmit">Generate Short Url</v-btn>
            </v-card-actions>

            <v-alert
                v-if="error"
                color="red"
                max-width="400px"
                dismissible
            >
              {{error}}
            </v-alert>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        url: '',
        shortUrl: '',
        loading: false,
        returnUrl: '',
        error: ''
      };
    },
    created() {
      this.url = 'http://example.com';
    },
    mounted() {
      axios
      .post('http://localhost:8080/api/url', {url:"example.com"})
      .then(() => {
        this.error = '';
      })
      .catch(() => {
        this.error = 'Cannot connect to backend server';
      })
      .finally(() => this.loading = false)
    },
    methods: {
      onSubmit() {
        this.error = null;
        this.loading = true;
        axios.post('http://localhost:8080/api/url', {url: this.url})
        .then(response => {
          this.shortUrl = response.data.shortUrl
        })
        .catch(error => {
          console.log(error)
          this.error = error
        })
        .finally(() => this.loading = false);
      },
      reset() {
        console.log('RESET')
        this.shortUrl = ''
      }
    }
  };
</script>