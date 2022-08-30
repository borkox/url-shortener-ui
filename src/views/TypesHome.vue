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
            <v-card v-for="type in types"
                    v-bind:key="type.uuid"
                    class="ma-1"
                    max-width="344"
                    outlined
                    link :to="{path:'/types/' + type.techName}"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="mb-1">{{type.displayName}}</v-list-item-title>
                        <v-list-item-subtitle>{{type.techName}}</v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <v-chip v-for="(att) in type.attributes.slice(0,5)"
                                    v-bind:key="att.uuid"
                                    class="ma-2"
                                    outlined
                                    color="primary"
                            >
                                {{att.techName}}
                            </v-chip>
                            <v-chip v-if="type.attributes && type.attributes.length>5"
                                    v-bind:key="'more'"
                                    class="ma-2"
                                    outlined
                                    color="primary">+ {{type.attributes.length-5}} more</v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            tile
                            size="80"
                            color="grey lighten-3"
                    >
                        <v-icon x-large color="indigo">{{type.iconName}}</v-icon>
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
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    import axios from 'axios'

    export default {
        name: 'Types',
        //components: {
        //    HelloWorld
        //},

        data: () => ({
            currentType: null,
            types: null,
            loading: true,
            errored: false,
            breadcrumb: [
                {
                    text: 'All Types',
                    disabled: false,
                    href: '/types',
                }
            ]

        }),
        watch: {
            currentType: function (type) {
                if (type != null) {
                    var first = this.breadcrumb[0]
                    this.breadcrumb.length = 0
                    this.breadcrumb.push(first);
                    this.breadcrumb.push( {
                        text: type.techName,
                        disabled: false,
                        href: '/types/'+type.techName,
                    })
                }
            }
        },
        mounted() {
            axios
                .post('http://localhost:8080/api/macro/json', {"command": "listTypes"})
                .then(response => {
                    this.types = response.data.types
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