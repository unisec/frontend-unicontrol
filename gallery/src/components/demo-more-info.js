import { html } from "@polymer/polymer/lib/utils/html-tag";
/* eslint-plugin-disable lit */
import { PolymerElement } from "@polymer/polymer/polymer-element";
import "../../../src/components/ha-card";
import "../../../src/state-summary/state-card-content";
import "../../../src/dialogs/more-info/more-info-content";

class DemoMoreInfo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: flex;
          align-items: start;
        }

        ha-card {
          width: 333px;
          padding: 20px 24px;
        }

        state-card-content {
          display: block;
          margin-bottom: 16px;
        }

        pre {
          width: 400px;
          margin: 16px;
          overflow: auto;
        }

        @media only screen and (max-width: 800px) {
          :host {
            flex-direction: column;
          }
          pre {
            margin-left: 0;
          }
        }
      </style>
      <ha-card>
        <state-card-content
          state-obj="[[_stateObj]]"
          hass="[[hass]]"
          in-dialog
        ></state-card-content>

        <more-info-content
          hass="[[hass]]"
          state-obj="[[_stateObj]]"
        ></more-info-content>
      </ha-card>
      <template is="dom-if" if="[[showConfig]]">
        <pre>[[_jsonEntity(_stateObj)]]</pre>
      </template>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      entityId: String,
      showConfig: Boolean,
      _stateObj: {
        type: Object,
        computed: "_getState(entityId, hass.states)",
      },
    };
  }

  _getState(entityId, states) {
    return states[entityId];
  }

  _jsonEntity(stateObj) {
    // We are caching some things on stateObj
    // (it sucks, we will remove in the future)
    const tmp = {};
    Object.keys(stateObj).forEach((key) => {
      if (key[0] !== "_") {
        tmp[key] = stateObj[key];
      }
    });
    return JSON.stringify(tmp, null, 2);
  }
}

customElements.define("demo-more-info", DemoMoreInfo);
