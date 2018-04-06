<template>
  <div id="navigator">
    <router-link :class="{ 'active-panel': active === 'news'    }" :to="{ path: '/main/news', props: { userdata: user } }"><font-awesome-icon icon="newspaper" size="2x"></font-awesome-icon></router-link>
    <router-link :class="{ 'active-panel': active === 'star'    }" :to="{ path: '/main/focus', props: { userdata: user } }"><font-awesome-icon icon="star" size="2x"></font-awesome-icon></router-link>
    <router-link :class="{ 'active-panel': active === 'post'    }" :to="{ path: '/main/post', props: { userdata: user } }"><font-awesome-icon icon="plus" size="2x"></font-awesome-icon></router-link>
    <router-link :class="{ 'active-panel': active === 'search'  }" :to="{ path: '/main/search', props: { userdata: user } }"><font-awesome-icon icon="search" size="2x"></font-awesome-icon></router-link>
    <router-link :class="{ 'active-panel': active === 'profile' }" :to="{ path: '/main/profile', props: { userdata: user } }"><font-awesome-icon icon="user" size="2x"></font-awesome-icon></router-link>
  </div>
</template>
