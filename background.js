'use strict'

chrome.runtime.onInstalled.addListener(function() {

	chrome.browserAction.onClicked.addListener(function(tab) {
		update(tab, true)
	})

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		update(tab, false)
	})
})

function update(tab, toggle) {

	chrome.storage.sync.get(['disabled'], function(result) {
		let disabled = result.disabled

		if (toggle) {
			disabled = !disabled
			chrome.storage.sync.set({'disabled': disabled})
		}

		let action = (disabled) ? 'add' : 'remove'

		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.executeScript(
				tab.id,
				{ code: `document.querySelector('body').classList.${action}('rfc-dark-mode-disabled')` })
		})
	})
}