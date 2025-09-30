import { parentPort } from "worker_threads";

parentPort.on("message", (task) => {
  setTimeout(() => {
    const result = {
      id: task.id,
      result: `Result for task #${task.id} processed at ${new Date().toLocaleTimeString()}`,
    };
    parentPort.postMessage(result);
  }, 2000);
});
