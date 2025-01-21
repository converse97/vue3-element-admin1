<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
import variables from '@/styles/variables.module.scss'
import { useCounterStrore } from '../store/counter';
const counterStore = useCounterStrore();
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="text-red-600" style="width:100px;height:100px" :style="{ 'background-color': variables.bgColor }">
    123
  </div>
  <div @click="counterStore.increment">
    {{ counterStore.count }}
    {{ counterStore.doubleCount }}
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <el-button type="success">success</el-button>
  <el-button>
    <svg-icons icon-class="vue" />
    svg图示例
  </el-button>
  <div class="box"></div>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}

.box {
  width: 200px;
  height: 200px;
  background-color: $bg-color;
}
</style>