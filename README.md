# Sol Naciente — Showrooms Digitales Interactivos

Landing page de **Sol Naciente Soluciones Digitales**: presenta el Showroom Digital para concesionarias, importadoras y vendedores de alta gama en Asunción.

Hecha con **React 19 + Vite 7 + Tailwind CSS 4**. El build genera **un único `index.html` autocontenido** (CSS, JS e imágenes embebidos), así que funciona en cualquier ruta de GitHub Pages sin configurar nada extra.

---

## 🚀 Publicar en GitHub Pages

### 1. Crear el repositorio y subir el código

```bash
git init
git add .
git commit -m "Primera versión del sitio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 2. Activar GitHub Pages (solo una vez)

1. En GitHub, entrá al repositorio → **Settings** → **Pages**.
2. En **Build and deployment → Source**, elegí **GitHub Actions**.

### 3. Listo

Cada `push` a `main` compila y publica el sitio automáticamente. El progreso se ve en la pestaña **Actions**, y en 1–2 minutos el sitio queda disponible en:

```
https://TU-USUARIO.github.io/TU-REPO/
```

También se puede publicar a mano desde **Actions → Deploy to GitHub Pages → Run workflow**.

### Dominio propio (opcional)

1. En **Settings → Pages → Custom domain**, escribí tu dominio (ej. `showroom.solnaciente.com.py`).
2. En tu proveedor de DNS, creá un registro `CNAME` que apunte a `TU-USUARIO.github.io`.
3. Activá **Enforce HTTPS** cuando esté disponible.

---

## 💻 Desarrollo local

Requiere **Node.js 20.19+** (recomendado 22).

```bash
npm install      # instala dependencias
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera dist/index.html
npm run preview  # previsualiza el build
```

---

## ✏️ Cambios frecuentes

| Qué cambiar                         | Dónde                                       |
| ----------------------------------- | ------------------------------------------- |
| Número de WhatsApp y mensaje        | `src/constants.ts`                          |
| Links del menú                      | `src/constants.ts` → `NAV_LINKS`            |
| Textos de cada sección              | `src/sections/*.tsx`                        |
| Colores de marca y tipografías      | `src/index.css` → bloque `@theme`           |
| Fotos                               | `src/assets/images/`                        |
| Título y descripción para buscadores | `index.html`                                |

> Consejo: antes de reemplazar fotos, comprimilas (ancho máx. ~1400 px, JPG calidad ~80). Como todo va embebido en un solo archivo, el peso de las imágenes impacta directo en la velocidad de carga.

---

## 📁 Estructura

```
.github/workflows/deploy.yml   → publicación automática en GitHub Pages
public/                        → archivos copiados tal cual (404.html, robots.txt, .nojekyll)
src/
  components/                  → logo, menú, marcos de celular, animaciones
  components/mockups/          → pantallas simuladas (WhatsApp y Showroom)
  sections/                    → Hero, Problema, Solución, Resultado
  constants.ts                 → WhatsApp y navegación
  index.css                    → tema, colores y animaciones
```
