Ext.onReady(function () {
    Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        layout: 'fit',
        width: 600,
        items: Ext.create('My.panel.TabPanel')
    });

});


Ext.define('My.panel.TabPanel', {
    extend: 'Ext.tab.Panel',

    title: 'Orders',
    height: 300,
    layout: 'fit',

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                title: 'Main',
                xtype: 'grid',
                store: this.getStore(),
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
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                }],
                plugins: {
                    ptype: 'rowediting',
                    clicksToEdit: 1
                }
            }, {
                xtype: 'grid',
                store: this.getHistoryStore(),
                title: 'History',
                itemId: 'historyGrid',
                flex: 1,
                columns: [{
                    text: 'Id',
                    dataIndex: 'ID',
                    width: 30
                }, {
                    text: 'DocID',
                    dataIndex: 'DocID',
                    flex: 1
                }, {
                    text: 'Status',
                    dataIndex: 'Status',
                    editor: 'textfield',
                    flex: 1
                }, {
                    text: 'Date',
                    dataIndex: 'Date',
                    flex: 1,
                    xtype: 'datecolumn',
                    format: 'Y-m-d'
                }, {
                    text: 'Time',
                    dataIndex: 'Date',
                    flex: 1,
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                }],
                plugins: {
                    ptype: 'rowediting',
                    clicksToEdit: 1
                }
            }]
        });

        this.callParent();
    },

    getStore: function () {
        var me = this;
        return Ext.create('Ext.data.Store', {
            fields: ['ID', 'Name', 'DateCreated', 'Status', 'DateLast', 'History'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url : './app/Sample-201207.json',
                reader: {
                    type: 'json'
                }
            },
            listeners: {
                load: function (store, records) {
                    var historyRecords = [];
                    Ext.Array.each(records, function (record) {
                        Ext.Array.each(record.get('History'), function (historyRecord) {
                            historyRecords.push(historyRecord);
                        });
                    });

                    me.down('#historyGrid').getStore().loadData(historyRecords);
                }
            }
        });
    },

    getHistoryStore: function () {
        return Ext.create('Ext.data.Store', {
            fields: ['ID', 'DocID', 'Status', 'Date'],
            autoLoad: true
        });
    }

});
