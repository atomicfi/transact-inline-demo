<template>
  <div>
    <div class="main">
      <h1>Setup your direct deposit</h1>
      <div class="wrapper">
        <div class="transact-container"></div>
        <div class="information">
          <p>
            We use <a href="https://www.atomic.financial">Atomic</a> to easily
            update your direct deposit information.
          </p>
        </div>
      </div>
    </div>
    <div class="action-buttons">
      <div class="btn btn-info">Cancel</div>
      <div class="btn btn-primary" v-if="this.finished">Continue</div>
    </div>
  </div>
</template>

<script>
import { Atomic, Product } from "@atomicfidev/transact-javascript";

export default {
  name: "TransactDemo",
  props: {
    msg: String,
  },
  data() {
    return {
      finished: false,
    };
  },
  mounted() {
    let ctx = this;
    Atomic.transact({
      environmentOverride:
        "https://feature-inline-support.d3smqbi2kw4zm7.amplifyapp.com",
      container: ".transact-container",
      config: {
        inSdk: false,
        demoMode: true,
        tasks: [{ product: "deposit" }],
        deeplink: {
          step: "search-company",
        },
        theme: {
          inline: true,
          overlayColor: "#FFF",
        },
      },
      onInteraction: (interaction) => {
        console.log("Interaction event:", interaction.name, interaction.value);
        if (
          interaction.name == "Viewed Task Completed Page" &&
          interaction.value?.state === "completed"
        ) {
          ctx.finished = true;
        }
      },
      onFinish: (data) => {
        console.log("Finish event:", data.taskId, data.handoff);
      },
      onClose: (data) => {
        console.log("Close event:", data.reason);
      },
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color: #f7f7fa;
  text-align: left;
}
.btn {
  border: none;
  background-color: inherit;
  padding: 10px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  border: 1px solid #0b41c5;
}
.btn-info {
  background-color: #fff;
  color: #0b41c5;
}
.btn-primary {
  color: #fff;
  text-align: center;
  background-color: #0b41c5;
  font-weight: bold;
}
h1,
h2,
h3 {
  text-align: left;
  color: #0c1f74;
  margin-bottom: 30px;
  margin-left: 10px;
}
h1 {
  font-size: 25px;
}
a {
  color: #0b41c5;
}
.action-buttons {
  margin-top: 20px;
  text-align: right;
  width: 990px;
  margin-right: auto;
  margin-left: auto;
}
.main {
  text-align: center;
  width: 990px;
  margin-right: auto;
  margin-left: auto;
}
.wrapper {
  border: 1px solid #d4d4d9;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.transact-container {
  background-color: #fff;
  width: 500px;
  height: 710px;
  border-right: 1px solid #d4d4d9;
}
.information {
  padding: 0px 20px 0px 20px;
  margin: 30px;
  width: 350px;
  max-height: 80px;
  background-color: #f7f7fa;
  text-align: left;
  border-radius: 20px;
}
</style>
