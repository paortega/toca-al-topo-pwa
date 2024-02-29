<template>
  <div class="input-container">
    <input type="text" v-model="username" placeholder="Name: ">
  </div>
  <button class="button" @click="startGame">JOIN</button>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';

export default defineComponent ({
  data() {
    return {
      username: '' as string
    };
  },
  methods: {
    startGame() {
      if (this.username.trim() !== '') {
        localStorage.setItem('username', this.username);
        this.$router.push({ name: 'game', params: { username: this.username }});
      }
    }
  }
});
</script>
<style scoped>
  .button {
    background-color: #2d6de4;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .input-container {
    margin: 50px;
    display: flex;
    justify-content: center;
  }

  .input-container input[type="text"] {
    width: calc(50% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
  }
</style>
