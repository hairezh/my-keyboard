import { ui } from "./ui.js";
import { HidService } from "./hid.js";

const hid = new HidService((msg) => ui.log(msg));

function lightModelFromUI() {
  const hex = ui.el.lightColor.value.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return {
    effect: Number(ui.el.lightEffect.value),
    brightness: Number(ui.el.lightBrightness.value),
    speed: Number(ui.el.lightSpeed.value),
    color: { r, g, b },
    // placeholders pro seu protocolo real:
    mode: 0,
    direction: 0,
    fullColor: 0,
  };
}

function setSupportBadge() {
  if (!hid.isSupported()) {
    ui.setSupportText("Não suportado ❌ (use Chrome/Edge)");
    ui.toast("WebHID", "Seu navegador não suporta WebHID.");
    return;
  }
  ui.setSupportText("Suportado ✅");
}

async function onConnect() {
  try {
    const dev = await hid.connect();
    ui.setDeviceName(dev.productName || "Dispositivo");
    ui.enableControls(true);
    ui.toast("Conectado", "Dispositivo pronto.");
  } catch (e) {
    ui.toast("Erro", e?.message || String(e));
    ui.log(`ERRO: ${e?.message || e}`);
  }
}

async function onDisconnect() {
  try {
    await hid.disconnect();
    ui.setDeviceName(null);
    ui.enableControls(false);
    ui.toast("Ok", "Desconectado.");
  } catch (e) {
    ui.toast("Erro", e?.message || String(e));
  }
}

function wireEvents() {
  ui.el.btnConnect.addEventListener("click", onConnect);
  ui.el.btnDisconnect.addEventListener("click", onDisconnect);

  ui.el.btnHeartbeat.addEventListener("click", async () => {
    try { await hid.heartbeat(); } catch (e) { ui.toast("Erro", e.message); }
  });

  ui.el.btnTriggerTest.addEventListener("click", async () => {
    try { await hid.openTriggerTest(); } catch (e) { ui.toast("Erro", e.message); }
  });

  ui.el.btnReadTriggers.addEventListener("click", async () => {
    try { await hid.readTriggerData(); } catch (e) { ui.toast("Erro", e.message); }
  });

  ui.el.btnReadMaxTravel.addEventListener("click", async () => {
    try { await hid.readMaxTriggerTravel(); } catch (e) { ui.toast("Erro", e.message); }
  });

  ui.el.btnApplyLight.addEventListener("click", async () => {
    try { await hid.setLightValue(lightModelFromUI()); ui.toast("Ok", "Luz aplicada (mock)."); }
    catch (e) { ui.toast("Erro", e.message); }
  });

  ui.el.btnClearLog.addEventListener("click", () => ui.clearLog());
  ui.el.btnCopyLog.addEventListener("click", async () => {
    try { await ui.copyLog(); ui.toast("Copiado", "Log copiado pro clipboard."); }
    catch { ui.toast("Erro", "Não deu pra copiar o log."); }
  });
}

setSupportBadge();
ui.enableControls(false);
wireEvents();
ui.log("App iniciado.");
