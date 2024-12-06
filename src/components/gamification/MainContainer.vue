<script setup lang="ts">

import SuccesBtn from "@/components/gamification/SuccesBtn.vue";
import SuccessModal from "@/components/gamification/SuccessModal.vue";
import { ref } from 'vue';
import TrackerMouse from "@/components/gamification/TrackerMouse.vue";
import PopUpSucess from "@/components/gamification/PopUpSucess.vue";

const challengeMouseMouvement = ref({
    title: "Distance parcourue avec la souris",
    nbStarMax: 3,
    nbStartEarned: 0,
    level: [10000, 30000, 50000],
})

const challengeMouseClick = ref({
    title: "Nombre de cliques de souris",
    nbStarMax: 3,
    nbStartEarned: 0,
    level: [10, 30, 50],
})

const showModal = ref(false);
const showPopUpSuccess = ref(false);
const popUpMessage = ref("");
const popUpNbStar = ref(0);
const popUpNbStarMax = ref(0);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};


function openPopUpSuccess(nbStar: number, nbStarMax: number, message: string) {
    if(!showModal.value) {
        popUpMessage.value = message;
        popUpNbStarMax.value = nbStarMax;
        popUpNbStar.value = nbStar;
        showPopUpSuccess.value = true;
        setTimeout(() => {
            showPopUpSuccess.value = false;
        }, 3000);
    } else {
        setTimeout(() => {
            openPopUpSuccess(nbStar, nbStarMax, message);
        }, 3000);
    }

}

function increaseStarMouseMouvement() {
    if (challengeMouseMouvement.value.nbStarMax > challengeMouseMouvement.value.nbStartEarned) {
        challengeMouseMouvement.value = {
            ...challengeMouseMouvement.value,
            nbStartEarned: challengeMouseMouvement.value.nbStartEarned + 1,
        };
    }
}

function increaseStarMouseClick() {
    if (challengeMouseClick.value.nbStarMax > challengeMouseClick.value.nbStartEarned) {
        challengeMouseClick.value = {
            ...challengeMouseClick.value,
            nbStartEarned: challengeMouseClick.value.nbStartEarned + 1,
        };
    }
}


</script>

<template>
    <succes-btn @open-modal="openModal"/>
    <success-modal
        :challengeMouseMouvement="challengeMouseMouvement"
        :challengeMouseClick="challengeMouseClick"
        :is-visible="showModal"
        @closeModal="closeModal"
    />
    <TrackerMouse
        :challengeMouseMouvement="challengeMouseMouvement"
        :challengeMouseClick="challengeMouseClick"
        @increase-star-mouse-mouvement="increaseStarMouseMouvement"
        @increaseStarMouseClick="increaseStarMouseClick"
        @open-pop-up-success="openPopUpSuccess"
    />
    <PopUpSucess
        :is-visible="showPopUpSuccess"
        :nb-star="popUpNbStar"
        :nb-star-max="popUpNbStarMax"
        :message="popUpMessage"/>
</template>

<style scoped>

</style>
