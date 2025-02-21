const pasajeroInput = document.querySelector("#pasajero");
const vueloInput = document.querySelector("#vuelo");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const detallesInput = document.querySelector("#detalles");
const fechaRegresoInput = document.querySelector("#fechaRegreso");
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");
const paisDestinoInput = document.querySelector("#paisDestino");

let editar;

const objCitas = {
  pasajero: "",
  vuelo: "",
  telefono: "",
  fecha: "",
  fechaRegreso: "",
  paisDestino: "",
  hora: "",
  detalles: "",
};

eventos();
function eventos() {
  formulario.addEventListener("submit", nuevaCita);
  pasajeroInput.addEventListener("change", datosCita);
  vueloInput.addEventListener("change", datosCita);
  telefonoInput.addEventListener("change", datosCita);
  fechaInput.addEventListener("change", validarFecha);
  fechaRegresoInput.addEventListener("change", validarFechasVuelo);
  paisDestinoInput.addEventListener("change", validarPaisDestino); // Nuevo evento
  horaInput.addEventListener("change", datosCita);
  detallesInput.addEventListener("change", datosCita);
}

function validarFecha(e) {
  const fechaSeleccionada = new Date(e.target.value);
  const hoy = new Date();

  // Establecer la hora a 00:00 para comparar solo fechas
  hoy.setHours(0, 0, 0, 0);

  // Validar que la fecha no sea anterior a hoy
  if (fechaSeleccionada < hoy) {
    useri.imprimirAlerta(
      "La fecha no puede ser anterior a la fecha actual.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
    return;
  }

  // Validar que no sea un fin de semana
  const diaSemana = fechaSeleccionada.getDay(); // 0 (domingo) a 6 (sábado)
  if (diaSemana === 1 || diaSemana === 5) {
    useri.imprimirAlerta(
      "No se pueden seleccionar fechas en fines de semana.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
    return;
  }

  // Si pasa las validaciones, actualizar el objeto de citas
  objCitas.fecha = e.target.value;
}

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((c) => c.id !== id);
  }

  editarCita(cita) {
    this.citas = this.citas.map((c) => (c.id === cita.id ? cita : c));
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((i) => {
      const {
        pasajero,
        vuelo,
        telefono,
        fecha,
        fechaRegreso,
        paisDestino,
        hora,
        detalles,
        id,
      } = i;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      const pasajeroParrafo = document.createElement("h2");
      pasajeroParrafo.classList.add("card-title", "font-weight-bolder");
      pasajeroParrafo.textContent = pasajero;

      const vueloParrafo = document.createElement("p");
      vueloParrafo.innerHTML = `<span class='font-weight-bolder'>Vuelo:</span> ${vuelo}`;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class='font-weight-bolder'>Teléfono:</span> ${telefono}`;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class='font-weight-bolder'>Fecha de Salida:</span> ${fecha}`;

      const fechaRegresoParrafo = document.createElement("p");
      fechaRegresoParrafo.innerHTML = `<span class='font-weight-bolder'>Fecha de Regreso:</span> ${fechaRegreso}`;

      const paisDestinoParrafo = document.createElement("p");
      paisDestinoParrafo.innerHTML = `<span class='font-weight-bolder'>País de Destino:</span> ${paisDestino}`;

      const detallesParrafo = document.createElement("p");
      detallesParrafo.innerHTML = `<span class='font-weight-bolder'>Detalles:</span> ${detalles}`;

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = "Eliminar";
      btnEliminar.onclick = () => eliminarCita(id);

      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = "Editar";
      btnEditar.onclick = () => cargarEdicion(i);

      divCita.appendChild(pasajeroParrafo);
      divCita.appendChild(vueloParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(fechaRegresoParrafo);
      divCita.appendChild(paisDestinoParrafo);
      divCita.appendChild(detallesParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const useri = new UI();
const administrarCitas = new Citas();

function nuevaCita(e) {
  e.preventDefault();

  const { pasajero, vuelo, telefono, fecha, detalles, hora } = objCitas;

  if (
    pasajero === "" ||
    vuelo === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    detalles === ""
  ) {
    useri.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editar) {
    formulario.querySelector("button[type=submit]").textContent = "Crear Cita";
    editar = false;

    administrarCitas.editarCita({ ...objCitas });
    useri.imprimirAlerta("Se ha modificado la cita correctamente");
  } else {
    objCitas.id = Date.now();
    administrarCitas.agregarCita({ ...objCitas });
    useri.imprimirAlerta("Se ha agregado la cita correctamente");
  }

  formulario.reset();
  reiniciarObjeto();
  useri.imprimirCitas(administrarCitas);
}

function datosCita(e) {
  objCitas[e.target.name] = e.target.value;
}

function reiniciarObjeto() {
  objCitas.pasajero = "";
  objCitas.vuelo = "";
  objCitas.telefono = "";
  objCitas.fecha = "";
  objCitas.hora = "";
  objCitas.detalles = "";
}

function eliminarCita(id) {
  administrarCitas.eliminarCita(id);
  useri.imprimirAlerta("La cita se eliminó correctamente");
  useri.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
  const { pasajero, vuelo, telefono, fecha, hora, detalles, id } = cita;

  pasajeroInput.value = pasajero;
  vueloInput.value = vuelo;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  detallesInput.value = detalles;

  objCitas.pasajero = pasajero;
  objCitas.vuelo = vuelo;
  objCitas.telefono = telefono;
  objCitas.fecha = fecha;
  objCitas.hora = hora;
  objCitas.detalles = detalles;
  objCitas.id = id;

  formulario.querySelector("button[type=submit]").textContent = "Guardar";

  editar = true;
}

function validarFechasVuelo(e) {
  const fechaIda = new Date(fechaInput.value);
  const fechaRegreso = new Date(e.target.value);

  if (fechaRegreso <= fechaIda) {
    useri.imprimirAlerta(
      "La fecha de regreso debe ser posterior a la fecha de ida.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
  } else {
    objCitas.fechaRegreso = e.target.value;
  }

  // Validar que no sea un fin de semana
  const diaSemana = fechaRegreso.getDay(); // 0 (domingo) a 6 (sábado)
  if (diaSemana === 1 || diaSemana === 5) {
    useri.imprimirAlerta(
      "No se pueden seleccionar fechas en fines de semana.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
    return;
  }
}

function validarPaisDestino(e) {
  const pais = e.target.value.trim();

  // Validar que el campo no esté vacío
  if (pais === "") {
    useri.imprimirAlerta(
      "El campo País de Destino no puede estar vacío.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
    return;
  }

  // Validar que solo contenga letras y espacios
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regex.test(pais)) {
    useri.imprimirAlerta(
      "El País de Destino solo debe contener letras y espacios.",
      "error"
    );
    e.target.value = ""; // Limpiar el campo
    return;
  }

  // Si pasa las validaciones, actualizar el objeto de citas
  objCitas.paisDestino = pais;
}
