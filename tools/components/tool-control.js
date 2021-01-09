class ToolControlSubgroup extends HTMLElement {
  tmpl = document.createElement('TEMPLATE');

  constructor() {
    super();
    this.tmpl.innerHTML = this.render();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.tmpl.content.cloneNode(true));
  }

  render() {
    return `
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <link rel="stylesheet" href="/tools/components/map-tool.css">
      <link rel="stylesheet" href="/styles.css">
      <div class="map-settings-subgroup ml2">
        <slot>
          <!-- render child elements here -->
        </slot>
      </div>
    `;
  }

  invalidate() {
    render(this.render(), this.shadowRoot);
  }
}
window.customElements.define('tool-control-subgroup', ToolControlSubgroup);

class ToolControlGroup extends HTMLElement {
  tmpl = document.createElement('TEMPLATE');

  constructor() {
    super();
    this.tmpl.innerHTML = this.render();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.tmpl.content.cloneNode(true));
  }

  render() {
    return `
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <link rel="stylesheet" href="/tools/components/map-tool.css">
      <link rel="stylesheet" href="/styles.css">
      <div class="map-setting-group flex flex-row flex-nowrap">
        <slot>
          <!-- render child elements here -->
        </slot>
      </div>
    `;
  }

  invalidate() {
    render(this.render(), this.shadowRoot);
  }
}
window.customElements.define('tool-control-group', ToolControlGroup);


class ToolControl extends HTMLElement {

  get type() {
    return this.getAttribute('type');
  }
  set type(val) {
    !!val ? this.setAttribute('type', val) : this.removeAttribute('type');
  }

  get label() {
    return this.getAttribute('label') || "";
  }
  set label(val) {
    !!val ? this.setAttribute('label', val) : this.removeAttribute('label');
  }

  get value() {
    return this.getAttribute('value') || "";
  }
  set value(val) {
    !!val ? this.setAttribute('value', val) : this.removeAttribute('value');
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }
  set placeholder(val) {
    !!val ? this.setAttribute('placeholder', val) : this.removeAttribute('placeholder');
  }

  get placeholderAsDefault() {
    return this.getAttribute('placeholder-as-default') || true;
  }
  set placeholderAsDefault(val) {
    return !!val ? this.setAttribute('placeholder-as-default', val) : this.removeAttribute('placeholder-as-default');
  }

  tmpl = document.createElement('TEMPLATE');

  constructor() {
    super();
    this.tmpl.innerHTML = this.render();
    this.type = "text";
    if (!this.placeholderAsDefault) this.placeholderAsDefault = false;
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.tmpl.content.cloneNode(true));
  }

  render() {
    return `
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <link rel="stylesheet" href="/tools/components/map-tool.css">
      <link rel="stylesheet" href="/styles.css">
      <div class="map-setting flex flex-row h1 ma1">
        <label for="${this.id}-setting" class="fw5 w-30 dib">
          ${!!this.label ? this.label.toUpperCase() + ":": ""}
        </label> 
        <input 
            id="${this.id}-setting"
            class="setting bg-transparent w-70 pa0 dib"
            name="${this.id}"
            placeholder="${this.placeholder}"
            onmouseup="event.target.select()"
            onmousedown="${this._handleSetValue}"
            onchange="${this._handleSetValue}"
            type="${this.type}"/>
        <br/>
      </div>
    `;
  }

  _handleSetValue(event) {
    if (!event.target.value) {
      // set value or user placeholder as default
      this.value = (event.target.value || this.placeholderAsDefault ? event.target.placeholder : "");
    }

    // then fire change event to any listeners on this element
    let changeEvent = new CustomEvent('control-changed', {
      detail: { value: event.target.value },
      bubbles: true, composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  invalidate() {
    render(this.render(), this.shadowRoot);
  }
}
window.customElements.define('tool-control', ToolControl);
