/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/apiUrls.ts":
/*!**********************************!*\
  !*** ./src/constants/apiUrls.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endpoints = exports.urls = void 0;
exports.urls = {
    local: 'http://localhost:3000/api',
    server: 'http://192.168.6.207/api',
};
exports.endpoints = {
    xaml: '/UiPathXamlCoverter',
    execution: '/execution-detail',
};


/***/ }),

/***/ "./src/data/ExecutionDetail.ts":
/*!*************************************!*\
  !*** ./src/data/ExecutionDetail.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ExecutionDetails {
    constructor(pageTitle, scriptName, imageDataUri, xamlName) {
        this.imageUri = imageDataUri;
        this.pageTitle = pageTitle;
        this.scriptName = scriptName;
        this.xamlName = xamlName;
    }
}
exports["default"] = ExecutionDetails;


/***/ }),

/***/ "./src/data/UiPathEvent.ts":
/*!*********************************!*\
  !*** ./src/data/UiPathEvent.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UiPathEvent = void 0;
class UiPathEvent {
    constructor() {
        this.pageTitle = '';
        this.pageUrl = '';
        this.css = null;
        this.eventType = '';
        this.aaname = '';
        this.keys = [];
        this.modifierKey = '';
        this.isIFrame = false;
        this.isTwoKey = false;
    }
}
exports.UiPathEvent = UiPathEvent;
exports["default"] = UiPathEvent;


/***/ }),

/***/ "./src/helpers/downloadHelper.ts":
/*!***************************************!*\
  !*** ./src/helpers/downloadHelper.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get = exports.postExecutionDetail = exports.objectToJson = exports.downloadXML = exports.post = void 0;
const ExecutionDetail_1 = __importDefault(__webpack_require__(/*! @/data/ExecutionDetail */ "./src/data/ExecutionDetail.ts"));
const post = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data,
    });
    return response.text();
});
exports.post = post;
const downloadXML = (XMLdata) => {
    const fileName = new Date().toISOString();
    let link = document.createElement('a');
    link.setAttribute('style', 'display: none;');
    let data = 'text/json;charset=utf-8,' + encodeURIComponent(XMLdata);
    link.setAttribute('href', 'data:' + data);
    link.setAttribute('download', fileName + '.xaml');
    link.click();
    setTimeout(function () {
        link.remove();
    }, 200);
    return fileName;
};
exports.downloadXML = downloadXML;
const objectToJson = (steps) => {
    if (Object.keys(steps).length > 0) {
        return JSON.stringify(steps);
    }
    return null;
};
exports.objectToJson = objectToJson;
const postExecutionDetail = (fileName, url, scriptName) => __awaiter(void 0, void 0, void 0, function* () {
    chrome.storage.local.get(['firstPage'], (result) => {
        const requestInput = new ExecutionDetail_1.default(result.firstPage.title, scriptName ? scriptName : 'Manual', result.firstPage.uri, fileName);
        const data = (0, exports.objectToJson)(requestInput);
        (0, exports.post)(url, data);
    });
});
exports.postExecutionDetail = postExecutionDetail;
const get = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        method: 'GET',
    });
    return response.text();
});
exports.get = get;


/***/ }),

/***/ "./src/scripts/background.ts":
/*!***********************************!*\
  !*** ./src/scripts/background.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postLog = void 0;
const apiUrls_1 = __webpack_require__(/*! @/constants/apiUrls */ "./src/constants/apiUrls.ts");
const ExecutionDetail_1 = __importDefault(__webpack_require__(/*! @/data/ExecutionDetail */ "./src/data/ExecutionDetail.ts"));
const UiPathEvent_1 = __importDefault(__webpack_require__(/*! @/data/UiPathEvent */ "./src/data/UiPathEvent.ts"));
const downloadHelper_1 = __webpack_require__(/*! @/helpers/downloadHelper */ "./src/helpers/downloadHelper.ts");
const server = apiUrls_1.urls.server;
chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed');
});
chrome.runtime.onStartup.addListener(() => __awaiter(void 0, void 0, void 0, function* () {
    chrome.storage.local.clear();
    chrome.storage.local.set({ events: [] }, () => { });
    const tab = yield getActiveTab();
}));
const downloadXamlFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const events = [];
        const storedEvents = [];
        chrome.storage.local.get(['events'], (result) => {
            const pendingEvents = result.events;
            if (result.events)
                events.push(...pendingEvents);
        });
        chrome.storage.local.get(['jsonObject'], (result) => {
            storedEvents.push(...result.jsonObject);
            if (events.length > 0) {
                storedEvents.push(events);
            }
            const data = (0, downloadHelper_1.objectToJson)(storedEvents);
            if (data) {
                convertJSONtoXAML(data)
                    .then((xml) => resolve(xml))
                    .catch(reject);
            }
            else {
                reject({ error: 'No data found' });
            }
        });
        const convertJSONtoXAML = (jsonData) => {
            return (0, downloadHelper_1.post)(server + apiUrls_1.endpoints.xaml, jsonData);
        };
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var _a;
    if (request.capture === 'startCapture') {
        startCapture(sender.tab);
        return true;
    }
    if (request.capture === 'stopCapture') {
        chrome.storage.local.set({ captureStart: false }, () => { });
        downloadXamlFromAPI().then((xmlData) => {
            sendResponse({ data: xmlData });
        });
        return true;
    }
    if (request.message === 'screenshot') {
        chrome.tabs.captureVisibleTab((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.windowId, {}, (dataUrl) => {
            sendResponse({ imageDataUrl: dataUrl });
        });
        return true;
    }
    if (request.message === 'logs') {
        chrome.tabs.create({ url: 'execution.detail.html' });
        return true;
    }
    if (request.message === 'executionDetail') {
        (0, downloadHelper_1.postExecutionDetail)(request.fileName, apiUrls_1.urls.server + apiUrls_1.endpoints.execution, `${request.scriptName} - Selenium`);
        chrome.storage.local.clear();
        return true;
    }
    if (request.message === 'postLogs') {
        (0, exports.postLog)(apiUrls_1.urls.server + apiUrls_1.endpoints.execution, request.title, request.url);
        return true;
    }
});
const saveFirstPageDetails = (tab) => __awaiter(void 0, void 0, void 0, function* () {
    chrome.tabs.captureVisibleTab((imageDataUrl) => {
        const data = {
            uri: imageDataUrl,
            title: tab.title,
            fileName: '',
        };
        chrome.storage.local.set({ firstPage: data }, () => { });
    });
});
const startCapture = (tab) => {
    chrome.storage.local.set({ captureStart: true }, () => { });
    chrome.storage.local.set({ debounceTimeout: 500 }, () => { });
    chrome.storage.local.set({ events: [] }, () => { });
    const steps = [];
    const events = [];
    const eventObject = createFirstPageEventObject(tab);
    events.push(eventObject);
    steps.push(events);
    saveFirstPageDetails(tab);
    chrome.storage.local.set({ jsonObject: steps }, () => { });
};
const createFirstPageEventObject = (tab) => {
    const eventObject = new UiPathEvent_1.default();
    eventObject.pageTitle = tab.title;
    eventObject.pageUrl = tab.url;
    eventObject.eventType = 'OpenBrowser';
    return eventObject;
};
const getActiveTab = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = yield chrome.tabs.query(queryOptions);
    return tab;
});
const postLog = (url, pageTitle, scriptName) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = new ExecutionDetail_1.default(pageTitle, scriptName ? scriptName : 'Manual', '', '');
    const req = (0, downloadHelper_1.objectToJson)(detail);
    console.log(req);
    yield (0, downloadHelper_1.post)(url, req);
});
exports.postLog = postLog;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map