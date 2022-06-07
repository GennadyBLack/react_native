export function isFunction(func) {
  if (func && typeof func == "function") {
    func();
  } else {
    console.log("this.is not function bro");
  }
}
