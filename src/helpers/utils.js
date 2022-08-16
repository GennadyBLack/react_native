export function isFunction(func) {
  if (func && typeof func == "function") {
    console.log("this is function");
    func();
  } else {
    console.log("this.is not function bro");
  }
}
