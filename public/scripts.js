const userName = "shivam";
const password = "shivam";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Connected with the server!");
  socket.emit("clientConnect");
});

// listen for nsList events from the server which gives us the namespaces
socket.on("nsList", (nsData) => {
  console.log(nsData);
  // update HTML with each ns
  const nameSpacesDiv = document.querySelector(".namespaces");
  nameSpacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `  <div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        joinNs(element, nsData);
      });
    }
  );

  joinNs(document.getElementsByClassName("namespace")[0], nsData);
});
