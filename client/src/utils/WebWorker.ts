export default class WebWorker {
  constructor(workerFunction) {
    const workerCode = `
      (${workerFunction.toString()})();
    `;
    const blob = new Blob([workerCode], { type: "text/javascript" });
    return new Worker(URL.createObjectURL(blob));
  }
}
