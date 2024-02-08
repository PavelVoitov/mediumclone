<template>
  <nav class="navbar navbar-light">
    <div>
      <router-link class="navbar-brand" :to="{name: 'home'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home'}"
            active-class="active"
            >Home</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'createArticle'}"
              active-class="active"
            >
              <i class="ion-compose"></i>
              &nbsp; New article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'settings'}"
              active-class="active"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'userProfile', params: {slag: currentUser.name}}"
              active-class="active"
            >
              <img
                v-if="currentUser.img"
                class="user-pic"
                :src="currentUser.img"
                alt="user logo"
              />
              <img
                v-else
                class="user-pic"
                src="../assets/icon-user.png"
                alt="user logo"
              />
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'sign-in'}"
              active-class="active"
            >
              Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'sign-up'}"
              active-class="active"
            >
              Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'about'}"
              active-class="active"
            >
              About
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'McvTopBar',
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
}
</script>
