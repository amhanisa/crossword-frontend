const Loading = {
  render() {
    return `
    <div class="loading-container hide">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    `;
  },

  show() {
    console.log("show");
    document.querySelector(".loading-container").classList.remove("hide");
  },

  hide() {
    console.log("hide");
    document.querySelector(".loading-container").classList.add("hide");
  },
};

export default Loading;
