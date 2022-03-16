<template>
  <button type="button" @click="launchTransact">Launch Transact</button>
  <div style="text-align: center">
    <div class="transact-container"></div>
  </div>
</template>

<script>
import { Atomic, Product } from "@atomicfi/transact-javascript-inline";

function launchTransact() {
  console.log("Launch");
  Atomic.transact({
    environmentOverride:
      "https://feature-inline-support.d3smqbi2kw4zm7.amplifyapp.com/",
    container: ".transact-container",
    config: {
      inSdk: false,
      demoMode: true,
      tasks: { product: "deposit" },
      theme: {
        inline: true,
      },
    },
    onInteraction: (interaction) => {
      console.log("Interaction event:", interaction.name, interaction.value);
    },
    onFinish: (data) => {
      console.log("Finish event:", data.taskId, data.handoff);
    },
    onClose: (data) => {
      console.log("Close event:", data.reason);
    },
  });
}

export default {
  name: "TransactDemo",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.transact-container {
  width: 500px;
  height: 640px;
  display: inline-block;
}
</style>
