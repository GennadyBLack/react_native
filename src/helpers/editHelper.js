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
  //приводим проксированный объект mobx к обычному
  state = toJS(state);
  Object.entries(data).forEach(([key, val]) => {
    //если вдруг такого поля в стейте нет, скипаем итерацию
    if (!state[key]) return;
    //если значение полея - объект, рекурсивно запускаем ф-ию
    if (typeof val == "object") {
      const pre2 = compare(val, state[key]);
      //если есть измененное поле в объекте, то объект не пустой
      if (Object.keys(pre2).length) pre[key] = pre2;
      //выходим из итерации, чтобы не попасть в нижестоящий if
      return;
    }
    if (state[key] !== val) {
      pre[key] = val;
    }
  });
  return pre;
}
