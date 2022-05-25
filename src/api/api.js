/**
 * Функция преобразования всех роутов из папок в единый обьект
 */

// export function register() {
//   const requireComponent = require.context("./", true, /[\w-]+\.js$/);

//   const obj = {};
//   requireComponent.keys().forEach(async (filePath) => {
//     const fileName = filePath.split("/").slice(1)[0];
//     obj[fileName] = (await import(`${filePath}`)).default;
//   });
//   return obj;
// }

import me from "./me";
import auth from "./auth";
import feed from "./feed";

const apis = {
  me,
  auth,
  feed,
};

// register();

export default apis;
