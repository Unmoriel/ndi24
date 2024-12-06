<script setup lang="ts">
import Point from "@/components/darkUX/Point.vue";
import { defineProps, watch, inject, ref, type Ref } from "vue";

// Définir les propriétés avec des types explicites
const props = defineProps<{
    isButtonClicked: boolean;
}>();

// Variable pour désactiver le point
const isPointDisabled = ref(true);

// Surveiller les changements de la propriété `isButtonClicked`
watch(() => props.isButtonClicked, (newVal, oldVal) => {
    console.log(`isButtonClicked a changé de ${oldVal} à ${newVal}`);
    if (oldVal === false && newVal === true) {
        // click
        disable.value = false;
        showElementAtRandomPosition();
        indexMin.value = 999999999;
    } else if (oldVal === true && newVal === false) {
        // après 0.5s
        disable.value = true;
        setBrightnessByIndex(indexMin.value);
        indexMin.value = 999999999;
    }
    isPointDisabled.value = !newVal; // Désactiver si isButtonClicked est false
});

// Récupérer les variables brightness et setBrightness via inject
const brightness = inject<Ref<number>>('brightness');
const setBrightness = inject<(value: number) => void>('setBrightness');
if (!brightness || !setBrightness) {
    throw new Error("Les variables 'brightness' ou 'setBrightness' n'ont pas été fournies !");
}

// Variables réactives
const indexMin = ref(999999999);
const xposition = ref(10);
const yposition = ref(10);
const disable = ref(true);

const points: Ref<Array<{ size: number; estVisible: boolean }>> = ref([
    { size: 250, estVisible: false },
    { size: 140, estVisible: false },
    { size: 80, estVisible: true },
]);

// Fonction pour ajuster la luminosité selon l'index
function setBrightnessByIndex(index: number) {
    if (index === 0) {
        if (setBrightness) {
            setBrightness(1);
        }
    } else if (index === 1) {
        if (setBrightness) {
            setBrightness(0.85);
        }
    } else if (index === 2) {
        if (setBrightness) {
            setBrightness(0.7);
        }
    }
}

// Fonction pour obtenir une position aléatoire
function getRandomPosition(): { x: number; y: number } {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const elementSize = 50;

    const x = Math.random() * (screenWidth - elementSize);
    const y = Math.random() * (screenHeight - elementSize);

    return { x, y };
}

// Fonction pour afficher un élément à une position aléatoire
function showElementAtRandomPosition() {
    const position = getRandomPosition();
    xposition.value = position.x;
    yposition.value = position.y;
}

// Gestion du clic sur un point
function manageClickOnPoint(point: { size: number; estVisible: boolean }, index: number) {
    console.log(`${index} MIN : ${indexMin.value}`);
    if (index < indexMin.value) {
        indexMin.value = index;
    }
}
</script>

<template>
    <Point
        v-for="(point, index) in points"
        :key="index"
        :size="point.size"
        :estVisible="point.estVisible"
        :disable="isPointDisabled"
        @clickOnPoint="manageClickOnPoint(point, index)"
        :xposition="xposition"
        :yposition="yposition"
    />
</template>

<style scoped>
</style>
