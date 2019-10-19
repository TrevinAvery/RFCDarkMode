chrome.runtime.onMessage.addListener(function(message) {

    let transitionAction = (message.transition) ? 'add' : 'remove'
    document.documentElement.classList[transitionAction]('rfc-dark-mode-transition')

    let enabledAction = (message.enabled) ? 'add' : 'remove'
    document.documentElement.classList[enabledAction]('rfc-dark-mode-enabled')
})