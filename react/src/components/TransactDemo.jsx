import { useEffect, useRef, useState } from "react";
import { Atomic, Product } from "@atomicfi/transact-javascript";

const CONTAINER_ID = "transact-container";
const companyId = import.meta.env.VITE_COMPANY_ID;

const TransactDemo = () => {
  const [finished, setFinished] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const transact = Atomic.transact({
      environmentOverride: import.meta.env.VITE_TRANSACT_URL || undefined,
      container: `#${CONTAINER_ID}`,
      config: {
        // Inline on a web page, not in an app: this hides Transact's own
        // close/return buttons, which would leave the iframe frozen.
        inSdk: false,
        publicToken: import.meta.env.VITE_PUBLIC_TOKEN,
        tasks: [{ product: Product.DEPOSIT }],
        deeplink: companyId
          ? { step: "login-company", companyId }
          : { step: "search-company" },
        theme: {
          display: "inline",
          overlayColor: "#FFF",
        },
      },
      onInteraction: (interaction) => {
        console.log("Interaction event:", interaction.name, interaction.value);
        if (
          interaction.name === "Viewed Task Completed Page" &&
          interaction.value?.state === "completed"
        ) {
          setFinished(true);
        }
      },
      onFinish: (data) => {
        console.log("Finish event:", data.taskId, data.handoff);
        setFinished(true);
      },
      onClose: (data) => {
        console.log("Close event:", data.reason);
      },
    });

    const container = containerRef.current;
    return () => {
      // close() only detaches the message listener in inline mode; the
      // iframe has to be removed by hand or a remount stacks a second one.
      transact.close();
      container?.replaceChildren();
    };
  }, []);

  return (
    <div>
      <div className="main">
        <h1>Set up your direct deposit</h1>
        <div className="wrapper">
          <div id={CONTAINER_ID} className="transact-container" ref={containerRef} />
          <div className="information">
            <p>
              We use{" "}
              <a href="https://www.atomic.financial" target="_blank" rel="noreferrer">
                Atomic
              </a>{" "}
              to easily update your direct deposit information.
            </p>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button type="button" className="btn btn-info">
          Cancel
        </button>
        {finished && (
          <button type="button" className="btn btn-primary">
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactDemo;
