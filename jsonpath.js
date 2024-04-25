import { html, LitElement, property } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import jsonpath from 'https://cdn.jsdelivr.net/npm/jsonpath@1/jsonpath.min.js';

export class JsonPathViewer extends LitElement {
    @property({ type: String }) jsonData = '{}';
    @property({ type: String }) jsonPath = '$';
    @property({ type: String }) result = '';

    static getMetaConfig() {
        return {
            controlName: 'JSON Path',
            description: 'Query JSON data using JSON Path',
            fallbackDisableSubmit: false,
            pluginAuthor: 'Jordan',
            pluginVersion: '1.0.0',
            groupName: 'Custom PMA Controls',
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
        let parsedData;
        try {
            parsedData = JSON.parse(this.jsonData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            this.result = 'Error parsing JSON.';
        }
        try {
            const result = jsonpath.query(parsedData, this.jsonPath);
            this.result = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error("Error evaluating JSON Path:", error);
            this.result = 'Error evaluating JSON Path.';
        }
    }

    render() {
        return html`<p>${this.result}</p>`;
    }
}

// Registering the web component
customElements.define('pma-jsonpath', JsonPathViewer);
