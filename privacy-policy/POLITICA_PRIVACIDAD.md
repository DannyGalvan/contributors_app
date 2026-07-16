# Política de Privacidad — Gestor by Grupo Misol

**Última actualización:** 16 de julio de 2026  
**Versión:** 1.0  
**Aplicación:** Gestor  
**Desarrollador / Responsable:** Grupo Misol  
**Contacto:** cgalvan@itglobal.com.gt  
**Sitio web:** https://www.grupomisol.com

---

## 1. Introducción

Grupo Misol ("nosotros", "nuestro" o "la empresa") desarrolla y opera la aplicación móvil **Gestor** (en adelante "la Aplicación"), disponible en Google Play Store para dispositivos Android.

Esta Política de Privacidad describe de manera detallada:

- Qué información recopilamos y por qué.
- Cómo la utilizamos, almacenamos y protegemos.
- Con quién la compartimos.
- Cuáles son sus derechos como usuario.

Al descargar, instalar o usar la Aplicación, usted acepta los términos descritos en esta política. Si no está de acuerdo, le pedimos que no utilice la Aplicación.

---

## 2. Responsable del Tratamiento de Datos

| Campo | Detalle |
|---|---|
| **Razón social** | Grupo Misol |
| **Sitio web** | https://www.grupomisol.com |
| **Correo de contacto** | cgalvan@itglobal.com.gt |
| **Aplicación** | Gestor (com.servicioappgrupomisol.contributors_app) |

---

## 3. A Quién Va Dirigida Esta Aplicación

La Aplicación está diseñada exclusivamente para **empleados (colaboradores) de empresas afiliadas a Grupo Misol**. No está dirigida al público general ni a menores de edad. No recopilamos intencionalmente información de personas menores de 18 años.

Si usted es padre, madre o tutor y cree que un menor ha proporcionado información personal a través de la Aplicación, contáctenos de inmediato al correo indicado en la sección 2.

---

## 4. Información que Recopilamos

### 4.1 Información que Usted Proporciona Directamente

Al registrarse o usar la Aplicación, recopilamos:

| Dato | Propósito |
|---|---|
| **DPI / Número de identificación** | Identificar al colaborador dentro del sistema |
| **Contraseña** | Autenticar el acceso a la cuenta (almacenada con cifrado) |
| **Correo electrónico** | Recuperación de contraseña y comunicaciones del sistema |
| **Número de teléfono** | Registro de cuenta y contacto |
| **País** | Configuración multi-país de la plataforma |
| **Código de empresa** | Asociar al colaborador con la empresa correspondiente |

### 4.2 Datos de Ubicación

La Aplicación recopila datos de **ubicación GPS (latitud y longitud)** en los siguientes contextos:

- **Registro de entrada y salida (marcaje):** cuando el colaborador registra su asistencia a un proyecto o centro de trabajo, se captura su ubicación para verificar que se encuentra dentro del área autorizada. La ubicación solo se accede mientras la app está en primer plano y el usuario activa el marcaje.

> **Importante:** la ubicación GPS solo se utiliza con fines de control de asistencia laboral. No se vende ni comparte con terceros para publicidad u otros fines comerciales.

### 4.3 Datos de Cámara

La Aplicación solicita acceso a la **cámara del dispositivo** exclusivamente para:

- Escanear **códigos QR** asociados a proyectos o ubicaciones de trabajo.

No se toman fotos ni videos del usuario. No se almacenan imágenes captadas por la cámara.

### 4.4 Audio

La Aplicación solicita el permiso `RECORD_AUDIO` como parte de los requerimientos técnicos de las bibliotecas de visión por computadora utilizadas para el escaneo de códigos QR (`react-native-vision-camera`). **La Aplicación no graba audio del usuario en ningún momento.**

### 4.5 Datos de Uso y del Dispositivo

Recopilamos automáticamente información técnica para el correcto funcionamiento de la Aplicación:

| Dato | Propósito |
|---|---|
| **Estado de la red** | Verificar conectividad antes de registrar marcajes |
| **Información del dispositivo** (modelo, sistema operativo, versión) | Diagnóstico técnico y compatibilidad |
| **Datos de sesión y autenticación** | Mantener sesión activa de forma segura |

### 4.6 Datos Almacenados Localmente

La Aplicación utiliza una **base de datos local SQLite** en el dispositivo para:

- Cachear temporalmente datos de marcajes y configuración.
- Permitir una experiencia fluida sin requerir conexión constante.

Estos datos locales son eliminados al desinstalar la Aplicación.

### 4.7 Solicitudes de Vacaciones y Tiempo Extra

Cuando el colaborador realiza solicitudes de vacaciones o registro de horas extra, recopilamos:

- Fechas y rangos de tiempo solicitados.
- Estado de la solicitud (pendiente, aprobada, rechazada).
- Identificador del colaborador y de la empresa.

---

## 5. Cómo Utilizamos la Información

Utilizamos los datos recopilados para los siguientes fines:

| Finalidad | Base legal |
|---|---|
| Autenticar y gestionar el acceso del colaborador | Ejecución del contrato laboral |
| Registrar y verificar asistencia (entrada/salida con GPS) | Obligación contractual y laboral |
| Gestionar solicitudes de vacaciones y tiempo extra | Gestión administrativa interna |
| Verificar ubicación en proyectos mediante QR | Control operacional de la empresa |
| Enviar notificaciones sobre el estado de solicitudes | Interés legítimo del empleador |
| Diagnóstico técnico y mejora de la Aplicación | Interés legítimo del desarrollador |
| Recuperación de contraseña | Solicitud del propio usuario |

---

## 6. Permisos del Sistema Operativo Android

La Aplicación solicita los siguientes permisos en Android:

| Permiso | Motivo |
|---|---|
| `INTERNET` | Comunicación con los servidores de Grupo Misol para sincronizar datos |
| `ACCESS_NETWORK_STATE` | Detectar estado de la red antes de registrar marcajes |
| `ACCESS_FINE_LOCATION` | Capturar ubicación GPS precisa al registrar entrada/salida (solo en primer plano) |
| `ACCESS_COARSE_LOCATION` | Ubicación aproximada como alternativa cuando GPS fino no está disponible |
| `CAMERA` | Escanear códigos QR de proyectos |
| `RECORD_AUDIO` | Requerido técnicamente por la biblioteca de cámara; no se graba audio |

El usuario puede revocar cualquier permiso desde la configuración del sistema operativo en cualquier momento. La revocación de permisos esenciales (como ubicación) puede impedir el correcto funcionamiento de algunas funciones de la Aplicación.

---

## 7. Compartición de Datos con Terceros

**No vendemos, alquilamos ni comercializamos sus datos personales.**

Podemos compartir información en los siguientes casos limitados:

### 7.1 Empresa Empleadora

Los datos de marcaje (asistencia, ubicación, horarios) son compartidos con **la empresa empleadora del colaborador** afiliada a Grupo Misol, ya que dicha información es parte de la relación laboral y es el propósito central de la Aplicación.

### 7.2 Proveedores de Servicios Técnicos

Trabajamos con proveedores de servicios de infraestructura tecnológica que acceden a datos únicamente para prestar dichos servicios:

- **Servicios de alojamiento y servidores:** para almacenar y procesar datos de la plataforma.
- **Google Maps Platform:** para mostrar mapas y calcular distancias en las pantallas de marcaje. El uso de Google Maps está sujeto a la [Política de Privacidad de Google](https://policies.google.com/privacy).

Estos proveedores están contractualmente obligados a tratar los datos conforme a esta política y a las leyes aplicables.

### 7.3 Requerimientos Legales

Podemos divulgar información si así lo exige la ley, una orden judicial u otra autoridad competente, o cuando sea necesario para proteger los derechos, la propiedad o la seguridad de Grupo Misol, sus empleados o terceros.

---

## 8. Transferencias Internacionales de Datos

La Aplicación opera en múltiples países. Los datos pueden ser transferidos y procesados en servidores ubicados fuera del país de residencia del usuario. En tal caso, nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos aplicables y que existan las garantías adecuadas.

---

## 9. Retención de Datos

Conservamos sus datos personales durante el tiempo que sea necesario para:

- Mantener la relación laboral y contractual activa.
- Cumplir con obligaciones legales y contables.
- Resolver disputas o reclamaciones.

Una vez terminada la relación laboral del colaborador con la empresa, los datos podrán ser eliminados o anonimizados en un plazo de **90 días**, salvo que la ley exija un período de retención mayor.

Los datos almacenados localmente en el dispositivo son eliminados al desinstalar la Aplicación.

---

## 10. Seguridad de los Datos

Implementamos medidas técnicas y organizativas para proteger sus datos:

- **Cifrado en tránsito:** todas las comunicaciones entre la Aplicación y nuestros servidores se realizan mediante HTTPS/TLS.
- **Cifrado de contraseñas:** las contraseñas no se almacenan en texto plano; se aplican algoritmos de hashing.
- **Autenticación con token:** el acceso a la API se gestiona mediante tokens de autenticación seguros.
- **Acceso restringido:** solo el personal autorizado tiene acceso a los datos de los colaboradores.
- **Sin respaldo automático:** la opción `android:allowBackup="false"` está activada, lo que impide que Android realice respaldos automáticos de datos sensibles de la Aplicación.

Aunque tomamos todas las precauciones razonables, ningún sistema es 100% infalible. En caso de brecha de seguridad que afecte sus datos, le notificaremos conforme a las leyes aplicables.

---

## 11. Sus Derechos como Usuario

Dependiendo de las leyes de su país, usted puede tener los siguientes derechos respecto a sus datos personales:

| Derecho | Descripción |
|---|---|
| **Acceso** | Solicitar una copia de los datos que tenemos sobre usted |
| **Rectificación** | Corregir datos inexactos o incompletos |
| **Eliminación** | Solicitar la eliminación de sus datos (sujeto a obligaciones legales) |
| **Oposición** | Oponerse al tratamiento de sus datos en ciertos casos |
| **Portabilidad** | Recibir sus datos en un formato estructurado y legible por máquina |
| **Revocación de consentimiento** | Retirar su consentimiento en cualquier momento cuando el tratamiento se base en él |

Para ejercer cualquiera de estos derechos, contáctenos en:

**Correo:** cgalvan29111999@gmail.com  
**Asunto:** "Solicitud de Derechos de Privacidad - Gestor App"

Responderemos en un plazo máximo de **30 días hábiles** desde la recepción de su solicitud.

---

## 12. Uso de Cookies y Tecnologías de Rastreo

La Aplicación **no utiliza cookies** en el sentido tradicional. Sin embargo, utiliza tokens de sesión almacenados de forma segura en el dispositivo para mantener la sesión del usuario activa. Estos tokens no rastrean la actividad fuera de la Aplicación.

---

## 13. Servicios de Terceros Integrados

La Aplicación integra los siguientes servicios de terceros:

| Servicio | Propósito | Política de Privacidad |
|---|---|---|
| **Google Maps Platform** | Visualización de mapas y cálculo de distancias | [Ver política](https://policies.google.com/privacy) |
| **Google Play Services** | Distribución y actualizaciones de la app | [Ver política](https://policies.google.com/privacy) |

Cada servicio de terceros tiene su propia política de privacidad. Le recomendamos revisarlas.

---

## 14. Menores de Edad

La Aplicación **no está dirigida a personas menores de 18 años**. No recopilamos conscientemente datos de menores. Si detectamos que hemos recopilado datos de un menor sin consentimiento verificable, eliminaremos dicha información de inmediato.

---

## 15. Cambios a Esta Política de Privacidad

Podemos actualizar esta Política de Privacidad periódicamente. Cuando realicemos cambios significativos:

- Actualizaremos la fecha de "Última actualización" al inicio del documento.
- Notificaremos a los usuarios a través de la Aplicación o por correo electrónico (si disponemos de él).

El uso continuo de la Aplicación después de los cambios implica la aceptación de la política actualizada.

---

## 16. Ley Aplicable y Jurisdicción

Esta Política de Privacidad se rige por las leyes de la República de Guatemala y las leyes aplicables de los países donde opera Grupo Misol. Cualquier disputa relacionada con el tratamiento de datos personales será resuelta conforme a la legislación local aplicable.

---

## 17. Contacto

Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad, contáctenos:

**Grupo Misol**  
Sitio web: https://www.grupomisol.com  
Correo electrónico: cgalvan29111999@gmail.com  
Asunto sugerido: "Política de Privacidad - Gestor App"

Nos comprometemos a responder en un plazo de **30 días hábiles**.

---

*Este documento constituye la Política de Privacidad completa de la aplicación Gestor, desarrollada y operada por Grupo Misol. Al usar la Aplicación, usted confirma haber leído, entendido y aceptado los términos aquí descritos.*
