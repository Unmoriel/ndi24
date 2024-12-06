<script setup lang="ts">
  import {ref} from "vue";
  import Flash from "@/components/Flash.vue";

  const part = ref();
  const flash = ref(false);
  let titles = ["Coeur", "Peau", "Cerveau", "Poumon", "Os"];
  let texts = ["Tout comme le cœur alimente le corps en sang grâce au système circulatoire, les courants marins et la pompe thermohaline jouent un rôle central dans la régulation des océans. Ils transportent chaleur, nutriments et énergie à travers la planète, permettant de maintenir un équilibre vital pour les écosystèmes marins et terrestres.",
  "La peau, barrière protectrice du corps, peut être comparée à la surface de l’océan. C’est à la fois un lieu d’interaction avec l’extérieur et un bouclier, absorbant les rayons du soleil, régulant les échanges gazeux, et protégeant la vie marine qui se trouve en dessous.",
  "À l’image du cerveau, qui coordonne toutes les fonctions du corps humain, l’écosystème marin régule l’équilibre global des océans. Il gère des millions de connexions entre les espèces, les flux énergétiques et les cycles vitaux, jouant un rôle fondamental dans la survie de la planète.",
  "Les poumons, responsables des échanges gazeux dans le corps humain, trouvent leur équivalent dans les planctons marins. Ces organismes microscopiques produisent près de 50 % de l’oxygène que nous respirons, grâce à la photosynthèse, agissant comme de véritables poumons pour la Terre.",
  "Les récifs coralliens, structures solides et résistantes, forment la charpente des océans, tout comme les os soutiennent le corps humain. Ils abritent une biodiversité immense et jouent un rôle crucial dans la protection des côtes, assurant la stabilité de l’ensemble des écosystèmes marins."];
  const idPart = ref();

  function openFlash(id) {
    flash.value = true;
    idPart.value = id;
  }

  function leaveFlash() {
    flash.value = false;
  }
</script>

<template>
  <div id="home">
    <span>Partie du corps : {{ part }}</span>
    <div>
      <div id="man">
        <img src="/gentleguy.png">
        <button id="buttonHeart" @mouseover="part = 'Coeur'" @mouseleave="part = ''" @click="openFlash(0)"></button>
        <button id="buttonSkin" @mouseover="part = 'Peau'" @mouseleave="part = ''" @click="openFlash(1)"></button>
        <button id="buttonBrain" @mouseover="part = 'Cerveau'" @mouseleave="part = ''" @click="openFlash(2)"></button>
        <button id="buttonLung" @mouseover="part = 'Poumon'" @mouseleave="part = ''" @click="openFlash(3)"></button>
        <button id="buttonBone" @mouseover="part = 'Os'" @mouseleave="part = ''" @click="openFlash(4)"></button>
      </div>
    </div>
    <Flash v-if="flash" :leave="leaveFlash" :title="titles[idPart]" :text="texts[idPart]"/>
  </div>
</template>

<style scoped>
#home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#man {
  margin: auto;
}

img {
  object-fit: contain;
  height: 60vh;
  width: 40vw;
}

button {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: white;
  border: 1px deepskyblue solid;
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s, background-color 0.25s;
}

button:hover {
  background-color: steelblue;
  border: 2px deepskyblue solid;
  width: 20px;
  height: 20px;
}

#buttonHeart {
  top: 45%;
  left: 50.2%;
}

#buttonSkin {
  top: 57%;
  left: 53.5%;
}

#buttonBrain {
  top: 31%;
  left: 50%;
}

#buttonLung {
  top: 48%;
  left: 49%;
}

#buttonBone {
  top: 67%;
  left: 48.3%;
}
</style>
