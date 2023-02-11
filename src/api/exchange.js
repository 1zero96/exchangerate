import axios from "axios";

export function conversion() {
  let res = fetch(`data/conversion.json`).then((res) => res.json());
  return res;
}

export async function exchange(from, to, amount) {
  let res = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=2`);

  return res.data.result;
}
