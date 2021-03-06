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
      <h1 class="user-profile__name">{{ user.name || user.login }}</h1>
      <div class="user-profile__username">@{{ user.login }}</div>
      <div class="user-profile__joined">{{ dateJoined }}</div>
      <div
        class="user-profile__bio"
        :class="{ 'user-profile__bio--empty': !user.bio }"
      >
        {{ user.bio || 'This profile has no bio' }}
      </div>
    </div>
    <div class="user-profile__stats">
      <div class="user-profile__stats-cell">
        <div class="eyebrow">Repos</div>
        <div class="stat">{{ user.public_repos }}</div>
      </div>
      <div class="user-profile__stats-cell">
        <div class="eyebrow">Followers</div>
        <div class="stat">{{ user.followers }}</div>
      </div>
      <div class="user-profile__stats-cell">
        <div class="eyebrow">Following</div>
        <div class="stat">{{ user.following }}</div>
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
        class="user-profile__text user-profile__text--short"
        :class="{ 'user-profile__icon--unavailable': !user.twitter_username }"
      >
        <a
          v-if="user.twitter_username"
          :href="twitterLink"
          class="user-profile__text"
          target="_blank"
        >
          {{ user.twitter_username }}
        </a>
        <span v-else>Not Available</span>
      </div>
      <div
        class="user-profile__icon blog"
        :class="{ 'user-profile__icon--unavailable': !user.blog }"
      >
        <img
          src="../assets/svg/icon-website.svg"
          alt="Location pin icon"
          :class="{ 'dark-mode': theme === 'dark' }"
        />
      </div>
      <div
        class="user-profile__text blog"
        :class="{ 'user-profile__icon--unavailable': !user.blog }"
      >
        <a
          v-if="user.blog"
          :href="user.blog"
          class="user-profile__text"
          target="_blank"
        >
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
        <a
          v-if="user.company"
          :href="companyLink"
          class="user-profile__text user-profile__text--short"
          target="_blank"
        >
          {{ user.company }}
        </a>
        <span v-else>Not Available</span>
      </div>
    </div>
  </div>
  <div v-else class="user-placeholder" :style="boxShadowStyle"></div>
</template>

<script>
import { mapState } from 'vuex';
// import gsap from 'gsap';

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
    },
    twitterLink() {
      return this.user?.twitter_username
        ? `https://twitter.com/${this.user.twitter_username}`
        : '';
    },
    companyLink() {
      if (this.user?.company[0] === '@') {
        const company = this.user?.company.substring(1);
        return `https://github.com/${company}`;
      } else {
        return '';
      }
    }
  }
  /* Commenting out animation since its messing up the submission screenshot
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
  */
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
  font-size: 2.6rem;
  line-height: 3.8rem;
  color: var(--color-title);

  @include media-sm {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}

.stat {
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 3.3rem;
  color: var(--color-title);

  @include media-sm {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}

.eyebrow {
  font-weight: normal;
  font-size: 1.3rem;
  line-height: 2rem;
  color: var(--color-text);

  @include media-sm {
    font-size: 1.1rem;
    line-height: 1.6rem;
  }
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

  @include media-md {
    height: 48rem;
    grid-template-rows: repeat(4, 1fr);
    padding: 4rem;
  }

  @include media-sm {
    height: 51.7rem;
    grid-template-rows: 1fr min-content 8.5rem 1fr;
    padding: 3.2rem 2.4rem;
    margin-top: 1.6rem;
  }

  &__avatar {
    img {
      width: 12rem;
      height: 12rem;
      shape-outside: circle(50% at 50% 50%);
      clip-path: circle(50% at 50% 50%);

      @include media-sm {
        width: 7rem;
        height: 7rem;
      }
    }

    @include media-md {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }

  &__info {
    grid-column: 2 / -1;

    // info sub-grid
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 3.5rem) 1fr;

    @include media-md {
      grid-column: 1 / -1;
      grid-row: 1 / 3;

      // info sub-grid
      grid-template-columns: 12rem 1fr;
      grid-template-rows: repeat(3, 4rem) auto;
      grid-column-gap: 2.4rem;
      align-items: center;
    }

    @include media-sm {
      // info sub-grid
      grid-template-columns: 7rem 1fr;
      grid-template-rows: repeat(3, 2.33rem) auto;
      grid-column-gap: 1.9rem;
    }
  }

  &__name {
    grid-column: 1 / 2;

    @include media-md {
      grid-column: 2 / -1;
    }
  }

  &__joined {
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    justify-self: end;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: var(--color-accent);
    padding-top: 0.8rem;

    @include media-md {
      grid-column: 2 / -1;
      grid-row: 3 / 4;
      justify-self: start;
    }

    @include media-sm {
      font-size: 1.3rem;
      line-height: 1.9rem;
    }
  }

  &__username {
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: var(--color-blue);
    grid-column: 1 / 2;

    @include media-sm {
      font-size: 1.3rem;
      line-height: 1.9rem;
    }

    @include media-md {
      grid-column: 2 / -1;
    }
  }

  &__bio {
    grid-column: 1 / -1;
    font-size: 1.5rem;
    line-height: 2.5rem;
    color: var(--color-text);
    opacity: 0.9;

    @include media-md {
      grid-column: 1 / -1;
      padding: 2.4rem 0;
    }

    @include media-sm {
      font-size: 1.3rem;
      line-height: 2.5rem;
    }

    &--empty {
      opacity: 0.75;
    }
  }

  &__stats {
    grid-column: 2 / -1;
    background-color: var(--color-main-background);
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 8.3rem 1.5rem 3.2rem;

    @include media-md {
      grid-column: 1 / -1;
      padding: 1.8rem 2.4rem;
    }

    @include media-sm {
      text-align: center;
    }

    &-cell {
      height: 5rem;
    }
  }

  &__socials {
    grid-column: 2 / -1;
    color: var(--color-text);

    display: grid;
    grid-template-columns: 3.6rem 1.5fr 3.6rem 1fr;
    grid-template-rows: repeat(2, 1fr);
    row-gap: 2rem;

    @include media-md {
      grid-column: 1 / -1;
    }

    @include media-sm {
      grid-template-columns: 3.6rem 1fr;
      grid-template-rows: repeat(4, 1fr);
    }
  }

  &__text {
    display: inline-block;
    max-width: 21rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    line-height: 2.2rem;
    white-space: nowrap;

    @include media-sm {
      font-size: 1.3rem;
      line-height: 1.9rem;
    }

    &--unavailable {
      opacity: 0.5;
    }

    &--short {
      max-width: 15rem;

      @include media-sm {
        max-width: 21rem;
      }
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

  &__text.blog,
  &__icon.blog {
    @include media-sm {
      grid-row: 2 / 3;
    }
  }
}
</style>
