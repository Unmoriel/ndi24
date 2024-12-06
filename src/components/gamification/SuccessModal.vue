<script setup lang="ts">

const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true
    },
    challengeMouseClick: {
        type: Object,
        required: true
    },
    challengeMouseMouvement: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div v-if="props.isVisible" class="modal-backdrop">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h3 class="modal-title">Succès</h3>
                    <img src="../../assets/img/star-yellow.png" alt="star" class="icon-img"/>
                    <img src="../../assets/img/star-yellow.png" alt="star" class="icon-img"/>
                    <img src="../../assets/img/star-yellow.png" alt="star" class="icon-img"/>

                </div>
                <button class="btn btn-close" @click="$emit('closeModal')">X</button>
            </div>

            <div class="modal-body">
                <div>
                    <div class="challenge-title">
                        <p>Distance parcourue avec la souris :</p>
                        <img v-for="i in challengeMouseMouvement.nbStartEarned" :key="i" src="../../assets/img/star-yellow.png" alt="star" class="icon-img"/>
                        <img v-for="i in challengeMouseMouvement.nbStarMax-challengeMouseMouvement.nbStartEarned" :key="i" src="../../assets/img/star-white.png" alt="star" class="icon-img"/>
                    </div>
                </div>
                <div>
                    <div class="challenge-title">
                        <p>Nombre de cliques de souris :</p>
                        <img v-for="i in challengeMouseClick.nbStartEarned" :key="i" src="../../assets/img/star-yellow.png" alt="star" class="icon-img"/>
                        <img v-for="i in challengeMouseClick.nbStarMax-challengeMouseClick.nbStartEarned" :key="i" src="../../assets/img/star-white.png" alt="star" class="icon-img"/>
                    </div>
                    <p></p>
                </div>
            </div>


            <div class="modal-footer">
                <button class="btn btn-secondary" @click="$emit('closeModal')">Fermer</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: #fff;
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-body{
    padding-left: 15px;
    border-bottom: 1px solid #dee2e6;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    font-size: 1.25rem;
    font-weight: bold;
}

.modal-title {
    display: flex;
    align-items: center;
}

.icon-img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
}

.modal-body {
    padding: 20px;
    overflow-y: auto; /* Permet le défilement vertical */
    max-height: calc(90vh - 120px); /* Taille max en fonction du header/footer */
    text-align: left;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #dee2e6;
    padding: 10px 15px;
}
.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.btn-close {
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    color: #000;
    cursor: pointer;
}

.btn-close:hover {
    color: #dc3545;
}

.challenge-title{
    display: flex;
    align-items: center;
    justify-content: start;
}
</style>

