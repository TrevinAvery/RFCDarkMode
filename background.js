'use strict'

let enabled = true

chrome.runtime.onInstalled.addListener(function() {
	// store enabled locally so it can be accessed quickly
	// update it with sync on start up
	chrome.storage.sync.get('enabled', function(results) {
		enabled = results.enabled
		update()
	})
})

// if button is clicked, toggle enabled
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.sync.set({'enabled': !enabled})
})

// send current enabled status when new page is loaded
chrome.webNavigation.onCommitted.addListener(function(details) {
	chrome.tabs.sendMessage(details.tabId, {
		enabled: enabled, 
		transition: false
	})
})

// listen for enabled to be changed and update all tabs
chrome.storage.onChanged.addListener(function(changes, namespace) {
	let storageChange = changes['enabled']
	if (storageChange) {
		enabled = storageChange.newValue
		update()
	}
})

// send current enabled value to all tabs
function update() {
	chrome.tabs.query({}, function(tabs) {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {
				enabled: enabled, 
				transition: tab.active
			})
		}
	})
}