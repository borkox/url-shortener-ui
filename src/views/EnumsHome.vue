<template>
    <v-sheet
            id="scrolling-techniques"
            class="overflow-y-auto"
            max-height="600"
    >
        <v-breadcrumbs :items="breadcrumb">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-divider></v-divider>

        <v-container fluid ma-0 pa-0 fill-height>
            <v-card v-for="enumDef in enums"
                    v-bind:key="enumDef.uuid"
                    class="ma-1"
                    max-width="344"
                    outlined
                    link :to="{path:'/enums/' + enumDef.techName}"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="mb-1">{{enumDef.displayName}}</v-list-item-title>
                        <v-list-item-subtitle>{{enumDef.techName}}</v-list-item-subtitle>
                        <v-list-item-subtitle>rows({{enumDef.enumRows.length}})</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            tile
                            size="80"
                            color="grey lighten-3"
                    >
                        <v-icon x-large color="indigo">format-list-bulleted-square</v-icon>
                    </v-list-item-avatar>
                </v-list-item>

                <!--<v-card-actions>-->
                    <!--<v-btn text outlined x-small v-on:click="currentType = type">Details</v-btn>-->
                    <!--<v-btn text outlined x-small >Delete</v-btn>-->
                <!--</v-card-actions>-->
            </v-card>
        </v-container>
    </v-sheet>

</template>


<script>

    import axios from 'axios'

    export default {
        name: 'Enums',

        data: () => ({
            enums: null,
            loading: true,
            errored: false,
            breadcrumb: [
                {
                    text: 'All Enums',
                    disabled: false,
                    href: '/enums',
                }
            ]

        }),
        mounted() {
            axios
                .post('http://localhost:8080/api/macro/json', {"command": "listEnumDef"})
                .then(response => {
                    this.enums = response.data.enums
                    console.log("Loaded:" + response)
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>