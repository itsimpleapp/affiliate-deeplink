function GenerateDeeplinks(info, tab){
    if (localStorage["affsettings"] == "" || localStorage["affsettings"] == null){
        chrome.tabs.create({url: "options.html"});
    }
    else{
        var link = (info.linkUrl == null) ? tab.url :  info.linkUrl;	 
        chrome.tabs.create({url: "generate.html?url="+urlencode(link)});   
    }
}

/**
 * @see http://locutus.io/php/url/urlencode/
 */
function urlencode (str) {
  str = (str + '')

  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+')
}

chrome.contextMenus.create({"title": "Affiliate Deeplink", "contexts":["link"], "onclick": GenerateDeeplinks});
chrome.browserAction.onClicked.addListener(function(Tab){ GenerateDeeplinks(Tab,Tab); });
