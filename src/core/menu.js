const electron = require('electron');
const rootDirectory = __dirname + '/../';
var template = [
	{
		label: 'ATM',
		submenu: [
			{
				label: 'MenuTest',
				accelerator: 'CmdOrCtrl+t',
				click: function(item, focusWindow) {
					console.log('---------MenuTest Start---------');
					console.log('  1. item');
					console.log(item);

					console.log('  2. focusWindow');
					console.log(focusWindow);
					console.log('---------MenuTest End---------');
				}
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function(item, focusedWindow) {
					if(focusedWindow) {
						focusedWindow.reload();
					}
				}
			},
			{
				label: 'Toggle Full Screen',
				accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
				click: function(item, focusedWindow) {
					if(focusedWindow) {
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				}
			},
			{
				label: 'Toggle Developer Tools',
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
				click: function(item, focusedWindow) {
					if(focusedWindow) {
						focusedWindow.webContents.toggleDevTools();
					}
				}
			}
		]
	},
	{
		label: 'Window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			}
		]
	},
	{
		label: 'Help',
		submenu: [
			{
				label: 'About',
				click: function(item, focusedWindow) {
					electron.dialog.showMessageBox({
						type: 'info',
						buttons: [],
						title: 'About ' + electron.app.getName(),
						icon: require('../common/global').iconPath,
						message: 'ATM은 시간 관리용 어플리케이션입니다.\n' +
								 'Version: ' + electron.app.getVersion()
					});
				}
			}
		]
	}
];

exports.createMenu = function() {

	if (process.platform === 'darwin') {
		const name = electron.app.getName();
		template.unshift({
			label: name,
			submenu: [
				{
					type: 'separator'
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide ' + name,
					accelerator: 'Command+H',
					role: 'hide'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Alt+H',
					role: 'hideothers'
				},
				{
					label: 'Show All',
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() {
						electron.app.quit();
					}
				}
			]
		});
		template[3].submenu.push(
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		);
	}

	const menu = electron.Menu.buildFromTemplate(template);
	electron.Menu.setApplicationMenu(menu);
};
