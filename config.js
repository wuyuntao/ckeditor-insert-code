CKEDITOR.editorConfig = function(config) {

    config.extraPlugins = 'insertcode';

    config.keystrokes = [
        [CKEDITOR.CTRL + 68 /*D*/, 'insertcode'],
    ];

    config.toolbar = 'Basic';

    config.toolbar_Basic = ['InsertCode'/* Other buttons ... */];
};

CKEDITOR.on('instanceReady', function(ev) {
    ev.editor.dataProcessor.writer.setRules('pre', {
        breakBeforeOpen : true,
        breakAfterOpen : false,
        breakBeforeClose : false,
        breakAfterClose : true
    });
});
