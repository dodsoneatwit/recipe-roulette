<template>
    <div>
        <v-row
         v-for="item in NumberOfRecipesToGenerate"
        >
            <v-col>
                
            </v-col>
        </v-row>
        <v-btn>
            {{ buttonTitle }}
        </v-btn>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Generation',
    data: () => ({
      buttonTitle: 'Generate',
      NumberOfRecipesToGenerate: 1
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
  