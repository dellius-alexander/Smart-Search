
import { latexParser } from 'latex-parser';

/**
 * LatexParser Class
 *
 * The LatexParser class provides a way to validate and parse a LaTeX document.
 *
 * @class LatexParser
 * @constructor
 * @param {string|undefined} latexDoc The LaTeX document to be parsed.
 *
 */
class LatexParser {
    constructor(latexDoc = undefined) {
        try {
            this.latexDoc = latexDoc || {};
            this.parsedDoc = latexParser.parse(this.latexDoc) || {};
            console.dir(this);
        } catch (e) {
            console.error(e.message);
        }

    }
    /**
     * latexRegex
     *
     * Object containing the regular expressions for the different LaTeX syntax types.
     *
     * @property latexRegex
     * @type Object
     *
     */
    latexRegex = Object.assign({},{
        // Match any LaTeX command (e.g. \command)
        command: /\\[a-zA-Z]+/,

        // Match any LaTeX environment (e.g. \begin{environment}...\end{environment})
        environment: /\\begin\{[a-zA-Z]+\}.*\\end\{[a-zA-Z]+\}/s,

        // Match any LaTeX math mode (e.g. $...$ or \(...\))
        mathMode: /\$[^$]+\$|\\\([^\\]+\\\)/,

        // Match any LaTeX subscript or superscript (e.g. x_{subscript} or x^{superscript})
        subscriptSuperscript: /[a-zA-Z0-9]_\{[^}]+\}|[a-zA-Z]+\^\{[^}]+\}/,

        // Match any LaTeX citation (e.g. \cite{key})
        citation: /\\cite\{[^}]+\}/,

        // Match any LaTeX URL (e.g. \url{http://example.com})
        url: /\\url\{[^}]+\}/,

        // Match any LaTeX section (e.g. \section{Title})
        section: /\\section\{[^}]+\}/,

        // Match any LaTeX figure (e.g. \begin{figure}...\end{figure})
        figure: /\\begin\{figure\}.*\\end\{figure\}/s,

        // Match any LaTeX table (e.g. \begin{table}...\end{table})
        table: /\\begin\{table\}.*\\end\{table\}/s,

        // Match any LaTeX label (e.g. \label{labelname})
        label: /\\label\{[^}]+\}/,

        // Match any LaTeX fraction (e.g \frac{})
        fraction: /\\frac\{[^}]+\}\{[^}]+\}/
    });
    /**
     * validateFraction
     *
     * Validates the syntax of a given fraction.
     *
     * @method validateFraction
     * @param {string} fraction The fraction to be validated.
     * @return {boolean} True if the fraction is valid, false otherwise.
     *
     */
    validateFraction(fraction) {
        return this.latexRegex.fraction.test(fraction);
    }
    /**
     * validateCommand
     *
     * Validates the syntax of a given command.
     *
     * @method validateCommand
     * @param {string} command The command to be validated.
     * @return {boolean} True if the command is valid, false otherwise.
     *
     */
    validateCommand(command) {
        return this.latexRegex.command.test(command);
    }
    /**
     * validateEnvironment
     *
     * Validates the syntax of a given environment.
     *
     * @method validateEnvironment
     * @param {string} environment The environment to be validated.
     * @return {boolean} True if the environment is valid, false otherwise.
     *
     */
    validateEnvironment(environment) {
        return this.latexRegex.environment.test(environment);
    }
    /**
     * validateMathMode
     *
     * Validates the syntax of a given math mode.
     *
     * @method validateMathMode
     * @param {string} mathMode The math mode to be validated.
     * @return {boolean} True if the math mode is valid, false otherwise.
     *
     */
    validateMathMode(mathMode) {
        return this.latexRegex.mathMode.test(mathMode);
    }
    /**
     * validateSubscriptSuperscript
     *
     * Validates the syntax of a given subscript or superscript.
     *
     * @method validateSubscriptSuperscript
     * @param {string} subscriptSuperscript The subscript or superscript to be validated.
     * @return {boolean} True if the subscript or superscript is valid, false otherwise.
     *
     */
    validateSubscriptSuperscript(subscriptSuperscript) {
        return this.latexRegex.subscriptSuperscript.test(subscriptSuperscript);
    }
    /**
     * validateCitation
     *
     * Validates the syntax of a given citation.
     *
     * @method validateCitation
     * @param {string} citation The citation to be validated.
     * @return {boolean} True if the citation is valid, false otherwise.
     *
     */
    validateCitation(citation) {
        return this.latexRegex.citation.test(citation);
    }
    /**
     * validateUrl
     *
     * Validates the syntax of a given URL.
     *
     * @method validateUrl
     * @param {string} url The URL to be validated.
     * @return {boolean} True if the URL is valid, false otherwise.
     *
     */
    validateUrl(url) {
        return this.latexRegex.url.test(url);
    }
    /**
     * validateSection
     *
     * Validates the syntax of a given section.
     *
     * @method validateSection
     * @param {string} section The section to be validated.
     * @return {boolean} True if the section is valid, false otherwise.
     *
     */
    validateSection(section) {
        return this.latexRegex.section.test(section);
    }
    /**
     * validateFigure
     *
     * Validates the syntax of a given figure.
     *
     * @method validateFigure
     * @param {string} figure The figure to be validated.
     * @return {boolean} True if the figure is valid, false otherwise.
     *
     */
    validateFigure(figure) {
        return this.latexRegex.figure.test(figure);
    }
    /**
     * validateTable
     *
     * Validates the syntax of a given table.
     *
     * @method validateTable
     * @param {string} table The table to be validated.
     * @return {boolean} True if the table is valid, false otherwise.
     *
     */
    validateTable(table) {
        return this.latexRegex.table.test(table);
    }
    /**
     * validateLabel
     *
     * Validates the syntax of a given label.
     *
     * @method validateLabel
     * @param {string} label The label to be validated.
     * @return {boolean} True if the label is valid, false otherwise.
     *
     */
    validateLabel(label) {
        return this.latexRegex.label.test(label);
    }
    /**
     * getFraction
     *
     * Gets all the fractions from the parsed document.
     *
     * @method getFraction
     * @return {array} An array of all the fractions from the parsed document.
     *
     */
    getFraction() {
        return this.parsedDoc.value.filter(token => token.name === 'frac');
    }
    /**
     * getCommands
     *
     * Gets all the commands from the parsed document.
     *
     * @method getCommands
     * @return {array} An array of all the commands from the parsed document.
     *
     */
    getCommands() {
        return this.parsedDoc.value.filter(token => token.name === 'command');
    }
    /**
     * getEnvironments
     *
     * Gets all the environments from the parsed document.
     *
     * @method getEnvironments
     * @return {array} An array of all the environments from the parsed document.
     *
     */
    getEnvironments() {
        return this.parsedDoc.value.filter(token => token.name === 'environment');
    }
    /**
     * getMathModes
     *
     * Gets all the math modes from the parsed document.
     *
     * @method getMathModes
     * @return {array} An array of all the math modes from the parsed document.
     *
     */
    getMathModes() {
        return this.parsedDoc.value.filter(token => token.name === 'math');
    }
    /**
     * getSubscriptSuperscript
     *
     * Gets all the subscripts and superscripts from the parsed document.
     *
     * @method getSubscriptSuperscript
     * @return {array} An array of all the subscripts and superscripts from the parsed document.
     *
     */
    getSubscriptSuperscript() {
        return this.parsedDoc.value.filter(token => token.name === 'subscript' || token.name === 'superscript');
    }
    /**
     * getCitations
     *
     * Gets all the citations from the parsed document.
     *
     * @method getCitations
     * @return {array} An array of all the citations from the parsed document.
     *
     */
    getCitations() {
        return this.parsedDoc.value.filter(token => token.name === 'citation');
    }
    /**
     * getUrls
     *
     * Gets all the URLs from the parsed document.
     *
     * @method getUrls
     * @return {array} An array of all the URLs from the parsed document.
     *
     */
    getUrls() {
        return this.parsedDoc.value.filter(token => token.name === 'url');
    }
    /**
     * getSections
     *
     * Gets all the sections from the parsed document.
     *
     * @method getSections
     * @return {array} An array of all the sections from the parsed document.
     *
     */
    getSections() {
        return this.parsedDoc.value.filter(token => token.name === 'section');
    }
    /**
     * getFigures
     *
     * Gets all the figures from the parsed document.
     *
     * @method getFigures
     * @return {array} An array of all the figures from the parsed document.
     *
     */
    getFigures() {
        return this.parsedDoc.value.filter(token => token.name === 'figure');
    }
    /**
     * getTables
     *
     * Gets all the tables from the parsed document.
     *
     * @method getTables
     * @return {array} An array of all the tables from the parsed document.
     *
     */
    getTables() {
        return this.parsedDoc.value.filter(token => token.name === 'table');
    }
    /**
     * getLabels
     *
     * Gets all the labels from the parsed document.
     *
     * @method getLabels
     * @return {array} An array of all the labels from the parsed document.
     *
     */
    getLabels() {
        return this.parsedDoc.value.filter(token => token.name === 'label');
    }
    /**
     * checkSyntax
     *
     * Checks the syntax of a given LaTeX document, or the document passed to the constructor.
     *
     * @method checkSyntax
     * @param {string} latexDoc The LaTeX document to be checked.
     * @return {array} An array of the valid syntax from the given document.
     *
     */
    checkSyntax(latexDoc = undefined) {
        const latexDocText = latexDoc || this.latexDoc;
        if (this.validateFraction(latexDocText)) {
            return this.getFraction();
        }
        if (this.validateEnvironment(latexDocText)) {
            return this.getEnvironments();
        }
        if (this.validateMathMode(latexDocText)) {
            return this.getMathModes();
        }
        if (this.validateSubscriptSuperscript(latexDocText)) {
            return this.getSubscriptSuperscript();
        }
        if (this.validateCitation(latexDocText)) {
            return this.getCitations();
        }
        if (this.validateUrl(latexDocText)) {
            return this.getUrls();
        }
        if (this.validateSection(latexDocText)) {
            return this.getSections();
        }
        if (this.validateFigure(latexDocText)) {
            return this.getFigures();
        }
        if (this.validateTable(latexDocText)) {
            return this.getTables();
        }
        if (this.validateLabel(latexDocText)) {
            return this.getLabels();
        }

        if (this.validateCommand(latexDocText)) {
            return this.getCommands();
        }
        else {
            console.log(`Invalid latexDocText "${latexDocText}". Please specify a valid syntax type.`);
            return latexDocText;
        }
    }
}

export default LatexParser;

// let latex = "\\frac{1}{x^2}";
// let parser = new LatexParser(latex);
// const results = parser.checkSyntax()
// console.dir(JSON.stringify(results, null, 2));
