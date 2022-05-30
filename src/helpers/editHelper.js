import { toJS } from "mobx";
export default function prepareEdit(data, state) {
  try {
    return compare(data, state);
  } catch (e) {
    throw new Error(e);
  }
}

function compare(data, state) {
  const pre = {};
  state = toJS(state);
  Object.entries(data).forEach(([key, val]) => {
    if (!state[key]) return;

    if (typeof val == "object") {
      const pre2 = compare(val, state[key]);
      if (Object.keys(pre2).length) pre[key] = pre2;
      return;
    }
    if (state[key] !== val) {
      pre[key] = val;
    }
  });
  return pre;
}
