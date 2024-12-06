<script setup lang="ts">
  import {ref} from "vue";

  const text = ref("");
  const stopNumber = ref(0);

  function inputChange() {
    if (stopNumber.value < 3) {
      if (text.value === "") {
        text.value = "Essaie";
      }
      else if (text.value === "Stop") {
        if (stopNumber.value === 0) {
          text.value = "Non."
          stopNumber.value ++;
        }
        else if (stopNumber.value === 1) {
          text.value = "NON!!!";
          stopNumber.value ++;
        }
        else {
          text.value = "Ok";
          stopNumber.value ++;
        }
      }
      else {
        const newText = event.target.value;
        if (newText.length > text.value.length) {
          text.value += newText.slice(-1);
          text.value += newText.slice(-1);
        }
        else {
          text.value = newText;
        }
      }
    }
  }
</script>

<template>
  <div>
    <label for="input">Allez va y écrit, je t'attends!</label>
    <input type="text" id="input" :value="text" @input="inputChange" placeholder="Essaie" :class="{'red' : stopNumber === 2 && text === 'NON!!!'}"/>
  </div>
</template>

<style scoped>
  div {
    position: absolute;
  }

  .red {
    background-color: red;
    color: darkred;
  }
</style>
