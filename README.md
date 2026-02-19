# HID Config Tool (GitHub Pages)

Site estático (HTML/CSS/JS) pronto pra servir no GitHub Pages.

## Rodar local
Dá pra abrir o `index.html` direto, mas WebHID costuma exigir HTTPS.
Sugestão (com Node instalado):

```bash
npx http-server -S -C cert.pem -K key.pem
