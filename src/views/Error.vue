<script>
    export default {
        name: "ErrorPage",
        data() {
            return {
                statusCode: '',
                url: '',
                statusTxt: '',
            }
        },
        /*  takes a query string that can have status, url, and statusText
            @status is the status code eg: 401, 200, 24
            @url is the endpoint 
            @statusText is any text you want the user to be able to read        
        */
        mounted() {
            const status = this.$route.query.status
            const url = this.$route.query.url
            const statusText = this.$route.query.statusText

            this.statusCode = status
            this.url = url
            this.statusTxt = statusText
            const consoleErr = JSON.parse(localStorage['error'])
            console.error("error report:", consoleErr)
        }
    }
</script>


<template>
    <v-container class="error-container">
        <v-layout class="error-container" align-center justify-center column>
            <h1 id="err">{{statusCode}} Error</h1>
            <h2>{{statusTxt}}</h2>
            <h2 id="url" >Endpoint: {{url}}</h2>
            <div>See console for full error details</div>
        </v-layout>
    </v-container>
</template>


<style lang="scss">
#err {
    font-size: 96px;
    padding: 0;
    padding-top: 20vh;
    margin: 0;
}

#url {
    color: grey;
}

.error-container {
    height: 100%;
}

</style>