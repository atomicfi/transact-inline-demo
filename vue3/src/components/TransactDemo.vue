<template>
  <div>
    <div class="main">
      <h1>Set up your direct deposit</h1>
      <div class="wrapper">
        <div :id="containerId" ref="container" class="transact-container"></div>
        <div class="information">
          <p>
            We use
            <a href="https://www.atomic.financial" target="_blank" rel="noreferrer">Atomic</a>
            to easily update your direct deposit information.
          </p>
        </div>
      </div>
    </div>
    <div class="action-buttons">
      <button type="button" class="btn btn-info">Cancel</button>
      <button v-if="finished" type="button" class="btn btn-primary">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Atomic, Product } from "@atomicfi/transact-javascript";

const containerId = "transact-container";
const container = ref(null);
const finished = ref(false);
let transact;

const companyId = import.meta.env.VITE_COMPANY_ID;

onMounted(() => {
  transact = Atomic.transact({
    environmentOverride: import.meta.env.VITE_TRANSACT_URL || undefined,
    container: `#${containerId}`,
    config: {
      publicToken: import.meta.env.VITE_PUBLIC_TOKEN,
      tasks: [{ product: Product.DEPOSIT }],
      deeplink: companyId
        ? { step: "login-company", companyId }
        : { step: "search-company" },
      theme: {
        display: "inline",
      },
    },
    onInteraction: (interaction) => {
      console.log("Interaction event:", interaction.name, interaction.value);
      if (
        interaction.name === "Viewed Task Completed Page" &&
        interaction.value?.state === "completed"
      ) {
        finished.value = true;
      }
    },
    onFinish: (data) => {
      console.log("Finish event:", data.taskId, data.handoff);
      finished.value = true;
    },
    onClose: (data) => {
      console.log("Close event:", data.reason);
    },
    onDataRequest: (data) => {
      console.log("Data request:", data);
    },
  });
});

onBeforeUnmount(() => {
  // close() only detaches the message listener in inline mode; the iframe
  // has to be removed by hand or a remount stacks a second one.
  transact?.close();
  container.value?.replaceChildren();
});
</script>
