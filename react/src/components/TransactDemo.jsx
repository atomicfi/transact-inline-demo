import React, { useEffect, useState } from "react";
import { Atomic, Product } from "@atomicfi/transact-javascript";

const TransactDemo = () => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    Atomic.transact({
      container: ".transact-container",
      config: {
        inSdk: false,
        demoMode: true,
        publicToken: import.meta.env.VITE_PUBLIC_TOKEN,
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
          setFinished(true);
        }
      },
      onFinish: (data) => {
        console.log("Finish event:", data.taskId, data.handoff);
      },
      onClose: (data) => {
        console.log("Close event:", data.reason);
      },
    });
  }, []);

  return (
    <div>
      <div class="main">
        <h1>Setup your direct deposit</h1>
        <div class="wrapper">
          <div class="transact-container"></div>
          <div class="information">
            <p>
              We use{" "}
              <a href="https://www.atomic.financial" target="_blank">
                Atomic
              </a>{" "}
              to easily update your direct deposit information.
            </p>
          </div>
        </div>
      </div>
      <div class="action-buttons">
        <div class="btn btn-info">Cancel</div>
        {finished && <div class="btn btn-primary">Continue</div>}
      </div>
    </div>
  );
};

export default TransactDemo;
