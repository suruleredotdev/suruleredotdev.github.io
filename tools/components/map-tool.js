/* TODO: implement

class MapLayer extends HTMLElement {

}

*/ 

/*
 * MapTool web-component
 *
 * @param zoom number zoom value
 * @param coord Array [lat, lng]
 * @param tileLayerUrl string base tile layer URL
 * @param attribution string attribution HTMLString
 * @param showSettings boolean option for whether to show settings/controls for tool parameters
 */
class MapTool extends HTMLElement {

  map = null;
  tileLayer = null;
  coord = [6.498820462853738,  3.3958632487106137];
  zoom = 9;

  set zoom(val) { this.map.setView([this.coord[0], this.coord[1]], val); }
  get zoom() { return this.map.getZoom() || this.getAttribute('zoom') || 5; };

  set coord(val) {
    this.map.setView([val[0], val[1], this.zoom]);
    !!val ? this.setAttribute('coord', JSON.stringify(val)) : this.removeAttribute('coord');
  }
  get coord() {
    let latLng = this.map.getCenter();
    return !!latLng ? [latLng.lat, latLng.lng] : JSON.parse(this.getAttribute('coord'));
  }

  get tileLayerUrl() { 
    return this.getAttribute('tile-layer-url') || false;
  }
  set tileLayerUrl(val) { 
    // TODO: make this multi-select and track multiple layers
    this.tileLayer = L.tileLayer(val, {
        zoom: this.zoom,
        maxZoom: 19,
        subdomains: ['mt0','mt1','mt2','mt3'],
        attribution: this.attribution
    }).addTo(this.map);

    this.map.removeLayer(this.tileLayer);
    this.tileLayer = L.tileLayer(val);
    this.map.addLayer(this.tileLayer);
    !!val ? this.setAttribute('tile-layer-url', val) : this.removeAttribute('tile-layer-url');
  }
  set attribution(val) { 
    this.map.attributionControl.removeAttribution(val);
    this.map.attributionControl.addAttribution(val);
  }

  get importData() { 
    return this.getAttribute('import-data') || "";
  }
  set tileLayerUrl(val) { 
    // TODO: make this multi-select and track multiple layers
    this.importData = L.tileLayer(val, {
        zoom: this.zoom,
        maxZoom: 19,
        subdomains: ['mt0','mt1','mt2','mt3'],
        attribution: this.attribution
    }).addTo(this.map);

    this.map.removeLayer(this.tileLayer);
    this.tileLayer = L.tileLayer(val);
    this.map.addLayer(this.tileLayer);
    !!val ? this.setAttribute('tile-layer-url', val) : this.removeAttribute('tile-layer-url');
  }

  get showSettings() {
    return this.getAttribute('show-settings') || false;
  }
  set showSettings(val) {
    !!val ? this.setAttribute('show-settings', val) : this.removeAttribute('show-settings');
  }

  style = document.createElement('STYLE');
  tmpl = document.createElement('TEMPLATE');

  get preloadScript() {
    // scripts to preload.
    // can't be loaded inside template b/c they're used by
    // connectedCallback()
    let content = `
    `;
    let el = document.createElement('SCRIPT');
    el.textContent = content;
    return el;
  }

  constructor() {
    super();
    this.tmpl.innerHTML = this.render();
    // this.style.textContent = mapStyle;
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.style);
    shadowRoot.appendChild(this.preloadScript);
    shadowRoot.appendChild(this.tmpl.content.cloneNode(true));
  }

  connectedCallback() {
    this.map = L.map(this.shadowRoot.getElementById('map')).setView([this.coord[0], this.coord[1]], 9);
    this.map.on('moveend', function(e) {
        this.zoom = e.target.getZoom();
        let center = e.target.getCenter();
        this.coord = [center.lat, center.lng]
        // coord[0].set(center.lat, false);
        // coord[1].set(center.lng, false);
    });

    // this.updateStyle(this);
  }

  // updateStyle(el) {
  //   const shadow = el.shadowRoot;
  //   shadow.querySelector('style').textContent = mapStyle;
  // }

  render() {
    return `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.5.2/webcomponents-lite.js" integrity="sha512-4XW4wqGcQr1z+1GFPjpdaoOo6nR/oMLzQT8UU9Rc705C+TWBWxtQn7dbrZLWkNVECuvpTiaTjTpFmboPPLXtsw==" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="/tools/components/map-tool.css">
      <link rel="stylesheet" href="/styles.css">
      <link rel="import" href="/tools/components/leaflet-map/leaflet-map.html">

      <!-- import leaflet and the other map libraries we'll use -->

      <script>
        /* not even mine */
        const mapboxAccessToken = 'pk.eyJ1Ijoia29yZWRlc21hcHMiLCJhIjoiY2tkbmhpdTBiMGMwZTJ6cHlpN2ppbG5jMyJ9.d7dW9A4fq2_qz0EKv3ofqA';
      </script>

      <div class="flex flex-row">
        <div class="MAP tool-container flex flex-row">
          <div id="map" class="MAP"></div>

          <leaflet-map> </leaflet-map>

        </div>

        ${this.showSettings ?
        '<slot id="settings-slot"></slot>'
        : ''}
      </div>
    `;
  }

  invalidate() {
    render(this.render(), this.shadowRoot);
  }

}
window.customElements.define('map-tool', MapTool);
