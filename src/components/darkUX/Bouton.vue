<script setup lang="ts">
import { defineEmits } from 'vue';

// Déclarez l'événement que ce composant peut émettre
const emit = defineEmits(['buttonClicked']);

function handleClick() {
  emit('buttonClicked'); // Émet l'événement
}
</script>

<template>
  <!-- Le bouton est désormais en bas à droite de la page -->
  <button @click="handleClick" class="button-bot-right">
    Ajuster l'éclairage
  </button>
</template>

<style scoped>
/* Positionner le bouton en bas à droite de la page */
.button-bot-right {
  position: fixed; /* Position absolue par rapport à la fenêtre */
  bottom: 20px; /* Espacement du bas de la fenêtre */
  left: 20px; /* Espacement de la droite de la fenêtre */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.button-bot-right:hover {
  background-color: #0056b3; /* Changer de couleur au survol */
}

.button-bot-right:focus {
  outline: none; /* Retirer le focus par défaut */
}
</style>
