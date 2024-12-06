<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Déclarez l'événement que ce composant peut émettre
const emit = defineEmits(['clickOnPoint']);

// Déclarez les props pour le point
const props = defineProps({
  size: {
    type: Number, // Taille en pixels
    required: true,
    default: 10,
  },
  disable: {
    type: Boolean,
    required: true,
    default: true,
  },
  xposition: {
    type: Number,
    required: true,
    default: 10,
  },
  yposition: {
    type: Number,
    required: true,
    default: 10,
  }
});

function clickOnPoint() {
  emit('clickOnPoint'); // Émet l'événement lorsque le point est cliqué
}
</script>

<template>
  <!-- Le point est un petit cercle qui change de taille en fonction de la prop "size" -->
  <button
    @click="clickOnPoint"
    class="point"
    :style="{
      '--size': size + 'px',
      left: xposition + 'px',
      top: yposition + 'px',
      pointerEvents: disable ? 'none' : 'auto',  // Désactive les événements lorsque le point est désactivé
      opacity: disable ? 0 : 1,  // Le point devient invisible quand désactivé
      visibility: disable ? 'hidden' : 'visible',  // Les points désactivés sont invisibles
    }"
  ></button>
</template>

<style scoped>
.point {
  width: var(--size); /* Taille dynamique */
  height: var(--size); /* Taille dynamique */
  border-radius: 50%; /* Forme circulaire */
  background-color: red; /* Couleur du point */
  position: absolute; /* Position libre */
  transform: translate(-50%, -50%);
  border: none; /* Supprime les bordures */
  cursor: pointer; /* Curseur interactif */
  transition: opacity 0.2s ease; /* Transition pour l'opacité */
}

.point:focus {
  outline: none; /* Supprime les styles par défaut au focus */
}
</style>
