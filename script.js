document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.btn-calcular');
    const unidadInput = document.getElementById('unidad');
    const notaContinuaInput = document.getElementById('NotaContinua');
    const porcentajeContinuaInput = document.getElementById('PorcentajeContinua');
    const notaExamenInput = document.getElementById('NotaExamen');
    const porcentajeExamenInput = document.getElementById('PorcentajeExamen');

    const resultadoPrimera = document.querySelector('.resultado.primera');
    const resultadoSegunda = document.querySelector('.resultado.segunda');
    const resultadoTercera = document.querySelector('.resultado.tercera');

    const totalBox = document.querySelector('.total');

    // Guardar las notas finales por unidad
    const notasUnidades = {
        "Primera Unidad": null,
        "Segunda Unidad": null,
        "Tercera Unidad": null
    };

    const porcentajesUnidades = {
        "Primera Unidad": null,
        "Segunda Unidad": null,
        "Tercera Unidad": null
    };

    boton.addEventListener('click', () => {
        const unidad = unidadInput.value.trim();
        const notaContinua = parseFloat(notaContinuaInput.value);
        const porcentajeContinua = parseFloat(porcentajeContinuaInput.value);
        const notaExamen = parseFloat(notaExamenInput.value);
        const porcentajeExamen = parseFloat(porcentajeExamenInput.value);

        if (
            !unidad ||
            isNaN(notaContinua) || isNaN(porcentajeContinua) ||
            isNaN(notaExamen) || isNaN(porcentajeExamen)
        ) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        if (
            porcentajeContinua <= 0 || porcentajeContinua > 100 ||
            porcentajeExamen <= 0 || porcentajeExamen > 100
        ) {
            alert("Los porcentajes deben estar entre 1 y 100.");
            return;
        }

        const sumaPorcentajes = porcentajeContinua + porcentajeExamen;
        if (sumaPorcentajes > 100) {
            alert("La suma de los porcentajes para esta unidad no puede superar el 100%.");
            return;
        }

        // Calcular nota final
        const notaFinal = (notaContinua * porcentajeContinua / 100) + (notaExamen * porcentajeExamen / 100);

        // Guardar y mostrar en tabla
        switch (unidad) {
            case "Primera Unidad":
                resultadoPrimera.textContent = notaFinal.toFixed(2);
                notasUnidades["Primera Unidad"] = notaFinal;
                porcentajesUnidades["Primera Unidad"] = sumaPorcentajes;
                break;
            case "Segunda Unidad":
                resultadoSegunda.textContent = notaFinal.toFixed(2);
                notasUnidades["Segunda Unidad"] = notaFinal;
                porcentajesUnidades["Segunda Unidad"] = sumaPorcentajes;
                break;
            case "Tercera Unidad":
                resultadoTercera.textContent = notaFinal.toFixed(2);
                notasUnidades["Tercera Unidad"] = notaFinal;
                porcentajesUnidades["Tercera Unidad"] = sumaPorcentajes;
                break;
            default:
                alert("Unidad no válida. Elija una opción del listado.");
                return;
        }

        // Calcular promedio de unidades ya registradas
        const notasRegistradas = Object.values(notasUnidades).filter(n => n !== null);
        const promedio = notasRegistradas.reduce((a, b) => a + b, 0) ;

        // Mostrar promedio en el cuadro total
        totalBox.innerHTML = `<h3>Promedio total: ${promedio.toFixed(2)}</h3>`;


      

        // Validar suma de porcentajes en todas las unidades (opcional)
        const unidadesCompletas = Object.values(porcentajesUnidades).every(p => p !== null);
        if (unidadesCompletas) {
            const totalPorcentajes = Object.values(porcentajesUnidades).reduce((a, b) => a + b, 0);
            if (totalPorcentajes !== 100) {
                alert(`⚠️ La suma total de los porcentajes de todas las unidades es ${totalPorcentajes}%. Debe ser 100%.`);
            }
        }

        // Limpiar campos
        notaContinuaInput.value = '';
        porcentajeContinuaInput.value = '';
        notaExamenInput.value = '';
        porcentajeExamenInput.value = '';
    });
});
