<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

const props = defineProps({
    challengeMouseMouvement: {
        type: Object,
        required: true
    },
    challengeMouseClick: {
        type: Object,
        required: true
    }
});

const totalDistance = ref(0);
const nbclickTotal = ref(0);

let lastMousePosition = { x: 0, y: 0 };

const emit = defineEmits(['open-pop-up-success', 'increase-star-mouse-mouvement', 'increaseStarMouseClick']);

const trackMouseDistance = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;

    if (lastMousePosition.x !== 0 || lastMousePosition.y !== 0) {
        const dx = currentX - lastMousePosition.x;
        const dy = currentY - lastMousePosition.y;

        totalDistance.value += Math.sqrt(dx ** 2 + dy ** 2);
    }

    lastMousePosition = { x: currentX, y: currentY };
};

const trackNbClick = () => {
    nbclickTotal.value += 1;
};

let lastEmittedThreshold = 0;

const levelMouseMouvement = computed(() => {
    return props.challengeMouseMouvement.level[props.challengeMouseMouvement.nbStartEarned];
});
watch(totalDistance, (newValue) => {
    if (newValue > levelMouseMouvement.value && lastEmittedThreshold < levelMouseMouvement.value) {
        emit(
            'open-pop-up-success',
            props.challengeMouseMouvement.nbStartEarned + 1,
            props.challengeMouseMouvement.nbStarMax,
            `Bien joué ! Vous avez parcouru ${levelMouseMouvement.value} pixels avec votre souris !`
        );

        emit('increase-star-mouse-mouvement');
        lastEmittedThreshold = levelMouseMouvement.value;
    }
});


let lastEmittedTotalClick = 0;

const levelMouseClick = computed(() => {
    return props.challengeMouseClick.level[props.challengeMouseClick.nbStartEarned];
});
watch(nbclickTotal, (newValue) => {
    if (newValue > levelMouseClick.value && lastEmittedTotalClick < levelMouseClick.value) {
        emit(
            'open-pop-up-success',
            props.challengeMouseClick.nbStartEarned + 1,
            props.challengeMouseClick.nbStarMax,
            `Bien joué ! Vous avez cliquer ${levelMouseClick.value} fois avec votre souris !`
        );

        emit('increaseStarMouseClick');
        lastEmittedTotalClick = levelMouseClick.value;
    }
});


onMounted(() => {
    window.addEventListener('mousemove', trackMouseDistance);
    window.addEventListener('click', trackNbClick);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', trackMouseDistance);
});
</script>

<template>
    <div></div>
</template>
