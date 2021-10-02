<template>
  <div class="header">
    <h1>devfinder</h1>
    <button :style="buttonColor">
      Dark
      <img src="../assets/svg/icon-moon.svg" alt="Moon Icon" />
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
    buttonColor() {
      return {
        color: colors[`accent-${this.theme}`]
      };
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

  img {
    margin-left: 1rem;
  }
}
</style>
