<template>
    <div>
        <h1> {{ this.readId }} </h1>
    </div>
</template>

<script>
export default {
    props: [
        'readId'
    ],
    created() {
        //console.log(this.readId);
    }
}
</script>