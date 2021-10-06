<template>
  <div class="centered">
    <div class="emoji">{{ emoji }}</div>
    <p class="title">{{ $t("Text.Status.NotFound.message") }}</p>
    <p class="text">{{ $t("Text.Status.NotFound.messageAlert") }}</p>
    <router-link to="/" class="back" style="color: #fff;">
      {{ $t("Text.Public.BackHome") }}
    </router-link>
  </div>
</template>

<script>
import { getRandEmoji } from "../../utils/function";
export default {
  data() {
    return {
      emoji: getRandEmoji(),
    };
  },
};
</script>
<style>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.emoji {
  font-size: 9em;
  text-align: center;
}
.title {
  margin-top: 20%;
  font-size: 1.5em;
  text-align: center;
  line-height: 0em;
  color: grey;
}
.text {
  font-weight: bold;
  margin-top: 15%;
  text-align: center;
}
.back {
  text-align: center;
  margin-left: 20%;
  margin-top: 5%;
  display: inline-block;
  border-radius: 100vw;
  background: #4b92db;
  font-size: 1.5vw;
  text-decoration: none;
  padding: 0.8vw 2vw;
}
</style>