<template>
  <div v-if="user" class="user-profile" :style="boxShadowStyle">
    <div class="user-profile__avatar">
      <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        alt="The user's avatar"
      />
    </div>
    <div class="user-profile__info">
      <h1 class="user-profile__name">{{ user.name }}</h1>
      <div class="user-profile__joined">{{ dateJoined }}</div>
      <h3 class="user-profile__username">@{{ user.login }}</h3>
      <div class="user-profile__bio">
        {{ user.bio || 'This profile has no bio' }}
      </div>
    </div>
    <div class="user-profile__stats">
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
    <div class="user-profile__socials">
      <div
        class="user-profile__icon"
        :class="{ 'user-profile__icon--unavailable': !user.location }"
      >
        <img
          src="../assets/svg/icon-location.svg"
          alt="Location pin icon"
          :class="{ 'dark-mode': theme === 'dark' }"
        />
      </div>
      <div
        class="user-profile__text"
        :class="{ 'user-profile__text--unavailable': !user.location }"
      >
        {{ user.location || 'Not Available' }}
      </div>
      <div
        class="user-profile__icon"
        :class="{ 'user-profile__icon--unavailable': !user.twitter_username }"
      >
        <img
          src="../assets/svg/icon-twitter.svg"
          alt="Location pin icon"
          :class="{ 'dark-mode': theme === 'dark' }"
        />
      </div>
      <div
        class="user-profile__text"
        :class="{ 'user-profile__icon--unavailable': !user.twitter_username }"
      >
        {{ user.twitter_username || 'Not Available' }}
      </div>
      <div
        class="user-profile__icon"
        :class="{ 'user-profile__icon--unavailable': !user.blog }"
      >
        <img
          src="../assets/svg/icon-website.svg"
          alt="Location pin icon"
          :class="{ 'dark-mode': theme === 'dark' }"
        />
      </div>
      <div
        class="user-profile__text"
        :class="{ 'user-profile__icon--unavailable': !user.blog }"
      >
        <a v-if="user.blog" :href="user.blog" class="user-profile__text">
          {{ user.blog }}
        </a>
        <span v-else>Not Available</span>
      </div>
      <div
        class="user-profile__icon"
        :class="{ 'user-profile__icon--unavailable': !user.company }"
      >
        <img
          src="../assets/svg/icon-company.svg"
          alt="Location pin icon"
          :class="{ 'dark-mode': theme === 'dark' }"
        />
      </div>
      <div
        class="user-profile__text"
        :class="{ 'user-profile__icon--unavailable': !user.company }"
      >
        {{ user.company || 'Not Available' }}
      </div>
    </div>
  </div>
  <div v-else class="user-placeholder" :style="boxShadowStyle"></div>
</template>

<script>
import { mapState } from 'vuex';
import gsap from 'gsap';

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
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          gsap.fromTo(
            '.user-profile > div',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: 'power1.inOut'
            }
          );
        });
      }
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

.user-profile,
.user-placeholder {
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
    color: var(--color-text);

    display: grid;
    grid-template-columns: 3.6rem 1.5fr 3.6rem 1fr;
    grid-template-rows: repeat(2, 1fr);
    row-gap: 2rem;
  }

  &__text {
    font-size: 1.5rem;
    line-height: 2.2rem;

    &--unavailable {
      opacity: 0.5;
    }

    a {
      color: var(--color-text);

      &:not(:hover) {
        text-decoration: none;
      }
    }
  }

  &__icon {
    &--unavailable {
      opacity: 0.5;
    }

    img.dark-mode {
      filter: saturate(0) brightness(3);
    }
  }
}
</style>
