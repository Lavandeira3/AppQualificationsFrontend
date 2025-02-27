# 📚 Calculadora de Notas

Una aplicación web moderna para profesores que permite gestionar y calcular notas de estudiantes de forma eficiente y organizada.

![Calculadora de Notas](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000)

## 🚀 Características

- ✨ Interfaz moderna y responsive
- 📊 Cálculo automático de notas ponderadas
- 🎓 Gestión de múltiples cursos y aulas
- 📝 Validación de DNI único
- 🔄 Ordenación automática por apellidos
- 🎨 Indicadores visuales del estado de aprobación

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 💻 Uso

### Sistema de Calificación

La aplicación utiliza el siguiente sistema de ponderación:

| Componente | Peso |
|------------|------|
| Exámenes (Media) | 65% |
| Libro | 15% |
| Comportamiento | 20% |

### Cálculo de Notas

1. **Media de Exámenes (65%)**
   - Se calcula la media entre el 1º y 2º parcial
   - Se aplica el 65% a la media obtenida

2. **Nota del Libro (15%)**
   - Se introduce la nota del libro
   - Se aplica el 15% a la nota

3. **Comportamiento (20%)**
   - Se introduce la nota de comportamiento
   - Se aplica el 20% a la nota

4. **Nota Final**
   - Se suman los tres componentes ponderados
   - Estado: APROBADO (≥5) o SUSPENSO (<5)

## 🎯 Funcionalidades Principales

### Gestión de Cursos
- Selección de curso (1º o 2º)
- Selección de aula (DAM, DAW, ASIR)
- Cambio dinámico entre grupos

### Gestión de Alumnos
- Añadir nuevos alumnos
- Eliminar alumnos existentes
- Validación de DNI único
- Ordenación automática por apellidos

### Campos por Alumno
- DNI (único)
- Nombre
- Apellidos
- Notas de parciales
- Nota del libro
- Nota de comportamiento
- Cálculos automáticos de medias y ponderaciones

## 🛡️ Validaciones

- DNI único por alumno
- Notas entre 0 y 10
- Campos numéricos con paso de 0.1
- Prevención de duplicados de DNI

## 🎨 Interfaz

- Diseño responsive
- Feedback visual inmediato
- Indicadores de estado claros
- Navegación intuitiva
- Campos autoajustables

## 🔧 Tecnologías

- React
- TypeScript
- Tailwind CSS
- Lucide React (iconos)
- Vite

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 🤝 Contribución

1. Fork del repositorio
2. Crea una rama para tu feature
3. Commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

Si tienes alguna pregunta o sugerencia, por favor abre un issue en el repositorio.