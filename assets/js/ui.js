export const ui = {
  el: {
    hidSupport: document.getElementById("hidSupport"),
    deviceName: document.getElementById("deviceName"),
    log: document.getElementById("log"),
    toastHost: document.getElementById("toastHost"),

    btnConnect: document.getElementById("btnConnect"),
    btnDisconnect: document.getElementById("btnDisconnect"),
    btnHeartbeat: document.getElementById("btnHeartbeat"),
    btnTriggerTest: document.getElementById("btnTriggerTest"),
    btnReadTriggers: document.getElementById("btnReadTriggers"),
    btnReadMaxTravel: document.getElementById("btnReadMaxTravel"),

    lightEffect: document.getElementById("lightEffect"),
    lightBrightness: document.getElementById("lightBrightness"),
    lightSpeed: document.getElementById("lightSpeed"),
    lightColor: document.getElementById("lightColor"),
    btnApplyLight: document.getElementById("btnApplyLight"),

    btnClearLog: document.getElementById("btnClearLog"),
    btnCopyLog: document.getElementById("btnCopyLog"),
  },

  setSupportText(text) {
    this.el.hidSupport.textContent = text;
  },

  setDeviceName(name) {
    this.el.deviceName.textContent = name || "Nenhum";
  },

  enableControls(enabled) {
    const ids = [
      "btnDisconnect","btnHeartbeat","btnTriggerTest","btnReadTriggers","btnReadMaxTravel",
      "lightEffect","lightBrightness","lightSpeed","lightColor","btnApplyLight",
    ];
    for (const id of ids) this.el[id].disabled = !enabled;
    this.el.btnConnect.disabled = enabled;
  },

  log(line) {
    const ts = new Date().toLocaleTimeString();
    this.el.log.textContent += `[${ts}] ${line}\n`;
    this.el.log.scrollTop = this.el.log.scrollHeight;
  },

  clearLog() {
    this.el.log.textContent = "";
  },

  async copyLog() {
    await navigator.clipboard.writeText(this.el.log.textContent || "");
  },

  toast(title, message) {
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `<div class="t"></div><div class="m"></div>`;
    node.querySelector(".t").textContent = title;
    node.querySelector(".m").textContent = message;

    this.el.toastHost.appendChild(node);
    setTimeout(() => node.remove(), 3500);
  }
};
