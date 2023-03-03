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
import { Atomic, Product } from "@atomicfi/transact-javascript";

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
      container: ".transact-container",
      config: {
        inSdk: false,
        demoMode: true,
        tasks: [{ product: Product.DEPOSIT }],
        deeplink: {
          step: "search-company",
        },
        theme: {
          display: "inline",
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
