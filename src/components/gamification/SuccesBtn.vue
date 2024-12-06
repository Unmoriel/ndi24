<script setup lang="ts">

</script>

<template>
    <body @click="$emit('openModal')">
        <div>
            <img src="@/assets/img/burger-bar.png" alt="burger_menu" class="icon-img">
        </div>
        <div class="success-text">
            Succès
        </div>
        <div class="star">
            ⭐
        </div>
    </body>
</template>

<style scoped>

body{
    border: 1px solid #b1b1b1;
    border-radius: 10px;
    width: 150px;
    height: 40px;

    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;

    cursor: pointer;
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 1000;

}

body:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.success-text{
    padding-bottom: 5px;
    margin-left: 10px;
}

.icon-img{
    width: 30px;
    height: 30px;
}

.star{
    padding-bottom: 5px;
    margin-left: 10px;
}

</style>
