#!/bin/bash

# Función para mostrar el uso correcto del script
usage() {
    echo "Uso: $0 <nombre-entidad>"
    echo "Ejemplo: $0 administrator"
    exit 1
}

# Verificar que se proporcione un nombre de entidad
if [ $# -eq 0 ]; then
    usage
fi

# Nombre de la entidad (en minúsculas)
ENTITY_LOWER=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Nombre de la entidad con primera letra mayúscula
ENTITY_PASCAL=$(echo "$1" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')

# Función para verificar el último comando
check_command() {
    if [ $? -eq 0 ]; then
        echo "✅ $1 generado exitosamente"
    else
        echo "❌ Error al generar $1"
        exit 1
    fi
}

# Generar estructura CRUD
generate_crud() {
    # Crear modelo
    ng g class models/${ENTITY_LOWER} --type=model
    check_command "Modelo"

    # Crear servicio
    ng g service services/${ENTITY_LOWER}
    check_command "Servicio"

    # Crear módulo con routing
    ng g m pages/${ENTITY_LOWER} --routing
    check_command "Módulo"

    # Crear componentes básicos
    ng g c pages/${ENTITY_LOWER}/list
    check_command "Componente List"

    ng g c pages/${ENTITY_LOWER}/manage
    check_command "Componente /manage"

    echo "🎉 Estructura CRUD para ${ENTITY_PASCAL} generada completamente"
}

# Ejecutar generación
generate_crud

# Mensaje final
echo "Recuerda configurar manualmente los componentes, rutas y servicios según tus necesidades específicas."
