import { SwitchbladeSDK } from 'switchblade-sdk';

export const switchblade = new SwitchbladeSDK({
  hostname: import.meta.env.SWITCHBLADE_API_HOST,
  token: localStorage.getItem("token"),
  throwOnError: true
});