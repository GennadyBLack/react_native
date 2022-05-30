export default function prepareEdit(data, state) {
  try {
    const pre = {};
    Object.entries(data).forEach(([key, val]) => {
      if (!state[key]) return;
      if (state[key] !== val) pre[key] = val;
    });
    return pre;
  } catch (e) {
    throw new Error(e);
  }
}
