var g_phrases = new Array();
var g_phrasesToLocalize = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, ' +
						  '31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, ' +
						  '61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, ' +
						  '91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, ' +
						  '121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146,147, 148, 149, 150, ' +
						  '151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, ' +
						  '181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 203, 204, 207, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, ' +
						  '251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, ' +
						  '308, 309, 310, 311, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337';
var g_currentYear = 2014;

function getPhrase(id) {
	return g_phrases[id] === undefined ? '' : g_phrases[id];
};

function guid() {
	var s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	return s4 + s4 + s4 + "-4" + s4.substr(0,3) + s4 + s4 + s4 + s4;
};

function TClickWrapper(id, callback) {
	var m_callback = callback;
	var m_id       = id;
	
	this.onClick = function() {
		callback(m_id);
	};
};

function TTestWindow() {
	var m_btnClose   = new TButton('Close');
	var m_imgRotater = null;
	var m_window     = createWindow('Test');
	
	var onClose = function() {
		hideModal();
	};
	
	this.show = function() {
		showModal(m_window);
	};
	
	var imgs = new Array();
	imgs.push('media/3F392C72D20DDCB6E320C5077A64EFA4.jpg');
	imgs.push('media/6F32B6C2B4F494C8D356C68AFB2289D7.jpg');
	imgs.push('media/7EC12AB3605BAA43B3C96D783381A581.jpg');
	imgs.push('media/86BA6DB4E046E303EACD2EC2B4EFFCD3.jpg');
	m_imgRotater = new TImageRotater(imgs, 500, 275, 3);
	
	m_btnClose.setOnClick(onClose);
	m_window.add(m_imgRotater);
	m_window.add(m_btnClose);
};

function main() {
	var m_languageWindow = null;

	var onRequestOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('SessionId');
		var languages = new Array();
		
		if (elements.length == 1) {
			g_sessionId = elements[0].firstChild.nodeValue;
			
			if (!m_languageWindow) {
				elements = xmlDoc.getElementsByTagName('Language');
			
				for (var i = 0; i < elements.length; i++) {
					var nodes = elements[i].childNodes;

					if (nodes.length == 3) {
						if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null && nodes.item(2).firstChild != null && nodes.item(2).firstChild.nodeValue != null) {
							languages.push({ id: nodes.item(0).firstChild.nodeValue, code: nodes.item(2).firstChild.nodeValue, path: nodes.item(1).firstChild.nodeValue });
						}
					}
				}

				m_languageWindow = new TLanguageWindow(languages);
			}

			m_languageWindow.show();
		}
	};
	
	var onRequestError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(8));
	};

	TAjax.sendRequest(null, 'serverscripts/GetSessionId.php', null, onRequestOk, onRequestError);
};

function TLanguageWindow(languages) {
	var m_imageButtons = new Array();
	var m_imgSystem    = new TImage('images/metsys.png', 276, 33);
	var m_layFlags     = new THorizontalLayout();
	var m_layMain      = new THorizontalLayout();
	var m_window       = createWindow('HelixT (Content Management System)', null, null, null, 'HelixT (c) ' + g_currentYear);
	var m_wndSignIn    = null;

	var onClick = function(language) {
		var request = new TRequest();

		request.add('LanguageId', language.id);
		request.add('Phrases', g_phrasesToLocalize);

		TAjax.sendRequest(null, 'serverscripts/GetLocalizedPhrases.php', request.getRequest(), onLocalizationOk, onLocalizationError);
		
		TLang.setLanguage(language.code.toLowerCase());
	};
	
	var onLocalizationError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(9));
	};
	
	var onLocalizationOk = function(xmlDoc, xmlText) {
		var elements = xmlDoc.getElementsByTagName('Phrase');

		for (var i = 0; i < elements.length; i++) {
			var nodes = elements[i].childNodes;

			if (nodes.length == 2) {
				if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
					g_phrases[nodes.item(0).firstChild.nodeValue] = nodes.item(1).firstChild.nodeValue;
				}
			}
		}

		if (!m_wndSignIn) {
			m_wndSignIn = new TSignInWindow();
		}

		for (var i = 0; i < languages.length; i++) {
			m_imageButtons[i].disable();
		}

		hideModal();
		m_wndSignIn.show();
	};

	this.show = function() {
		showModal(m_window);
	};
	
	m_layFlags.setDirection(TLang.getDirection());
	
	for (var i = 0; i < languages.length; i++) {
		m_imageButtons[i] = new TImageButton(64, 64, languages[i].path);
		m_imageButtons[i].setOnClick((new TClickWrapper(languages[i], onClick)).onClick);
		
		m_layFlags.add(m_imageButtons[i]);
	}
	
	m_layMain.setDirection(TLang.getDirection());
	m_layMain.add(m_layFlags);
	m_layMain.add(new THorizontalDelimiter(20));
	m_layMain.add(new TImage('images/Robot/abc.png', 143, 108));

	m_window.add(m_imgSystem);
	m_window.add(m_layMain);
};

function TSignInWindow(resetPasswordWindow, registrationWindow) {
	var m_btnSignIn   = new TButton(getPhrase(10));
	var m_layData     = new TVerticalLayout();
	var m_layForm     = new TFormLayout();
	var m_layMain     = new THorizontalLayout();
	var m_vldUsername = new TValidatableTextBox(250, new TEmptyValidator());
	var m_vldPassword = new TValidatableTextBox(250, new TEmptyValidator(), true);
	var m_window      = createWindow(getPhrase(10));
	var m_wndMain     = null;

	var onSignInClick = function() {
		var request = new TRequest();

		request.add('Username', m_vldUsername.getValue());
		request.add('Password', m_vldPassword.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/SignIn.php', request.getRequest(), onSignInOk, onSignInError);
	};

	var onSignInError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(13));
	};
	
	var onSignInOk = function(xmlDoc) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			if (!m_wndMain) {
				m_wndMain = new TMainWindow();
			}

			hideModal();
			m_wndMain.show();
		} else {
			onSignInError();
		}
	};

	var validateButton = function() {
		if (m_vldPassword.isValid() && m_vldUsername.isValid()) {
			m_btnSignIn.enable();
		} else {
			m_btnSignIn.disable();
		}
	};

	this.show = function() {
		m_vldUsername.setValue('mgr');
		m_vldPassword.setValue('t123');
		showModal(m_window);
	};

	m_btnSignIn.disable();
	m_btnSignIn.setOnClick(onSignInClick);
	m_layForm.setDirection(TLang.getDirection());
	m_layData.add(m_layForm);
	m_layData.add(new TVerticalDelimiter(5));
	m_layData.add(m_btnSignIn);
	m_layForm.add(new TText(getPhrase(11)), m_vldUsername);
	m_layForm.add(new TText(getPhrase(12)), m_vldPassword);
	m_layMain.setDirection(TLang.getDirection());
	m_layMain.add(new TImage('images/Robot/login.png', 204, 120));
	m_layMain.add(m_layData);
	m_vldPassword.setMaxLength(20);
	m_vldPassword.setOnValidationChanged(validateButton);
	m_vldUsername.setMaxLength(20);
	m_vldUsername.setOnValidationChanged(validateButton);
	m_window.add(m_layMain);
};

function TMainWindow() {
	var m_btnArticlesManager = new TImageButton(128, 128, 'images/main/article.png');
	var m_btnContentsManager = new TImageButton(128, 128, 'images/main/contents.jpg');
	var m_btnContentTypes    = new TImageButton(128, 128, 'images/main/content types.png');
	var m_btnFolders         = new TImageButton(128, 128, 'images/main/folders.png');
	var m_btnGroups          = new TImageButton(128, 128, 'images/main/g & p.jpg');
	var m_btnLocalization    = new TImageButton(128, 128, 'images/main/localization.png');
	var m_btnMediaManager    = new TImageButton(128, 128, 'images/main/media.png');
	var m_btnTest            = new TButton('Test');
	var m_btnUsers           = new TImageButton(128, 128, 'images/main/users.png');
	var m_layArticlesManager = new TVerticalLayout();
	var m_layContentsManager = new TVerticalLayout();
	var m_layContentTypes    = new TVerticalLayout();
	var m_layFolders         = new TVerticalLayout();
	var m_layGroups          = new TVerticalLayout();
	var m_layLocalization    = new TVerticalLayout();
	var m_layMain            = new TGridLayout(3, 3);
	var m_layMediaManager    = new TVerticalLayout();
	var m_layUsers           = new TVerticalLayout();
	var m_window             = createWindow(getPhrase(335));
	var m_wndArticlesManager = null;
	var m_wndContentsManager = null;
	var m_wndContentTypes    = null;
	var m_wndFolders         = null;
	var m_wndGroups          = null;
	var m_wndLocalization    = null;
	var m_wndMediaManager    = null;
	var m_wndTest            = null;
	var m_wndUsers           = null;
	 
	var onArticlesManagerClick = function() {
		if (!m_wndArticlesManager) {
			m_wndArticlesManager = new TArticlesWindow();
		}

		m_wndArticlesManager.show();
	};
	
	var onContentsManagerClick = function() {
		if (!m_wndContentsManager) {
			m_wndContentsManager = new TContentsWindow();
		}

		m_wndContentsManager.show();
	};
	
	var onContentTypesClick = function() {
		if (!m_wndContentTypes) {
			m_wndContentTypes = new TContentTypesWindow();
		}

		m_wndContentTypes.show();
	};
	
	var onFoldersClick = function() {
		if (!m_wndFolders) {
			m_wndFolders = new TFoldersWindow();
		}

		m_wndFolders.show();
	};
	
	var onGroupsClick = function() {
		if (!m_wndGroups) {
			m_wndGroups = new TGroupsWindow();
		}

		m_wndGroups.show();
	};
	
	var onLocalizationClick = function() {
		if (!m_wndLocalization) {
			m_wndLocalization = new TLocalizationWindow();
		}

		m_wndLocalization.show();
	};
	
	var onMediaManagerClick = function() {
		if (!m_wndMediaManager) {
			m_wndMediaManager = new TFinderWindow('serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php', null, null, 'serverscripts/SaveImage.php');
		}

		m_wndMediaManager.show();
	};
	
	var onTestClick = function() {
		if (!m_wndTest) {
			m_wndTest = new TTestWindow();
		}

		m_wndTest.show();
	};
	
	var onUsersClick = function() {
		if (!m_wndUsers) {
			m_wndUsers = new TUsersWindow();
		}

		m_wndUsers.show();
	};

	this.show = function() {
		showModal(m_window);
	};
	
	m_btnArticlesManager.setOnClick(onArticlesManagerClick);
	m_btnContentsManager.setOnClick(onContentsManagerClick);
	m_btnContentTypes.setOnClick(onContentTypesClick);
	m_btnFolders.setOnClick(onFoldersClick);
	m_btnGroups.setOnClick(onGroupsClick);
	m_btnLocalization.setOnClick(onLocalizationClick);
	m_btnMediaManager.setOnClick(onMediaManagerClick);
	m_btnUsers.setOnClick(onUsersClick);
	m_btnTest.setOnClick(onTestClick);
	
	m_layArticlesManager.add(m_btnArticlesManager);
	m_layArticlesManager.add(new TText(getPhrase(237)));
	m_layContentTypes.add(m_btnContentTypes);
	m_layContentTypes.add(new TText(getPhrase(166)));
	m_layContentsManager.add(m_btnContentsManager);
	m_layContentsManager.add(new TText(getPhrase(285)));
	m_layFolders.add(m_btnFolders);
	m_layFolders.add(new TText(getPhrase(114)));
	m_layGroups.add(m_btnGroups);
	m_layGroups.add(new TText(getPhrase(50)));
	m_layLocalization.add(m_btnLocalization);
	m_layLocalization.add(new TText(getPhrase(17)));
	m_layMediaManager.add(m_btnMediaManager);
	m_layMediaManager.add(new TText(getPhrase(207)));
	m_layUsers.add(m_btnUsers);
	m_layUsers.add(new TText(getPhrase(51)));
	
	m_layMain.setCell(0, 0, m_layUsers);
	m_layMain.setCell(1, 0, m_layGroups);
	m_layMain.setCell(2, 0, m_layLocalization);
	m_layMain.setCell(0, 1, m_layFolders);
	m_layMain.setCell(1, 1, m_layContentTypes);
	m_layMain.setCell(0, 2, m_layMediaManager);
	m_layMain.setCell(1, 2, m_layArticlesManager);
	m_layMain.setCell(2, 2, m_layContentsManager);
	
	m_window.add(m_layMain);
	m_window.add(m_btnTest);
	m_window.getLayout().setPadding(15);
};

function TAddArticleWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_ddlDay      = new TDropdownList();
	var m_ddlMonth    = new TDropdownList();
	var m_ddlYear     = new TDropdownList();
	var m_layCommands = new THorizontalLayout();
	var m_layDate     = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_teArticle   = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
	var m_vtbTitle    = new TValidatableTextBox(300, new TEmptyValidator());
	var m_window      = createWindow(getPhrase(233));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(234), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(235));
	};

	var onAddedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
		
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(236), onCompleted);
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('Title', m_vtbTitle.getValue());
		request.add('PublishDate', m_ddlYear.getText() + '-' + m_ddlMonth.getText() + '-' + m_ddlDay.getText());
		request.add('Article', m_teArticle.getContent());
		TAjax.sendRequest(m_window, 'serverscripts/AddArticle.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var validateAddButton = function() {
		if (m_vtbTitle.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		m_btnAdd.disable();
		m_vtbTitle.setValue('');
		m_teArticle.clear();
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	
	for (var i = 1; i <= 31; i++) {
		m_ddlDay.add(i, i);
	};
	m_ddlDay.setSelectedId(1);
	for (var i = 1; i <= 12; i++) {
		m_ddlMonth.add(i, i);
	};
	m_ddlMonth.setSelectedId(1);
	for (var i = 1990; i <= parseInt(g_currentYear); i++) {
		m_ddlYear.add(i, i);
	};
	m_ddlYear.setSelectedId(1990);
	m_layDate.setDirection(TLang.getDirection());
	m_layDate.add(m_ddlDay);
	m_layDate.add(m_ddlMonth);
	m_layDate.add(m_ddlYear);
	
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(204) + ':'), m_vtbTitle);
	m_layForm.add(new TText(getPhrase(229) + ':'), m_layDate);
	m_vtbTitle.setOnValidationChanged(validateAddButton);
	m_vtbTitle.setMaxLength(100);

	m_window.add(m_layForm);
	m_window.add(new TText(getPhrase(228) + ':'));
	m_window.add(m_teArticle);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddCommentWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_parentId    = 0;
	var m_tbComment   = new TValidatableTextBox(300, new TEmptyValidator());
	var m_window      = createWindow(getPhrase(255));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(256), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(257));
	};

	var onAddedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
		
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(258), onCompleted);
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('ParentId', m_parentId);
		request.add('Comment', m_tbComment.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/AddComment.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var validateAddButton = function() {
		if (m_tbComment.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function(parentId) {
		m_parentId = parentId;
		m_btnAdd.disable();
		m_tbComment.setValue('');
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tbComment.setOnValidationChanged(validateAddButton);
	
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(252)), m_tbComment);

	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddContentWindow(properties, callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_typeId      = 0;
	var m_window      = createWindow(getPhrase(279));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(282), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(283));
	};

	var onAddedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
		
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(284), onCompleted);
		} else {
			onAddedError('');
		}
	};
	
	var onClientFileSelected = function(files, index) {
		if (files.length > 0) {
			properties[index].component[0].fileText.setText(files[0].name + ' (' + (files[0].size / 1024) + ' KB)');
			properties[index].component[0].fileSelected = true;
			m_window.refresh();
			validateAddButton();
		} else {
			properties[index].component[0].fileText.setText(TLang.translate('noFileSelected') + '.');
			properties[index].component[0].fileSelected = false;
		}
	};
	
	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();
		var xmlValues = '<Properties>';
		
		for (var i = 0; i < properties.length; i++) {
			xmlValues += '<Property>';
			xmlValues += '<PropertyId>' + properties[i].id + '</PropertyId>';
			if (properties[i].componentName == "TValidatableTextBox" || properties[i].componentName == "TTextBox") {
				xmlValues += '<Value>' + properties[i].component.getValue() + '</Value>';
				if (properties[i].isText) {
					xmlValues += '<SaveTo>PhraseTranslation</SaveTo>';
				} else {
					xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
				}
			} else if (properties[i].componentName == "TDropdownList" || properties[i].componentName == "TScrollableDropdownList") {
				xmlValues += '<Value>' + properties[i].component.getSelectedId() + '</Value>';
				if (properties[i].isText) {
					xmlValues += '<SaveTo>ContentProperties Id</SaveTo>';
				} else {
					xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
				}
			} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor") {
				xmlValues += '<Value><![CDATA[' + properties[i].component.getContent() + ']]></Value>';
				xmlValues += '<SaveTo>ContentTranslation</SaveTo>';
			} else if (properties[i].componentName == "TSlider") {
				xmlValues += '<Value>' + properties[i].component.getValue() + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "TCheckBox") {
				var val = (properties[i].component.isChecked()) ? 1 : 0;
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "THorizontalLayout Date") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText();
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "THorizontalLayout Date Time") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText() + ' ' + properties[i].component[3].getText() + ':' + properties[i].component[4].getText() + ':' + properties[i].component[5].getText();
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "TFileUploader") {
				xmlValues += '<Value>' + properties[i].component[0].url + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			}
			xmlValues += '</Property>';
		}
		xmlValues += '</Properties>';
		
		request.add('TypeId', m_typeId);
		request.add('XMLValues', xmlValues, false);
		TAjax.sendRequest(m_window, 'serverscripts/AddContent.php', request.getRequest(), onAddedOk, onAddedError);
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onFileUpload = function(index) {
		if (properties[index].component[0].fileSelected) {
			properties[index].component[0].fileUploader.upload('serverscripts/UploadFile.php', function(response) { onFileUploaded(response, index); }, properties[index].component[0].folder + ';' + g_sessionId);
		}
	};
	
	var onFileUploaded = function(response, index) {
		var xmlDoc = loadXMLString(response);
		var url = getSimpleTagValue(xmlDoc, 'url');
		if (url != undefined && url != null && url != '') {
			properties[index].component[0].fileUploaded = true;
			properties[index].component[0].url = url;
			properties[index].component[0].fileText.setText(TLang.translate('uploaded'));
			validateAddButton();
		} else {
			properties[index].component[0].fileUploaded = false;
			properties[index].component[0].url = '';
			properties[index].component[0].fileText.setText(TLang.translate('error'));
		}
		m_window.refresh();
	};
	
	var validateAddButton = function() {
		var valid = true;
		for (var i = 0; i < properties.length; i++) {
			if (properties[i].componentName == "TValidatableTextBox" && !properties[i].component.isValid()) {
				valid = false;
				break;
			} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor" && parseInt(properties[i].required) == 1) {
				if (properties[i].component.getContent() == '') {
					valid = false;
					break;
				}
			} else if (properties[i].componentName == "TFileUploader" && parseInt(properties[i].required) == 1) {
				if (!properties[i].component[0].fileUploaded) {
					valid = false;
					break;
				}
			}
		}
		if (valid) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function(typeId) {
		m_typeId = typeId;
		m_btnAdd.disable();
		showModal(m_window);
	};
	
	m_layForm.setDirection(TLang.getDirection());
	for (var i = 0; i < properties.length; i++) {
		if (properties[i].componentName == "TValidatableTextBox") {
			properties[i].component.setValue('');
			properties[i].component.setOnValidationChanged(validateAddButton);
		} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor" && parseInt(properties[i].required) == 1) {
			properties[i].component.setOnValidation(validateAddButton);
		} else if (properties[i].componentName == "TTextBox") {
			properties[i].component.setValue('');
		} else if (properties[i].componentName == "TDropdownList") {
			properties[i].component.setSelectedFirst();
		} else if (properties[i].componentName == "TScrollableDropdownList") {
			properties[i].component.setSelectedFirst();
			properties[i].component.update();
		} else if (properties[i].componentName == "TFileUploader") {
			var layFile = new THorizontalLayout();
			var btnUpload = new TButton(TLang.translate('uploadToServer'));
			var j = i;
			layFile.setDirection(TLang.getDirection());
			
			properties[i].component[0].fileUploader.setOnClick(function(files) { onClientFileSelected(files, j); });
			btnUpload.setOnClick(function() { onFileUpload(j); });
			
			layFile.add(properties[i].component[0].fileUploader);
			layFile.add(properties[i].component[0].fileText);
			layFile.add(btnUpload);
			m_layForm.add(new TText(properties[i].title), layFile);
			continue;
		} else if (properties[i].componentName == "THorizontalLayout Date") {
			var layDate = new THorizontalLayout();
			layDate.setDirection(TLang.getDirection());
			layDate.add(properties[i].component[0]);
			layDate.add(properties[i].component[1]);
			layDate.add(properties[i].component[2]);
			m_layForm.add(new TText(properties[i].title), layDate);
			continue;
		} else if (properties[i].componentName == "THorizontalLayout Date Time") {
			var layDate = new THorizontalLayout();
			layDate.setDirection(TLang.getDirection());
			layDate.add(properties[i].component[0]);
			layDate.add(properties[i].component[1]);
			layDate.add(properties[i].component[2]);
			layDate.add(new TText(' '));
			layDate.add(properties[i].component[3]);
			layDate.add(properties[i].component[4]);
			layDate.add(properties[i].component[5]);
			m_layForm.add(new TText(properties[i].title), layDate);
			continue;
		}
		m_layForm.add(new TText(properties[i].title), properties[i].component);
	}

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddEntityPropertyWindow(callback) {
	var m_brkLayout   = new TBrick();
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_btnDelete   = new TButton(getPhrase(57));
	var m_btnSelect   = new TButton(getPhrase(191) + '...');
	var m_chkgAccept  = new TCheckBoxGroup('Multi', getPhrase(325), TLang.getDirection());
	var m_chkManual   = new TCheckBox(getPhrase(183));
	var m_chkRequired = new TCheckBox('');
	var m_ddlAuto     = new TDropdownList();
	var m_ddlBase     = new TDropdownList();
	var m_ddlCompo    = new TDropdownList();
	var m_ddlFolders  = new TDropdownList();
	var m_ddlManual   = new TDropdownList();
	var m_ddlTypes    = new TDropdownList();
	var m_entityId    = 0;
	var m_layCommands = new THorizontalLayout();
	var m_layDropDown = new TVerticalLayout();
	var m_layForm     = new TFormLayout();
	var m_layManual   = new THorizontalLayout();
	var m_layRandoom  = new THorizontalLayout();
	var m_laySlider   = new TFormLayout();
	var m_layUploader = new THorizontalLayout();
	var m_manualVals  = null;
	var m_txtAuto     = new TText(getPhrase(185));
	//var m_txtManual   = new TText(getPhrase(184));
	var m_vtbMaxValue = new TValidatableTextBox(60, new TNumberValidator());
	var m_vtbMinValue = new TValidatableTextBox(60, new TNumberValidator());
	var m_vtbName     = new TValidatableTextBox(300, new TEmptyValidator());
	var m_vtbStep     = new TValidatableTextBox(60, new TNumberValidator());
	var m_window      = createWindow(getPhrase(139));
	var m_wndTrans    = null;

	var hideLayouts = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.hide();
	};
	
	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(140), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(141));
	};

	var onAddedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
		
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(142), onCompleted);
		} else {
			onAddedError('');
		}
	};
	
	var onCompleted = function() {
		hideModal();
		hideLayouts();
		callback();
	};

	var onDeleteClick = function() {
		if (m_ddlManual.getText() != '') {
			m_ddlManual.remove(m_ddlManual.getSelectedId());
			if (m_ddlManual.getItemsIds().length > 0) {
				m_ddlManual.setSelectedFirst();
			} else {
				m_ddlManual.clear();
			}
		
			onCloseClick();
			showModal(m_window);
			onSelectedComponentChanged();
			onSelectedPhraseValueChanged();
		}
	};

	var onDoAdd = function() {
		var request = new TRequest();
		var descXML = '<Root></Root>';
		
		if (m_ddlCompo.getText() == getPhrase(174) && m_ddlTypes.getSelectedId() != 155 && m_ddlTypes.getSelectedId() != 156) {
			if (m_chkManual.isChecked()) {
				descXML = '<Type>Manual</Type>';
				var values = m_ddlManual.getItemsIds();
				for (var i = 0; i < values.length; i++) {
					descXML += '<Value>' + values[i] + '</Value>';
				}
			} else {
				descXML = '<Type>Auto</Type><Value>' + m_ddlAuto.getSelectedId() + '</Value>';
			}
		}
		if (m_ddlCompo.getText() == getPhrase(175)) {
			descXML = '<MinValue>' +  m_vtbMinValue.getValue() + '</MinValue>';
			descXML += '<MaxValue>' +  m_vtbMaxValue.getValue() + '</MaxValue>';
			descXML += '<Step>' +  m_vtbStep.getValue() + '</Step>';
		}
		if (m_ddlCompo.getText() == getPhrase(324)) {
			var typesIds = m_chkgAccept.getCheckedIds();
			var types = '';
			if (typesIds.length) {
				for (var i = 0; i < typesIds.length; i++) {
					if (typesIds[i].id == '*.*') {
						types = '*.*';
						break;
					}
					if (i == typesIds.length - 1) {
						types += typesIds[i].id;
					} else {
						types += typesIds[i].id + ',';
					}
				}
			} else {
				types = '*.*';
			}
			
			descXML = '<Accept>' +  types + '</Accept>';
			descXML += '<Folder>' +  m_ddlFolders.getSelectedId() + '</Folder>';
		}
		if (m_ddlTypes.getText() == getPhrase(169)) {
			descXML = '<Base>' +  m_ddlBase.getSelectedId() + '</Base>';
		}
		
		request.add('Name', m_vtbName.getValue());
		request.add('ValueType', m_ddlTypes.getSelectedId());
		request.add('ContentTypeId', m_entityId);
		request.add('ViewComponent', m_ddlCompo.getSelectedId());
		request.add('ValueDescription', descXML, false);
		request.add('Required', m_chkRequired.isChecked());
		TAjax.sendRequest(m_window, 'serverscripts/AddEntityProperty.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideLayouts();
		hideModal();
	};
	
	var onFoldersError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(122));
	};

	var onFoldersOk = function(xmlDoc) {
		m_ddlFolders.clear();

        var elements = xmlDoc.getElementsByTagName('Folder');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlFolders.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlFolders.setSelectedFirst();
	};
	
	var onManualValuesCheckChanged = function() {
		if (m_chkManual.isChecked()) {
			//m_txtManual.enable();
			m_ddlManual.enable();
			m_btnSelect.enable();
			m_txtAuto.disable();
			m_ddlAuto.disable();
			onSelectedPhraseValueChanged();
		} else {
			if (m_ddlTypes.getSelectedId() != 157) {
				//m_txtManual.disable();
				m_ddlManual.disable();
				m_btnSelect.disable();
				m_btnDelete.disable();
				m_txtAuto.enable();
				m_ddlAuto.enable();
			} else { m_chkManual.setChecked(); }
		}
		validateAddButton();
	};
	
	var onPhraseSelected = function(id, value) {
		m_ddlManual.add(id, value);
		m_ddlManual.setSelectedFirst();
		m_btnDelete.enable();
		
		onCloseClick();
		showModal(m_window);
		onSelectedComponentChanged();
	};
	
	var onPropertiesNamesError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(186));
	};
	
	var onPropertiesNamesOk = function(xmlDoc) {
		m_ddlAuto.clear();

        var elements = xmlDoc.getElementsByTagName('Row');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlAuto.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlAuto.setSelectedFirst();
	};
	
	var onSelectClick = function() {
		if (!m_wndTrans) {
			m_wndTrans = new TTranslationWindow(true, onPhraseSelected);
		}
		m_wndTrans.show();
	};
	
	var onSelectedComponentChanged = function() {
		if (m_ddlCompo.getText() == getPhrase(175)) { // Slider
			viewSliderLayout();
		} else if (m_ddlCompo.getText() == getPhrase(174) && m_ddlTypes.getSelectedId() != 155 && m_ddlTypes.getSelectedId() != 156) { // Dropdown
			viewDropDownLayout();
		} else if (m_ddlTypes.getSelectedId() == 171 && m_ddlCompo.getText() == getPhrase(324)) { // File Uploader
			viewFileUploadLayout();
		} else if (m_ddlTypes.getSelectedId() == 169) { // Random
			viewRandoomLayout();
		} else {
			hideLayouts();
		}
		validateAddButton();
	};
	
	var onSelectedPhraseValueChanged = function() {
		if (m_ddlManual.getText()!= '') {
			m_btnDelete.enable();
		} else {
			m_btnDelete.disable();
		}
	};
	
	var onSelectedTypeChanged = function() {
		m_ddlCompo.clear();
		if (m_ddlTypes.getSelectedId() == 151) { // Text
			m_ddlCompo.add(172, getPhrase(172));
			m_ddlCompo.add(174, getPhrase(174));
		} else if (m_ddlTypes.getSelectedId() == 152) { // HTML
			m_ddlCompo.add(173, getPhrase(173));
			m_ddlCompo.add(253, getPhrase(253));
		} else if (m_ddlTypes.getSelectedId() == 153 || m_ddlTypes.getSelectedId() == 154) { // Number
			m_ddlCompo.add(172, getPhrase(172));
			m_ddlCompo.add(175, getPhrase(175));
		} else if (m_ddlTypes.getSelectedId() == 157) { // Bool
			m_ddlCompo.add(176, getPhrase(176));
		} else if (m_ddlTypes.getSelectedId() == 155 || m_ddlTypes.getSelectedId() == 156) { // Datetime
			m_ddlCompo.add(174, getPhrase(174));
		} else if (m_ddlTypes.getSelectedId() == 171) { // URL
			m_ddlCompo.add(324, getPhrase(324));
		} else {
			m_ddlCompo.add(172, getPhrase(172));
		}
		m_ddlCompo.setSelectedFirst();
		
		hideModal(m_window);
        showModal(m_window);
        
        onSelectedComponentChanged();
	};

	var validateAddButton = function() {
		m_btnAdd.disable();
		if (m_vtbName.isValid()) {
			if (m_ddlCompo.getText() == getPhrase(174) && m_ddlTypes.getSelectedId() != 155 && m_ddlTypes.getSelectedId() != 156) {
				if (m_chkManual.isChecked()) {
					if (m_ddlManual.getText() != '') {
						m_btnAdd.enable();
					}
				} else {
					m_btnAdd.enable();
				}
			} else if (m_ddlCompo.getText() == getPhrase(175)) {
				if (m_vtbMaxValue.isValid() && m_vtbMinValue.isValid() && m_vtbStep.isValid()) {
					m_btnAdd.enable();
				}
			} else {
				m_btnAdd.enable();
			}
		}
	};
	
	var viewDropDownLayout = function() {
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.hide();
		m_layDropDown.setOrder(m_brkLayout.getOrder());
		m_layDropDown.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_layDropDown.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_layDropDown.show();
	};
	
	var viewFileUploadLayout = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.setOrder(m_brkLayout.getOrder());
		m_layUploader.move(m_brkLayout.getX(), m_brkLayout.getY());
		m_layUploader.show();
	};
	
	var viewRandoomLayout = function() {
		m_layDropDown.hide();
		m_laySlider.hide();
		m_layUploader.hide();
		m_layRandoom.setOrder(m_brkLayout.getOrder());
		m_layRandoom.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_layRandoom.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_layRandoom.show();
	};
	
	var viewSliderLayout = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_layUploader.hide();
		m_laySlider.setOrder(m_brkLayout.getOrder());
		m_laySlider.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_laySlider.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_laySlider.show();
	};
	
	this.show = function(entityId) {
		var request1 = new TRequest();
		request1.add('ContentTypeId', entityId);
		
		var request2 = new TRequest();
		
		m_entityId = entityId;
		m_btnAdd.disable();
		m_btnDelete.disable();
		m_ddlManual.clear();
		m_vtbMaxValue.setValue('');
		m_vtbMinValue.setValue('');
		m_vtbName.setValue('');
		m_vtbStep.setValue('');
		showModal(m_window);
		
		TAjax.sendRequest(m_window, 'serverscripts/GetPropertiesNames.php', request1.getRequest(), onPropertiesNamesOk, onPropertiesNamesError);
		TAjax.sendRequest(m_window, 'serverscripts/GetFoldersList.php', request2.getRequest(), onFoldersOk, onFoldersError);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_btnSelect.setOnClick(onSelectClick);
	m_chkgAccept.add('image/*', getPhrase(192));
	m_chkgAccept.add('video/*', getPhrase(194));
	m_chkgAccept.add('audio/*', getPhrase(193));
	m_chkgAccept.add('application/pdf', getPhrase(326));
	m_chkgAccept.add('application/x-shockwave-flash', getPhrase(327));
	m_chkgAccept.add('text/css', getPhrase(328));
	m_chkgAccept.add('text/html', getPhrase(329));
	m_chkgAccept.add('application/xml', getPhrase(330));
	m_chkgAccept.add('*.*', getPhrase(331));
	m_layUploader.setDirection(TLang.getDirection());
	m_layUploader.add(m_chkgAccept);
	m_layUploader.add(new TText(getPhrase(332)));
	m_layUploader.add(m_ddlFolders);
	m_ddlBase.add(10, '10');
	m_ddlBase.add(100, '100');
	m_ddlBase.add(1000, '1000');
	m_ddlBase.add(100000, '100000');
	m_ddlBase.add(1000000, '1000000');
	m_ddlBase.add(1000000000, '1000000000');
	m_ddlBase.setSelectedFirst();
	m_layRandoom.setDirection(TLang.getDirection());
	m_layRandoom.add(new TText(getPhrase(333)));
	m_layRandoom.add(m_ddlBase);
	m_ddlCompo.add(172, getPhrase(172));
	m_ddlCompo.add(174, getPhrase(174));
	m_ddlCompo.setSelectedFirst();
	m_ddlCompo.setOnChange(onSelectedComponentChanged);
	m_ddlManual.setOnChange(onSelectedPhraseValueChanged);
	m_ddlTypes.add(151, getPhrase(151));
	m_ddlTypes.add(12, getPhrase(12));
	m_ddlTypes.add(152, getPhrase(152));
	m_ddlTypes.add(153, getPhrase(153));
	m_ddlTypes.add(154, getPhrase(154));
	m_ddlTypes.add(155, getPhrase(155));
	m_ddlTypes.add(156, getPhrase(156));
	m_ddlTypes.add(157, getPhrase(157));
	m_ddlTypes.add(169, getPhrase(169));
	m_ddlTypes.add(170, getPhrase(170));
	m_ddlTypes.add(171, getPhrase(171));
	//m_ddlTypes.add(334, getPhrase(334)); TO Do add multi choice type
	m_ddlTypes.setSelectedFirst();
	m_ddlTypes.setOnChange(onSelectedTypeChanged);
	m_chkManual.setOnChange(onManualValuesCheckChanged);
	m_chkManual.check();
	m_txtAuto.disable();
	m_ddlAuto.disable();
	m_layManual.setDirection(TLang.getDirection());
	m_layManual.add(m_ddlManual);
	m_layManual.add(m_btnDelete);
	m_layManual.add(m_btnSelect);
	m_layDropDown.add(m_chkManual);
	//m_layDropDown.add(m_txtManual);
	m_layDropDown.add(m_layManual);
	m_layDropDown.add(m_txtAuto);
	m_layDropDown.add(m_ddlAuto);
	m_laySlider.setDirection(TLang.getDirection());
	m_laySlider.add(new TText(getPhrase(179)), m_vtbMinValue);
	m_laySlider.add(new TText(getPhrase(180)), m_vtbMaxValue);
	m_laySlider.add(new TText(getPhrase(181)), m_vtbStep);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(135) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(178) + ':'), m_chkRequired);
	m_layForm.add(new TText(getPhrase(136) + ':'), m_ddlTypes);
	m_layForm.add(new TText(getPhrase(177) + ':'), m_ddlCompo);
	m_vtbMaxValue.setOnValidationChanged(validateAddButton);
	m_vtbMaxValue.setMaxLength(10);
	m_vtbMinValue.setOnValidationChanged(validateAddButton);
	m_vtbMinValue.setMaxLength(10);
	m_vtbName.setOnValidationChanged(validateAddButton);
	m_vtbName.setMaxLength(100);
	m_vtbStep.setOnValidationChanged(validateAddButton);
	m_vtbStep.setMaxLength(10);

	m_brkLayout.setHeight(m_layUploader.getHeight());
	m_brkLayout.setWidth(m_layUploader.getWidth());

	m_window.add(m_layForm);
	m_window.add(m_brkLayout);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddFolderWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_ddlParents  = new TDropdownList();
	var m_layCommands = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_vtbName     = new TValidatableTextBox(300, new TEmptyValidator());
	var m_window      = createWindow(getPhrase(117));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(118), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(119));
	};

	var onAddedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
		
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'Ok') {
			TMessageBox.showModal(getPhrase(22), getPhrase(120), onCompleted);
		} else if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'Exists') {
			TMessageBox.showModal(getPhrase(22), getPhrase(121));
			m_vtbName.setValue('');
			m_btnAdd.disable();
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('Name', m_vtbName.getValue());
		request.add('ParentId', m_ddlParents.getSelectedId());
		TAjax.sendRequest(m_window, 'serverscripts/AddFolder.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var onParentsError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(122));
	};

	var onParentsOk = function(xmlDoc) {
        m_ddlParents.clear();

        var elements = xmlDoc.getElementsByTagName('Folder');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlParents.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlParents.setSelectedFirst();

        hideModal(m_window);
        showModal(m_window);
	};

	var validateAddButton = function() {
		if (m_vtbName.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		var request = new TRequest();
		m_btnAdd.disable();
		m_vtbName.setValue('');
		showModal(m_window);
		TAjax.sendRequest(m_window, 'serverscripts/GetFoldersList.php', request.getRequest(), onParentsOk, onParentsError);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(115) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(116) + ':'), m_ddlParents);
	m_vtbName.setOnValidationChanged(validateAddButton);
	m_vtbName.setMaxLength(50);

	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddGroupWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_vtbName     = new TValidatableTextBox(300, new TEmptyValidator());
	var m_window      = createWindow(getPhrase(53));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(54), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(55));
	};

	var onAddedOk = function(xmlDoc) {
		var groupId = getSimpleTagValue(xmlDoc, 'Result');
		
		if (groupId != '') {	
			TMessageBox.showModal(getPhrase(22), getPhrase(56), onCompleted);
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('Name', m_vtbName.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/AddGroup.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var validateAddButton = function() {
		if (m_vtbName.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		m_btnAdd.disable();
		m_vtbName.setValue('');
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(52) + ':'), m_vtbName);
	m_vtbName.setOnValidationChanged(validateAddButton);
	m_vtbName.setMaxLength(50);

	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddLanguageWindow(callback) {
	var m_btnAdd          = new TButton(getPhrase(21));
	var m_btnClose        = new TButton(getPhrase(6));
	var m_formLayout      = new TFormLayout();
	var m_layCommands     = new THorizontalLayout();
	var m_tbxCode         = new TValidatableTextBox(30, new TEmptyValidator());
	var m_tbxLanguage     = new TValidatableTextBox(250, new TEmptyValidator());
	var m_window          = createWindow(getPhrase(14));

	var onAddClick = function() {
		var languageCode = trim(m_tbxCode.getValue());
		var languageName = trim(m_tbxLanguage.getValue());
		
		var request = new TRequest();

		request.add('Code', languageCode);
		request.add('Language', languageName);

		TAjax.sendRequest(m_window, 'serverscripts/AddLanguage.php', request.getRequest(), onAdded, onError);
	};
	
	var onAdded = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
			
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(23), onCompleted);
		} else {
			onError('');
		}
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onCompleted = function() {
		hideModal();
		callback();
	};
	
	var onError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(24));
	};

	var validateAdd = function() {
		if (m_tbxCode.isValid() && m_tbxLanguage.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		m_tbxCode.setValue('');
		m_tbxLanguage.setValue('');
		m_btnAdd.disable();
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);

	m_formLayout.setDirection(TLang.getDirection());
	m_formLayout.add(new TText(getPhrase(25) + ':'), m_tbxLanguage);
	m_formLayout.add(new TText(getPhrase(26) + ':'), m_tbxCode);

	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);

	m_tbxCode.setMaxLength(2);
	m_tbxCode.setOnValidationChanged(validateAdd);
	m_tbxLanguage.setMaxLength(100);
	m_tbxLanguage.setOnValidationChanged(validateAdd);

	m_window.add(m_formLayout);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddPhraseWindow(updateCallback) {
    var m_btnAdd         = new TButton(getPhrase(21));
    var m_btnReturn      = new TButton(getPhrase(6));
    var m_layCommands    = new THorizontalLayout();
    var m_tbxPhrase      = new TValidatableTextBox(400, new TEmptyValidator());
    var m_txtPhrase      = new TText(getPhrase(43) + ':');
	var m_updateCallback = updateCallback === undefined ? null : updateCallback;
    var m_window         = createWindow(getPhrase(44));

    var onAddClick = function () {
        var request = new TRequest();

        request.add('Phrase', m_tbxPhrase.getValue());
        TAjax.sendRequest(null, 'serverscripts/AddPhrase.php', request.getRequest(), onAddOk, onAddError);
    };

    var onAddError = function (text) {
        TMessageBox.showModal(getPhrase(7), getPhrase(45));
    };

    var onAddOk = function (xmlDoc) {
        var elements = xmlDoc.getElementsByTagName('Result');

        if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
            TMessageBox.showModal(getPhrase(22), getPhrase(46), onCompleted);
        } else {
            onAddError('');
        }
    };

    var onCompleted = function () {
        hideModal();
		
		if (m_updateCallback != null) {
			m_updateCallback();
		}
    };

    var onReturnClick = function () {
        hideModal();
    };

	var validateAdd = function() {
		if (m_tbxPhrase.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

    this.show = function () {
        showModal(m_window);
    };

    m_btnAdd.setOnClick(onAddClick);
    m_btnReturn.setOnClick(onReturnClick);
    m_layCommands.setDirection(TLang.getDirection());
    m_layCommands.add(m_btnAdd);
    m_layCommands.add(m_btnReturn);
    m_tbxPhrase.setDirection(TLang.getDirection());
    m_tbxPhrase.setMaxLength(100);
    m_tbxPhrase.setOnValidationChanged(validateAdd);

    m_window.add(m_txtPhrase);
    m_window.add(m_tbxPhrase);
    m_window.add(new TVerticalDelimiter(5));
    m_window.add(m_layCommands);
};

function TAddStyleWindow(callback) {
	var m_backColor            = null;
	var m_borderColor          = null;
	var m_btnChooseBackColor   = new TButton(TLang.translate('choose'));
	var m_btnChooseBorderColor = new TButton(TLang.translate('choose'));
	var m_btnOk                = new TButton(TLang.translate('ok'));
	var m_btnClose             = new TButton(getPhrase(6));
	var m_callback             = (callback === undefined || callback == null) ? null : callback;
	var m_ddlAlign             = new TDropdownList();
	var m_ddlBorderStyle       = new TDropdownList();
	var m_ddlMeasure           = new TDropdownList();
	var m_layCommands          = new THorizontalLayout();
	var m_layGrid              = new TGridLayout(5, 5);
	var m_tbBackColor          = new TTextBox(60);
	var m_tbBorderColor        = new TTextBox(60);
	var m_tbBorderSize         = new TTextBox(60);
	var m_tbHeight             = new TTextBox(60);
	var m_tbMargin             = new TTextBox(60);
	var m_tbPadding            = new TTextBox(60);
	var m_tbWidth              = new TTextBox(60);
	var m_window               = createWindow(getPhrase(83));
	var m_wndSelectColor       = null;

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(84), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(85));
	};

	var onAddedOk = function(xmlDoc) {
		var userId = getSimpleTagValue(xmlDoc, 'UserId');
		
		if (userId != '') {	
			TMessageBox.showModal(getPhrase(22), getPhrase(86), onCompleted);
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('Name', m_vtbName.getValue());
		request.add('Address', m_vtbAddress.getValue());
		request.add('Email', m_vtbEmail.getValue());
		request.add('Phone', m_vtbPhone.getValue());
		request.add('Sex', m_ddlSex.getSelectedId());
		request.add('Username', m_vtbUsername.getValue());
		request.add('Password', m_vtbPassword.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/AddUser.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var validateAddButton = function() {
		if (m_vtbAddress.isValid() && m_vtbEmail.isValid() && m_vtbName.isValid() && m_vtbPassword.isValid() && m_vtbPhone.isValid() && m_vtbUsername.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		m_btnAdd.disable();
		m_ddlSex.setSelectedFirst();
		m_vtbAddress.setValue('');
		m_vtbEmail.setValue('');
		m_vtbName.setValue('');
		m_vtbPassword.setValue('');
		m_vtbPhone.setValue('');
		m_vtbUsername.setValue('');
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_ddlSex.add(0, getPhrase(87));
	m_ddlSex.add(1, getPhrase(88));
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(73) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(74) + ':'), m_vtbEmail);
	m_layForm.add(new TText(getPhrase(89) + ':'), m_vtbAddress);
	m_layForm.add(new TText(getPhrase(81) + ':'), m_vtbPhone);
	m_layForm.add(new TText(getPhrase(90) + ':'), m_ddlSex);
	m_layForm.add(new TText(getPhrase(11) + ':'), m_vtbUsername);
	m_layForm.add(new TText(getPhrase(12) + ':'), m_vtbPassword);
	m_vtbAddress.setOnValidationChanged(validateAddButton);
	m_vtbPhone.setMaxLength(20);
	m_vtbPhone.setOnValidationChanged(validateAddButton);
	m_vtbPassword.setMaxLength(50);
	m_vtbPassword.setOnValidationChanged(validateAddButton);
	m_vtbEmail.setMaxLength(100);
	m_vtbEmail.setOnValidationChanged(validateAddButton);
	m_vtbName.setMaxLength(100);
	m_vtbName.setOnValidationChanged(validateAddButton);
	m_vtbUsername.setMaxLength(50);
	m_vtbUsername.setOnValidationChanged(validateAddButton);

	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TAddUserWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_ddlSex      = new TDropdownList();
	var m_layCommands = new THorizontalLayout();
	var m_layForm     = new TFormLayout();
	var m_vtbAddress  = new TValidatableTextBox(300, new TEmptyValidator());
	var m_vtbEmail    = new TValidatableTextBox(300, new TEmailValidator());
	var m_vtbName     = new TValidatableTextBox(300, new TEmptyValidator());
	var m_vtbPassword = new TValidatableTextBox(150, new TEmptyValidator(), true);
	var m_vtbPhone    = new TValidatableTextBox(150, new TEmptyValidator());
	var m_vtbUsername = new TValidatableTextBox(150, new TEmptyValidator());
	var m_window      = createWindow(getPhrase(83));

	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(84), onDoAdd);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(85));
	};

	var onAddedOk = function(xmlDoc) {
		var userId = getSimpleTagValue(xmlDoc, 'UserId');
		
		if (userId != '') {	
			TMessageBox.showModal(getPhrase(22), getPhrase(86), onCompleted);
		} else {
			onAddedError('');
		}
	};

	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onDoAdd = function() {
		var request = new TRequest();

		request.add('Name', m_vtbName.getValue());
		request.add('Address', m_vtbAddress.getValue());
		request.add('Email', m_vtbEmail.getValue());
		request.add('Phone', m_vtbPhone.getValue());
		request.add('Sex', m_ddlSex.getSelectedId());
		request.add('Username', m_vtbUsername.getValue());
		request.add('Password', m_vtbPassword.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/AddUser.php', request.getRequest(), onAddedOk, onAddedError);
	};

	var onCloseClick = function() {
		hideModal();
	};

	var validateAddButton = function() {
		if (m_vtbAddress.isValid() && m_vtbEmail.isValid() && m_vtbName.isValid() && m_vtbPassword.isValid() && m_vtbPhone.isValid() && m_vtbUsername.isValid()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};

	this.show = function() {
		m_btnAdd.disable();
		m_ddlSex.setSelectedFirst();
		m_vtbAddress.setValue('');
		m_vtbEmail.setValue('');
		m_vtbName.setValue('');
		m_vtbPassword.setValue('');
		m_vtbPhone.setValue('');
		m_vtbUsername.setValue('');
		showModal(m_window);
	};

	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_ddlSex.add(0, getPhrase(87));
	m_ddlSex.add(1, getPhrase(88));
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(73) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(74) + ':'), m_vtbEmail);
	m_layForm.add(new TText(getPhrase(89) + ':'), m_vtbAddress);
	m_layForm.add(new TText(getPhrase(81) + ':'), m_vtbPhone);
	m_layForm.add(new TText(getPhrase(90) + ':'), m_ddlSex);
	m_layForm.add(new TText(getPhrase(11) + ':'), m_vtbUsername);
	m_layForm.add(new TText(getPhrase(12) + ':'), m_vtbPassword);
	m_vtbAddress.setOnValidationChanged(validateAddButton);
	m_vtbPhone.setMaxLength(20);
	m_vtbPhone.setOnValidationChanged(validateAddButton);
	m_vtbPassword.setMaxLength(50);
	m_vtbPassword.setOnValidationChanged(validateAddButton);
	m_vtbEmail.setMaxLength(100);
	m_vtbEmail.setOnValidationChanged(validateAddButton);
	m_vtbName.setMaxLength(100);
	m_vtbName.setOnValidationChanged(validateAddButton);
	m_vtbUsername.setMaxLength(50);
	m_vtbUsername.setOnValidationChanged(validateAddButton);

	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TArticlesWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_chvSearch   = new TChangingValidator(new TEmptyValidator());
	var m_isBlocked   = false;
	var m_layCommands = new THorizontalLayout();
	var m_laySearch   = new THorizontalLayout();
	var m_needUpdate  = false;
	var m_vtbSearch   = new TValidatableTextBox(200, m_chvSearch);
	var m_tblArticles = new TTable(10, 'serverscripts/GetArticles.php', false);
	var m_window      = createWindow(getPhrase(231));
	
	var onAddClick = function() {
		var wndAddArticle = new TAddArticleWindow(updateArticles);
		wndAddArticle.show();
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onArticleSelected = function(articleId) {
		var wndEditArticle = new TEditArticleWindow(updateArticles);
		wndEditArticle.show(articleId, m_tblArticles.getCellByName(articleId, 'Title'), m_tblArticles.getCellByName(articleId, 'PublishDate'));
	};
	
	var onUpdateCompleted = function() {
	    m_isBlocked = false;

        if (m_needUpdate) {
			setTimeout(updateArticles, 50);
        } 
	};
	
	var updateArticles = function() {
		if (!m_isBlocked) {
			m_needUpdate = false;
			m_isBlocked = true;

	        var templateText = 'a';

	        if (trim(m_vtbSearch.getValue()) != '') {
	            templateText = m_vtbSearch.getValue();
	        }

	        m_tblArticles.setAuxiliaryParameters('<SearchTemplate>' + templateText + '</SearchTemplate>');
	        m_tblArticles.update(onUpdateCompleted);
	    } else {
	        m_needUpdate = true;
	    }
	};

	this.show = function() {
		showModal(m_window);
		updateArticles();
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_chvSearch.setCallback(updateArticles);
	m_vtbSearch.setMaxLength(100);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_laySearch.setDirection(TLang.getDirection());
	m_laySearch.add(new TText(getPhrase(232)));
	m_laySearch.add(m_vtbSearch);
	m_tblArticles.addColumn('Title', getPhrase(204), 300);
	m_tblArticles.addColumn('Author', getPhrase(230), 200);
	m_tblArticles.addColumn('PublishDate', getPhrase(229), 200);
	m_tblArticles.setOnClick(onArticleSelected);

	m_window.add(m_laySearch);
	m_window.add(m_tblArticles);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TArticleTranslationWindow(callback) {
	var m_articleId     = 0;
	var m_articleTextId = 0;
	var m_articleTo     = '';
	var m_btnClose      = new TButton(getPhrase(6));
	var m_btnTranslate  = new TButton(getPhrase(47));
	var m_chvTitleTo    = new TChangeValidator(new TEmptyValidator());  
	var m_ddlFrom       = new TDropdownList();
    var m_ddlTo         = new TDropdownList();
	var m_layCommands   = new THorizontalLayout();
	var m_layFormLeft   = new TFormLayout();
	var m_layFormRight  = new TFormLayout();
	var m_layLeft       = new TVerticalLayout();
	var m_layMain       = new THorizontalLayout();
	var m_layRight      = new TVerticalLayout();
	var m_propertyId    = 0;
	var m_tbTitleFrom   = new TTextBox(200);
	var m_teArticleFrom = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
	var m_teArticleTo   = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
	var m_titleTextId   = 0;
	var m_titleTo       = '';
	var m_vtbTitleTo    = new TValidatableTextBox(200, m_chvTitleTo); 
	var m_window        = createWindow(getPhrase(249));
	
	var onArticlesError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(248), hideModal);
	};
	
	var onArticlesOk = function(xmlDoc, text) {
		if (m_propertyId == 0) {
			m_titleTextId = parseInt(getSimpleTagValue(xmlDoc, 'TitleTextId'));
			m_tbTitleFrom.setValue(getSimpleTagValue(xmlDoc, 'TitleFrom'));
			m_titleTo = getSimpleTagValue(xmlDoc, 'TitleTo');
		} else {
			m_titleTextId = 0;
			m_tbTitleFrom.setValue('');
			m_titleTo = '';
		}
		m_chvTitleTo.setOriginalValue(m_titleTo);
		m_vtbTitleTo.setValue(m_titleTo);
		m_articleTextId = parseInt(getSimpleTagValue(xmlDoc, 'ArticleTextId'));	
		m_teArticleFrom.setContent(getSimpleTagValue(xmlDoc, 'ArticleFrom'));
		m_articleTo = getSimpleTagValue(xmlDoc, 'ArticleTo');
		m_teArticleTo.setContent(m_articleTo);
			
		validateTranslate();
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onLanguagesError = function (txt) {
        TMessageBox.showModal(getPhrase(7), getPhrase(38), hideModal);
    };

    var onLanguagesOk = function (xmlDoc, xmlText) {
        m_ddlFrom.clear();
        m_ddlTo.clear();

        var elements = xmlDoc.getElementsByTagName('Language');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlFrom.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                    m_ddlTo.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlFrom.setSelectedFirst();
        m_ddlTo.setSelectedFirst();

        hideModal(m_window);
        showModal(m_window);

        updateArticles();
    };
	
	var onTranslateClick = function() {
		var request = new TRequest();

		request.add('LanguageId', m_ddlTo.getSelectedId());
		request.add('TitleTextId', m_titleTextId);
		if (m_propertyId == 0) {
			request.add('TitleTranslation', m_vtbTitleTo.getValue());
		} else {
			request.add('TitleTranslation', 'NaN');
		}
		request.add('ArticleTextId', m_articleTextId);
		request.add('ArticleTranslation', m_teArticleTo.getContent());
		request.add('PropertyId', m_propertyId);
		TAjax.sendRequest(m_window, 'serverscripts/TranslateArticle.php', request.getRequest(), onTranslatedOk, onTranslatedError);
	};
	
	var onTranslatedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(250));
	};
	
	var onTranslatedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
			
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(251));
		} else {
			onTranslatedError('');
		}
	};
	
	var updateArticles = function() {
		var request = new TRequest();
        
        request.add('Id', m_articleId);
        request.add('From', m_ddlFrom.getSelectedId());
        request.add('To', m_ddlTo.getSelectedId());
        request.add('PropertyId', m_propertyId);
        
        TAjax.sendRequest(m_window, 'serverscripts/GetArticlesForTranslation.php', request.getRequest(), onArticlesOk, onArticlesError);
	};
	
	var validateTranslate = function() {
		if (m_propertyId == 0) {
			if (m_vtbTitleTo.getValue() != '') {
				if (m_vtbTitleTo.getValue() != m_titleTo || m_teArticleTo.getContent() != m_articleTo) {
					m_btnTranslate.enable();
				} else {
					m_btnTranslate.disable();
				}
			} else {
				m_btnTranslate.disable();
			}
		} else {
			if (m_teArticleTo.getContent() != m_articleTo && m_teArticleTo.getContent() != '') {
				m_btnTranslate.enable();
			} else {
				m_btnTranslate.disable();
			}
		}
	};
	
	this.show = function(articleId, propertyId) {
		m_articleId = articleId;
		m_propertyId = (propertyId === undefined || propertyId == null) ? 0 : propertyId;
		
		if (m_propertyId != 0) {
			m_vtbTitleTo.disable();
		}
		
		var request = new TRequest();

        showModal(m_window);
        TAjax.sendRequest(m_window, 'serverscripts/GetLanguageList.php', request.getRequest(), onLanguagesOk, onLanguagesError);
	};
	
	m_btnClose.setOnClick(onCloseClick);
	m_btnTranslate.setOnClick(onTranslateClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnTranslate);
	m_layCommands.add(m_btnClose);
	
	m_chvTitleTo.setCallback(validateTranslate);
	m_teArticleTo.setOnValidation(validateTranslate);
	
	m_ddlFrom.setOnChange(updateArticles);
	m_ddlFrom.setSelectedFirst();
	m_ddlTo.setOnChange(updateArticles);
	m_ddlTo.setSelectedFirst();
	
	m_tbTitleFrom.disable();
	m_layFormLeft.setDirection(TLang.getDirection());
	m_layFormLeft.add(new TText(getPhrase(39) + ':'), m_ddlFrom);
	m_layFormLeft.add(new TText(getPhrase(204) + ':'), m_tbTitleFrom);
	
	m_layFormRight.setDirection(TLang.getDirection());
	m_layFormRight.add(new TText(getPhrase(40) + ':'), m_ddlTo);
	m_layFormRight.add(new TText(getPhrase(204) + ':'), m_vtbTitleTo);
	
	m_layLeft.add(m_layFormLeft);
	m_layLeft.add(m_teArticleFrom);
	
	m_layRight.add(m_layFormRight);
	m_layRight.add(m_teArticleTo);
	
	m_layMain.setDirection(TLang.getDirection());
	m_layMain.add(m_layLeft);
	m_layMain.add(m_layRight);
	
	m_window.add(m_layMain);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TCommentsWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_parentId    = 0;
	var m_tblComments = new TTable(5, 'serverscripts/GetComments.php', false);
	var m_window      = createWindow(getPhrase(254));

	var onAddClick = function() {
		var wndAdd = new TAddCommentWindow(updateComments);
		wndAdd.show(m_parentId);
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onCommentSelected = function(commentId) {
		var wndEditComment = new TEditCommentWindow(updateComments);
		wndEditComment.show(commentId, m_tblComments.getCellByName(commentId, 'Comment'));
	};
	
	var updateComments = function() {
		m_tblComments.setAuxiliaryParameters('<ParentId>' + m_parentId + '</ParentId>');
		m_tblComments.update();
	};

	this.show = function(parentId) {
		m_parentId = parentId;
		updateComments();
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblComments.addColumn('Comment', getPhrase(252), 300);
	m_tblComments.addColumn('Author', getPhrase(230), 200);
	m_tblComments.addColumn('Date', getPhrase(109), 200);
	m_tblComments.setOnClick(onCommentSelected);

	m_window.add(m_tblComments);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TContentsWindow() {
	var m_btnAdd       = new TButton(getPhrase(21));
	var m_btnClose     = new TButton(getPhrase(6));
	var m_chvTitle     = new TChangingValidator(new TEmptyValidator());
	var m_contentId    = 0;
	var m_ddlFromDay   = new TDropdownList();
	var m_ddlFromMonth = new TDropdownList();
	var m_ddlFromYear  = new TDropdownList();
	var m_ddlToDay     = new TDropdownList();
	var m_ddlToMonth   = new TDropdownList();
	var m_ddlToYear    = new TDropdownList();
	var m_ddlTypesA    = new TDropdownList();
	var m_ddlTypesS    = new TDropdownList();
	var m_ddlUsers     = new TDropdownList();
	var m_gbAdd        = new TGroupBox(getPhrase(279));
	var m_isBlocked    = false;
	var m_layAdd       = new THorizontalLayout();
	var m_layCommands  = new THorizontalLayout();
	var m_layDate      = new THorizontalLayout();
	var m_layDrop      = new TGridLayout(4, 1);
	var m_laySearch    = new TVerticalLayout();
	var m_layTitle     = new TFormLayout();
	var m_needUpdate   = false;
	var m_tblContents  = new TTable(10, 'serverscripts/GetContents.php', false);
	var m_typeId       = 0;
	var m_vtbTitle     = new TValidatableTextBox(200, m_chvTitle);
	var m_window       = createWindow(getPhrase(271));

	var onAddClick = function() {
		if (m_ddlTypesA.getText() != '') {
			var request = new TRequest();
			m_typeId = m_ddlTypesA.getSelectedId();
			request.add('TypeId', m_typeId);
			
			TAjax.sendRequest(m_window, 'serverscripts/GetContentTypeProperties.php', request.getRequest(), onPropertiesOk, onPropertiesError);
		} else {
			m_btnAdd.disable();
		}
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onContentSelected = function(contentId) {
		m_contentId = contentId;
		
		var type = m_tblContents.getCellByName(contentId, 'Type');
		
		if (type == getPhrase(167)) { // Media
			var wndMedia = new TFinderWindow('serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php', null, null, 'serverscripts/SaveImage.php');
			wndMedia.show();
		} else if (type == getPhrase(203)) { // Article
			var wndEditArticle = new TEditArticleWindow(updateContents);
			wndEditArticle.show(m_contentId, m_tblContents.getCellByName(contentId, 'Title'), m_tblContents.getCellByName(contentId, 'CreateDate'));
		} else {
			var request = new TRequest();
			request.add('ContentId', m_contentId);
		
			TAjax.sendRequest(m_window, 'serverscripts/GetContentTypePropertiesWithValues.php', request.getRequest(), onPropertiesWithValuesOk, onPropertiesWithValuesError);
		}
	};
	
	var onEditorsError = function (txt) {
        TMessageBox.showModal(getPhrase(7), getPhrase(276));
    };

    var onEditorsOk = function (xmlDoc, xmlText) {
        m_ddlUsers.clear();
        m_ddlUsers.add(0, getPhrase(278));
		m_ddlUsers.setSelectedFirst();

        var elements = xmlDoc.getElementsByTagName('Editor');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlUsers.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }
		
        hideModal(m_window);
        showModal(m_window);
        
        m_ddlUsers.setOnChange(updateContents);
    };
	
	var onPropertiesError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(281));
	};
	
	var onPropertiesOk = function(xmlDoc, text) {
		var elements = xmlDoc.getElementsByTagName('Property');
		var prop = new Array();
		var obj = null;

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 6) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null && nodes.item(2).firstChild != null && nodes.item(2).firstChild.nodeValue != null && nodes.item(3).firstChild != null && nodes.item(3).firstChild.nodeValue != null) {
                    var type = nodes.item(2).firstChild.nodeValue;
                    var comp = nodes.item(3).firstChild.nodeValue;
                    var desc = '';
                    if (nodes.item(4) != null && nodes.item(4).childNodes.Length != 0) {
                    	desc = nodes.item(4);
                    }
                    var req  = parseInt(nodes.item(5).firstChild.nodeValue);
                    var compName = '';
                    
                    switch(type) {
                    	
                    	case getPhrase(151): { // Text
                    		if (comp == getPhrase(172)) { // Text Box
                    			if (req) {
                    				obj = new TValidatableTextBox(200, new TEmptyValidator());
                    				compName = 'TValidatableTextBox';
                    			} else {
                    				obj = new TTextBox(200);
                    				compName = 'TTextBox';
                    			}
                    		} else if (comp == getPhrase(174)) { // Drop down
                    			var dropType = getSimpleTagValue(desc, 'Type');
                    			if (dropType == 'Manual') {
                    				obj = new TDropdownList();
                    				compName = 'TDropdownList';
                    				var values = desc.getElementsByTagName('Value');
                    				for (var j = 0; j < values.length; j++) { 
                    					var childNodes = values[j].childNodes;
                    					if (childNodes.length == 2) {
                    						obj.add(childNodes.item(0).firstChild.nodeValue, childNodes.item(1).firstChild.nodeValue);
                    					}
                    				}
                    			} else if (dropType == 'Auto') {
                    				obj = new TScrollableDropdownList(10, 'serverscripts/GetPropertyList.php', null, false);
                    				obj.setAuxiliaryParameters("<PropertyId>" + getSimpleTagValue(desc, 'Value') + "</PropertyId>");
                    				compName = 'TScrollableDropdownList';
                    			}
                    		}
                    		break;
                    	}
                    	
                    	case getPhrase(152): { // HTML
                    		if (comp == getPhrase(173)) { // HTML Editor
                    			obj = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
                    			compName = 'TTextEditor';
                    		} else if (comp == getPhrase(253)) { // Light Editor
                    			obj = new TLightTextEditor(600, 400);
                    			compName = 'TLightTextEditor';
                    		}
                    		break;
                    	}
                    	
                    	case getPhrase(153) || getPhrase(154): { // Number
                    		if (comp == getPhrase(172)) { // Text Box
                    			obj = new TValidatableTextBox(100, new TNumberValidator());
                    			compName = 'TValidatableTextBox';
                    		} else if (comp == getPhrase(175)) { // Slider
                    			var maxVal = getSimpleTagValue(desc, 'MaxValue');
                    			var minVal = getSimpleTagValue(desc, 'MinValue');
                    			var step = getSimpleTagValue(desc, 'Step');
                    			obj = new TSlider('horizontal', minVal, maxVal, step);
                    			compName = 'TSlider';
                    		}
                    		break;
                    	}
                    	
                    	case getPhrase(155): { // Date
                    		if (comp == getPhrase(174)) { // Drop down
                    			var dd1 = new TScrollableDropdownList(10, null, null, false);
                    			var dd2 = new TScrollableDropdownList(10, null, null, false);
                    			var dd3 = new TScrollableDropdownList(10, null, null, false);
                    			
                    			for (var j = 1; j <= 31; j++) {
                    				if (j < 10) {
                    					dd1.add('0' + j, '0' + j);
                    				} else {
                    					dd1.add(j, j);	
                    				}
								};
								dd1.setSelectedId(01);
								for (var j = 1; j <= 12; j++) {
									if (j < 10) {
                    					dd2.add('0' + j, '0' + j);
                    				} else {
                    					dd2.add(j, j);	
                    				}
								};
								dd2.setSelectedId(01);
								for (var j = 1990; j <= parseInt(g_currentYear); j++) {
									dd3.add(j, j);
								};
								dd3.setSelectedId(1990);
                    			
                    			obj = new Array();
                    			obj.push(dd1);
                    			obj.push(dd2);
                    			obj.push(dd3);
                    			compName = 'THorizontalLayout Date';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(156): { // Date Time
                    		if (comp == getPhrase(174)) { // Drop down
                    			var dd1 = new TScrollableDropdownList(10, null, null, false);
                    			var dd2 = new TScrollableDropdownList(10, null, null, false);
                    			var dd3 = new TScrollableDropdownList(10, null, null, false);
                    			var dd4 = new TScrollableDropdownList(10, null, null, false);
                    			var dd5 = new TScrollableDropdownList(10, null, null, false);
                    			var dd6 = new TScrollableDropdownList(10, null, null, false);
                    			
                    			for (var j = 1; j <= 31; j++) {
                    				if (j < 10) {
                    					dd1.add('0' + j, '0' + j);
                    				} else {
                    					dd1.add(j, j);	
                    				}
								};
								dd1.setSelectedId(01);
								for (var j = 1; j <= 12; j++) {
									if (j < 10) {
                    					dd2.add('0' + j, '0' + j);
                    				} else {
                    					dd2.add(j, j);	
                    				}
								};
								dd2.setSelectedId(01);
								for (var j = 1990; j <= parseInt(g_currentYear); j++) {
									dd3.add(j, j);
								};
								dd3.setSelectedId(1990);
								for (var j = 0; j <= 23; j++) {
									if (j < 10) {
                    					dd4.add('0' + j, '0' + j);
                    				} else {
                    					dd4.add(j, j);	
                    				}
								};
								dd4.setSelectedId(00);
                    			for (var j = 0; j <= 59; j++) {
									if (j < 10) {
                    					dd5.add('0' + j, '0' + j);
                    				} else {
                    					dd5.add(j, j);	
                    				}
								};
								dd5.setSelectedId(00);
								for (var j = 0; j <= 59; j++) {
									if (j < 10) {
                    					dd6.add('0' + j, '0' + j);
                    				} else {
                    					dd6.add(j, j);	
                    				}
								};
								dd6.setSelectedId(00);
								
                    			obj = new Array();
                    			
                    			obj.push(dd1);
                    			obj.push(dd2);
                    			obj.push(dd3);
                    			obj.push(dd4);
                    			obj.push(dd5);
                    			obj.push(dd6);
                    			compName = 'THorizontalLayout Date Time';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(157): { // Boolean
                    		if (comp == getPhrase(174) || comp == getPhrase(176)) { // Drop down || Check Box
                    			var val = getSimpleTagValue(desc, 'Value');
                    			obj = new TCheckBox(val);
                    			compName = 'TCheckBox';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(169): { // Random
                    		obj = new TTextBox(200);
                    		var val = getSimpleTagValue(desc, 'Base');
                    		obj.setValue(Math.floor((Math.random() * val) + 1));
                    		obj.disable();
                    		compName = 'TTextBox';
                    		break;
                    	}
                    	
                    	case getPhrase(170): { // Code
                    		obj = new TTextBox(200);
                    		obj.setValue(guid());
                    		obj.disable();
                    		compName = 'TTextBox';
                    		break;
                    	}
                    	
                    	case getPhrase(171): { // URL
                    		var accept = getSimpleTagValue(desc, 'Accept');
                    		var folder = getSimpleTagValue(desc, 'Folder');
                    		obj = new Array();
                    		var fileUploader = new TFileUploader(TLang.translate('browse'), accept);
                    		var fileText = new TText(TLang.translate('noFileSelected') + '.');
                    		obj.push({ fileUploader: fileUploader, fileText: fileText, fileSelected: false, fileUploaded: false, url: null, folder: folder });
                    		compName = 'TFileUploader';
                    		break;
                    	}
                    	
                    	case getPhrase(12): { // Password
                    		obj = new TValidatableTextBox(200, new TEmptyValidator(), true);
                    		compName = 'TValidatableTextBox';
                    		break;
                    	}
                    	
                    	default: {
                    		break;
                    	}
                    }
                    
                    var isText = (type == getPhrase(151)) ? 1 : 0;
                    prop.push({ id: nodes.item(0).firstChild.nodeValue, title: nodes.item(1).firstChild.nodeValue, componentName: compName, component: obj, required: req, isText: isText });
                }
            }
        }
        
        var wndAddContent = new TAddContentWindow(prop, updateContents);
        wndAddContent.show(m_typeId);
	};
	
	var onPropertiesWithValuesError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(281));
	};
	
	var onPropertiesWithValuesOk = function(xmlDoc, text) {
		var elements = xmlDoc.getElementsByTagName('Property');
		var prop = new Array();
		var obj = null;

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 7) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null && nodes.item(2).firstChild != null && nodes.item(2).firstChild.nodeValue != null && nodes.item(3).firstChild != null && nodes.item(3).firstChild.nodeValue != null && nodes.item(6).firstChild != null && nodes.item(6).firstChild.nodeValue != null) {
                    var type = nodes.item(2).firstChild.nodeValue;
                    var comp = nodes.item(3).firstChild.nodeValue;
                    var desc = '';
                    if (nodes.item(4) != null && nodes.item(4).childNodes.Length != 0) {
                    	desc = nodes.item(4);
                    }
                    var req  = parseInt(nodes.item(5).firstChild.nodeValue);
                    var compName = '';
                    var proValue = nodes.item(6).firstChild.nodeValue;
                    
                    switch(type) {
                    	
                    	case getPhrase(151): { // Text
                    		if (comp == getPhrase(172)) { // Text Box
                    			if (req) {
                    				var chv = new TChangeValidator(new TEmptyValidator());
                    				chv.setOriginalValue(proValue);
                    				obj = new TValidatableTextBox(200, chv);
                    				compName = 'TValidatableTextBox';
                    			} else {
                    				obj = new TTextBox(200);
                    				compName = 'TTextBox';
                    			}
                    			obj.setValue(proValue);
                    		} else if (comp == getPhrase(174)) { // Drop down
                    			var dropType = getSimpleTagValue(desc, 'Type');
                    			if (dropType == 'Manual') {
                    				obj = new TDropdownList();
                    				compName = 'TDropdownList';
                    				var values = desc.getElementsByTagName('Value');
                    				for (var j = 0; j < values.length; j++) { 
                    					var childNodes = values[j].childNodes;
                    					if (childNodes.length == 2) {
                    						obj.add(childNodes.item(0).firstChild.nodeValue, childNodes.item(1).firstChild.nodeValue);
                    					}
                    				}
                    			} else if (dropType == 'Auto') {
                    				obj = new TScrollableDropdownList(10, 'serverscripts/GetPropertyList.php', null, false);
                    				obj.setAuxiliaryParameters("<PropertyId>" + getSimpleTagValue(desc, 'Value') + "</PropertyId>");
                    				compName = 'TScrollableDropdownList';
                    			}
                    			obj.setSelectedItem(proValue);
                    		}
                    		break;
                    	}
                    	
                    	case getPhrase(152): { // HTML
                    		if (comp == getPhrase(173)) { // HTML Editor
                    			obj = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
                    			compName = 'TTextEditor';
                    		} else if (comp == getPhrase(253)) { // Light Editor
                    			obj = new TLightTextEditor(600, 400);
                    			compName = 'TLightTextEditor';
                    		}
                    		obj.setContent(proValue);
                    		break;
                    	}
                    	
                    	case getPhrase(153) || getPhrase(154): { // Number
                    		if (comp == getPhrase(172)) { // Text Box
                    			obj = new TValidatableTextBox(100, new TNumberValidator());
                    			compName = 'TValidatableTextBox';
                    			obj.setValue(proValue);
                    		} else if (comp == getPhrase(175)) { // Slider
                    			var maxVal = getSimpleTagValue(desc, 'MaxValue');
                    			var minVal = getSimpleTagValue(desc, 'MinValue');
                    			var step = getSimpleTagValue(desc, 'Step');
                    			obj = new TSlider('horizontal', minVal, maxVal, step, proValue);
                    			compName = 'TSlider';
                    		}
                    		break;
                    	}
                    	
                    	case getPhrase(155): { // Date 
                    		if (comp == getPhrase(174)) { // Drop down
                    			var dd1 = new TScrollableDropdownList(10, null, null, false);
                    			var dd2 = new TScrollableDropdownList(10, null, null, false);
                    			var dd3 = new TScrollableDropdownList(10, null, null, false);
                    			var split = proValue.split('-');
                    			
                    			for (var j = 1; j <= 31; j++) {
                    				if (j < 10) {
                    					dd1.add('0' + j, '0' + j);
                    				} else {
                    					dd1.add(j, j);	
                    				}
								};
								dd1.setSelectedId(split[2]);
								for (var j = 1; j <= 12; j++) {
									if (j < 10) {
                    					dd2.add('0' + j, '0' + j);
                    				} else {
                    					dd2.add(j, j);	
                    				}
								};
								dd2.setSelectedId(split[1]);
								for (var j = 1990; j <= parseInt(g_currentYear); j++) {
									dd3.add(j, j);
								};
								dd3.setSelectedId(split[0]);
                    			
                    			obj = new Array();
                    			obj.push(dd1);
                    			obj.push(dd2);
                    			obj.push(dd3);
                    			compName = 'THorizontalLayout Date';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(156): { // Date Time
                    		if (comp == getPhrase(174)) { // Drop down
                    			var dd1 = new TScrollableDropdownList(10, null, null, false);
                    			var dd2 = new TScrollableDropdownList(10, null, null, false);
                    			var dd3 = new TScrollableDropdownList(10, null, null, false);
                    			var dd4 = new TScrollableDropdownList(10, null, null, false);
                    			var dd5 = new TScrollableDropdownList(10, null, null, false);
                    			var dd6 = new TScrollableDropdownList(10, null, null, false);
                    			
                    			var split = proValue.split(' ');
                    			var split1 = split[0].split('-');
                    			var split2 = split[1].split(':');
                    			
                    			for (var j = 1; j <= 31; j++) {
                    				if (j < 10) {
                    					dd1.add('0' + j, '0' + j);
                    				} else {
                    					dd1.add(j, j);	
                    				}
								};
								dd1.setSelectedId(split1[2]);
								for (var j = 1; j <= 12; j++) {
									if (j < 10) {
                    					dd2.add('0' + j, '0' + j);
                    				} else {
                    					dd2.add(j, j);	
                    				}
								};
								dd2.setSelectedId(split1[1]);
								for (var j = 1990; j <= parseInt(g_currentYear); j++) {
									dd3.add(j, j);
								};
								dd3.setSelectedId(split1[0]);
                    			
                    			for (var j = 0; j <= 23; j++) {
									if (j < 10) {
                    					dd4.add('0' + j, '0' + j);
                    				} else {
                    					dd4.add(j, j);	
                    				}
								};
								dd4.setSelectedId(split2[0]);
                    			for (var j = 0; j <= 59; j++) {
									if (j < 10) {
                    					dd5.add('0' + j, '0' + j);
                    				} else {
                    					dd5.add(j, j);	
                    				}
								};
								dd5.setSelectedId(split2[1]);
								for (var j = 0; j <= 59; j++) {
									if (j < 10) {
                    					dd6.add('0' + j, '0' + j);
                    				} else {
                    					dd6.add(j, j);	
                    				}
								};
								dd6.setSelectedId(split2[2]);
								
                    			obj = new Array();
                    			
                    			obj.push(dd1);
                    			obj.push(dd2);
                    			obj.push(dd3);
                    			obj.push(dd4);
                    			obj.push(dd5);
                    			obj.push(dd6);
                    			compName = 'THorizontalLayout Date Time';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(157): { // Boolean
                    		if (comp == getPhrase(174) || comp == getPhrase(176)) { // Drop down || Check Box
                    			var val = getSimpleTagValue(desc, 'Value');
                    			obj = new TCheckBox(val);
                    			if (proValue == '1') { obj.check(); }
                    			compName = 'TCheckBox';
                    		} 
                    		break;
                    	}
                    	
                    	case getPhrase(169) || getPhrase(170): { // Random OR Code
                    		obj = new TTextBox(200);
                    		obj.disable();
                    		compName = 'TTextBox';
                    		obj.setValue(proValue);
                    		break;
                    	}
                    	
                    	case getPhrase(171): { // URL
                    		var accept = getSimpleTagValue(desc, 'Accept');
                    		var folder = getSimpleTagValue(desc, 'Folder');
                    		obj = new Array();
                    		var fileUploader = new TFileUploader(TLang.translate('browse'), accept);
                    		var fileText = new TText(TLang.translate('noFileSelected') + '.');
                    		var size = getImageSize(proValue);
                    		var fitSize = calculateAspectRatioFit(size.width, size.height, 150, 150);
                    		var imgPreview = new TImage(proValue, fitSize.width, fitSize.height);
                    		obj.push({ fileUploader: fileUploader, fileText: fileText, fileSelected: false, fileUploaded: false, url: proValue, folder: folder, preview: imgPreview });
                    		compName = 'TFileUploader';
                    		break;
                    	}
                    	
                    	case getPhrase(12): { // Password
                    		obj = new TValidatableTextBox(200, new TEmptyValidator(), true);
                    		compName = 'TValidatableTextBox';
                    		obj.setValue(proValue);
                    		break;
                    	}
                    	
                    	default: {
                    		break;
                    	}
                    }
                    
                    var isText = (type == getPhrase(151)) ? 1 : 0;
                    prop.push({ id: nodes.item(0).firstChild.nodeValue, title: nodes.item(1).firstChild.nodeValue, componentName: compName, component: obj, required: req, isText: isText, value: proValue });
                }
            }
        }
        
        var wndEditContent = new TEditContentWindow(m_contentId, prop, updateContents);
		wndEditContent.show();
	};
	
	var onTypesError = function (txt) {
        TMessageBox.showModal(getPhrase(7), getPhrase(277));
    };

    var onTypesOk = function (xmlDoc, xmlText) {
        m_ddlTypesS.clear();
        m_ddlTypesS.add(0, getPhrase(278));
		m_ddlTypesS.setSelectedFirst();

        var elements = xmlDoc.getElementsByTagName('Type');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    if (nodes.item(1).firstChild.nodeValue != getPhrase(167) && nodes.item(1).firstChild.nodeValue != getPhrase(203)) {
                    	m_ddlTypesA.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                    }
                    m_ddlTypesS.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }
		
		if (elements.length) {
			m_ddlTypesA.setSelectedFirst();
			m_btnAdd.enable();
		}
		
        hideModal(m_window);
        showModal(m_window);
        
        m_ddlTypesS.setOnChange(updateContents);
    };
	
	var onUpdateCompleted = function() {
	    m_isBlocked = false;

        if (m_needUpdate) {
			setTimeout(updateContents, 50);
        } 
	};
	
	var updateContents = function () {
	    if (!m_isBlocked) {
			m_needUpdate = false;
			m_isBlocked = true;

	        var titleTemplate = 'NaN';
	        var fromDate = m_ddlFromYear.getText() + '-' + m_ddlFromMonth.getText() + '-' + m_ddlFromDay.getText();
	        var toDate = m_ddlToYear.getText() + '-' + m_ddlToMonth.getText() + '-' + m_ddlToDay.getText();

	        if (trim(m_vtbTitle.getValue()) != '') {
	            titleTemplate = m_vtbTitle.getValue();
	        }

	        m_tblContents.setAuxiliaryParameters('<Title>' + titleTemplate + '</Title><EditorId>' + m_ddlUsers.getSelectedId() + '</EditorId><TypeId>' + m_ddlTypesS.getSelectedId() + '</TypeId><FromDate>' + fromDate + '</FromDate><ToDate>' + toDate + '</ToDate>');
	        m_tblContents.update(onUpdateCompleted);
	    } else {
	        m_needUpdate = true;
	    }
	};

	this.show = function() {
		m_btnAdd.disable();
		
		var request1 = new TRequest();
		var request2 = new TRequest();
		
		showModal(m_window);
		
		TAjax.sendRequest(m_window, 'serverscripts/GetContentTypesList.php', request1.getRequest(), onTypesOk, onTypesError);
		TAjax.sendRequest(m_window, 'serverscripts/GetEditorsList.php', request2.getRequest(), onEditorsOk, onEditorsError);
		
		updateContents();
	};
	
	m_layAdd.setDirection(TLang.getDirection());
	m_layAdd.add(new TText(getPhrase(280) + ':'));
	m_layAdd.add(m_ddlTypesA);
	m_layAdd.add(m_btnAdd);
	m_gbAdd.add(m_layAdd);
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_gbAdd);
	m_layCommands.add(m_btnClose);
	
	for (var i = 1; i <= 31; i++) {
		m_ddlFromDay.add(i, i);
		m_ddlToDay.add(i, i);
	};
	m_ddlFromDay.setSelectedId(1);
	m_ddlFromDay.setOnChange(updateContents);
	m_ddlToDay.setSelectedId(31);
	m_ddlToDay.setOnChange(updateContents);
	for (var i = 1; i <= 12; i++) {
		m_ddlFromMonth.add(i, i);
		m_ddlToMonth.add(i, i);
	};
	m_ddlFromMonth.setSelectedId(1);
	m_ddlFromMonth.setOnChange(updateContents);
	m_ddlToMonth.setSelectedId(12);
	m_ddlToMonth.setOnChange(updateContents);
	for (var i = 1990; i <= parseInt(g_currentYear); i++) {
		m_ddlFromYear.add(i, i);
		m_ddlToYear.add(i, i);
	};
	m_ddlFromYear.setSelectedId(1990);
	m_ddlFromYear.setOnChange(updateContents);
	m_ddlToYear.setSelectedId(parseInt(g_currentYear));
	m_ddlToYear.setOnChange(updateContents);
	m_layDate.setDirection(TLang.getDirection());
	m_layDate.add(new TText(getPhrase(272)));
	m_layDate.add(m_ddlFromDay);
	m_layDate.add(m_ddlFromMonth);
	m_layDate.add(m_ddlFromYear);
	m_layDate.add(new TText(getPhrase(273)));
	m_layDate.add(m_ddlToDay);
	m_layDate.add(m_ddlToMonth);
	m_layDate.add(m_ddlToYear);
	
	m_chvTitle.setCallback(updateContents);
	m_layTitle.setDirection(TLang.getDirection());
	m_layTitle.add(new TText(getPhrase(274)), m_vtbTitle);
	
	m_ddlTypesS.add(0, getPhrase(278));
	m_ddlTypesS.setSelectedFirst();
	m_ddlUsers.add(0, getPhrase(278));
	m_ddlUsers.setSelectedFirst();
	m_layDrop.setDirection(TLang.getDirection());
	m_layDrop.setCell(0, 0, new TText(getPhrase(166) + ':'));
	m_layDrop.setCell(1, 0, m_ddlTypesS);
	m_layDrop.setCell(2, 0, new TText(getPhrase(275) + ':'));
	m_layDrop.setCell(3, 0, m_ddlUsers);
	
	m_laySearch.add(m_layTitle);
	m_laySearch.add(m_layDrop);
	m_laySearch.add(m_layDate);
	
	m_tblContents.addColumn('Title', getPhrase(274), 300);
	m_tblContents.addColumn('Type', getPhrase(286), 200);
	m_tblContents.addColumn('CreateBy', getPhrase(287), 200);
	m_tblContents.addColumn('CreateDate', getPhrase(323), 200);
	m_tblContents.setOnClick(onContentSelected);

	m_window.add(m_laySearch);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_tblContents);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TContentTypesWindow() {
	var m_btnAdd      = new TButton(getPhrase(134));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_tblTypes    = new TTable(5, 'serverscripts/GetEntities.php');
	var m_window      = createWindow(getPhrase(166));

	var onAddClick = function() {
		var wndEntityCreator = new TEntityWindow('Add', updateTypes);
		wndEntityCreator.show();
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onTypeSelected = function(typeId) {
		if (typeId != 1 && typeId != 2 && typeId != 3) {
			var wndEntity = new TEntityWindow('Edit', updateTypes);
			wndEntity.show(typeId);
		}
	};
	
	var updateTypes = function() {
		m_tblTypes.update();
	};

	this.show = function() {
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblTypes.addColumn('Name', getPhrase(138), 300);
	m_tblTypes.setOnClick(onTypeSelected);

	m_window.add(m_tblTypes);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TDeletedUsersWindow(callback) {
	var m_btnRestore  = new TButton(getPhrase(91));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_tblUsers    = new TTable(5, 'serverscripts/GetDeletedUsers.php', true, 'Single');
	var m_window      = createWindow(getPhrase(80));

	var doRestore = function() {
		var Ids = m_tblUsers.getSelectedIds();
		var request = new TRequest();

		request.add('UserId', Ids[0]);
		TAjax.sendRequest(m_window, 'serverscripts/RestoreUser.php', request.getRequest(), onRestoreOk, onRestoreError);
	};
	
	var onCloseClick = function() {
		hideModal();
		callback();
	};
	
	var onRestoreClick = function() {
		if (m_tblUsers.hasSelection()) {
			TQuestionBox.showModal(getPhrase(22), getPhrase(92), doRestore);
		} else {
			TMessageBox.showModal(getPhrase(22), getPhrase(93));
		}
	};
	
	var onRestoreError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(94));
	};
	
	var onRestoreOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(95), updateUsers);
		} else {
			onRestoreError(text);
		}
	};
	
	var onSelectedUserChanged = function() {
		if (m_tblUsers.hasSelection()) {
			m_btnRestore.enable();
		} else {
			m_btnRestore.disable();
		}
	};
	
	var updateUsers = function() {
		m_tblUsers.update();
	};

	this.show = function() {
		m_btnRestore.disable();
		showModal(m_window);
	};
	
	m_btnClose.setOnClick(onCloseClick);
	m_btnRestore.setOnClick(onRestoreClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnRestore);
	m_layCommands.add(m_btnClose);
	m_tblUsers.addColumn('Name', getPhrase(73), 400);
	m_tblUsers.addColumn('Email', getPhrase(74), 300);
	m_tblUsers.addColumn('UserName', getPhrase(11), 150);
	m_tblUsers.addColumn('Phone', getPhrase(81), 150);
	m_tblUsers.addColumn('LastAccess', getPhrase(82), 150);
	m_tblUsers.setOnSelectionChangedCallback(onSelectedUserChanged);

	m_window.add(m_tblUsers);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditArticleWindow(callback) {
	var m_articleId    = 0;
	var m_articleText  = '';
	var m_btnChange    = new TButton(getPhrase(27));
	var m_btnClose     = new TButton(getPhrase(6));
	var m_btnComments  = new TButton(getPhrase(254));
	var m_btnDelete    = new TButton(getPhrase(57));
	var m_btnTranslate = new TButton(getPhrase(47));
	var m_chvTitle     = new TChangeValidator(new TEmptyValidator());
	var m_ddlDay       = new TDropdownList();
	var m_ddlMonth     = new TDropdownList();
	var m_ddlYear      = new TDropdownList();
	var m_layCommands  = new THorizontalLayout();
	var m_layDate      = new THorizontalLayout();
	var m_layForm      = new TFormLayout();
	var m_teArticle    = new TTextEditor(600, 400, 'serverscripts/GetMediaFolders.php', 'serverscripts/GetMediaByFolder.php', 'serverscripts/AddMedia.php', 'serverscripts/ChangeMedia.php', 'serverscripts/DeleteMedia.php');
	var m_vtbTitle     = new TValidatableTextBox(300, m_chvTitle);
	var m_publishDate  = '';
	var m_title        = '';
	var m_window       = createWindow(getPhrase(240));

	var doChange = function() {
		var request = new TRequest();

		request.add('Id', m_articleId);
		request.add('Title', m_vtbTitle.getValue());
		request.add('PublishDate', m_ddlYear.getText() + '-' + m_ddlMonth.getText() + '-' + m_ddlDay.getText());
		request.add('Article', m_teArticle.getContent());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeArticle.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('Id', m_articleId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteArticle.php', request.getRequest(), onDeletedOk, onDeletedError);
	};
	
	var onArticleError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(248), hideModal);
	};

	var onArticleOk = function(xmlDoc) {
		m_articleText = getSimpleTagValue(xmlDoc, 'ArticleText');
		m_teArticle.setContent(m_articleText);
		m_btnDelete.enable();
		m_btnClose.enable();
		m_btnComments.enable();
		m_btnTranslate.enable();
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(241));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(242), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_title = m_vtbTitle.getValue();
		m_chvTitle.setOriginalValue(m_title);
		m_publishDate = m_ddlYear.getText() + '-' + m_ddlMonth.getText() + '-' + m_ddlDay.getText();
		m_articleText = m_teArticle.getContent();
		validateUpdate();
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(243), doChange);
	};

	var onCloseClick = function() {
		hideModal();
	};
	
	var onCommentsClick = function() {
		var wndComments = new TCommentsWindow();
		wndComments.show(m_articleId);
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(244));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(245), onDeletedOkCompleted);
		} else if (tagResult == 'Used') {
			TMessageBox.showModal(getPhrase(22), getPhrase(246));
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(247), doDelete);
	};
	
	var onTranslateClick = function() {
		var wndTrans = new TArticleTranslationWindow();
		wndTrans.show(m_articleId);
	};
	
	var validateUpdate = function() {
		if (m_vtbTitle.getValue() != '') {
			var selectedDate = m_ddlYear.getText() + '-' + m_ddlMonth.getText() + '-' + m_ddlDay.getText();
			if (m_vtbTitle.getValue() != m_title || selectedDate != m_publishDate || m_teArticle.getContent() != m_articleText) {
				m_btnChange.enable();
			} else {
				m_btnChange.disable();
			}
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(articleId, title, pDate) {
		m_articleId = articleId;
		m_title = title;
		m_chvTitle.setOriginalValue(m_title);
		m_vtbTitle.setValue(m_title);
		m_publishDate = pDate;
		var dates = pDate.split('-');
		m_ddlYear.setSelectedId(parseInt(dates[0]));
		m_ddlMonth.setSelectedId(parseInt(dates[1]));
		m_ddlDay.setSelectedId(parseInt(dates[2]));
		
		m_btnChange.disable();
		m_btnClose.disable();
		m_btnComments.disable();
		m_btnDelete.disable();
		m_btnTranslate.disable();
		
		showModal(m_window);
		
		var request = new TRequest();
		request.add('Id', m_articleId);
		TAjax.sendRequest(m_window, 'serverscripts/GetArticleText.php', request.getRequest(), onArticleOk, onArticleError);
	};

	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnComments.setOnClick(onCommentsClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_btnTranslate.setOnClick(onTranslateClick);
	m_chvTitle.setCallback(validateUpdate);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnTranslate);
	m_layCommands.add(m_btnComments);
	m_layCommands.add(m_btnClose);
	
	for (var i = 1; i <= 31; i++) {
		m_ddlDay.add(i, i);
	};
	for (var i = 1; i <= 12; i++) {
		m_ddlMonth.add(i, i);
	};
	for (var i = 1990; i <= parseInt(g_currentYear); i++) {
		m_ddlYear.add(i, i);
	};
	m_layDate.setDirection(TLang.getDirection());
	m_layDate.add(m_ddlDay);
	m_layDate.add(m_ddlMonth);
	m_layDate.add(m_ddlYear);
	
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(204) + ':'), m_vtbTitle);
	m_layForm.add(new TText(getPhrase(229) + ':'), m_layDate);
	m_vtbTitle.setOnValidationChanged(validateUpdate);
	m_vtbTitle.setMaxLength(100);
	
	m_teArticle.setOnValidation(validateUpdate);
	
	m_window.add(m_layForm);
	m_window.add(new TText(getPhrase(228) + ':'));
	m_window.add(m_teArticle);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditCommentWindow(callback) {
	var m_btnChange    = new TButton(getPhrase(27));
	var m_btnClose     = new TButton(getPhrase(6));
	var m_btnDelete    = new TButton(getPhrase(57));
	var m_chvComment   = new TChangeValidator(new TEmptyValidator());
	var m_commentId    = 0;
	var m_comment      = '';
	var m_layCommands  = new THorizontalLayout();
	var m_layForm      = new TFormLayout();
	var m_vtbComment   = new TValidatableTextBox(300, m_chvComment);
	var m_window       = createWindow(getPhrase(260));

	var doChange = function() {
		var request = new TRequest();

		request.add('Id', m_commentId);
		request.add('Comment', m_vtbComment.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeComment.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('Id', m_commentId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteComment.php', request.getRequest(), onDeletedOk, onDeletedError);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(261));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(262), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_comment = m_vtbComment.getValue();
		m_chvComment.setOriginalValue(m_comment);
		validateUpdate();
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(263), doChange);
	};

	var onCloseClick = function() {
		hideModal();
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(264));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(265), onDeletedOkCompleted);
		} else if (tagResult == 'Used') {
			TMessageBox.showModal(getPhrase(22), getPhrase(266));
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(267), doDelete);
	};
	
	var validateUpdate = function() {
		if (m_vtbComment.getValue() != '') {
			if (m_vtbComment.getValue() != m_comment) {
				m_btnChange.enable();
			} else {
				m_btnChange.disable();
			}
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(commentId, comment) {
		m_commentId = commentId;
		m_comment = comment;
		m_chvComment.setOriginalValue(m_comment);
		m_vtbComment.setValue(m_comment);
		
		m_btnChange.disable();
		
		showModal(m_window);
	};

	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_chvComment.setCallback(validateUpdate);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnClose);
	
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(259) + ':'), m_vtbComment);
	m_vtbComment.setOnValidationChanged(validateUpdate);
	m_vtbComment.setMaxLength(100);
	
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditContentWindow(contentId, properties, callback) {
	var m_btnChange    = new TButton(getPhrase(27));
	var m_btnClose     = new TButton(getPhrase(6));
	var m_btnComments  = new TButton(getPhrase(254));
	var m_btnDelete    = new TButton(getPhrase(57));
	var m_contentId    = contentId;
	var m_layCommands  = new THorizontalLayout();
	var m_layForm      = new TFormLayout();
	var m_window       = createWindow(getPhrase(308));

	var doChange = function() {
		var request = new TRequest();
		var xmlValues = '<Properties>';
		
		for (var i = 0; i < properties.length; i++) {
			xmlValues += '<Property>';
			xmlValues += '<PropertyId>' + properties[i].id + '</PropertyId>';
			if (properties[i].componentName == "TValidatableTextBox" || properties[i].componentName == "TTextBox") {
				xmlValues += '<Value>' + properties[i].component.getValue() + '</Value>';
				if (properties[i].isText) {
					xmlValues += '<SaveTo>PhraseTranslation</SaveTo>';
				} else {
					xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
				}
			} else if (properties[i].componentName == "TDropdownList" || properties[i].componentName == "TScrollableDropdownList") {
				xmlValues += '<Value>' + properties[i].component.getSelectedId() + '</Value>';
				if (properties[i].isText) {
					xmlValues += '<SaveTo>ContentProperties Id</SaveTo>';
				} else {
					xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
				}
			} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor") {
				xmlValues += '<Value><![CDATA[' + properties[i].component.getContent() + ']]></Value>';
				xmlValues += '<SaveTo>ContentTranslation</SaveTo>';
			} else if (properties[i].componentName == "TSlider") {
				xmlValues += '<Value>' + properties[i].component.getValue() + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "TCheckBox") {
				var val = (properties[i].component.isChecked()) ? 1 : 0;
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "THorizontalLayout Date") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText();
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "THorizontalLayout Date Time") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText() + ' ' + properties[i].component[3].getText() + ':' + properties[i].component[4].getText() + ':' + properties[i].component[5].getText();
				xmlValues += '<Value>' + val + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			} else if (properties[i].componentName == "TFileUploader") {
				xmlValues += '<Value>' + properties[i].component[0].url + '</Value>';
				xmlValues += '<SaveTo>ContentProperties Value</SaveTo>';
			}
			xmlValues += '</Property>';
		}
		xmlValues += '</Properties>';
		
		request.add('Id', m_contentId);
		request.add('XMLValues', xmlValues, false);
		TAjax.sendRequest(m_window, 'serverscripts/ChangeContent.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('Id', m_contentId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteContent.php', request.getRequest(), onDeletedOk, onDeletedError);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(310));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(311), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		for (var i = 0; i < properties.length; i++) {
			if (properties[i].componentName == "TValidatableTextBox") {
				properties[i].value =  properties[i].component.getValue();
				properties[i].component.getValidator().setOriginalValue(properties[i].value);
			} else if (properties[i].componentName == "TTextBox" || properties[i].componentName == "TSlider") {
				properties[i].value =  properties[i].component.getValue();
			} else if (properties[i].componentName == "TDropdownList" || properties[i].componentName == "TScrollableDropdownList") {
				properties[i].value =  properties[i].component.getText();
			} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor") {
				properties[i].value =  properties[i].component.getContent();
			} else if (properties[i].componentName == "TCheckBox") {
				var val = (properties[i].component.isChecked()) ? 1 : 0;
				properties[i].value = val;
			} else if (properties[i].componentName == "THorizontalLayout Date") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText();
				properties[i].value = val;
			} else if (properties[i].componentName == "THorizontalLayout Date Time") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText() + ' ' + properties[i].component[3].getText() + ':' + properties[i].component[4].getText() + ':' + properties[i].component[5].getText();
				properties[i].value = val;
			} else if (properties[i].componentName == "TFileUploader") {
				properties[i].value = properties[i].component[0].url;
				properties[i].component[0].fileUploaded = false;
				properties[i].component[0].fileText.setText('');
			}
		}
		
		validateUpdate();
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(309), doChange);
	};
	
	var onClientFileSelected = function(files, index) {
		if (files.length > 0) {
			properties[index].component[0].fileText.setText(files[0].name + ' (' + (files[0].size / 1024) + ' KB)');
			properties[index].component[0].fileSelected = true;
			m_window.refresh();
		} else {
			properties[index].component[0].fileText.setText(TLang.translate('noFileSelected') + '.');
			properties[index].component[0].fileSelected = false;
		}
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onCommentsClick = function() {
		var wndComments = new TCommentsWindow();
		wndComments.show(m_contentId);
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(320));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(321), onDeletedOkCompleted);
		} else if (tagResult == 'Used') {
			TMessageBox.showModal(getPhrase(22), getPhrase(322));
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(319), doDelete);
	};
	
	var onFileUpload = function(index) {
		if (properties[index].component[0].fileSelected) {
			properties[index].component[0].fileUploader.upload('serverscripts/UploadFile.php', function(response) { onFileUploaded(response, index); }, properties[index].component[0].folder + ';' + g_sessionId);
		}
	};
	
	var onFileUploaded = function(response, index) {
		var xmlDoc = loadXMLString(response);
		var url = getSimpleTagValue(xmlDoc, 'url');
		if (url != undefined && url != null && url != '') {
			properties[index].component[0].fileUploaded = true;
			properties[index].component[0].url = url;
			properties[index].component[0].fileText.setText(TLang.translate('uploaded'));
			var size = getImageSize(url);
            var fitSize = calculateAspectRatioFit(size.width, size.height, 150, 150);
			properties[index].component[0].preview.setUrl(url);
			properties[index].component[0].preview.setHeight(fitSize.height);
			properties[index].component[0].preview.setWidth(fitSize.width);
			m_window.refresh();
			validateUpdate();
		} else {
			properties[index].component[0].fileUploaded = false;
			properties[index].component[0].fileText.setText(TLang.translate('error'));
		}
	};
	
	var validateUpdate = function() {
		var valid = false;
		for (var i = 0; i < properties.length; i++) {
			if (properties[i].componentName == "TValidatableTextBox") {
				if (properties[i].component.getValue() == '') {
					valid = false;
					break;
				} else {
					if (properties[i].component.getValue() != properties[i].value) {
						valid = true;
					}
				}
			} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor") {
				if (properties[i].component.getContent() == '' && properties[i].required == 1) {
					valid = false;
					break;
				} else {
					if (properties[i].component.getContent() != properties[i].value) {
						valid = true;
					}
				}
			} else if (properties[i].componentName == "TFileUploader" && properties[i].component[0].fileSelected && properties[i].component[0].fileUploaded) {
				valid = true;
			} else if (properties[i].componentName == "TTextBox" && properties[i].component.getValue() != properties[i].value) {
				valid = true;
			} else if (properties[i].componentName == "TDropdownList" || properties[i].componentName == "TScrollableDropdownList") {
				if (properties[i].component.getText() != properties[i].value) {
					valid = true;
				}
			} else if (properties[i].componentName == "TCheckBox") {
				var val = (properties[i].component.isChecked) ? 1 : 0;
				if (val != properties[i].value) {
					valid = true;
				}
			} else if (properties[i].componentName == "THorizontalLayout Date") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText();
				if (val != properties[i].value) {
					valid = true;
				}
			} else if (properties[i].componentName == "THorizontalLayout Date Time") {
				var val = properties[i].component[2].getText() + '-' + properties[i].component[1].getText() + '-' + properties[i].component[0].getText() + ' ' + properties[i].component[3].getText() + ':' + properties[i].component[4].getText() + ':' + properties[i].component[5].getText();
				if (val != properties[i].value) {
					valid = true;
				}
			} else if (properties[i].componentName == "TSlider" && properties[i].component.getValue() != properties[i].value) {
				valid = true;
			}
		}
		if (valid) {
			m_btnChange.enable();
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function() {
		m_btnChange.disable();
		
		showModal(m_window);
	};
	
	m_layForm.setDirection(TLang.getDirection());
	for (var i = 0; i < properties.length; i++) {
		if (properties[i].componentName == "TValidatableTextBox") {
			properties[i].component.setOnValidationChanged(validateUpdate);
			properties[i].component.getValidator().setCallback(validateUpdate);
		} else if (properties[i].componentName == "TTextEditor" || properties[i].componentName == "TLightTextEditor") {
			if (parseInt(properties[i].required) == 1) { properties[i].component.setOnValidation(validateUpdate); }
			var layEditor = new TVerticalLayout();
			var btnTranslate = new TButton(getPhrase(47));
			var k = i;
			btnTranslate.alignRight();
			btnTranslate.setOnClick(function() { var wndTrans = new TArticleTranslationWindow(); wndTrans.show(m_contentId, properties[k].id); });
			layEditor.add(properties[i].component);
			layEditor.add(btnTranslate);
			m_layForm.add(new TText(properties[i].title), layEditor);
			continue;
		} else if (properties[i].componentName == "TScrollableDropdownList") {
			properties[i].component.update();
		} else if (properties[i].componentName == "TFileUploader") {
			var layFile = new THorizontalLayout();
			var brkPreview = new TBrick();
			brkPreview.setHeight(150);
			brkPreview.setWidth(150);
			var btnUpload = new TButton(TLang.translate('uploadToServer'));
			var j = i;
			layFile.setDirection(TLang.getDirection());
			
			properties[i].component[0].fileUploader.setOnClick(function(files) { onClientFileSelected(files, j); });
			btnUpload.setOnClick(function() { onFileUpload(j); });
			
			layFile.add(properties[i].component[0].fileUploader);
			layFile.add(properties[i].component[0].fileText);
			layFile.add(btnUpload);
			layFile.add(properties[i].component[0].preview);
			layFile.add(brkPreview);
			m_layForm.add(new TText(properties[i].title), layFile);
			continue;
		} else if (properties[i].componentName == "THorizontalLayout Date") {
			var layDate = new THorizontalLayout();
			layDate.setDirection(TLang.getDirection());
			layDate.add(properties[i].component[0]);
			layDate.add(properties[i].component[1]);
			layDate.add(properties[i].component[2]);
			m_layForm.add(new TText(properties[i].title), layDate);
			continue;
		} else if (properties[i].componentName == "THorizontalLayout Date Time") {
			var layDate = new THorizontalLayout();
			layDate.setDirection(TLang.getDirection());
			layDate.add(properties[i].component[0]);
			layDate.add(properties[i].component[1]);
			layDate.add(properties[i].component[2]);
			layDate.add(new TText(' '));
			layDate.add(properties[i].component[3]);
			layDate.add(properties[i].component[4]);
			layDate.add(properties[i].component[5]);
			m_layForm.add(new TText(properties[i].title), layDate);
			continue;
		}
		m_layForm.add(new TText(properties[i].title), properties[i].component);
	}
	
	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnComments.setOnClick(onCommentsClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnComments);
	m_layCommands.add(m_btnClose);
	
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditEntityPropertyWindow(callback) {
	var m_autoValue   = 0;
	var m_base        = 0;
	var m_brkLayout   = new TBrick();
	var m_btnChange   = new TButton(getPhrase(27));
	var m_btnDeleteE  = new TButton(getPhrase(57));
	var m_btnDelete   = new TButton(getPhrase(57));
	var m_btnSelect   = new TButton(getPhrase(191) + '...');
	var m_btnClose    = new TButton(getPhrase(6));
	var m_chkgAccept  = new TCheckBoxGroup('Multi', getPhrase(325), TLang.getDirection());
	var m_chkManual   = new TCheckBox(getPhrase(183));
	var m_chkRequired = new TCheckBox('');
	var m_chvName     = new TChangeValidator(new TEmptyValidator());
	var m_ddlAuto     = new TDropdownList();
	var m_ddlBase     = new TDropdownList();
	var m_ddlCompo    = new TDropdownList();
	var m_ddlFolders  = new TDropdownList();
	var m_ddlManual   = new TDropdownList();
	var m_folderId    = 0;
	var m_layCommands = new THorizontalLayout();
	var m_layDropDown = new TVerticalLayout();
	var m_layForm     = new TFormLayout();
	var m_layManual   = new THorizontalLayout();
	var m_layRandoom  = new THorizontalLayout();
	var m_laySlider   = new TFormLayout();
	var m_layUploader = new THorizontalLayout();
	var m_manualVals  = '';
	var m_maxVal      = 0;
	var m_mimeTypes   = new Array();
	var m_minVal      = 0;
	var m_name        = '';
	var m_propertyId  = 0;
	var m_required    = 0;
	var m_step        = 0;
	var m_txtAuto     = new TText(getPhrase(185));
	//var m_txtManual   = new TText(getPhrase(184));
	var m_txtType     = new TText('');
	var m_viewComp    = '';
	var m_vtbManual   = new TValidatableTextBox(300, new TPatternValidator(/^(([\u0600-\u06FFA-Za-z0-9_\-\.])+\;)*$/));
	var m_vtbMaxValue = new TValidatableTextBox(60, new TNumberValidator());
	var m_vtbMinValue = new TValidatableTextBox(60, new TNumberValidator());
	var m_vtbName     = new TValidatableTextBox(300, m_chvName);
	var m_vtbStep     = new TValidatableTextBox(60, new TNumberValidator());
	var m_window      = createWindow(getPhrase(158));
	var m_wndTrans    = null;

	var doChange = function() {
		var request = new TRequest();
		var descXML = '<Root></Root>';
		
		if (m_ddlCompo.getText() == getPhrase(174) && m_txtType.getText() != getPhrase(155) && m_txtType.getText() != getPhrase(156)) {
			if (m_chkManual.isChecked()) {
				descXML = '<Type>Manual</Type>';
				var values = m_ddlManual.getItemsIds();
				for (var i = 0; i < values.length; i++) {
					descXML += '<Value>' + values[i] + '</Value>';
				}
			} else {
				descXML = '<Type>Auto</Type><Value>' + m_ddlAuto.getSelectedId() + '</Value>';
			}
		}
		if (m_ddlCompo.getText() == getPhrase(175)) {
			descXML = '<MinValue>' +  m_vtbMinValue.getValue() + '</MinValue>';
			descXML += '<MaxValue>' +  m_vtbMaxValue.getValue() + '</MaxValue>';
			descXML += '<Step>' +  m_vtbStep.getValue() + '</Step>';
		}
		if (m_ddlCompo.getText() == getPhrase(324)) {
			var typesIds = m_chkgAccept.getCheckedIds();
			var types = '';
			if (typesIds.length) {
				for (var i = 0; i < typesIds.length; i++) {
					if (typesIds[i].id == '*.*') {
						types = '*.*';
						break;
					}
					if (i == typesIds.length - 1) {
						types += typesIds[i].id;
					} else {
						types += typesIds[i].id + ',';
					}
				}
			} else {
				types = '*.*';
			}
			
			descXML = '<Accept>' +  types + '</Accept>';
			descXML += '<Folder>' +  m_ddlFolders.getSelectedId() + '</Folder>';
		}
		if (m_txtType.getText() == getPhrase(169)) {
			descXML = '<Base>' +  m_ddlBase.getSelectedId() + '</Base>';
		}

		request.add('Id', m_propertyId);
		request.add('Name', m_vtbName.getValue());
		request.add('ViewComponent', m_ddlCompo.getSelectedId());
		request.add('ValueDescription', descXML, false);
		request.add('Required', m_chkRequired.isChecked());

		TAjax.sendRequest(m_window, 'serverscripts/ChangeEntityProperty.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('Id', m_propertyId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteEntityProperty.php', request.getRequest(), onDeletedOk, onDeletedError);
	};
	
	var hideLayouts = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.hide();
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(159));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(160), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_name = m_vtbName.getValue();
		m_chvName.setOriginalValue(m_name);
		m_required = m_chkRequired.isChecked();
		m_viewComp = m_ddlCompo.getText();
		
		if (m_viewComp == getPhrase(174) && m_txtType.getText() != getPhrase(155) && m_txtType.getText() != getPhrase(156)) {
			if (m_chkManual.isChecked()) {
				m_manualVals = '';
				var vals = m_ddlManual.getItemsIds();
				for (var i = 0; i < vals.length; i++) {
					m_manualVals += vals[i] + ';';
				}
			} else {
				m_autoValue = m_ddlAuto.getSelectedId();
			}
		} else if (m_viewComp == getPhrase(175)) {
			m_maxVal = m_vtbMaxValue.getValue();
			m_minVal = m_vtbMinValue.getValue();
			m_step = m_vtbStep.getValue();
		} else if (m_viewComp == getPhrase(324)) {
			m_mimeTypes = m_chkgAccept.getCheckedIds();
			m_folderId = m_ddlFolders.getSelectedId();
		} else if (m_txtType.getText() == getPhrase(169)) {
			m_base = m_ddlBase.getSelectedId();
		}
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(161), doChange);
	};

	var onCloseClick = function() {
		hideModal();
		hideLayouts();
	};
	
	var onDeleteValueClick = function() {
		if (m_ddlManual.getText() != '') {
			m_ddlManual.remove(m_ddlManual.getSelectedId());
			if (m_ddlManual.getItemsIds().length > 0) {
				m_ddlManual.setSelectedFirst();
			} else {
				m_ddlManual.clear();
			}
		
			onCloseClick();
			showModal(m_window);
			onSelectedComponentChanged();
			onSelectedPhraseValueChanged();
		}
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(162));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(163), onDeletedOkCompleted);
		} else if (tagResult == 'Used') {
			TMessageBox.showModal(getPhrase(22), getPhrase(164));
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		hideLayouts();
		callback();
	};
	
	var onDeleteEntityClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(165), doDelete);
	};

	var onFoldersError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(122));
	};

	var onFoldersOk = function(xmlDoc) {
		m_ddlFolders.clear();

        var elements = xmlDoc.getElementsByTagName('Folder');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlFolders.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlFolders.setSelectedFirst();
        var request = new TRequest();
        request.add('PropertyId', m_propertyId);
        TAjax.sendRequest(m_window, 'serverscripts/GetEntityProperty.php', request.getRequest(), onPropertyOk, onPropertyError);
	};
	
	var onManualValuesCheckChanged = function() {
		if (m_chkManual.isChecked()) {
			m_btnSelect.enable();
			//m_txtManual.enable();
			m_ddlManual.enable();
			m_txtAuto.disable();
			m_ddlAuto.disable();
			onSelectedPhraseValueChanged();
		} else {
			if (m_txtType.getText() != getPhrase(157)) {
				//m_txtManual.disable();
				m_ddlManual.disable();
				m_btnSelect.disable();
				m_btnDelete.disable();
				m_txtAuto.enable();
				m_ddlAuto.enable();
			} else { m_chkManual.setChecked(); }
		}
		validateUpdate();
	};
	
	var onPhraseSelected = function(id, value) {
		m_ddlManual.add(id, value);
		m_ddlManual.setSelectedFirst();
		m_btnDelete.enable();
		
		onCloseClick();
		showModal(m_window);
		onSelectedComponentChanged();
	};
	
	var onPropertiesNamesError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(186));
	};
	
	var onPropertiesNamesOk = function(xmlDoc) {
		m_ddlAuto.clear();

        var elements = xmlDoc.getElementsByTagName('Row');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlAuto.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlAuto.setSelectedFirst();
        
        onCloseClick();
        showModal(m_window);
        
        var request = new TRequest();
        TAjax.sendRequest(m_window, 'serverscripts/GetFoldersList.php', request.getRequest(), onFoldersOk, onFoldersError);
	};
	
	var onPropertyError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(190));
	};
	
	var onPropertyOk = function(xmlDoc) {
		m_name = getSimpleTagValue(xmlDoc, 'Name');
		m_chvName.setOriginalValue(m_name);
		m_vtbName.setValue(m_name);
		m_txtType.setText(getSimpleTagValue(xmlDoc, 'ValueType'));
		m_required = getSimpleTagValue(xmlDoc, 'Required');
		if (m_required) { m_chkRequired.check(); } else { m_chkRequired.uncheck(); }
		
		m_viewComp = getSimpleTagValue(xmlDoc, 'ViewComponent');
		m_ddlCompo.clear();
		if (m_txtType.getText() == getPhrase(151)) { // Text
			m_ddlCompo.add(172, getPhrase(172));
			m_ddlCompo.add(174, getPhrase(174));
		} else if (m_txtType.getText() == getPhrase(152)) { // HTML
			m_ddlCompo.add(173, getPhrase(173));
			m_ddlCompo.add(253, getPhrase(253));
		} else if (m_txtType.getText() == getPhrase(153) || m_txtType.getText() == getPhrase(154)) { // Number
			m_ddlCompo.add(172, getPhrase(172));
			m_ddlCompo.add(175, getPhrase(175));
		} else if (m_txtType.getText() == getPhrase(157)) { // Bool
			m_ddlCompo.add(176, getPhrase(176));
		} else if (m_txtType.getText() == getPhrase(155) || m_txtType.getText() == getPhrase(156)) { // Datetime
			m_ddlCompo.add(174, getPhrase(174));
		} else if (m_txtType.getText() == getPhrase(171)) { // URL
			m_ddlCompo.add(324, getPhrase(324));
		} else {
			m_ddlCompo.add(172, getPhrase(172));
		}
		m_ddlCompo.setSelectedItem(m_viewComp);
		
		if (m_viewComp == getPhrase(174) && m_txtType.getText() != getPhrase(155) && m_txtType.getText() != getPhrase(156)) {
			var vType = getSimpleTagValue(xmlDoc, 'Type');
			var elements = xmlDoc.getElementsByTagName('Value');
			if (vType == 'Manual') {
				m_chkManual.check();
				m_manualVals = '';
	
		        for (var i = 0; i < elements.length; i++) {
		            var nodes = elements[i].childNodes;
					
					if (nodes.length == 2) {
		                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
		                    m_ddlManual.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
		                    m_manualVals += nodes.item(0).firstChild.nodeValue + ';';
		                }
		            }
		        }
		        m_ddlManual.setSelectedFirst();
			} else if (vType == 'Auto') {
				m_chkManual.uncheck();
				m_autoValue = parseInt(elements[0].childNodes.item(0).firstChild.nodeValue);
				m_ddlAuto.setSelectedId(m_autoValue);
			}
		} else if (m_viewComp == getPhrase(175)) {
			m_maxVal = parseInt(getSimpleTagValue(xmlDoc, 'MaxValue'));
			m_vtbMaxValue.setValue(m_maxVal);
			m_minVal = parseInt(getSimpleTagValue(xmlDoc, 'MinValue'));
			m_vtbMinValue.setValue(m_minVal);
			m_step = parseInt(getSimpleTagValue(xmlDoc, 'Step'));
			m_vtbStep.setValue(m_step);
		} else if (m_viewComp == getPhrase(324)) {
			var types = getSimpleTagValue(xmlDoc, 'Accept').split(',');
			m_chkgAccept.setCheckedIds(types);
			m_mimeTypes = m_chkgAccept.getCheckedIds();
			m_folderId = parseInt(getSimpleTagValue(xmlDoc, 'Folder'));
			m_ddlFolders.setSelectedId(m_folderId);
		} else if (m_txtType.getText() == getPhrase(169)) {
			m_base = parseInt(getSimpleTagValue(xmlDoc, 'Base'));
			m_ddlBase.setSelectedId(m_base);
		}
		
		m_btnDeleteE.enable();
		
		onCloseClick();
        showModal(m_window);
        
        onSelectedComponentChanged();
        onManualValuesCheckChanged();
	};
	
	var onSelectClick = function() {
		if (!m_wndTrans) {
			m_wndTrans = new TTranslationWindow(true, onPhraseSelected);
		}
		m_wndTrans.show();
	};
	
	var onSelectedComponentChanged = function() {
		if (m_ddlCompo.getText() == getPhrase(175)) { // Slider
			viewSliderLayout();
		} else if (m_ddlCompo.getText() == getPhrase(174) && m_txtType.getText() != getPhrase(155) && m_txtType.getText() != getPhrase(156)) { // Dropdown
			viewDropDownLayout();
		} else if (m_txtType.getText() == getPhrase(171) && m_ddlCompo.getText() == getPhrase(324)) { // File Uploader
			viewFileUploadLayout();
		} else if (m_txtType.getText() == getPhrase(169)) { // Random
			viewRandoomLayout();
		} else {
			hideLayouts();
		}
		validateUpdate();
	};
	
	var onSelectedPhraseValueChanged = function() {
		if (m_ddlManual.getText()!= '') {
			m_btnDelete.enable();
		} else {
			m_btnDelete.disable();
		}
	};
	
	var validateUpdate = function() {
		m_btnChange.disable();
		if (m_vtbName.getValue() != '') {
			if (m_ddlCompo.getText() == getPhrase(174) && m_txtType.getText() != getPhrase(155) && m_txtType.getText() != getPhrase(156)) {
				if (m_chkManual.isChecked()) {
					if (m_ddlManual.getText() != '') {
						var vals = m_ddlManual.getItemsIds();
						var manVals = '';
						for (var i = 0; i < vals.length; i++) {
							manVals += vals[i] + ';';
						}
						if (m_vtbName.getValue() != m_name || manVals != m_manualVals || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp) {
							m_btnChange.enable();
						}
					}
				} else if (m_ddlAuto.getSelectedId() != m_autoValue || m_vtbName.getValue() != m_name || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp) {
					m_btnChange.enable();
				}
			} else if (m_ddlCompo.getText() == getPhrase(175)) {
				if (m_vtbMaxValue.isValid() && m_vtbMinValue.isValid() && m_vtbStep.isValid()) {
					if (m_vtbMaxValue.getValue() != m_maxVal || m_vtbMinValue.getValue() != m_minVal || m_vtbStep.getValue() != m_step || m_vtbName.getValue() != m_name || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp) {
						m_btnChange.enable();
					}
				}
			} else if (m_ddlCompo.getText() == getPhrase(324)) {
				if (m_ddlFolders.getSelectedId() != m_folderId || m_vtbName.getValue() != m_name || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp) {
					m_btnChange.enable();
				} else {
					var types = m_chkgAccept.getCheckedIds();
					if (m_mimeTypes.length != types.length) {
						m_btnChange.enable();
					} else {
						for (var i = 0; i < m_mimeTypes.length; i++) {
							if (m_mimeTypes[i].id != types[i].id) {
								m_btnChange.enable();
								break;
							}
						}
					}
				}
			} else if (m_txtType.getText() == getPhrase(169)){
				if (m_ddlBase.getSelectedId() != m_base || m_vtbName.getValue() != m_name || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp) {
					m_btnChange.enable();
				}
			} else if (m_vtbName.getValue() != m_name || m_chkRequired.isChecked() != m_required || m_ddlCompo.getText() != m_viewComp){
				m_btnChange.enable();
			}
		}
	};

	var viewDropDownLayout = function() {
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.hide();
		m_layDropDown.setOrder(m_brkLayout.getOrder());
		m_layDropDown.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_layDropDown.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_layDropDown.show();
	};
	
	var viewFileUploadLayout = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_laySlider.hide();
		m_layUploader.setOrder(m_brkLayout.getOrder());
		m_layUploader.move(m_brkLayout.getX(), m_brkLayout.getY());
		m_layUploader.show();
	};
	
	var viewRandoomLayout = function() {
		m_layDropDown.hide();
		m_laySlider.hide();
		m_layUploader.hide();
		m_layRandoom.setOrder(m_brkLayout.getOrder());
		m_layRandoom.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_layRandoom.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_layRandoom.show();
	};
	
	var viewSliderLayout = function() {
		m_layDropDown.hide();
		m_layRandoom.hide();
		m_layUploader.hide();
		m_laySlider.setOrder(m_brkLayout.getOrder());
		m_laySlider.move(m_brkLayout.getX() + (m_brkLayout.getWidth() - m_laySlider.getWidth()) / 2, m_brkLayout.getY() + 20);
		m_laySlider.show();
	};

	this.show = function(propertyId, entityId) {
		var request = new TRequest();
		request.add('ContentTypeId', entityId);
		
		m_propertyId = propertyId;
		m_btnChange.disable();
		m_btnDeleteE.disable();
		m_ddlManual.clear();
		m_vtbMaxValue.setValue('');
		m_vtbMinValue.setValue('');
		m_vtbName.setValue('');
		m_vtbStep.setValue('');
		showModal(m_window);
		TAjax.sendRequest(m_window, 'serverscripts/GetPropertiesNames.php', request.getRequest(), onPropertiesNamesOk, onPropertiesNamesError);
	};

	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteValueClick);
	m_btnDeleteE.setOnClick(onDeleteEntityClick);
	m_btnSelect.setOnClick(onSelectClick);
	m_chvName.setCallback(validateUpdate);
	m_chkgAccept.add('image/*', getPhrase(192));
	m_chkgAccept.add('video/*', getPhrase(194));
	m_chkgAccept.add('audio/*', getPhrase(193));
	m_chkgAccept.add('application/pdf', getPhrase(326));
	m_chkgAccept.add('application/x-shockwave-flash', getPhrase(327));
	m_chkgAccept.add('text/css', getPhrase(328));
	m_chkgAccept.add('text/html', getPhrase(329));
	m_chkgAccept.add('application/xml', getPhrase(330));
	m_chkgAccept.add('*.*', getPhrase(331));
	m_chkgAccept.setOnChange(validateUpdate);
	m_ddlFolders.setOnChange(validateUpdate);
	m_layUploader.setDirection(TLang.getDirection());
	m_layUploader.add(m_chkgAccept);
	m_layUploader.add(new TText(getPhrase(332)));
	m_layUploader.add(m_ddlFolders);
	m_ddlBase.add(10, '10');
	m_ddlBase.add(100, '100');
	m_ddlBase.add(1000, '1000');
	m_ddlBase.add(100000, '100000');
	m_ddlBase.add(1000000, '1000000');
	m_ddlBase.add(1000000000, '1000000000');
	m_ddlBase.setSelectedFirst();
	m_ddlBase.setOnChange(validateUpdate);
	m_layRandoom.setDirection(TLang.getDirection());
	m_layRandoom.add(new TText(getPhrase(333)));
	m_layRandoom.add(m_ddlBase);
	m_ddlCompo.add(172, getPhrase(172));
	m_ddlCompo.add(174, getPhrase(174));
	m_ddlCompo.setSelectedFirst();
	m_ddlCompo.setOnChange(onSelectedComponentChanged);
	m_ddlManual.setOnChange(onSelectedPhraseValueChanged);
	m_chkManual.setOnChange(onManualValuesCheckChanged);
	m_chkRequired.setOnChange(validateUpdate);
	m_layManual.setDirection(TLang.getDirection());
	m_layManual.add(m_ddlManual);
	m_layManual.add(m_btnDelete);
	m_layManual.add(m_btnSelect);
	m_layDropDown.add(m_chkManual);
	//m_layDropDown.add(m_txtManual);
	m_layDropDown.add(m_layManual);
	m_layDropDown.add(m_txtAuto);
	m_layDropDown.add(m_ddlAuto);
	m_laySlider.setDirection(TLang.getDirection());
	m_laySlider.add(new TText(getPhrase(179)), m_vtbMinValue);
	m_laySlider.add(new TText(getPhrase(180)), m_vtbMaxValue);
	m_laySlider.add(new TText(getPhrase(181)), m_vtbStep);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnDeleteE);
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(135) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(178) + ':'), m_chkRequired);
	m_layForm.add(new TText(getPhrase(136) + ':'), m_txtType);
	m_layForm.add(new TText(getPhrase(177) + ':'), m_ddlCompo);
	m_vtbMaxValue.setOnValidationChanged(validateUpdate);
	m_vtbMaxValue.setMaxLength(10);
	m_vtbMinValue.setOnValidationChanged(validateUpdate);
	m_vtbMinValue.setMaxLength(10);
	m_vtbName.setOnValidationChanged(validateUpdate);
	m_vtbName.setMaxLength(100);
	m_vtbStep.setOnValidationChanged(validateUpdate);
	m_vtbStep.setMaxLength(10);

	m_brkLayout.setHeight(m_layUploader.getHeight());
	m_brkLayout.setWidth(m_layUploader.getWidth());

	m_window.add(m_layForm);
	m_window.add(m_brkLayout);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditFolderWindow(callback) {
	var m_btnChange       = new TButton(getPhrase(27));
	var m_btnDelete       = new TButton(getPhrase(57));
	var m_btnClose        = new TButton(getPhrase(6));
	var m_chvName         = new TChangeValidator(new TEmptyValidator());
	var m_folderId        = 0;
	var m_layCommands     = new THorizontalLayout();
	var m_layForm         = new TFormLayout();
	var m_name            = '';
	var m_parentId        = 0;
	var m_txtParent       = new TText('');
	var m_vtbName         = new TValidatableTextBox(300, m_chvName);
	var m_window          = createWindow(getPhrase(123));

	var doChange = function() {
		var request = new TRequest();

		request.add('Id', m_folderId);
		request.add('ParentId', m_parentId);
		request.add('OldName', m_name);
		request.add('NewName', m_vtbName.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/RenameFolder.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('Id', m_folderId);
		request.add('Name', m_name);
		request.add('ParentId', m_parentId);
		TAjax.sendRequest(m_window, 'serverscripts/RemoveFolder.php', request.getRequest(), onDeletedOk, onDeletedError);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(124));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'Ok') {
			TMessageBox.showModal(getPhrase(22), getPhrase(125), onChangedOkCompleted);
		} else if (tagResult == 'Exists') {
			TMessageBox.showModal(getPhrase(22), getPhrase(126));
			m_vtbName.setValue('');
			m_btnChange.disable();
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_name = m_vtbName.getValue();
		m_chvName.setOriginalValue(m_name);
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(127), doChange);
	};

	var onCloseClick = function() {
		hideModal();
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(129));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'Ok') {
			TMessageBox.showModal(getPhrase(22), getPhrase(130), onDeletedOkCompleted);
		} else if (tagResult == 'Used') {
			TMessageBox.showModal(getPhrase(22), getPhrase(131));
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(128), doDelete);
	};
	
	var onFolderError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(132), hideModal);
	};

	var onFolderOk = function(xmlDoc) {
		m_parentId = parseInt(getSimpleTagValue(xmlDoc, 'ParentId'));
		m_btnDelete.enable();
		m_btnClose.enable();
	};

	var validateUpdate = function() {
		if (m_vtbName.isValid()) {
			if (m_vtbName.getValue() != m_name) {
				m_btnChange.enable();
			} else {
				m_btnChange.disable();
			}
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(folderId, name, parentName) {
		m_folderId = folderId;
		m_name = name;
		m_chvName.setOriginalValue(m_name);
		m_vtbName.setValue(m_name);
		m_btnChange.disable();
		m_btnClose.disable();
		m_btnDelete.disable();
		m_txtParent.setText(parentName);
		showModal(m_window);
		
		var request = new TRequest();
		request.add('Id', m_folderId);
		TAjax.sendRequest(m_window, 'serverscripts/GetFolder.php', request.getRequest(), onFolderOk, onFolderError);
	};

	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_chvName.setCallback(validateUpdate);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(115) + ':'), m_vtbName);
	m_layForm.add(new TText(getPhrase(116) + ':'), m_txtParent);
	m_vtbName.setOnValidationChanged(validateUpdate);
	m_vtbName.setMaxLength(50);
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditGroupWindow(callback) {
	var m_btnAdd          = new TButton(getPhrase(21));
	var m_btnChange       = new TButton(getPhrase(27));
	var m_btnDelete       = new TButton(getPhrase(57));
	var m_btnRemove       = new TButton(getPhrase(58));
	var m_btnClose        = new TButton(getPhrase(6));
	var m_chvName         = new TChangeValidator(new TEmptyValidator());
	var m_gbPermissionss  = new TGroupBox(getPhrase(59));
	var m_gbUsers         = new TGroupBox(getPhrase(60));
	var m_groupId         = 0;
	var m_layCommands     = new THorizontalLayout();
	var m_layForm         = new TFormLayout();
	var m_layPermCommands = new THorizontalLayout();
	var m_layTables       = new THorizontalLayout();
	var m_name            = '';
	var m_tblPermissions  = new TTable(10, 'serverscripts/GetGroupPermissions.php', false, 'Single');
	var m_tblUsers        = new TTable(10, 'serverscripts/GetGroupUsers.php', false);
	var m_vtbName         = new TValidatableTextBox(300, m_chvName);
	var m_window          = createWindow(getPhrase(61));
	var m_wndEditUser     = null;
	var m_wndSelectPerm   = null;

	var doChange = function() {
		var request = new TRequest();

		request.add('GroupId', m_groupId);
		request.add('Name', m_vtbName.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeGroup.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('GroupId', m_groupId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteGroup.php', request.getRequest(), onDeletedOk, onDeletedError);
	};

	var enableAddPermissionButton = function() {
		m_btnAdd.enable();
	};
	
	var onAddPermissionToGroupClick = function() {
		if (m_wndSelectPerm == null) {
			m_wndSelectPerm = new TSelectPermissionWindow(updatePermissions);
		}
		m_wndSelectPerm.show(m_groupId);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(62));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(63), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_name = m_vtbName.getValue();
		m_chvName.setOriginalValue(m_name);
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(64), doChange);
	};

	var onCloseClick = function() {
		hideModal();
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(65));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(66), onDeletedOkCompleted);
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(67), doDelete);
	};
	
	var onGroupError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(68), hideModal);
	};

	var onGroupOk = function(xmlDoc) {
		m_name = getSimpleTagValue(xmlDoc, 'Name');
		m_chvName.setOriginalValue(m_name);
		m_vtbName.setValue(m_name);
		m_btnDelete.enable();
		m_btnClose.enable();
		updatePermissions();
		updateUsers();
	};
	
	var onRemovedFromGroupError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(69));
	};

	var onRemovedFromGroupOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(70), onRemovedFromGroupOkCompleted);
		} else {
			onRemovedFromGroupError(text);
		}
	};
	
	var onRemovedFromGroupOkCompleted = function() {
		updatePermissions();
		m_btnRemove.disable();
	};
	
	var onRemovePermissionFromGroupClick = function() {
		if (m_tblPermissions.hasSelection()) {
			var Ids = m_tblPermissions.getSelectedIds();
			var request = new TRequest();

			request.add('GroupId', m_groupId);
			request.add('PermissionId', parseInt(Ids[0]));
			
			TAjax.sendRequest(m_window, 'serverscripts/RemovePermissionFromGroup.php', request.getRequest(), onRemovedFromGroupOk, onRemovedFromGroupError);
		} else {
			TMessageBox.showModal(getPhrase(7), getPhrase(71));
		}
	};
	
	var onSelectedPermissionChanged = function() {
		if (m_tblPermissions.hasSelection()) {
			m_btnRemove.enable();
		} else {
			m_btnRemove.disable();
		}
	};
	
	var onUserSelected = function(userId) {
		if (m_wndEditUser == null) {
			m_wndEditUser = new TEditUserWindow(updateUsers);
		}

		m_wndEditUser.show(userId);
	};
	
	var updatePermissions = function() {
		m_tblPermissions.setAuxiliaryParameters('<GroupId>' + m_groupId + '</GroupId>');
		m_tblPermissions.update(enableAddPermissionButton);
	};

	var updateUsers = function() {
		m_tblUsers.setAuxiliaryParameters('<GroupId>' + m_groupId + '</GroupId>');
		m_tblUsers.update();
	};

	var validateUpdate = function() {
		if (m_vtbName.isValid()) {
			if (m_vtbName.getValue() != m_name) {
				m_btnChange.enable();
			} else {
				m_btnChange.disable();
			}
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(groupId) {
		m_groupId = groupId;
		m_btnAdd.disable();
		m_btnChange.disable();
		m_btnClose.disable();
		m_btnDelete.disable();
		m_btnRemove.disable();
		showModal(m_window);
		
		var request = new TRequest();
		request.add('GroupId', m_groupId);
		TAjax.sendRequest(m_window, 'serverscripts/GetGroup.php', request.getRequest(), onGroupOk, onGroupError);
	};

	m_btnAdd.setOnClick(onAddPermissionToGroupClick);
	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_btnRemove.setOnClick(onRemovePermissionFromGroupClick);
	m_chvName.setCallback(validateUpdate);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnClose);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(52) + ':'), m_vtbName);
	m_layPermCommands.setDirection(TLang.getDirection());
	m_layPermCommands.add(m_btnAdd);
	m_layPermCommands.add(m_btnRemove);
	m_tblPermissions.addColumn('Action', getPhrase(72), 300);
	m_tblPermissions.setOnSelectionChangedCallback(onSelectedPermissionChanged);
	m_tblUsers.addColumn('Name', getPhrase(73), 150);
	m_tblUsers.addColumn('Email', getPhrase(74), 150);
	m_tblUsers.addColumn('Username', getPhrase(11), 150);
	m_tblUsers.setOnClick(onUserSelected);
	m_gbPermissionss.add(m_tblPermissions);
	m_gbPermissionss.add(m_layPermCommands);
	m_gbUsers.add(m_tblUsers);
	m_layTables.setDirection(TLang.getDirection());
	m_layTables.add(m_gbUsers);
	m_layTables.add(m_gbPermissionss);
	m_vtbName.setOnValidationChanged(validateUpdate);
	m_vtbName.setMaxLength(50);
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layTables);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditLanguageWindow(callback) {
	var m_btnChange       = new TButton(getPhrase(27));
	var m_btnClose        = new TButton(getPhrase(6));
	var m_ddlStatus       = new TDropdownList();
	var m_formLayout      = new TFormLayout();
	var m_languageId      = 0;
	var m_languageStatus  = 0;
	var m_layCommands     = new THorizontalLayout();
	var m_txtLanguage     = new TText('');
	var m_window          = createWindow(getPhrase(28));
	
	var onChangeClick = function() {
		var request = new TRequest();

		request.add('LanguageId', m_languageId);
		request.add('Status', m_ddlStatus.getSelectedId());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeLanguage.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(29));
	};
	
	var onChangedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
			
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(30), onCompleted);
		} else {
			onChangedError('');
		}
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onCompleted = function() {
		hideModal();
		callback();
	};

	var onStatusChanged = function(languageStatus) {
		if (m_languageStatus != languageStatus) {
			m_btnChange.enable();
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(languageId, languageName, languageStatus) {
		m_languageId = languageId;
		m_ddlStatus.setSelectedId(languageStatus);
		m_languageStatus = languageStatus;
		m_txtLanguage.setText(languageName);
		showModal(m_window);
		m_btnChange.disable();
	};

	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_ddlStatus.add(0, getPhrase(31));
	m_ddlStatus.add(1, getPhrase(32));
	m_ddlStatus.setOnChange(onStatusChanged);
	m_formLayout.setDirection(TLang.getDirection());
	m_formLayout.add(new TText(getPhrase(19) + ':'), m_txtLanguage);
	m_formLayout.add(new TText(getPhrase(20) + ':'), m_ddlStatus);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnClose);

	m_window.add(m_formLayout);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEditUserWindow(callback) {
	var m_address          = '';
	var m_btnAdd           = new TButton(getPhrase(21));
	var m_btnChange        = new TButton(getPhrase(27));
	var m_btnDelete        = new TButton(getPhrase(57));
	var m_btnRemove        = new TButton(getPhrase(58));
	var m_btnClose         = new TButton(getPhrase(6));
	var m_chvAddress       = new TChangeValidator(new TEmptyValidator());
	var m_chvPhone         = new TChangeValidator(new TEmptyValidator());
	var m_chvUsername      = new TChangeValidator(new TEmptyValidator());
	var m_ddlSex           = new TDropdownList();
	var m_gbActions        = new TGroupBox(getPhrase(96));
	var m_gbGroups         = new TGroupBox(getPhrase(97));
	var m_layCommands      = new THorizontalLayout();
	var m_layForm          = new TFormLayout();
	var m_layGroupCommands = new THorizontalLayout();
	var m_layTables        = new THorizontalLayout();
	var m_phone            = '';
	var m_sex              = 0;
	var m_tblActions       = new TTable(10, 'serverscripts/GetUserActions.php', false);
	var m_tblGroups        = new TTable(5, 'serverscripts/GetUserGroups.php', false, 'Single');
	var m_tbxEmail         = new TTextBox(300);
	var m_tbxName          = new TTextBox(300);
	var m_userId           = 0;
	var m_username         = '';
	var m_vtbAddress       = new TValidatableTextBox(300, m_chvAddress);
	var m_vtbPassword      = new TValidatableTextBox(150, new TEmptyValidator(), true);
	var m_vtbPhone         = new TValidatableTextBox(150, m_chvPhone);
	var m_vtbUsername      = new TValidatableTextBox(150, m_chvUsername);
	var m_window           = createWindow(getPhrase(98));
	var m_wndSelectGroup   = null;

	var doChange = function() {
		var request = new TRequest();

		request.add('UserId', m_userId);
		request.add('Address', m_vtbAddress.getValue());
		request.add('Password', m_vtbPassword.getValue());
		request.add('Phone', m_vtbPhone.getValue());
		request.add('Username', m_vtbUsername.getValue());
		request.add('Sex', m_ddlSex.getSelectedId());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeUser.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var doDelete = function() {
		var request = new TRequest();

		request.add('UserId', m_userId);
		TAjax.sendRequest(m_window, 'serverscripts/DeleteUser.php', request.getRequest(), onDeletedOk, onDeletedError);
	};

	var enableAddGroupButton = function() {
		m_btnAdd.enable();
	};
	
	var onAddUserToGroupClick = function() {
		if (m_wndSelectGroup == null) {
			m_wndSelectGroup = new TSelectGroupWindow(updateGroups);
		}
		m_wndSelectGroup.show(m_userId);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(99));
	};

	var onChangedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(100), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};

	var onChangedOkCompleted = function() {
		m_address = m_vtbAddress.getValue();
		m_phone = m_vtbPhone.getValue();
		m_username = m_vtbUsername.getValue();
		m_sex = m_ddlSex.getSelectedId();
		m_chvAddress.setOriginalValue(m_address);
		m_chvPhone.setOriginalValue(m_phone);
		m_chvUsername.setOriginalValue(m_username);
		callback();
	};

	var onChangeClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(101), doChange);
	};

	var onCloseClick = function() {
		hideModal();
		callback();
	};
	
	var onDeletedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(102));
	};

	var onDeletedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(103), onDeletedOkCompleted);
		} else {
			onDeletedError(text);
		}
	};
	
	var onDeletedOkCompleted = function() {
		hideModal();
		callback();
	};
	
	var onDeleteClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(104), doDelete);
	};
	
	var onUserError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(105), hideModal);
	};

	var onUserOk = function(xmlDoc) {
		m_username = getSimpleTagValue(xmlDoc, 'Username');
		m_sex = getSimpleTagValue(xmlDoc, 'Sex');
		m_address = getSimpleTagValue(xmlDoc, 'Address');
		m_phone = getSimpleTagValue(xmlDoc, 'Phone');
		m_chvAddress.setOriginalValue(m_address);
		m_chvPhone.setOriginalValue(m_phone);
		m_chvUsername.setOriginalValue(m_username);
		m_ddlSex.setSelectedId(m_sex);
		m_tbxEmail.setValue(getSimpleTagValue(xmlDoc, 'Email'));
		m_tbxName.setValue(getSimpleTagValue(xmlDoc, 'Name'));
		m_vtbAddress.setValue(m_address);
		m_vtbPhone.setValue(m_phone);
		m_vtbUsername.setValue(m_username);
		m_btnDelete.enable();
		m_btnClose.enable();
		updateActions();
		updateGroups();
	};
	
	var onRemovedFromGroupError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(106));
	};

	var onRemovedFromGroupOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(107), onRemovedFromGroupOkCompleted);
		} else {
			onRemovedFromGroupError(text);
		}
	};
	
	var onRemovedFromGroupOkCompleted = function() {
		updateGroups();
		m_btnRemove.disable();
	};
	
	var onRemoveUserFromGroupClick = function() {
		if (m_tblGroups.hasSelection()) {
			var Ids = m_tblGroups.getSelectedIds();
			var request = new TRequest();

			request.add('UserId', m_userId);
			request.add('GroupId', parseInt(Ids[0]));
			
			TAjax.sendRequest(m_window, 'serverscripts/RemoveUserFromGroup.php', request.getRequest(), onRemovedFromGroupOk, onRemovedFromGroupError);
		} else {
			TMessageBox.showModal(getPhrase(7), getPhrase(108));
		}
	};
	
	var onSelectedGroupChanged = function() {
		if (m_tblGroups.hasSelection()) {
			m_btnRemove.enable();
		} else {
			m_btnRemove.disable();
		}
	};
	
	var updateActions = function() {
		m_tblActions.setAuxiliaryParameters('<UserId>' + m_userId + '</UserId>');
		m_tblActions.update();
	};

	var updateGroups = function() {
		m_tblGroups.setAuxiliaryParameters('<UserId>' + m_userId + '</UserId>');
		m_tblGroups.update(enableAddGroupButton);
	};

	var validateUpdate = function() {
		if (m_vtbPassword.isValid() && m_vtbAddress.isValid() && m_vtbPhone.isValid() && m_vtbUsername.isValid()) {
			if (m_vtbAddress.getValue() != m_address || m_vtbPhone.getValue() != m_phone || m_vtbUsername.getValue() != m_username || m_ddlSex.getSelectedId() != m_sex) {
				m_btnChange.enable();
			} else {
				m_btnChange.disable();
			}
		} else {
			m_btnChange.disable();
		}
	};

	this.show = function(userId) {
		m_userId = userId;
		m_btnAdd.disable();
		m_btnChange.disable();
		m_btnClose.disable();
		m_btnDelete.disable();
		m_btnRemove.disable();
		showModal(m_window);
		
		var request = new TRequest();
		request.add('UserId', m_userId);
		TAjax.sendRequest(m_window, 'serverscripts/GetUser.php', request.getRequest(), onUserOk, onUserError);
	};

	m_btnAdd.setOnClick(onAddUserToGroupClick);
	m_btnChange.setOnClick(onChangeClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDelete.setOnClick(onDeleteClick);
	m_btnRemove.setOnClick(onRemoveUserFromGroupClick);
	m_chvAddress.setCallback(validateUpdate);
	m_chvPhone.setCallback(validateUpdate);
	m_chvUsername.setCallback(validateUpdate);
	m_ddlSex.add(0, getPhrase(87));
	m_ddlSex.add(1, getPhrase(88));
	m_ddlSex.setOnChange(validateUpdate);
	m_ddlSex.setSelectedFirst();
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnDelete);
	m_layCommands.add(m_btnChange);
	m_layCommands.add(m_btnClose);
	m_layGroupCommands.setDirection(TLang.getDirection());
	m_layGroupCommands.add(m_btnAdd);
	m_layGroupCommands.add(m_btnRemove);
	m_layForm.setDirection(TLang.getDirection());
	m_layForm.add(new TText(getPhrase(73) + ':'), m_tbxName);
	m_layForm.add(new TText(getPhrase(74) + ':'), m_tbxEmail);
	m_layForm.add(new TText(getPhrase(89) + ':'), m_vtbAddress);
	m_layForm.add(new TText(getPhrase(81) + ':'), m_vtbPhone);
	m_layForm.add(new TText(getPhrase(90) + ':'), m_ddlSex);
	m_layForm.add(new TText(getPhrase(11) + ':'), m_vtbUsername);
	m_layForm.add(new TText(getPhrase(12) + ':'), m_vtbPassword);
	m_vtbAddress.setOnValidationChanged(validateUpdate);
	m_vtbPassword.setMaxLength(50);
	m_vtbPassword.setOnValidationChanged(validateUpdate);
	m_vtbPhone.setMaxLength(20);
	m_vtbPhone.setOnValidationChanged(validateUpdate);
	m_vtbUsername.setMaxLength(50);
	m_vtbUsername.setOnValidationChanged(validateUpdate);
	m_tblActions.addColumn('Action', getPhrase(79), 300);
	m_tblActions.addColumn('Date', getPhrase(109), 150);
	m_tblGroups.addColumn('Group', getPhrase(52), 300);
	m_tblGroups.setOnSelectionChangedCallback(onSelectedGroupChanged);
	m_gbActions.add(m_tblActions);
	m_gbGroups.add(m_tblGroups);
	m_gbGroups.add(m_layGroupCommands);
	m_layTables.setDirection(TLang.getDirection());
	m_layTables.add(m_gbActions);
	m_layTables.add(m_gbGroups);
	m_window.add(m_layForm);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layTables);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TEntityWindow(mode, callback) {
	var m_btnEntity      = (mode == 'Add') ? new TButton(getPhrase(21)) : new TButton(getPhrase(27));
	var m_btnAddProperty = new TButton(getPhrase(133));
	var m_btnClose       = new TButton(getPhrase(6));
	var m_chvName        = new TChangeValidator(new TEmptyValidator());
	var m_entityId       = 0;
	var m_gbProperties   = new TGroupBox(getPhrase(137));
	var m_layCommands    = new THorizontalLayout();
	var m_layGrid        = new TGridLayout(3, 1);
	var m_name           = '';
	var m_tblProperties  = new TTable(10, 'serverscripts/GetEntityProperties.php', false);
	var m_vtbName        = new TValidatableTextBox(250, m_chvName);
	var m_window         = createWindow(getPhrase(143));
	var m_wndEdit        = null;
	
	var doAdd = function() {
		var request = new TRequest();

		request.add('Name', m_vtbName.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/AddEntity.php', request.getRequest(), onAddedOk, onAddedError);
	};
	
	var doChange = function() {
		var request = new TRequest();

		request.add('Id', m_entityId);
		request.add('Name', m_vtbName.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/ChangeEntity.php', request.getRequest(), onChangedOk, onChangedError);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(145));
	};
	
	var onAddedOk = function(xmlDoc) {
		var entityId = getSimpleTagValue(xmlDoc, 'EntityId');
		
		if (entityId != '') {	
			m_entityId = entityId;
			m_btnAddProperty.enable();
			m_tblProperties.setOnClick(onPropertySelected);
			updateProperties();
			m_vtbName.disable();
			m_btnEntity.disable();
			TMessageBox.showModal(getPhrase(22), getPhrase(146));
		} else {
			onAddedError('');
		}
	};
	
	var onAddPropertyClick = function() {
		wndAdd = new TAddEntityPropertyWindow(updateProperties);
		wndAdd.show(m_entityId);
	};
	
	var onChangedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(149));
	};
	
	var onChangedOk = function(xmlDoc) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(150), onChangedOkCompleted);
		} else {
			onChangedError(text);
		}
	};
	
	var onChangedOkCompleted = function() {
		m_name = m_vtbName.getValue();
		m_chvName.setOriginalValue(m_name);
		callback();
	};
	
	var onCloseClick = function() {
		hideModal();
		callback();
	};
	
	var onEntityClick = function() {
		if (mode == 'Add') {
			TQuestionBox.showModal(getPhrase(22), getPhrase(144), doAdd);
		} else {
			TQuestionBox.showModal(getPhrase(22), getPhrase(148), doChange);
		}
	};
	
	var onEntityError = function() {
		TMessageBox.showModal(getPhrase(7), getPhrase(147), hideModal);
	};
	
	var onEntityOk = function(xmlDoc) {
		m_name = getSimpleTagValue(xmlDoc, 'Name');
		m_chvName.setOriginalValue(m_name);
		m_vtbName.setValue(m_name);
		updateProperties();
		m_btnAddProperty.enable();
	};
	
	var onPropertySelected = function(propertyId) {
		if (getPhrase(270) != m_tblProperties.getCellByName(propertyId, 'Name')) {
			if (m_wndEdit == null) {
				m_wndEdit = new TEditEntityPropertyWindow(updateProperties);
			}
	
			m_wndEdit.show(propertyId, m_entityId);	
		}
	};

	var updateProperties = function() {
		m_tblProperties.setAuxiliaryParameters('<ContentTypeId>' + m_entityId + '</ContentTypeId>');
		m_tblProperties.update();
	};
	
	var validateEntityButton = function() {
		if (m_vtbName.isValid()) {
			if (m_vtbName.getValue() != m_name) {
				m_btnEntity.enable();
			} else {
				m_btnEntity.disable();
			}
		} else {
			m_btnEntity.disable();
		}
	};
	
	this.show = function(entityId) {
		if (mode == 'Add') {
			m_vtbName.setValue('');
			m_tblProperties.setOnClick(null);
			m_chvName.setOriginalValue('');
		} else {
			m_entityId = entityId;
			var request = new TRequest();
			m_tblProperties.setOnClick(onPropertySelected);
			request.add('Id', m_entityId);
			TAjax.sendRequest(m_window, 'serverscripts/GetEntity.php', request.getRequest(), onEntityOk, onEntityError);
		}
		
		m_btnAddProperty.disable();
		m_btnEntity.disable();
		
		showModal(m_window);
	};
	
	m_btnEntity.setOnClick(onEntityClick);
	m_btnAddProperty.setOnClick(onAddPropertyClick);
	m_btnClose.setOnClick(onCloseClick);
	m_chvName.setCallback(validateEntityButton);
	m_layGrid.setDirection(TLang.getDirection());
	m_layGrid.setCell(0, 0, new TText(getPhrase(138)));
	m_layGrid.setCell(1, 0, m_vtbName);
	m_layGrid.setCell(2, 0, m_btnEntity);
	m_tblProperties.addColumn('Name', getPhrase(135), 300);
	m_tblProperties.addColumn('ValueType', getPhrase(136), 150);
	m_gbProperties.add(m_tblProperties);
	m_gbProperties.add(m_btnAddProperty);
	m_vtbName.setOnValidationChanged(validateEntityButton);
	m_vtbName.setMaxLength(100);
	m_window.add(m_layGrid);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_gbProperties);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_btnClose);
};

function TFoldersWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_tblFolders  = new TTable(10, 'serverscripts/GetFolders.php');
	var m_window      = createWindow(getPhrase(114));
	var m_wndAdd      = null;
	var m_wndEdit     = null;
	
	var onAddClick = function() {
		if (!m_wndAdd) {
			m_wndAdd = new TAddFolderWindow(updateFolders);
		}
		m_wndAdd.show();
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onFolderSelected = function(folderId) {
		if (m_wndEdit == null) {
			m_wndEdit = new TEditFolderWindow(updateFolders);
		}

		m_wndEdit.show(folderId, m_tblFolders.getCellByName(folderId, 'Name'), m_tblFolders.getCellByName(folderId, 'ParentName'));
	};

	var updateFolders = function() {
		m_tblFolders.update();
	};
	
	this.show = function() {
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblFolders.addColumn('Name', getPhrase(115), 300);
	m_tblFolders.addColumn('ParentName', getPhrase(116), 300);
	m_tblFolders.setOnClick(onFolderSelected);
	m_window.add(m_tblFolders);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TGroupsWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_tblGroups   = new TTable(5, 'serverscripts/GetGroups.php');
	var m_window      = createWindow(getPhrase(50));
	var m_wndAdd      = null;
	var m_wndEdit     = null;
	
	var onAddClick = function() {
		if (!m_wndAdd) {
			m_wndAdd = new TAddGroupWindow(updateGroups);
		}
		m_wndAdd.show();
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onGroupSelected = function(groupId) {
		if (m_wndEdit == null) {
			m_wndEdit = new TEditGroupWindow(updateGroups);
		}

		m_wndEdit.show(groupId);
	};

	var updateGroups = function() {
		m_tblGroups.update();
	};
	
	this.show = function() {
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblGroups.addColumn('Group', getPhrase(52), 300);
	m_tblGroups.setOnClick(onGroupSelected);
	m_window.add(m_tblGroups);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TLocalizationWindow() {
	var m_btnAddLanguage  = new TButton(getPhrase(14));
	var m_btnToMainMenu   = new TButton(getPhrase(15));
	var m_btnTranslation  = new TButton(getPhrase(16));
	var m_layCommands     = new THorizontalLayout();
	var m_tblLanguages    = new TTable(10, 'serverscripts/GetLanguages.php');
	var m_txtLanguages    = new TText(getPhrase(18));
	var m_window          = createWindow(getPhrase(17));
	var m_wndAddLanguage  = null;
	var m_wndEditLanguage = null;
	var m_wndTranslation  = null;
	
	var onAddLanguageClick = function() {
		if (m_wndAddLanguage == null) {
			m_wndAddLanguage = new TAddLanguageWindow(updateLanguages);
		}

		m_wndAddLanguage.show();
	};

	var onLanguageSelected = function(languageId) {
		if (m_wndEditLanguage == null) {
			m_wndEditLanguage = new TEditLanguageWindow(updateLanguages);
		}
		
		m_wndEditLanguage.show(languageId, m_tblLanguages.getCellByName(languageId, 'Name'), m_tblLanguages.getCellByName(languageId, 'Status'));
	};

	var onToMainMenuClick = function() {
		hideModal();
	};
	
	var onTranslationClick = function() {
		if (m_wndTranslation == null) {
			m_wndTranslation = new TTranslationWindow(false);
		}

		m_wndTranslation.show();
	};

	var updateLanguages = function() {
		m_tblLanguages.update();
	};

	this.show = function() {
		showModal(m_window);
	};
	
	m_btnAddLanguage.setOnClick(onAddLanguageClick);
	m_btnToMainMenu.setOnClick(onToMainMenuClick);
	m_btnTranslation.setOnClick(onTranslationClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAddLanguage);
	m_layCommands.add(m_btnTranslation);
	m_layCommands.add(m_btnToMainMenu);
	m_tblLanguages.addColumn('Name', getPhrase(19), 270);
	//m_tblLanguages.addColumn('Phrases', getPhrase(44), 100);
	m_tblLanguages.addColumn('Status', getPhrase(20), 100);
	m_tblLanguages.setOnClick(onLanguageSelected);

	m_window.add(m_txtLanguages);
	m_window.add(m_tblLanguages);
	m_window.add(m_layCommands);
};

function TModulesWindow() {
	var m_btnClose      = new TButton(getPhrase(6));
	
};

function TPhraseTranslationWindow(setterCallback) {
	var m_btnReturn      = new TButton(getPhrase(6));
	var m_btnTranslate   = new TButton(getPhrase(47));
	var m_languageTo     = 0;
	var m_layCommands    = new THorizontalLayout();
	var m_layData        = new TVerticalLayout();
	var m_phraseId       = 0;
	var m_setterCallback = setterCallback === undefined ? null : setterCallback;
	var m_tbxFrom        = new TTextBox(400);
	var m_tbxTo          = new TTextBox(400);
	var m_txtSource      = new TText('');
	var m_txtTarget      = new TText('');
	var m_window         = createWindow(getPhrase(48));
	
	var onCompleted = function() {
		hideModal();
		
		if (m_setterCallback != null) {
			m_setterCallback(m_tbxTo.getValue());
		}
	};

	var onReturnClick = function() {
		hideModal();
	};
	
	var onTranslateClick = function() {
		var request = new TRequest();

		request.add('LanguageId', m_languageTo);
		request.add('PhraseId', m_phraseId);
		request.add('Translation', m_tbxTo.getValue());
		TAjax.sendRequest(m_window, 'serverscripts/Translate.php', request.getRequest(), onTranslatedOk, onTranslatedError);
	};
	
	var onTranslatedError = function(text) {
		TMessageBox.showModal(getPhrase(7), 'Error');
	};
	
	var onTranslatedOk = function(xmlDoc) {
		var elements = xmlDoc.getElementsByTagName('Result');
			
		if (elements.length == 1 && elements[0].firstChild && elements[0].firstChild.nodeValue == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(49), onCompleted);
		} else {
			onTranslatedError('');
		}
	};

	this.setPhrase = function(phraseId, phraseFrom, phraseTo, languageTo, langNameFrom, langNameTo) {
		m_phraseId = phraseId;
		m_languageTo = languageTo;
		m_tbxFrom.setValue(fromHtml(phraseFrom));
		m_tbxTo.setValue(fromHtml(phraseTo));
		m_txtSource.setText(getPhrase(41) + ' (' + langNameFrom + ')');
		m_txtTarget.setText(getPhrase(42) + ' (' + langNameTo + ')');
	};

	this.show = function() {
		showModal(m_window);
	};

	m_btnReturn.setOnClick(onReturnClick);
	m_btnTranslate.setOnClick(onTranslateClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnTranslate);
	m_layCommands.add(m_btnReturn);
	m_layData.add(m_txtSource);
	m_layData.add(m_tbxFrom);
	m_layData.add(m_txtTarget);
	m_layData.add(m_tbxTo);
	m_tbxFrom.disable();
	m_tbxFrom.setMaxLength(100);
	m_tbxTo.setMaxLength(100);
	m_txtSource.alignLeft();
	m_txtTarget.alignLeft();

	m_window.add(m_layData);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TSelectGroupWindow(callback) {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_userId      = 0;
	var m_tblGroups   = new TTable(5, 'serverscripts/GetGroups.php', false, 'Multi');
	var m_window      = createWindow(getPhrase(110));
	
	var doAdd = function() {
	  	var request = new TRequest();
	  	var groups = m_tblGroups.getSelectedIds();

		request.add('UserId', m_userId);
		request.add('GroupsNumber', groups.length);
		var xmlStr = '';
		for (var i = 0; i < groups.length; i++) {
			xmlStr += '<GroupId>' + groups[i] + '</GroupId>';
		}
		request.add('GroupsIds', xmlStr, false);
		
		TAjax.sendRequest(m_window, 'serverscripts/AddUserToGroup.php', request.getRequest(), onAddedOk, onAddedError);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(111));
	};
	
	var onAddedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(112), onAddedOkCompleted);
		} else {
			onAddedError(text);
		}
	};
	
	var onAddedOkCompleted = function() {
		callback();
		hideModal();
	};
	
	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(113), doAdd);
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onSelectionChanged = function() {
		if (m_tblGroups.hasSelection()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};
	
	this.show = function(userId) {
		m_userId = userId;
		m_btnAdd.disable();
		m_tblGroups.update();
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblGroups.addColumn('Group', getPhrase(52), 150);
	m_tblGroups.setOnSelectionChangedCallback(onSelectionChanged);
	m_window.add(m_tblGroups);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TSelectPermissionWindow(callback) {
	var m_btnAdd         = new TButton(getPhrase(21));
	var m_btnClose       = new TButton(getPhrase(6));
	var m_layCommands    = new THorizontalLayout();
	var m_groupId        = 0;
	var m_tblPermissions = new TTable(10, 'serverscripts/GetPermissions.php', false, 'Multi');
	var m_window         = createWindow(getPhrase(75));
	
	var doAdd = function() {
	  	var request = new TRequest();
	  	var permissions = m_tblPermissions.getSelectedIds();

		request.add('GroupId', m_groupId);
		request.add('PermissionsNumber', permissions.length);
		var xmlStr = '';
		for (var i = 0; i < permissions.length; i++) {
			xmlStr += '<PermissionId>' + permissions[i] + '</PermissionId>';
		}
		request.add('PermissionsIds', xmlStr, false);
		
		TAjax.sendRequest(m_window, 'serverscripts/AddPermissionToGroup.php', request.getRequest(), onAddedOk, onAddedError);
	};
	
	var onAddedError = function(text) {
		TMessageBox.showModal(getPhrase(7), getPhrase(76));
	};
	
	var onAddedOk = function(xmlDoc, text) {
		var tagResult = getSimpleTagValue(xmlDoc, 'Result');
		
		if (tagResult == 'OK') {
			TMessageBox.showModal(getPhrase(22), getPhrase(77), onAddedOkCompleted);
		} else {
			onAddedError(text);
		}
	};
	
	var onAddedOkCompleted = function() {
		callback();
		hideModal();
	};
	
	var onAddClick = function() {
		TQuestionBox.showModal(getPhrase(22), getPhrase(78), doAdd);
	};
	
	var onCloseClick = function() {
		hideModal();
	};
	
	var onSelectionChanged = function() {
		if (m_tblPermissions.hasSelection()) {
			m_btnAdd.enable();
		} else {
			m_btnAdd.disable();
		}
	};
	
	this.show = function(groupId) {
		m_groupId = groupId;
		m_btnAdd.disable();
		m_tblPermissions.update();
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblPermissions.addColumn('Action', getPhrase(79), 300);
	m_tblPermissions.setOnSelectionChangedCallback(onSelectionChanged);
	m_window.add(m_tblPermissions);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TStylesWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_layCommands = new THorizontalLayout();
	var m_tblStyles   = new TTable(10, 'serverscripts/GetStyles.php');
    var m_window      = createWindow(getPhrase(336));
    var m_wndAdd      = null;
    var m_wndEdit     = null;
    
    var onAddClick = function() {
		
	};
	
	var onCloseClick = function() {
		hideModal();
	};
    
    var onStyleSelected = function(styleId) {
    	
    };
    
    m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_tblStyles.addColumn('Name', getPhrase(337), 300);
	m_tblStyles.setOnClick(onStyleSelected);
	m_window.add(m_tblStyles);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};

function TTranslationWindow(selectMode, callback) {
	var m_btnAddPhrase       = new TButton(getPhrase(33));
	var m_btnReturn          = new TButton(getPhrase(6));
    var m_cbxTemplate        = new TCheckBox(getPhrase(34));
    var m_cbxCaseSensitivity = new TCheckBox(getPhrase(35));
    var m_cbxTranslatedOnly  = new TCheckBox(getPhrase(36));
    var m_chvTemplate        = new TChangingValidator(new TEmptyValidator());
    var m_ddlFrom            = new TDropdownList();
    var m_ddlTo              = new TDropdownList();
	var m_isBlocked          = false;
    var m_layCommands        = new THorizontalLayout();
    var m_layHeader          = new THorizontalLayout();
    var m_laySearch          = new THorizontalLayout();
    var m_laySearchCheck     = new TVerticalLayout();
    var m_laySearchTemplate  = new TVerticalLayout();
    var m_selectMode         = (selectMode === undefined || selectMode == null) ? false : selectMode;
	var m_needUpdate         = false;
    var m_selectedPhraseId   = 0;
    var m_tblPhrases         = new TTable(25, 'serverscripts/GetPhrasesForTranslation.php', false);
	var m_txtTemplate        = new TText(getPhrase(37) + ':');
	var m_vtbTemplate        = new TValidatableTextBox(250, m_chvTemplate);
    var m_window             = createWindow(getPhrase(16));
    var m_wndAddPhrase       = null;
    var m_wndPhraseTrans     = null;

    var onTemplateCheckChanged = function () {
        if (m_cbxTemplate.isChecked()) {
            m_cbxCaseSensitivity.enable();
            m_vtbTemplate.enable();
        } else {
            m_cbxCaseSensitivity.disable();
            m_vtbTemplate.disable();
        }
		
		updatePhrases();
    };

    var onAddPhraseClick = function () {
        if (m_wndAddPhrase == null) {
            m_wndAddPhrase = new TAddPhraseWindow(updatePhrases);
        }

        m_wndAddPhrase.show();
    };

    var onLanguagesError = function (txt) {
        TMessageBox.showModal(getPhrase(7), getPhrase(38));
    };

    var onLanguagesOk = function (xmlDoc, xmlText) {
        m_ddlFrom.clear();
        m_ddlTo.clear();

        var elements = xmlDoc.getElementsByTagName('Language');

        for (var i = 0; i < elements.length; i++) {
            var nodes = elements[i].childNodes;

            if (nodes.length == 2) {
                if (nodes.item(0).firstChild != null && nodes.item(0).firstChild.nodeValue != null && nodes.item(1).firstChild != null && nodes.item(1).firstChild.nodeValue != null) {
                    m_ddlFrom.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                    m_ddlTo.add(nodes.item(0).firstChild.nodeValue, nodes.item(1).firstChild.nodeValue);
                }
            }
        }

        m_ddlFrom.setSelectedFirst();
        m_ddlTo.setSelectedFirst();

        hideModal(m_window);
        showModal(m_window);

        onTemplateCheckChanged();
    };

    var onPhraseSelected = function (phraseId) {
        m_selectedPhraseId = phraseId;

        if (!m_selectMode) {
        	if (m_wndPhraseTrans == null) {
	            m_wndPhraseTrans = new TPhraseTranslationWindow(setTranslation);
	        }
	
	        m_wndPhraseTrans.setPhrase(phraseId, m_tblPhrases.getCellByName(phraseId, 'From'), m_tblPhrases.getCellByName(phraseId, 'To'), m_ddlTo.getSelectedId(), m_ddlFrom.getText(), m_ddlTo.getText());
	        m_wndPhraseTrans.show();
        } else {
        	hideModal();
        	if (callback !== undefined && callback != null) {
        		callback(phraseId, m_tblPhrases.getCellByName(phraseId, 'From'));
        	}
        }
    };

    var onReturnClick = function () {
        hideModal();
    };
	
	var onUpdateCompleted = function() {
	    m_isBlocked = false;

        if (m_needUpdate) {
			setTimeout(updatePhrases, 50);
        } 
	};

	var setTranslation = function (translation) {
		m_tblPhrases.setCell(m_selectedPhraseId, 3, translation);
	};

	var updatePhrases = function () {
	    if (!m_isBlocked) {
			m_needUpdate = false;
			m_isBlocked = true;

	        var searchCriterion = 0;
	        var templateText = 'a';
	        var translatedOnly = m_cbxTranslatedOnly.isChecked() ? 1 : 0;

	        if (trim(m_vtbTemplate.getValue()) != '') {
	            if (m_cbxTemplate.isChecked()) {
	                if (m_cbxCaseSensitivity.isChecked()) {
	                    searchCriterion = 2;
	                } else {
	                    searchCriterion = 1;
	                }
	            }

	            templateText = m_vtbTemplate.getValue();
	        }

	        m_tblPhrases.setAuxiliaryParameters('<LanguageFrom>' + m_ddlFrom.getSelectedId() + '</LanguageFrom><LanguageTo>' + m_ddlTo.getSelectedId() + '</LanguageTo><SearchCriterion>' + searchCriterion + '</SearchCriterion><SearchTemplate>' + templateText + '</SearchTemplate><TranslatedOnly>' + translatedOnly + '</TranslatedOnly>');
	        m_tblPhrases.update(onUpdateCompleted);
	    } else {
	        m_needUpdate = true;
	    }
	};

    this.show = function () {
        var request = new TRequest();

        showModal(m_window);
        TAjax.sendRequest(m_window, 'serverscripts/GetLanguageList.php', request.getRequest(), onLanguagesOk, onLanguagesError);
    };

    m_btnAddPhrase.setOnClick(onAddPhraseClick);
    m_btnReturn.setOnClick(onReturnClick);
    m_cbxTemplate.setOnCheck(onTemplateCheckChanged);
    m_cbxTemplate.setOnUncheck(onTemplateCheckChanged);
    m_cbxCaseSensitivity.setOnCheck(updatePhrases);
    m_cbxCaseSensitivity.setOnUncheck(updatePhrases);
    m_cbxTranslatedOnly.setOnCheck(updatePhrases);
    m_cbxTranslatedOnly.setOnUncheck(updatePhrases);
    m_vtbTemplate.setMaxLength(100);
    m_chvTemplate.setCallback(updatePhrases);
    m_txtTemplate.alignLeft();
    m_cbxTemplate.alignLeft();
    m_cbxCaseSensitivity.alignLeft();
    m_cbxTranslatedOnly.alignLeft();
    m_ddlFrom.add(0, '0');
    m_ddlFrom.setSelectedFirst();
    m_ddlFrom.setOnChange(updatePhrases);
    m_ddlTo.add(0, '0');
    m_ddlTo.setSelectedFirst();
    m_ddlTo.setOnChange(updatePhrases);
    m_layCommands.setDirection(TLang.getDirection());
    m_layCommands.add(m_btnAddPhrase);
    m_layCommands.add(m_btnReturn);

	m_layHeader.setDirection(TLang.getDirection());
    m_layHeader.add(new TText(getPhrase(39) + ':'));
    m_layHeader.add(m_ddlFrom);
    m_layHeader.add(new THorizontalDelimiter(50));
    m_layHeader.add(new TText(getPhrase(40) + ':'));
    m_layHeader.add(m_ddlTo);
    m_layHeader.add(new THorizontalDelimiter(50));
    m_layHeader.add(m_cbxTranslatedOnly);
    m_laySearchCheck.add(m_cbxTemplate);
    m_laySearchCheck.add(m_cbxCaseSensitivity);
    m_laySearchTemplate.add(m_txtTemplate);
    m_vtbTemplate.setDirection(TLang.getDirection());
    m_laySearchTemplate.add(m_vtbTemplate);
    m_laySearch.setDirection(TLang.getDirection());
    m_laySearch.add(m_laySearchCheck);
    m_laySearch.add(new THorizontalDelimiter(20));
    m_laySearch.add(m_laySearchTemplate);
    m_tblPhrases.addColumn('Number', 'Id', 70);
    m_tblPhrases.addColumn('From', getPhrase(41), 350);
    m_tblPhrases.addColumn('To', getPhrase(42), 350);
    m_tblPhrases.setOnClick(onPhraseSelected);

    m_window.add(m_layHeader);
    m_window.add(m_laySearch);
    m_window.add(m_tblPhrases);
    m_window.add(new TVerticalDelimiter(5));
    m_window.add(m_layCommands);
};

function TUsersWindow() {
	var m_btnAdd      = new TButton(getPhrase(21));
	var m_btnClose    = new TButton(getPhrase(6));
	var m_btnDeleted  = new TButton(getPhrase(80));
	var m_layCommands = new THorizontalLayout();
	var m_tblUsers    = new TTable(15, 'serverscripts/GetUsers.php');
	var m_window      = createWindow(getPhrase(51));
	var m_wndAdd      = null;
	var m_wndDeleted  = null;
	var m_wndEdit     = null;
	
	var onAddClick = function() {
		if (m_wndAdd == null) {
			m_wndAdd = new TAddUserWindow(updateUsers);
		}

		m_wndAdd.show();
	};

	var onCloseClick = function() {
		hideModal();
	};
	
	var onDeletedUsersClick = function() {
		if (m_wndDeleted == null) {
			m_wndDeleted = new TDeletedUsersWindow(updateUsers);
		}

		m_wndDeleted.show();
	};
	
	var onUserSelected = function(userId) {
		if (m_wndEdit == null) {
			m_wndEdit = new TEditUserWindow(updateUsers);
		}

		m_wndEdit.show(userId);
	};

	var updateUsers = function() {
		m_tblUsers.update();
	};

	this.show = function() {
		showModal(m_window);
	};
	
	m_btnAdd.setOnClick(onAddClick);
	m_btnClose.setOnClick(onCloseClick);
	m_btnDeleted.setOnClick(onDeletedUsersClick);
	m_layCommands.setDirection(TLang.getDirection());
	m_layCommands.add(m_btnAdd);
	m_layCommands.add(m_btnClose);
	m_layCommands.add(m_btnDeleted);
	m_tblUsers.addColumn('Name', getPhrase(73), 400);
	m_tblUsers.addColumn('Email', getPhrase(74), 300);
	m_tblUsers.addColumn('UserName', getPhrase(11), 150);
	m_tblUsers.addColumn('Phone', getPhrase(81), 150);
	m_tblUsers.addColumn('LastAccess', getPhrase(82), 150);
	m_tblUsers.setOnClick(onUserSelected);

	m_window.add(m_tblUsers);
	m_window.add(new TVerticalDelimiter(5));
	m_window.add(m_layCommands);
};
