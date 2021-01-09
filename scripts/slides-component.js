document.addEventListener("DOMContentLoaded", function(){
    
    // get all our classed blockquote components
    var index = document.querySelectorAll(".quoteback");


    for(var item=0; item < index.length; item++ ){   
      // remove the footer element
      console.log(index[item]);
      index[item].removeChild(index[item].querySelector("footer"));
      
      var text = index[item].innerHTML;

      var url = index[item].cite;
      var author = index[item].getAttribute("data-author");
      var title = index[item].getAttribute("data-title");
      var favicon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}&sz=64`
      var darkmode = index[item].getAttribute("darkmode");

      // create a new component with that data
      var component = `
      <quoteback-component darkmode="${darkmode}" url="${url}" text="${encodeURIComponent(text)}" author="${author}" title="${title}" favicon="${favicon}"> 
      </quoteback-component>    
      `;
      var newEl = document.createElement('div');
      newEl.innerHTML = component;
      

      // replace the original blockquote with our quoteback seed component
      index[item].parentNode.replaceChild(newEl, index[item]);

      var template = document.createElement('template');
      template.innerHTML=`
      <style>${quoteStyle}</style>
      <div class="quoteback-container" role="quotation" aria-labelledby="quoteback-author" tabindex="0">
          <div id="quoteback-parent" class="quoteback-parent">
              <div class="quoteback-content"></div>       
          </div>
          <div class="quoteback-head">       
              <div class="quoteback-avatar"><img class="mini-favicon" src=""/></div>     
              <div class="quoteback-metadata">
                  <div class="metadata-inner">
                      <div aria-label="" id="quoteback-author" class="quoteback-author"></div>
                      <div aria-label="" class="quoteback-title"></div>
                  </div>  
              </div>
          <div class="quoteback-backlink"><a target="_blank" aria-label="go to the full text of this quotation" rel="noopener" href="" class="quoteback-arrow">Go to text <span class="right-arrow">&#8594;</span></a></div>
          </div>  
      </div>`;

      class QuoteBack extends HTMLElement {
        constructor(){  
          super();
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(template.content.cloneNode(true));
  			  
  			  this.text = decodeURIComponent(this.getAttribute('text'));
  			  this.author = this.getAttribute('author');
  			  this.title = decodeURIComponent(this.getAttribute('title')); 
  			  this.url = this.getAttribute('url')
          this.favicon = this.getAttribute('favicon');
          this.editable = this.getAttribute('editable');
          this.darkmode = this.getAttribute('darkmode')

        };
        
        connectedCallback() {
          console.info( 'connected' );

          if(this.darkmode == "true"){
            this.shadowRoot.querySelector('.quoteback-container').classList += " dark-theme";
          }
          this.shadowRoot.querySelector('.quoteback-content').innerHTML = decodeURIComponent(this.getAttribute('text'));
          this.shadowRoot.querySelector('.mini-favicon').src = this.getAttribute('favicon');
          this.shadowRoot.querySelector('.quoteback-author').innerHTML = this.getAttribute('author');
          this.shadowRoot.querySelector('.quoteback-author').setAttribute("aria-label", "quote by " + this.getAttribute('author'));
          this.shadowRoot.querySelector('.quoteback-title').innerHTML = decodeURIComponent(this.getAttribute('title'));
          this.shadowRoot.querySelector('.quoteback-title').setAttribute("aria-label", "title: " + decodeURIComponent(this.getAttribute('title')));
          this.shadowRoot.querySelector('.quoteback-arrow').href = this.getAttribute('url');          

          // Manually focus and blur clicked targets
          // This solves firefox bug where clicking between contenteditable fields doesn't work         
          if(this.editable == "true"){
            let titlediv = this.shadowRoot.querySelector('.quoteback-title');
            let authordiv = this.shadowRoot.querySelector('.quoteback-author');
            
            titlediv.addEventListener("click", evt => {
              evt.target.contentEditable = true;
              evt.target.focus();
            });
            titlediv.addEventListener("blur", evt => {
              evt.target.contentEditable = false;
            });

            authordiv.addEventListener("click", evt => {
              evt.target.contentEditable = true;
              evt.target.focus();
            });
            authordiv.addEventListener("blur", evt => {
              evt.target.contentEditable = false;
            });
          }
          // end this fix

        };                                  

      }

      // if quoteback-component is already defined
      if (customElements.get('quoteback-component')){
          null;
      }else{
          window.customElements.define('quoteback-component', QuoteBack)  
      }
    }
});

