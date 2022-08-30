<template>
    <v-sheet
            id="scrolling-techniques"
            class="overflow-y-auto"
    >
        <v-breadcrumbs :items="breadcrumb">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-divider></v-divider>


        <v-snackbar
                v-if="message"
                v-model="message"
                color="success"
                top
                timeout="8000"
        >
            {{message}}
            <v-btn text @click="message = null"
            >
                Close
            </v-btn>
        </v-snackbar>

        <ViewEditTypeHome
                v-if="!editedAttribute"
                @editAttribute="editAttribute"
                @newAttribute="newAttribute"

        ></ViewEditTypeHome>
        <ViewEditAttributeDef
                v-if="editedAttribute"
                v-bind:attribute="editedAttribute"
                @cancel="editedAttribute=null"
                @save="onSave"
                @deletion="onDelete"

        />
    </v-sheet>

</template>


<script>
    // @ is an alias to /src
    import ViewEditAttributeDef from '@/components/ViewEditAttributeDef.vue'
    import ViewEditTypeHome from '@/components/ViewEditTypeHome.vue'
    import axios from 'axios'

    export default {
        name: 'Types',
        components: {
            ViewEditAttributeDef,
            ViewEditTypeHome,
        },

        data: () => ({
            editedAttribute: null,
            type: null,
            loading: true,
            errored: false,
            message: null,
            breadcrumb: [],

        }),
        created() {
            console.log('===>' + this.$route.params.techName)

            this.type === null && this.reload();
            this.breadcrumb = [
                {
                    text: 'All Types',
                    disabled: false,
                    href: '/types',
                },
                {
                    text: this.$route.params.techName,
                    disabled: true,
                }
            ]
        },
        methods: {
            onSave: function (data) {
                this.editedAttribute = null
                this.message = data.success ? "Saved successfully." : null;
            },
            onDelete: function (data) {
                this.editedAttribute = null
                this.message = data.success ? "Deleted successfully." : null;
            },
            editAttribute: function (attribute) {
                this.editedAttribute = attribute;
                this.breadcrumb = [
                    {
                        text: 'All Types',
                        disabled: false,
                        href: '/types',
                    },
                    {
                        text: this.$route.params.techName,
                        disabled: false,
                        href: this.$route.params.techName
                    },
                    {
                        text: attribute.techName,
                        disabled: true
                    }
                ]
            },
            newAttribute: function () {
                this.editedAttribute = {};
                this.breadcrumb = [
                    {
                        text: 'All Types',
                        disabled: false,
                        href: '/types',
                    },
                    {
                        text: this.$route.params.techName,
                        disabled: false,
                        href: this.$route.params.techName
                    },
                    {
                        text: "new attribute",
                        disabled: true
                    }
                ]
            },
            reload() {
                axios
                    .post('http://localhost:8080/api/macro/json', {
                        "command": "getType",
                        "techName": this.$route.params.techName
                    })
                    .then(response => {
                        this.type = response.data.type
                        console.log("Loaded:" + response)
                        this.loading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => this.loading = false)

            }
        }
    }
</script>