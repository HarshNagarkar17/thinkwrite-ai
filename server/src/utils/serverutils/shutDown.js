import sleep from "./sleep.js";

export async function shutDown(onError = false, timeout) {
  try {
    console.info("Received request to shut down the server");

    if (onError) {
      console.info(
        `Waiting for ${timeout / 1000} seconds before shutdown due to an error`
      );
      await sleep(timeout);
    }
    console.info("Initiating server shutdown...");

  } catch (error) {
    console.error("An unexpected error occurred during shutdown:", error);
    process.exit(1);
  }
}
