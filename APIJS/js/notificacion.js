//notificaciones nativas de JS
const notificarBTN = document.querySelector("#notificar");
const verNotiBTN = document.querySelector("#verNotificacion");

notificarBTN.addEventListener("click", () => {
  //notificaciones API

  Notification.requestPermission().then((resultado) => {
    console.log("El resultado es: ", resultado);
  });
});

verNotiBTN.addEventListener("click", () => {
  console.log("ver");
  console.log(Notification.permission);
  if (Notification.permission === "granted") {
    const notiVentana = new Notification("Aqui esta la notificacion", {
      icon: "img/edetecnica.png",
      body: "notificacion recibida",
    });

    notiVentana.onclick = function () {
      window.open("http://google.com");
    };
  }
});
