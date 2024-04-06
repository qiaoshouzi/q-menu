import { defineStore } from "pinia";

interface State {
  deviceType: "pc" | "phone";
}

export const usePublicStore = defineStore("public", {
  state: (): State => ({
    deviceType: "pc",
  }),
  actions: {},
});
