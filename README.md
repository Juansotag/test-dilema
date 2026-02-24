# Dilema Electoral: Encuentra tu Candidato

Herramienta interactiva para que ciudadanos colombianos identifiquen cuál precandidato a las **Elecciones Presidenciales 2026** se alinea mejor con sus valores y propuestas.

---

## Características

- **Test de Afinidad**: Cuestionario de 30 preguntas sobre Economía, Trabajo, Salud, Pensiones, Seguridad y Medio Ambiente.
- **Pantalla de bienvenida personalizada**: Solicita el nombre del usuario antes de comenzar. El nombre aparece en el título de resultados ("*{nombre}*, estos son tus resultados").
- **Ranking Personalizado**: Al finalizar el test, ranking de afinidad con los 14 candidatos.
- **Perfiles de Candidatos**: Biografías detalladas de cada candidato, sus posiciones frente a los dilemas y enlace a su página de campaña oficial.
- **Sección de Comentarios**: Al terminar el test, el usuario puede dejar comentarios, críticas o sugerencias de forma opcional.
- **Persistencia de datos (Supabase)**: Cada respuesta completa se guarda automáticamente en una base de datos PostgreSQL (Supabase), incluyendo nombre, respuestas por pregunta, candidato top y ranking completo. Los comentarios se vinculan a la misma fila.
- **Diseño Premium**: Glassmorphism, modo oscuro, animaciones y optimización móvil.

---

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Base de datos**: [Supabase](https://supabase.com) (PostgreSQL) — REST API directa con `fetch()`
- **Diseño**: Google Fonts (Inter), iconos SVG personalizados
- **Data**: `data.json` con preguntas y perfiles de candidatos

---

## Estructura de archivos

```
├── index.html       # Estructura de la app (landing, nombre, quiz, resultados, perfiles)
├── app.js           # Lógica principal + integración Supabase
├── style.css        # Estilos y diseño responsivo
├── data.json        # Preguntas, opciones y perfiles de los 14 candidatos
├── Candidatos/      # Fotos de candidatos
├── Partidos/        # Logos de partidos
└── Perfil/          # Imágenes de perfil por tendencia política
```

---

## Base de datos (Supabase)

### Tabla `quiz_responses`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid | Clave primaria auto-generada |
| `created_at` | timestamptz | Fecha y hora automática de respuesta |
| `respondent_name` | text | Nombre ingresado por el usuario |
| `top_candidate` | text | Candidato con mayor afinidad |
| `top_percentage` | int | % de afinidad del candidato #1 |
| `q1` … `q30` | text | Respuesta del usuario por pregunta (A/B/C/D/E) |
| `results` | jsonb | Ranking completo de los 14 candidatos |
| `comment` | text | Comentario opcional del usuario |

### Setup inicial (ejecutar en Supabase → SQL Editor)

```sql
CREATE TABLE quiz_responses (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       timestamptz DEFAULT now(),
  respondent_name  text,
  top_candidate    text NOT NULL,
  top_percentage   integer,
  q1  text, q2  text, q3  text, q4  text, q5  text,
  q6  text, q7  text, q8  text, q9  text, q10 text,
  q11 text, q12 text, q13 text, q14 text, q15 text,
  q16 text, q17 text, q18 text, q19 text, q20 text,
  q21 text, q22 text, q23 text, q24 text, q25 text,
  q26 text, q27 text, q28 text, q29 text, q30 text,
  results jsonb,
  comment text
);

ALTER TABLE quiz_responses DISABLE ROW LEVEL SECURITY;
```

---

## Instalación y Uso Local

```bash
# 1. Clona o descarga el repositorio
# 2. Inicia un servidor local

python -m http.server 8001

# 3. Abre http://localhost:8001 en el navegador
```

---

## Candidatos incluidos (2026)

| # | Candidato | Partido |
|---|---|---|
| 1 | Iván Cepeda | Pacto Histórico |
| 2 | David Luna | Cambio Radical |
| 3 | Abelardo de la Espriella | Salvación Nacional |
| 4 | Aníbal Gaviria | La Fuerza de las Regiones |
| 5 | Mauricio Cárdenas | Avanza Colombia |
| 6 | Victoria Dávila | Movimiento Valientes |
| 7 | Claudia López | Con Claudia Imparables |
| 8 | Juan Manuel Galán | Nuevo Liberalismo |
| 9 | Juan Carlos Pinzón | Verde Oxígeno |
| 10 | Juan Daniel Oviedo | Con Toda por Colombia |
| 11 | Enrique Peñalosa | Verde Oxígeno |
| 12 | Paloma Valencia | Centro Democrático |
| 13 | Roy Barreras | La Fuerza de la Paz |
| 14 | Sergio Fajardo | Dignidad y Compromiso |

---

## Créditos

- **Desarrollado por**: Laboratorio de Gobierno (GovLab) — Universidad de La Sabana
- **Autor**: Juan Diego Sotelo Aguilar
- **Vigilada**: MinEducación

---

## Licencia

**Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)**

- **Atribución**: dar crédito al GovLab — Universidad de La Sabana.
- **No Comercial**: prohibido el uso con fines comerciales.

Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

© 2026 Laboratorio de Gobierno — Universidad de La Sabana
