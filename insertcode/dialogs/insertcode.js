(function() {

var pluginName = "insertcode";

CKEDITOR.dialog.add(pluginName, function(editor) {
    return {
        title: editor.lang[pluginName].label,
        resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
        minWidth: 500,
        minHeight: 300,
        onShow: function() {
            var editor = this.getParentEditor(),
                selection = editor.getSelection(),
                startElement = selection && selection.getStartElement(),
                preElement = startElement && startElement.getAscendant("pre", true),
                className = "",
                options = null;
            if (preElement) {
                options = getOptions(preElement.getAttribute("class"));
                options.code = unescapeHTML(preElement.getHtml());
            } else {
                options = defaults();
            }
            this.setupContent(options);
        },
        onOk: function() {
            var editor = this.getParentEditor(),
                selection = editor.getSelection(),
                startElement = selection && selection.getStartElement(),
                preElement = startElement && startElement.getAscendant("pre", true),
                options = defaults();
            this.commitContent(options);
            var className = getClassName(options);
            if (preElement) {
                preElement.setAttribute("class", className);
                preElement.setText(options.code);
            } else {
                preElement = new CKEDITOR.dom.element("pre", editor.document);
                preElement.setAttribute("class", className);
                preElement.setText(options.code);
                editor.insertElement(preElement);
            }
        },
        contents: [
            {
                id: "source",
                label: editor.lang[pluginName].sourceTab,
                elements: [
                    {
                        type: "textarea",
                        id: "insert_code_textarea",
                        rows: 15,
                        style: "width: 100%",
                        setup: function(editor) {
                            if (editor.code) this.setValue(editor.code);
                        },
                        commit: function(editor) {
                            editor.code = this.getValue();
                        }
                    }
                ]
            }
        ]
    };
});

var defaults = function() {
    return {
        linenums: 1,
        lang: null,
        code: ""
    };
};

function unescapeHTML(str) {
    return str.replace(/<br>/g, "\n")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"');
}

function getClassName(options) {
    var className = "prettyprint";
    if (options.lang) className += " lang-" + options.lang.toLowerCase();
    if (options.linenums) className += " linenums:" + options.linenums;
    return className;
}

function getOptions(className) {
    var options = defaults();
    if (!className) return options;
    var match = className.match(/lang-([a-z]+)/);
    if (match) options.lang = match[1].toLowerCase();
    var match = className.match(/linenums:([0-9]+)/);
    if (match) options.linenums = match[1];
    return options;
}

})();
