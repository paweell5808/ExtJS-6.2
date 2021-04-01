Ext.onReady(function () {

    var getStore = function () {
        return Ext.create('Ext.data.Store', {
            fields: ['ID', 'Name', 'DateCreated', 'Status', 'DateLast'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url : './app/Sample-201207.json',
                reader: {
                    type: 'json'
                }
            }
        });
    };

    Ext.create('Ext.panel.Panel', {
        title: 'Simple panel with grid',
        width: 500,
        height: 300,
        layout: 'fit',
        items: [{
            xtype: 'grid',
            store: getStore(),
            flex: 1,
            columns: [{
                text: 'Id',
                dataIndex: 'ID',
                width: 30
            }, {
                text: 'Name',
                dataIndex: 'Name',
                editor: 'textfield',
                flex: 1
            }, {
                text: 'DateCreated',
                dataIndex: 'DateCreated',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                editor: 'datefield',
                flex: 1
            }, {
                text: 'Status',
                dataIndex: 'Status',
                editor: 'textfield',
                flex: 1
            }, {
                text: 'DateLast',
                dataIndex: 'DateLast',
                flex: 1,
                xtype: 'datecolumn',
                format: 'Y-m-d'
            }, {
                text: 'TimeLast',
                dataIndex: 'DateLast',
                flex: 1,
                xtype: 'datecolumn'
            }],
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 1
            }
        }],
        renderTo: Ext.getBody()
    });

});
