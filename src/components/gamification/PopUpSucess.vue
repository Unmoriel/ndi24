<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
    message: {
        type: String,
        required: true
    },
    nbStar: {
        type: Number,
        required: true
    },
    nbStarMax: {
        type: Number,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    },
});

const isAnimating = ref(false);

watch(
    () => props.isVisible,
    (newVal) => {
        if (newVal) {
            isAnimating.value = true;
        } else {
            setTimeout(() => {
                isAnimating.value = false;
            }, 500);
        }
    }
);
</script>


<template>
    <div
        v-if="isAnimating"
        class="popup-container"
        :class="{ 'slide-in': props.isVisible, 'slide-out': !props.isVisible }"
    >
        <div class="popup">
            <div class="stars">
                <img
                    v-for="i in nbStar"
                    :key="`yellow-star-${i}`"
                    src="@/assets/img/star-yellow.png"
                    alt="yellow star"
                    class="star-img"
                />
                <img
                    v-for="i in nbStarMax - nbStar"
                    :key="`white-star-${i}`"
                    src="@/assets/img/star-white.png"
                    alt="white star"
                    class="star-img"
                />
            </div>
            <p class="message">{{ message }}</p>
        </div>
    </div>
</template>


<style scoped>
.popup-container {
    position: fixed;
    bottom: 70px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
}

.slide-in {
    animation: slide-up 0.5s forwards;
}

.slide-out {
    animation: slide-down 0.5s forwards;
}

.popup {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stars {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
}

.star-img {
    width: 20px;
    height: 20px;
}

.message {
    font-size: 14px;
    color: #333;
    text-align: center;
}

/* Animation d'apparition du bas vers le haut */
@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animation de disparition du haut vers le bas */
@keyframes slide-down {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(100%);
    }
}
</style>

