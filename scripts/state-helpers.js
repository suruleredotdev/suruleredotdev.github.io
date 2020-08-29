function valueOrDefault(input) {
    return (!!input.value) ? input.value : input.placeholder;
}

class S {
    constructor(getFn, setFn, toString = function() { return "#"; }) {
        this.getFn = getFn;
        this.setFn = setFn;
        this.toString = toString;
    }
    get(key)      { return this.getFn(key);      }
    set(key, val) { return this.setFn(key, val); }
}
var sources = {
    ATTRS: new S(
        /* gets keyed value from source: current script tag attributes  */
        function(key)      { return document.currentScript.getAttribute(key); }, 

        /* treated as no-op, since this behavior isn't needed when getting attrs from script tag */
        function(key, val) { document.currentScript.setAttribute(key, val); },
    ),
    URL: new S(
        /* gets keyed value from source: URL Query parameters */
        function(key)      { return (new URLSearchParams(window.location.search)).get(key); }, 

        /* modifies URL (w/o reloading) */
        function(key, val) {
            let query = (new URLSearchParams(window.location.search));
            query.set(key, val);

            // update URL query params without reloading page
            if (history.pushState) {
                var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + query.toString();
                window.history.pushState({ path: newUrl }, '', newUrl);
            }
        },

        function() { return (new URLSearchParams(window.location.search)).toString(); }
    ),
    LOCAL_STORAGE: new S(
        function(key) { return window.localStorage.getItem(key); },

        function(key, val) { return window.localStorage.setItem(key, val); },
    ),
}

// proxy for reactive values from <input>s in DOM 
// state is stored in the elements themselves (this.el), with get and set hooks and an change listener

// DO NOT CHANGE
class I {
    constructor(id, initVal = null, source = sources.URL) {
        this.id = id;
        this.el =
            /* 
            * using DOM elements as source-of-truth for state here
            * use unboound-Node if no such element exists, won't be GC'd since there's a reference
            */
            document.getElementById(id) || document.createElement("DIV"); 
        if (!!initVal) {
            this.el.value = initVal;
        }
        this.query = source;
        // default event handlers
        this.update = function(val) {
            console.log(`I.onchange: ${id} changed to '${val}' – onchange unset`);
        };
        // attempt to get inital value from query params
        if (Object.is(this.query, sources.URL)) {
            let param = this.query.get(this.el.id.replace(new RegExp('-setting$'), ''));
            console.log('el: ', this.el.id);
            if (!!param) {
                this.el.value = param;
                let setting = this;
                setTimeout(function() { 
                    console.log(`initializing ${id} from URL params`);
                    setting.update(param);
                }, 100);
            }
        }
    }

    get() {
        return valueOrDefault(this.el);
    }

    set(valOrFn, update = true /* trigger change update */) {
        this.el.value = 
            (valOrFn && {}.toString.call(valOrFn) === '[object Function]') 
            ? valOrFn(this.el.value) 
            : valOrFn;
        if (update) {
            this.update(this.el.value);
        }
        this.query.set(this.el.id.replace(new RegExp('-setting$'), ''), this.el.value);
    }
}
