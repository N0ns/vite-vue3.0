<template>
  <div>
    home
    {{ num }}
  </div>
  <div>{{ obj.a }}</div>
  <button @click="add">add</button>
</template>

<script setup>
import { reactive, ref } from "vue";
const num = ref(0);
const obj = reactive({ a: "haha" });
const add = () => {
  num.value++;
  obj.a = obj.a === "haha" ? "hohho" : "haha";
};
</script>

