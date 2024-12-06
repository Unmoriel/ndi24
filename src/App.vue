<script setup lang="ts">
import DarkUX from "@/components/darkUX/DarkUX.vue";
import InputCoquin from "@/components/InputCoquin.vue";
import MainContainer from "@/components/gamification/MainContainer.vue";
import { ref, provide, watch } from 'vue';
import Emojji from "@/components/Emojji.vue";

// Variable réactive globale pour la luminosité
const brightness = ref<number>(1); // Typage explicite pour TypeScript

// Fonction pour mettre à jour brightness
function setBrightness(value: number): void {
    brightness.value = value;
}

// Fournir la variable brightness
provide('brightness', brightness);
provide('setBrightness', setBrightness);

// Mettre à jour la variable CSS lorsqu'elle change
watch(brightness, (newValue) => {
    document.documentElement.style.setProperty('--brightness', newValue.toString());
});
</script>

<template>
    <div class="body">
        <MainContainer />
        <InputCoquin />
        <router-view>
        </router-view>
        <DarkUX />
    </div>
    <Emojji />
</template>

<style scoped>
.body {
    filter: brightness(var(--brightness, 1)); /* Utilise la variable globale */
    transition: filter 0.3s ease; /* Transition fluide */
    height: 100vh;
    z-index: 10;
    background-color: lightblue;
}
</style>
