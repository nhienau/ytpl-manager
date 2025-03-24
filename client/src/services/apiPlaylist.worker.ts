export default () => {
  async function fakeTask(data) {
    await new Promise((res) => setTimeout(res, 5000));
    return { ...data, success: true };
  }
  self.addEventListener("message", async (e) => {
    const data = e.data;
    for (const item of data) {
      const { id } = item;
      self.postMessage({
        id,
        status: "loading",
      });
      const result = await fakeTask(item);
      self.postMessage({
        id,
        status: "success",
      });
    }
  });
};
