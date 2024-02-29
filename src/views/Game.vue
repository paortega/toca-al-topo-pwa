<template>
  <div>
    <h2>Welcome, {{ username }}!</h2>
    <p><b>Points: {{ points }}</b></p>
    <div>
      <label class="label-level">Level:</label>
      <select v-model="difficulty">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div class="container">
      <div class="grid">
        <div v-for="(square, index) in squares" :key="index" class="square">
          <img v-if="square.hasTopo" @click="handleClick(index)" src="./../assets/topo.png">
        </div>
      </div>
    </div>
    <button @click="gameStarted ? stopGame() : startGame()" class="button">{{ gameStarted ? 'STOP' : 'PLAY' }}</button>
    <button @click="returnToHome" class="button">RETURN</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      points: 0,
      username: '' as string,
      difficulty: 'low' as 'low' | 'medium' | 'high',
      squares: Array(9).fill(null).map(() => ({ hasTopo: false })),
      gameStarted: false,
      timeoutId: 0
    };
  },
  created() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  },
  methods: {
    startGame() {
      if (this.gameStarted) return;
      this.gameStarted = true;
      this.showRandomTopo();
    },
    stopGame() {
      this.gameStarted = false;
      clearTimeout(this.timeoutId);
      this.points = 0;
      this.squares.forEach(square => {
        square.hasTopo = false;
      });
    },
    showRandomTopo() {
      const randomIndex = Math.floor(Math.random() * this.squares.length);
      this.squares.forEach(square => {
        square.hasTopo = false;
      });

      this.squares[randomIndex].hasTopo = true;
      let timeInterval = 2000;

      if (this.difficulty === 'low') {
        timeInterval = 1000;
      } else if (this.difficulty === 'medium') {
        timeInterval = 750;
      } else if (this.difficulty === 'high') {
        timeInterval = 500;
      }

      this.timeoutId = setTimeout(() => {
        this.squares[randomIndex].hasTopo = false;

        if (this.gameStarted) {
          this.showRandomTopo();
        }
      }, timeInterval);
    },
    handleClick(index: number) {
      const square = this.squares[index];
      if (square.hasTopo) {
        let totalPoints = 0;
        if (this.difficulty === 'low') {
          totalPoints = 10;
        } else if (this.difficulty === 'medium') {
          totalPoints = 20;
        } else if (this.difficulty === 'high') {
          totalPoints = 30;
        }
        this.points += totalPoints;
        square.hasTopo = false;
      }
    },
    returnToHome() {
      this.$router.push({ name: 'home' });
    }
  }
});
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vh;
  }

  .label-level {
    padding-right: 5px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 10px;
  }

  .button {
    background-color: #2d6de4;
    border: none;
    color: white;
    padding: 15px 32px;
    margin-right: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .square {
    width: 100px;
    height: 100px;
    border: 2px solid black;
  }

  .square img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
