<template>
    <v-card>
        <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                variant="outlined"
                hide-details
            >
            </v-text-field>
        </template>
    </v-card>
</template>

<script>

export default {
    name: 'Gallery',
    data: () => ({

    })
}
</script>
