// Camada do dispositivo.
// Hoje: “stub” pra UI funcionar.
// Depois: você troca os TODOs por WebHID real.

export class HidService {
  constructor(logger) {
    this.log = logger;
    this.device = null;
  }

  isSupported() {
    return !!navigator.hid;
  }

  async connect() {
    if (!this.isSupported()) throw new Error("WebHID não suportado nesse navegador.");

    // TODO (depois): usar navigator.hid.requestDevice({ filters: [...] })
    // Por enquanto, simula conexão.
    this.device = { productName: "Mock HID Device" };
    this.log("Conectado (mock).");
    return this.device;
  }

  async disconnect() {
    // TODO (depois): close real
    this.log("Desconectado.");
    this.device = null;
  }

  async heartbeat() {
    this.ensure();
    // TODO (depois): sendReport real
    this.log("Heartbeat enviado (mock).");
  }

  async openTriggerTest() {
    this.ensure();
    this.log("Trigger Test aberto (mock).");
  }

  async readTriggerData() {
    this.ensure();
    this.log("Read Trigger Data solicitado (mock).");
  }

  async readMaxTriggerTravel() {
    this.ensure();
    this.log("Read Max Travel solicitado (mock).");
  }

  async setLightValue(lightModel) {
    this.ensure();
    this.log(`SetLight (mock): ${JSON.stringify(lightModel)}`);
  }

  ensure() {
    if (!this.device) throw new Error("Nenhum dispositivo conectado.");
  }
}
