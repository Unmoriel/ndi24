<script setup lang="ts">
const props = defineProps<{
    leave: () => void;
    title: string;
    text: string;
}>();

</script>

<template>
    <transition name="fade">
        <div>
            <button @click="props.leave">X</button>
            <h2>{{ title }}</h2>
            <p>{{ text }}</p>
        </div>
    </transition>

</template>

<style scoped>
div {
    background-color: aliceblue;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 25vw;
    height: 65vh;
    border-radius: 5%;
    border: 1px solid deepskyblue;
}

button {
    position: fixed;
    left: 90%;
    top: 3%;
    background-color: orange;
    border: solid 2px deepskyblue;
    border-radius: 35%;
    font-size: 20px;
    font-weight: bold;
}

button:hover {
    background-color: orangered;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

p {
    font-size: 20px;
    padding-top: 10%;
    padding-left: 3%;
    padding-right: 3%;
}

h2 {
    font-size: 30px;
}
</style>
