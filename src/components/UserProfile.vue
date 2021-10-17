<template>
  <div class="user-profile" :style="boxShadowStyle">
    <div v-if="user" class="user-profile__avatar">
      <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        alt="The user's avatar"
      />
    </div>
    <div v-if="user" class="user-profile__info">
      <h1 class="user-profile__name">{{ user.name }}</h1>
      <div class="user-profile__joined">{{ dateJoined }}</div>
      <h3 class="user-profile__username">@{{ user.login }}</h3>
      <div class="user-profile__bio">
        {{ user.bio || 'This profile has no bio' }}
      </div>
    </div>
    <div v-if="user" class="user-profile__stats">
      <div class="user-profile__stats-cell">
        <h4>Repos</h4>
        <h2>{{ user.public_repos }}</h2>
      </div>
      <div class="user-profile__stats-cell">
        <h4>Followers</h4>
        <h2>{{ user.followers }}</h2>
      </div>
      <div class="user-profile__stats-cell">
        <h4>Following</h4>
        <h2>{{ user.following }}</h2>
      </div>
    </div>
    <div v-if="user" class="user-profile__socials">Socials</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.user,
      theme: state => state.theme
    }),
    dateJoined() {
      const createdAt = this.user?.created_at;
      if (!createdAt) {
        return '';
      }
      const date = new Date(createdAt).toDateString().split(' ');
      return `Joined ${date[2]} ${date[1]} ${date[3]}`;
    },
    boxShadowStyle() {
      return this.theme === 'light'
        ? { 'box-shadow': '0 1.6rem 3rem -1rem rgba(70, 96, 187, 0.2)' }
        : {};
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 3.3rem;
  color: var(--color-title);
}

h3 {
  font-weight: normal;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: var(--color-blue);
}

h4 {
  font-weight: normal;
  font-size: 1.3rem;
  line-height: 2rem;
  color: var(--color-text);
}

.user-profile {
  height: 42rem;
  background: var(--color-content-background);
  border-radius: 15px;
  padding: 4.8rem;
  margin-top: 2.4rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3rem;

  &__avatar {
    img {
      width: 12rem;
      height: 12rem;
      shape-outside: circle(50% at 50% 50%);
      clip-path: circle(50% at 50% 50%);
    }
  }

  &__info {
    grid-column: 2 / -1;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  &__name {
    grid-column: 1 / 2;
  }

  &__joined {
    grid-column: 2 / -1;
    justify-self: end;
    align-self: center;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: var(--color-accent);
  }

  &__username {
    grid-column: 1 / 2;
  }

  &__bio {
    grid-column: 1 / 2;
    font-size: 1.5rem;
    line-height: 2.5rem;
    color: var(--color-text);
    opacity: 0.75;
  }

  &__stats {
    grid-column: 2 / -1;
    background-color: var(--color-main-background);
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 8.3rem 1.5rem 3.2rem;
  }

  &__socials {
    grid-column: 2 / -1;
  }
}
</style>
