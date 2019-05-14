<template>
  <div>
    <WatchNavbar></WatchNavbar>
    <router-view></router-view>
    <WatchFooter></WatchFooter> 
  </div>
</template>

<script>
import WatchFooter from './WatchFooter';
import WatchNavbar from './WatchNavbar';

export default {
  components: {
    WatchFooter,
    WatchNavbar,
  },
};
</script>

