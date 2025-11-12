<template>
  <div>
    <div class="main">
      <h1>Setup your direct deposit</h1>
      <div class="wrapper">
        <div class="transact-container"></div>
        <div class="information">
          <p>
            We use
            <a href="https://www.atomic.financial" target="_blank">Atomic</a> to
            easily update your direct deposit information.
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
        inSdk: true,
        publicToken: "test-477b0adc-2c82-4ba7-89c4-853c3dcfb35a",
        tasks: [
          {
            operation: Product.DEPOSIT,
          },
        ],
        deeplink: {
          step: "login-company",
          connectorId: "5da2a2372a5c5600081d0052",
          companyId: "609ada7a98ae06000980e124",
        },
        theme: {
          display: "inline",
        },
        customer: {
          name: "bob",
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
      onDataRequest: (data) => {
        console.log("Data request:", data);
      },
    });
  },
};
</script>
