<script setup lang="ts">
import Bouton from './Bouton.vue';
import { ref } from 'vue';
import ListOfPoints from "@/components/darkUX/ListOfPoints.vue";

let isButtonClicked = ref(false);

const triggerEvent = () => {
  isButtonClicked.value = true;

  // Timer de 0,5 seconde
  setTimeout(() => {
    isButtonClicked.value = false; // Réinitialise l'état après 0,5 seconde
  }, 500);
};



</script>

<template>
    <!-- Bouton pour agrandir le point -->
    <Bouton @buttonClicked="triggerEvent"/>
    <ListOfPoints :isButtonClicked="isButtonClicked"/>
</template>

<style scoped>

</style>
