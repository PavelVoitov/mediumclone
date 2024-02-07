<template>
  <header>
    Hello World
    <nav>
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'sign-in'}">Sign In</router-link> |
      <router-link :to="{name: 'sign-up'}">Sign Up</router-link> |
      <router-link :to="{name: 'about'}">About</router-link>
    </nav>
  </header>

  <router-view />
</template>

<script setup></script>

<style></style>
