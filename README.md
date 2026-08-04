# Convergencia Electoral 2026: Encuentra tu Candidato

Herramienta interactiva desarrollada por el **Laboratorio de Gobierno (GovLab) de la Universidad de La Sabana** para que ciudadanos colombianos identifiquen cuál precandidato a las **Elecciones Presidenciales 2026** se alinea mejor con sus valores y propuestas, además de descubrir su propio perfil ideológico.

---

## Funcionamiento de la Aplicación

La aplicación web funciona como un cuestionario de afinidad política (*Voting Advice Application*). El flujo principal del usuario es el siguiente:
1. **Inicio y Registro**: El usuario ingresa a la aplicación y provee su nombre de forma opcional para una experiencia personalizada.
2. **El Cuestionario Transversal**: El usuario responde a **16 preguntas** de opción múltiple basadas en dilemas concretos de política pública.
3. **Análisis de Resultados en Tiempo Real**: Al finalizar, la aplicación calcula y revela:
 - **El Perfil del Votante**: A qué arquetipo político se asemeja más el usuario basándose en su patrón de respuestas.
 - **Ranking de Candidatos**: Una lista ordenada de los 14 precandidatos presidenciales según su porcentaje exacto de afinidad estadística con las respuestas del usuario.
4. **Exploración a Profundidad**: El usuario puede ver en detalle las respuestas simuladas de cada candidato, su biografía, su perfil ideológico asignado y las posiciones en los distintos ejes temáticos.
5. **Comentarios y Viralización**: Posibilidad de dejar comentarios sobre la herramienta para el GovLab y generar una tarjeta de resultados con diseño premium descargable para redes sociales.

---

## Metodología y Modelo Analítico

El test se basa en hacer coincidir las respuestas del usuario con posiciones predefinidas de los perfiles ideológicos y de cada uno de los candidatos a través de una matriz matemática de similitud. La prueba contiene **16 preguntas**, estructuradas cuidadosamente en **6 grandes Ejes Temáticos**, que miden la tensión entre diferentes visiones de Estado.

A continuación se detalla cada eje, las preguntas que lo componen, y las implicaciones políticas detrás de cada opción de respuesta:

### Eje 1: Economía, Hacienda y Comercio
Tensión Principal: *Estado de Bienestar y Redistribución* vs. *Libre Mercado y Austeridad*

* **Pregunta 1: Déficit fiscal y Deuda**
 > Colombia cerró el 2025 con una deuda de $1.192,6 billones (64,7 % del PIB) y enfrenta un déficit fiscal. ¿Qué estrategia priorizaría en su primer año?
 * **Opción A (Ajuste fiscal, reducir gasto social e inversión)**: Implica una visión ortodoxa y pragmática, dando prioridad absoluta a la sanidad fiscal sobre la intervención y el gasto social.
 * **Opción B (Reforma tributaria a altos patrimonios)**: Postura fuertemente progresista que aboga por resolver el déficit mediante redistribución de riqueza, priorizando el gasto social por encima de la confianza inversora a corto plazo.
 * **Opción C (Renegociar deuda asumiendo riesgos crediticios)**: Postura heterodoxa que privilegia la liquidez interna, con tintes nacionalistas.
 * **Opción D (Aumentar deuda para impulsar crecimiento)**: Visión de estímulo keynesiano enfocada en el crecimiento como mecanismo de pago futuro.
 * **Opción E (Acuerdo nacional mixto)**: Enfoque institucionalista e integrador, propenso a cambios graduales.

* **Pregunta 2: Inversión Extranjera Directa (IED)**
 > ¿Qué incentivo priorizaría para atraer IED?
 * **Opción A (Blindaje tributario a largo plazo por empleo)**: Implica crear estabilidad jurídica ("reglas de juego" fijas), un pilar del liberalismo económico.
 * **Opción B (Beneficios tributarios por sectores estratégicos)**: Enfoque que aboga por una política industrial dirigida desde el Estado.
 * **Opción C (Bajar tasa de renta corporativa general a todos sin distinción)**: Visión puramente pro-mercado y tecnológica, minimizando la intervención diferencial del Estado.
 * **Opción D (Condicionar inversión a transferencia tecnológica al Estado)**: Postura proteccionista, apuntando hacia un Estado fuerte y regulador.

### Eje 2: Trabajo, Salud y Pensiones
Tensión Principal: *Sistema Público y Garantismo* vs. *Privatización, Competencia y Flexibilización*

* **Pregunta 3: Creación de Empleo Formal**
 > ¿Cuál es su propuesta laboral para incentivar la creación de empleo formal?
 * **Opción A (Flexibilización y reducción de cargas prestacionales)**: Postura pragmática y pro-empresa, priorizando la reducción de fricciones en la contratación.
 * **Opción B (Mantener el modelo garantista de la última reforma)**: Visión pro-sindicato y progresista enfocada en los derechos adquiridos.
 * **Opción C (Regímenes diferenciados para MiPymes)**: Pragmatismo moderado, reconociendo realidades asimétricas del tejido empresarial.
 * **Opción D (Subsidios estatales directos a la nómina con enfoque diferencial)**: Uso del aparato estatal para cerrar brechas de forma directa.

* **Pregunta 4: Financiación de la Salud (UPC)**
 > ¿Cómo establecer la tarifa (UPC) que financia el aseguramiento en salud?
 * **Opción A (Entidad técnica independiente estilo Banco de la República)**: Postura tecnocrática que sugiere despolitizar la salud basándose estrictamente en datos técnicos.
 * **Opción B (Delegar a la academia con ajustes fiscales del Gobierno)**: Institucionalismo con control fiscal.
 * **Opción C (Control absoluto del Ministerio de Salud para alinearlo al Plan de Desarrollo)**: Postura estatista central, alineando los recursos con propósitos políticos de estado.
 * **Opción D (Componente variable por indicadores de impacto)**: Postura de mercado enfocado en pago por eficiencia y resultados.

* **Pregunta 5: Sistema Pensional**
 > ¿Qué haría con el sistema pensional y el ahorro de los trabajadores?
 * **Opción A (Defender reforma actual con umbral alto en sistema de reparto)**: Ideología solidaria/progresista que fortalece el sistema público para subsidiar.
 * **Opción B (Bajar umbral para fortalecer ahorro en fondos privados)**: Intersección entre liberalismo y pragmatismo para robustecer el ahorro nacional y mercado de capitales.
 * **Opción C (Aumentar edad o cotización)**: Medida impopular, pero estrictamente tecnocrática, asumiendo el duro costo político de la viabilidad futura.
 * **Opción D (Regresar a libertad total de fondos privados)**: Espectro puramente liberal, que empodera la elección ciudadana sobre la solidaridad forzosa.

### Eje 3: Justicia, Seguridad y Convivencia
Tensión Principal: *Prevención, Diálogo y Negociación* vs. *Fuerza Militar, Castigo y Mano Dura*

* **Pregunta 6: Delitos de baja afectación (hurto de menor cuantía)**
 > ¿Cómo debe responder el sistema penal penal frente al hurto menor?
 * **Opción A (Prevención 100% y educación, sin cárcel)**: Respuesta progresista que ataca causas estructurales evitando la punición tradicional.
 * **Opción B (Penas cortas en centros separados)**: Pragmatismo que busca justicia restaurativa o retributiva blanda.
 * **Opción C (Endurecer penas y cárcel intramural sin excepciones)**: Clara postura "Reaccionaria" o de Mano Dura, privilegiando el castigo.

* **Pregunta 7: Erradicación de cultivos ilícitos**
 > ¿Qué herramienta principal usaría?
 * **Opción A (Aspersión con glifosato/herbicidas con drones)**: Política de castigo frontal de Estado fuerte (Reaccionario/Mano dura).
 * **Opción B (Erradicación manual sin químicos)**: Uso de fuerza moderada para no afectar diferencialmente el agro.
 * **Opción C (Cumplir acuerdos de sustitución con incentivos)**: Visión progresista de respeto a los procesos sociales y acuerdos pactados.
 * **Opción D (Solo interdicción e incautación)**: Enfoque netamente pragmático atacando eslabones macro del narcotráfico.

* **Pregunta 8: Política frente al conflicto armado (Paz Total)**
 > ¿Qué haría con los diálogos actuales frente a la violencia persistente?
 * **Opciones A y E (Mantener y profundizar negociación ciegamente)**: Apuesta progresista sostenida.
 * **Opción B (Mantener diálogos, pero exigir reglas estrictas y ceses reales)**: Postura institucionalista y condicionada.
 * **Opción C (Ofensiva militar frontal)**: Rechazo a la negociación; vía armada autoritaria y de fuerza impositiva.

### Eje 4: Recursos, Energía y Medio Ambiente
Tensión Principal: *Transición y Conservación Inmediata* vs. *Desarrollo Extractivo y Seguridad Energética*

* **Pregunta 9: Modelo de Transición Energética**
 > ¿Qué decisión estratégica tomará sobre el modelo energético?
 * **Opción A (Prohibir exploración fósil e imponer impuestos para financiar renovables)**: Postura ambientalista radical y acelerada.
 * **Opción B (Mantener exploración incluyendo fracking y desarrollar renovables gradualmente)**: Postura extractivista tradicional/pragmática.
 * **Opción C (Regulación dura de mercado de carbono sin frenar exploración fósil)**: Modelo institucional tecnológico orientado al mercado y compensación ("Greenwashing" regulado).

* **Pregunta 10: Consultas Previas en grandes proyectos**
 > ¿Cómo destrabar proyectos de infraestructura bloqueados?
 * **Opción A (Limitar en ley tiempos y alcance, eliminando derecho a veto)**: Visión pragmática y pro-desarrollo empresarial.
 * **Opción B (Mantener exigencias con fortalecimiento institucional)**: Visión centrista/institucionalista.
 * **Opción C (Fortalecer consulta: el "no" de la comunidad es definitivo)**: Progresismo y proteccionismo étnico-cultural radical.
 * **Opción D (El Estado asume el riesgo financiero de la consulta)**: Subsidio estatal al sector empresarial para reducir riesgo.

* **Pregunta 11: Zonas protegidas y Actividades Extractivas**
 > ¿Cuál será su política en páramos, Amazonía y reservas forestales?
 * **Opción A (Prohibición estricta, fuerza militar contra invasiones, formalización artesanal mínima)**: Defensa territorial armada (conservacionismo de mano dura).
 * **Opción B (Permitir extracción tecnológica con mitigación)**: Pro-mercado flexibilizando barreras ambientales.
 * **Opción C (Mecanismos de consulta y pagos por conservar a comunidades sin desalojar)**: Enfoque integral ambientalista y social de respeto comunitario.
 * **Opción D (Modelo mixto de sustracción ordenada)**: Planeación y zonificación nacional técnica y escalonada.

### Eje 5: Educación y Desarrollo Social
Tensión Principal: *Educación Pública Universal Financiada Completa* vs. *Subsidio a la Demanda (Mercado), Créditos y Mérito*

* **Pregunta 12: Inversión en Educación Superior**
 > ¿Cómo debe invertirse el presupuesto educativo superior?
 * **Opción A (100% público universitario, sin desvío a privadas)**: Gratuidad universal dirigida exclusivamente al sostenimiento estatal, bandera del progresismo.
 * **Opción B (Prioridad pública pero con becas a privadas)**: Modelo mixto, socialdemocracia moderada.
 * **Opción C (Dinero al estudiante -voucher/crédito- para libre elección)**: Privatización de los recursos por esquema de subsidio a la demanda (sistema liberal extremo).

* **Pregunta 13: Futuro del ICETEX y Crédito Educativo**
 * **Opción A (Pago contingente al ingreso cuando consiga empleo, sin capital mensual)**: Reformismo garantista.
 * **Opción B (Tasa de interés cero, ajustado por inflación)**: Reducción institucional del peso crediticio sin romper el balance de la cartera estatal.
 * **Opción C (Condonación masiva y foco total de recursos en U. Pública)**: Ruptura progresista estructural.
 * **Opción D (Crédito limitado solo a posgrados/extranjero)**: Reducir el acceso vía crédito a pregrado, trasladando la responsabilidad directa al Estado.

### Eje 6: Institucionalidad, Liderazgo y Estado
Tensión Principal: *Cambios Estructurales Radicales / Intervención Fuerte* vs. *Conservación de Status Quo Institucional y Libre Mercado*

* **Pregunta 14: Ecosistema de Empresa e Innovación**
 * **Opciones A y C**: El Estado como dinamizador de coinversión, capital semilla y desarrollo profundo tecnológico. (Tecnocrático / Institucional).
 * **Opción B (Arenas de prueba sin cargas burocráticas)**: Enfoque de desregulación para favorecer startups (Liberal).
 * **Opción D (Foco exclusivo en economía popular/comunitaria)**: Redireccionamiento del capital institucional a focos populares históricamente ignorados (Progresista).

* **Pregunta 15: Estrategia Internacional**
 * **Opción A (Alianza preferente occidente EE. UU.)**: Continuidad histórica, tradicional.
 * **Opciones C y E (No alineamiento o redirección a BRICS/Global South)**: Enfoque multipolar, búsqueda de independencia del bloque hegemónico del norte.

* **Pregunta 16: Reforma Agraria**
 * **Opción A (Expropiación de tierras improductivas de manera rápida)**: Cambio estructural profundo con poder coercitivo del Estado, sin negociación.
 * **Opción B/E (Compra de tierras a precio comercial / continuidad proceso)**: Mecanismos institucionales de mercado, respetando la propiedad privada.
 * **Opción C (Altísimos impuestos a improductividad en vez de redistribuir)**: Uso de políticas fiscales fuertes para incentivar al mercado.
 * **Opción D (Alianzas empresariales con campesinos)**: Visión agroindustrial privatizada y corporativa, diluyendo al campesinado como actor central agrario en favor de clusters productivos.

---

## Los 7 Perfiles de Votante (Arquetipos)

De acuerdo a sus posturas a lo largo del cuestionario, el usuario (y los candidatos) son clasificados en:
1. **El Pragmático**: Busca el equilibrio, políticas moderadas sin extremismos ideológicos. Evaluando resultados por encima de retóricas.
2. **El Progresista**: Enfoque en protección estatal, derechos sociales, y reestructuración económica y agraria orientada hacia lo público.
3. **El Institucionalista**: Defiende el marco legal actual, la estabilidad democrática, los controles y las instituciones financieras/técnicas y legales tradicionales.
4. **El Liberal**: Defensa radical de libertades individuales de mercado, desregulación, inversión foránea y reducción de la intervención gubernamental.
5. **El Ambientalista**: Prioriza la crisis climática sobre las otras dimensiones, votando a favor de modelos restrictivos de la matriz fósil e incaucionando desarrollos nocivos.
6. **El Reaccionario**: Enfoque altivo de autoridad militar, mano dura con crimen/narcotráfico tradicional y rechazo total a subsidios complacientes o negociaciones blandas.
7. **El Tecnocrático**: Apuesta por la eficiencia fría de los datos. Prioriza evidencia académica, agencias expertas (despolitizadas) y modelos matemáticamente sustentables.

**¿Cómo funciona la asignación matemática?**
1. **Identificación del Perfil**: Cada perfil de votante tiene un "banco de respuestas ideales" (ej. El Progresista tiene "1B, 3B, 5A, 16A..."). El sistema compara las 16 respuestas del usuario con estos bancos de cada perfil, contando coincidencias. El perfil con el mayor porcentaje exacto de similitud se adjudica como el resultado principal del usuario.
2. **Afinidad con el Candidato**: El *GovLab* estudió previamente a los candidatos para asignar a cada uno una plantilla de cómo "respondería" este test. Al terminar el usuario su sesión, sus selecciones cruzan una a una con la matriz de los 14 aspirantes. *Similitud Total = (Coincidencias Votante / Total Contestadas por el Candidato) * 100*.
Este cálculo en tiempo real produce el ranking porcentual entre el votante y cada opción política.

---

## Arquitectura Técnica

- **Frontend**: HTML5, CSS Vanilla (Diseño Glassmorphism Premium), JavaScript (ES6+).
- **Backend / Persistencia**: Integración REST API usando `fetch()` con una base de datos PostgreSQL alojada en **Supabase**. Las peticiones utilizan cabeceras *ApiKey* para recuperación de perfiles, candidatos, y persistencia de interacciones del usuario.
- **Viralidad Digital**: La aplicación ensambla los resultados dom, oculta el exceso visual y usa `html2canvas` para invocar la API Web Share permitiendo descargar png nativos o distribuirlo de inmediato hacia Instagram, Whatsapp, FB o Twitter.

---

## Candidatos Evaluados (2026)

Lista de los 14 precandidatos simulados y representados en la aplicación:
1. Iván Cepeda (Pacto Histórico)
2. David Luna (Cambio Radical)
3. Abelardo de la Espriella (Salvación Nacional)
4. Aníbal Gaviria (La Fuerza de las Regiones)
5. Mauricio Cárdenas (Avanza Colombia)
6. Victoria Dávila (Movimiento Valientes)
7. Claudia López (Con Claudia Imparables)
8. Juan Manuel Galán (Nuevo Liberalismo)
9. Juan Carlos Pinzón (Verde Oxígeno)
10. Juan Daniel Oviedo (Con Toda por Colombia)
11. Enrique Peñalosa (Verde Oxígeno)
12. Paloma Valencia (Centro Democrático)
13. Roy Barreras (La Fuerza de la Paz)
14. Sergio Fajardo (Dignidad y Compromiso)

*Nota: Las respuestas registradas en la App para estos perfiles se derivan de una aproximación académica técnica, no representando confirmaciones textuales en campaña por dicho candidato.*

---

## Instalaci\ón y Uso Local

```bash
# 1. Clona o descarga el repositorio local
# 2. Inicia un servidor HTTP (ej: python) en el directorio raíz:
python -m http.server 8001

# 3. Accede mediante:
http://localhost:8001
```

---

## Créditos y Licencia

- **Desarrollado por**: Laboratorio de Gobierno (GovLab) — Universidad de La Sabana.
- **Autor**: Juan Diego Sotelo Aguilar.

**Licencia: Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)**
Uso, distribución y modificación de la obra con fines no comerciales autorizada mediante citación, preservando titularidad del autor y la entidad educativa sin propósitos lucrativos.

© 2026 Laboratorio de Gobierno — Universidad de La Sabana
