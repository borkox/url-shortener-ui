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
        <v-alert
                color="green"
                v-if="message"
                dismissible
        >{{message}}
        </v-alert>

        <ViewEditEnumHome
                v-if="!editedEnumTechName"
                @editEnum="editEnum"

        ></ViewEditEnumHome>
        <EditEnumDef
                v-if="editedEnumTechName"
                v-bind:enumdeftechname="editedEnumTechName"
                @cancel="editedEnumTechName=null"
                @save="onSave"

        />
    </v-sheet>

</template>


<script>
    // @ is an alias to /src
    import EditEnumDef from '@/components/EditEnumDef.vue'
    import ViewEditEnumHome from '@/components/ViewEditEnumHome.vue'
    // import axios from 'axios'

    export default {
        name: 'Enums',
        components: {
            EditEnumDef,
            ViewEditEnumHome,
        },

        data: () => ({
            editedEnumTechName: null,
            enumDef: null,
            loading: true,
            errored: false,
            message: null,
            breadcrumb: [],

        }),
        created() {
            console.log('===>' + this.$route.params.techName)

            //this.enumDef === null && this.reload();
            this.breadcrumb = [
                {
                    text: 'All Enums',
                    disabled: false,
                    href: '/enums',
                },
                {
                    text: this.$route.params.techName,
                    disabled: true,
                }
            ]
        },
        methods: {
            onSave: function (data) {
                this.editedEnumTechName = null
                this.message = data.success ? "Saved successfully." : null;
            },
            editEnum: function (enumDefTechName) {
                this.editedEnumTechName = enumDefTechName;
                this.breadcrumb = [
                    {
                        text: 'All Enums',
                        disabled: false,
                        href: '/enums',
                    },
                    {
                        text: this.$route.params.techName,
                        disabled: false,
                        href: this.$route.params.techName
                    },
                    {
                        text: "edit",
                        disabled: true
                    }
                ]
            },
            // reload() {
            //     axios
            //         .post('http://localhost:8080/api/macro/json', {
            //             "command": "getEnumDef",
            //             "techName": this.$route.params.techName
            //         })
            //         .then(response => {
            //             this.enumDef = response.data.enumDef
            //             console.log("Loaded:" + response)
            //             this.loading = false
            //         })
            //         .catch(error => {
            //             console.log(error)
            //             this.errored = true
            //         })
            //         .finally(() => this.loading = false)
            //
            // }
        }
    }
</script>