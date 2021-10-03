<template>
  <div class="header">
    <h1 :style="headingColor">devfinder</h1>
    <button :style="buttonColor" @click="toggleTheme">
      {{ buttonText }}
      <img :src="buttonImgSrc" alt="Moon Icon" :style="imgColor" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import colors from '../assets/css/colors.scss';

export default {
  computed: {
    ...mapState({
      theme: state => state.theme
    }),
    headingColor() {
      return {
        color: colors[`title-${this.theme}`]
      };
    },
    buttonText() {
      return this.theme === 'light' ? 'dark' : 'light';
    },
    buttonImgSrc() {
      return this.theme === 'light'
        ? require('@/assets/svg/icon-moon.svg')
        : require('@/assets/svg/icon-sun.svg');
    },
    buttonColor() {
      return {
        '--button-color': colors[`accent-${this.theme}`],
        '--button-hover-color': colors[`text-hover-${this.theme}`]
      };
    },
    imgColor() {
      return {
        '--filter':
          this.theme === 'light'
            ? 'brightness(0)'
            : 'invert(58%) sepia(34%) saturate(600%) hue-rotate(195deg) contrast(90%)'
      };
    }
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('toggleTheme');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-weight: bold;
  font-size: 2.6rem;
  line-height: 3.8rem;
}

button {
  color: var(--button-color);
  font-size: 1.3rem;
  line-height: 1.9rem;
  letter-spacing: 2.5px;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: color 0.3s;

  img {
    margin-left: 1rem;
    transition: filter 0.3s;
  }
}

button:hover {
  color: var(--button-hover-color);

  img {
    filter: var(--filter);
  }
}

button:active {
  transform: translateY(1px);
}
</style>
