export default class WebWorker extends Worker {
  constructor(workerFunction: () => void) {
    const workerCode = `
      (${workerFunction.toString()})();
    `;
    const blob = new Blob([workerCode], { type: "text/javascript" });
    super(URL.createObjectURL(blob));
  }
}
