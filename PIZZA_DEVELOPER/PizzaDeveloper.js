function calcularCosto(){
    const tamañoSelect = document.getElementById('tamaño');
    const tipoSelect = document.getElementById('tipo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

    const seleccionarTamaño = tamañoSelect.value;
    const seleccionarTipo = tipoSelect.value;
    const seleccionarExtras = Array.from(extrasCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    const costoFijo = 5;//Costo fijo

    let radio;
    switch (seleccionarTamaño){
      case 'pequeña':
        radio = 5;//10cm de diámetro
        break;
      case 'mediana':
        radio = 7;//14cm de diámetro
        break;
      case 'grande':
        radio = 8; //16cm de diámetro
        break;
    }

    const costoHarina = (Math.PI * Math.pow(radio, 2)) * 0.03;//Costo variable

    let extrasCosto;
    switch (seleccionarTamaño){
      case 'pequeña':
        extrasCosto = seleccionarExtras.length * 0.5;//Costo de extras para pizza pequeña
        break;
      case 'mediana':
        extrasCosto = seleccionarExtras.length * 1;//Costo de extras para pizza mediana
        break;
      case 'grande':
        extrasCosto = seleccionarExtras.length * 2;//Costo de extras para pizza grande
        break;
    }

  const costoTotal = (costoFijo + costoHarina + extrasCosto) * 1.5;//Precio final
    
  const resultadoDiv = document.getElementById('resultado');
  const costoTotalElementos = document.getElementById('costo-total');

//Valida si se eligio un ingrediente extra para la pizza
  if(seleccionarTipo === 'extras' && seleccionarExtras.length === 0){
    alert('Debe seleccionar al menos un ingrediente extra.');
  }else{
    resultadoDiv.style.display = 'block';
    costoTotalElementos.textContent = `$${costoTotal.toFixed(2)}`;
  }
//console.log(`$${costoTotal.toFixed(2)}`)
}

//Manejo del evento para mostrar y ocultar el contenedor de extras
const tipoSelect = document.getElementById('tipo');
const extrasContenedor = document.getElementById('extras-contenedor');
  
tipoSelect.addEventListener('change', ()=>{
    if(tipoSelect.value === 'extras'){
      extrasContenedor.style.display = 'block';
    }else{
      extrasContenedor.style.display = 'none';
    }
});

