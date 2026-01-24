class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); // Llamar al constructor de la clase padre

    this.attachShadow({ mode: "open" });
  }

  createURL(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }

  render() {
    const service = this.getAttribute("service") ?? "github";
    const username = this.getAttribute("username") ?? "javierpd45";
    const size = this.getAttribute("size") ?? "40";

    const url = this.createURL(service, username);

    // console.log(service, username, imageUrl, size);

    this.shadowRoot.innerHTML = `
    <style>
      img {
        border-radius: 100%;
        min-width: 40px;
        min-height: 40px;
        width: ${size}px;
        height: ${size}px;
      }
    </style>
      <img
        class="avatar"
        src="${url}"
        alt="Avatar de ${username}"
      />
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("devjobs-avatar", DevJobsAvatar);
