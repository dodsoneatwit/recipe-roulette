<template>
    <div class="container">
        <!-- <v-row v-for="item in NumberOfRecipesToGenerate" :key="item">
            <v-col>
                {{ item }}
            </v-col>
        </v-row> -->
        <v-btn class="gen-button">
            {{ buttonTitle }}
        </v-btn>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Generation',
    data: () => ({
      buttonTitle: 'Generate',
      NumberOfRecipesToGenerate: 6,
      temp: ['1', '2', '3', '4']
    }),
    components: {
    },
    created: function () {
    },
    methods: {
    }
  }
  //
  </script>
  <style scoped>
    .container {
        height: 150rem;
    }
    .gen-button {
        top: 10%;
        left: 46.5%;
    }
  </style>
  