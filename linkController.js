var divHeaderTitle = "Tabs Changer";
var Icon = null;
var divHeaderRow = null;
var isTabActive = null;
var linkWrapper;
var buttonWrapper;
var rowWrapper;
var openTabsWrapper = null;
var noOfOpenTabs = 0;

$(document).ready(function () {
  getTabsInformation();
});

function getTabsInformation() {
  clearPopupWindowDivElements();
  setupHeaderDiv();
  linkWorker();
}

/**
    * Clear popup windows Divs
    * Reset noOfOpenTabs information
    */
function clearPopupWindowDivElements() {
  //clearing div
  $("#divData").empty();
  $("#divHeader").empty();
  $("#divOpenTabsCounter").empty();
  noOfOpenTabs = 0;
}

/**
     * Create and setup header title
     */
function setupHeaderDiv() {
  Icon = $('<div class="IconDiv"><img src="logo48.png" class="Img"><div>');
  divHeaderRow = $('<div class="HeaderDiv"><h3 class="headerText" >' + divHeaderTitle + '</h3></div>');
  $("#divHeader")
    .append(Icon)
    .append(divHeaderRow);

}
/**
 *  Create and setup no of open tab inforamtion
 */
function setupOpenTabsInfoDiv() {
  openTabsWrapper = $('<div class="alert alert-info"><strong>Total Open tabs : ' + noOfOpenTabs + '</strong></div>');
  $("#divOpenTabsCounter")
    .append(openTabsWrapper);
}

/**
 * This function get all the open tabs information from chrome api
 */
function linkWorker() {
  var querying = chrome.tabs.query({}, function (tabs) {
    noOfOpenTabs = tabs.length;
    $.each(tabs, function (index, value) {
      isTabActive = value.active;

      var linkSelectorButton = $('<button/>',
        {
          text: 'Activate Tab',
          class: "btn btn-sm btn-link linkChangeButton",
          click: function () {
            if (isTabActive !== true) {
              chrome.tabs.update(value.id, { selected: true })
            }

            if (isTabActive !== "true" && value.selected !== "true") {
              chrome.tabs.update(value.id, { selected: true })
            }
          }
        });

      linkWrapper = $('<div class="divLinkRow"><strong class="linkRow">' + value.title + '</strong></div>');
      buttonWrapper = $('<div class="divlinkChangeButton"></div>');
      buttonWrapper
        .append(linkSelectorButton);

      rowWrapper = $('<div class="divRowContent"></div>');
      rowWrapper
        .append(linkWrapper)
        .append(buttonWrapper)

      $("#divData")
        .append(rowWrapper);
    });
    //Setting opentab div here
    setupOpenTabsInfoDiv();
  });
}