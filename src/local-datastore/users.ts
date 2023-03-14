const resp = await fetch("https://randomuser.me/api/?results=1000");
const json = await resp.json();

function flattenObject(obj: object, parentKey?: string) {
  return Object.keys(obj).reduce((o, k) => {
    let value = obj[k];
    if (value && typeof value === "object") {
      o = {
        ...o,
        ...flattenObject(value, parentKey ? `${parentKey}_${k}` : k),
      };
    } else {
      o[parentKey ? `${parentKey}_${k}` : k] = value;
    }
    return o;
  }, {});
}

return json.results.map((r) => flattenObject(r));
