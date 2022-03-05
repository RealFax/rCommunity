<template>
    <v-app>
        <img src="../assets/realfax.png" class="centerImage"/>
        <v-text-field solo></v-text-field>
    </v-app>
</template>

<script>
export default {
    name: 'Search',
    data () {
        return {

        }
    }
}
</script>

<style>
.searchMain {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.centerImage {
    width: 20vw;
    height: auto;
}
</style>
