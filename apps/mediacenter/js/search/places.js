// Top places search module.

class Places {
  // Returns a Promise that resolves to a result set.
  async search(query, count) {
    console.log(`Places query ${query}`);
    let results = [];
    await contentManager.searchPlaces(query, count, (result) => {
      // console.log(`Places result: ${JSON.stringify(result)}`);
      if (result) {
        results.push(result);
      }
      return true;
    });

    return results;
  }
}

class PlacesSource extends SearchSource {
  constructor(sectionName) {
    super(sectionName, new Places());
  }

  domForResult(result) {
    return new PlacesItem(result);
  }

  activate(result) {
    let url = result.variants.default.url;
    SearchSource.openURL(url);
    contentManager.visitPlace(url, true);
  }
}

// Define a custom element for our content.
class PlacesItem extends LitElement {
  // data is { meta, variants }
  constructor(data) {
    super();
    this.data = data;
    this.revokable = [];
    this.addEventListener("blur", this);
    // Make focusable by default.
    this.tabIndex = 0;
    [
      "willmove",
      "willunfocus",
      "unfocused",
      "willfocus",
      "focused",
      "navigatefailed",
      "enter-down",
      "enter-up",
    ].forEach((name) => {
      this.addEventListener(`sn:${name}`, this);
    });
  }

  createRenderRoot1() {
    return this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
  }

  static get properties() {
    return {
      data: { state: true },
    };
  }

  handleEvent(event) {
    console.log(`PlacesItem: event ${event.type} ${this.data.meta.name}`);
  }

  // focus(options) {
  //   console.log(`PlacesItem::focus(${options}) ${this.data.meta.name}`);
  //   let target = this.shadowRoot.querySelector(".entry");
  //   if (target) {
  //     target.focus();
  //   } else {
  //     console.error(`No focusable target!!`);
  //   }
  //   // this.classList.add("selected");
  // }

  // blur() {
  //   console.log(`PlacesItem::blur() ${this.data.meta.name}`);
  //   // this.shadowRoot.querySelector(".entry")?.focus();
  //   // this.classList.remove("selected");
  // }

  variant(name = "default") {
    let variant = this.data.variants[name];
    if (variant) {
      if (typeof variant === "string") {
        return variant;
      }
      // Variant should be a blob if not a string.
      let url = URL.createObjectURL(variant);
      this.revokable.push(url);
      return url;
    }
  }

  render() {
    let content = this.data.variants.default;
    let iconSrc = this.variant("icon") || content.icon;

    return html` <link rel="stylesheet" href="style/search/places.css" />
      <div class="entry" title="${content.url}" tabindex1="0">
        <img src=${iconSrc} />
        <div class="title">${content.title}</div>
      </div>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.revokable.forEach(URL.revokeObjectURL);
    this.revokable = [];
  }

  activate() {
    this.addEventListener(
      "click",
      () => {
        SearchSource.closeSearch();
        let url = this.data.variants.default.url;
        SearchSource.openURL(url);
        contentManager.visitPlace(url, true);
      },
      { once: true }
    );
  }
}

customElements.define("places-item", PlacesItem);
