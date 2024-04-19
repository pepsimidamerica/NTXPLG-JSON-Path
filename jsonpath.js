import { html, LitElement } from '<https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js>';
import jsonpath from '<https://cdn.jsdelivr.net/npm/jsonpath@1/jsonpath.min.js>';

export class JsonPathViewer extends LitElement {
    static properties = {
        jsonData: { type: String },
        jsonPath: { type: String },
        result: { type: String, state: true },
    };

    constructor() {
        super();
        this.jsonData = '{}';
        this.jsonPath = '$';
        this.result = '';
    }

    static getMetaConfig() {
        return {
            controlName: 'pma-json-path',
            groupName: 'Custom PMA Controls',
            fallbackDisableSubmit: false,
            version: '1.2',
            properties: {
                jsonData: {
                    type: 'string',
                    title: 'JSON Data',
                    description: 'The JSON data to query'
                },
                jsonPath: {
                    type: 'string',
                    title: 'JSON Path',
                    description: 'The JSON path to query'
                }
            }
        };
    }

    updated(changedProperties) {
        if (changedProperties.has('jsonData') || changedProperties.has('jsonPath')) {
            this.evaluateJsonPath();
        }
    }

    evaluateJsonPath() {
        try {
            const parsedData = JSON.parse(this.jsonData);
            const result = jsonpath.query(parsedData, this.jsonPath);
            this.result = JSON.stringify(result, null, 2);
        } catch (error) {
            this.result = 'Error parsing JSON or evaluating JSON Path.';
        }
    }

    render() {
        return html`
            <div>
                <label for="jsonData">JSON Data:</label>
                <textarea id="jsonData" .value=${this.jsonData} @input=${e => this.jsonData = e.target.value}></textarea>
                <label for="jsonPath">JSON Path:</label>
                <input type="text" id="jsonPath" .value=${this.jsonPath} @input=${e => this.jsonPath = e.target.value} />
                <pre>${this.result}</pre>
            </div>
        `;
    }
}

const elementName = 'pma-jsonpath';
customElements.define(elementName, JsonPathViewer);
