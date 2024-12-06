<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const petEmoji = ref('🐟');
const health = ref(100);
const hunger = ref(50);
const happiness = ref(70);
const isGameOver = ref(false);
const profondeur = ref(0);
const emojis = ['🐟', '🐠', '🐡', '🐬', '🦈','🦑','🦞','🐋','🦐','🦭','🐙'];
const backgroundColor = ref('rgba(0, 0, 0, 0.1)');
const opacity = ref(0.1);
let interval: ReturnType<typeof setInterval>;

const actionCooldown = ref(false); // Variable pour gérer le cooldown

const feedPet = () => {
  if (!isGameOver.value && !actionCooldown.value) {
    actionCooldown.value = true; // Désactive les actions
    hunger.value = Math.max(hunger.value - 20, 0);
    health.value = Math.min(health.value + 10, 100);
    setTimeout(() => {
      actionCooldown.value = false; // Réactive les actions après 2 secondes
    }, 2000);
  }
};

const playWithPet = () => {
  if (!isGameOver.value && !actionCooldown.value) {
    actionCooldown.value = true;
    happiness.value = Math.min(happiness.value + 15, 100);
    hunger.value = Math.min(hunger.value + 10, 100);
    setTimeout(() => {
      actionCooldown.value = false;
    }, 2000);
  }
};

const healPet = () => {
  if (!isGameOver.value && !actionCooldown.value) {
    actionCooldown.value = true;
    health.value = Math.min(health.value + 20, 100);
    setTimeout(() => {
      actionCooldown.value = false;
    }, 2000);
  }
};

// Calcul des pertes basées sur la profondeur avec une difficulté réduite
const calculateDepthInfluence = (depth: number) => {
  const depthFactor = Math.min(depth / 150, 0.7); // Réduit l'impact de la profondeur

  // Réduit les pertes
  const hungerIncrease = Math.round(Math.min(5 + 3 * depthFactor, 10));  // La faim augmente moins vite
  const happinessDecrease = Math.round(Math.min(5 + 5 * depthFactor, 10)); // Le bonheur diminue moins vite
  const healthDecrease = Math.round(Math.min(5 + 5 * depthFactor, 10)); // La santé diminue moins vite

  return {
    hungerIncrease,
    happinessDecrease,
    healthDecrease
  };
};

const decreaseStats = () => {
  const { hungerIncrease, happinessDecrease, healthDecrease } = calculateDepthInfluence(profondeur.value);

  hunger.value = Math.min(hunger.value + hungerIncrease, 100);
  happiness.value = Math.max(happiness.value - happinessDecrease, 0);
  health.value = Math.max(health.value - healthDecrease, 0);

  if (health.value <= 0 || hunger.value >= 100 || happiness.value <= 0) {
    isGameOver.value = true;
  }
};

const plonger = () => {
  if (profondeur.value >= 260) {
    isGameOver.value = true;
    alert(`🎉 Félicitations ! Vous avez atteint ${profondeur.value} mètres de profondeur ! 🎉`);
    return;
  }

  profondeur.value += 5;
  evolution();
  if (profondeur.value % 30 === 0){
    updateBackgroundColor();
  }
};

const evolution = () => {
  const emojiIndex = Math.floor(profondeur.value / 20) % emojis.length;
  if (petEmoji.value !== '🐙') {
    petEmoji.value = emojis[emojiIndex];
  }
};

const updateBackgroundColor = () => {
  if (profondeur.value >= 30) {
    opacity.value = Math.min(opacity.value + 0.1, 1); // Limiter l'opacité à 1
    backgroundColor.value = `rgba(0, 0, 0, ${opacity.value})`;
  }
};

const startGameLoop = () => {
  interval = setInterval(() => {
    if (!isGameOver.value) {
      decreaseStats();
      plonger();
    }
  }, 3000);
};

const stopGameLoop = () => {
  clearInterval(interval);
};

onUnmounted(stopGameLoop);
startGameLoop();
</script>

<template>
  <div class="tamagotchi">
    <div class="background-overlay" :style="{'background-color': backgroundColor}"></div>

    <h1>🌊 Mon poisson 🌊</h1>
    <h2>🫧🫧 -{{ profondeur }}m 🫧🫧</h2>

    <div class="stats">
      <p>❤️ Santé : {{ health }} 🪸 Faim : {{ hunger }} 😄 Bonheur : {{ happiness }}</p>
    </div>
    <div class="actions">
      <button @click="feedPet" :disabled="actionCooldown" aria-label="Nourrir le poisson">🌿</button>
      <button @click="playWithPet" :disabled="actionCooldown" aria-label="Jouer avec le poisson">🛟</button>
      <button @click="healPet" :disabled="actionCooldown" aria-label="Soigner le poisson">💊</button>
    </div>

    <div class="pet" :class="{'hide': isGameOver}">{{ petEmoji }}</div>
    <div class="deadPet" :class="{'hide': !isGameOver || profondeur.valueOf() >= 260}">{{ petEmoji }}</div>


    <!-- Message de mort uniquement si le jeu est terminé mais que la profondeur est inférieure à 260 -->
    <p v-if="isGameOver && profondeur < 260" class="game-over">💀 Oh non, {{ petEmoji }} est mort à {{ profondeur }} mètres de profondeur</p>
  </div>
</template>





<style scoped>
.tamagotchi {
  position: relative;
  text-align: center;
  font-family: Arial, sans-serif;
  background-image: url('@/assets/img/fond eau.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease-in-out;
  z-index: 1;
  pointer-events: none;
}

.tamagotchi > *:not(.background-overlay) {
  position: relative;
  z-index: 2;
}

.pet {
  position: fixed;
  top: 10%;
  left: -45vw;
  transform: translate(-50%, -50%) scaleX(-1);
  font-size: 8vw;
  animation: moveLeftToRight 10s linear infinite;
}

.deadPet {
  position: fixed;
  transform: translate(-50%, -50%) rotate(180deg);
  font-size: 8vw;
}

.stats p {
  font-size: 1.5rem;
}

.actions button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
}

.game-over {
  color: red;
  font-size: 2rem;
  margin-top: 20px;
}

.hide {
  visibility: hidden;
}

@keyframes moveLeftToRight {
  0% {
    left: 100;
  }
  100% {
    left: 70%;
  }}

@media (max-width: 768px) {
  .pet,
  .deadPet {
    font-size: 12vw;
  }

  .stats p {
    font-size: 1rem;
  }

  .actions button {
    padding: 8px 16px;
    font-size: 1rem;
  }

  .game-over {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .pet,
  .deadPet {
    font-size: 16vw;
  }

  .stats p {
    font-size: 0.9rem;
  }

  .actions button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  .game-over {
    font-size: 1.2rem;
  }
}
</style>
