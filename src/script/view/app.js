import URLParser from "../router/URLParser";
import routes from "../router/routes";

class App {
  constructor({ container }) {
    this.container = container;
  }

  async renderPage() {
    const url = URLParser.parseActiveURLWithCombiner();
    const page = routes[url];
    this.container.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
