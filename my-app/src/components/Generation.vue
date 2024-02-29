<template>
    <div class="container">
        <v-slider
         v-model="range"
         :min="1"
         :max="maxGenerations"
         show-ticks="always"
         thumb-label="always"
         step="1"
         color="black"
         track-color="red"
         elevation="5"
         density="comfortable"
         class="align-center slider"
        />
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
      range: 1,
      maxGenerations: 4
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
        margin-top: 15%;
        margin-left: 15%;
        margin-right: 15%;
    }
    .gen-button {
        left: 44.5%;
    }

    .slider{
      font-size: 5.0rem
    }
  </style>
  