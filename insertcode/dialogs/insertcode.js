(function() {

var pluginName = "insertcode";

CKEDITOR.dialog.add(pluginName, function(editor) {
    return {
        title: editor.lang[pluginName].label,
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
                preElement = new CKEDITOR.dom.element("pre");
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
                        rows: 22,
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
    return className;
}

function getOptions(className) {
    var options = defaults();
    var match = className.match(/lang-([a-z]+)/)
    if (match) options.lang = match[1].toLowerCase();
    return defaults;
}

})();
