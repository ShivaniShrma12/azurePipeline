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
    local: 'http://localhost:7099/api',
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

/***/ "./src/scripts/popup.ts":
/*!******************************!*\
  !*** ./src/scripts/popup.ts ***!
  \******************************/
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
const UiPathEvent_1 = __importDefault(__webpack_require__(/*! @/data/UiPathEvent */ "./src/data/UiPathEvent.ts"));
const apiUrls_1 = __webpack_require__(/*! @/constants/apiUrls */ "./src/constants/apiUrls.ts");
const downloadHelper_1 = __webpack_require__(/*! @/helpers/downloadHelper */ "./src/helpers/downloadHelper.ts");
const server = apiUrls_1.urls.server;
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const logs = document.getElementById('logs');
const checkbox = document.getElementById('is-tosca');
const convertJSONtoXAML = (jsonData) => __awaiter(void 0, void 0, void 0, function* () {
    const url = server + apiUrls_1.endpoints.xaml;
    return yield (0, downloadHelper_1.post)(url, jsonData);
});
const getCurrentTab = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = yield chrome.tabs.query(queryOptions);
    return tab;
});
const saveOpenBrowserEvent = (tab) => __awaiter(void 0, void 0, void 0, function* () {
    chrome.storage.local.set({ events: [] }, () => { });
    const steps = [];
    const events = [];
    const openBrowserEvent = new UiPathEvent_1.default();
    openBrowserEvent.eventType = 'OpenBrowser';
    openBrowserEvent.pageUrl = tab.url ? tab.url : '';
    openBrowserEvent.pageTitle = tab.title ? tab.title : '';
    if (!checkbox.checked) {
        events.push(openBrowserEvent);
        chrome.storage.local.set({ checked: false }, () => { });
    }
    else {
        chrome.storage.local.set({ checked: true }, () => { });
        chrome.storage.local.set({ isOpenBrowser: true }, () => { });
    }
    steps.push(events);
    chrome.storage.local.set({ jsonObject: steps }, () => { });
});
const startCaptureHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    const tab = yield getCurrentTab();
    chrome.storage.local.set({ captureStart: true }, () => __awaiter(void 0, void 0, void 0, function* () {
        yield saveOpenBrowserEvent(tab);
    }));
    saveFirstPageDetail(tab);
});
const saveFirstPageDetail = (tab) => {
    chrome.tabs.sendMessage(tab === null || tab === void 0 ? void 0 : tab.id, { message: 'firstPage' }, (response) => {
        const data = {
            uri: response.imageDataUrl,
            title: tab.title,
            fileName: 'Manual',
        };
        chrome.storage.local.set({ firstPage: data }, () => { });
    });
};
const createScreenshotsZip = (tab) => {
    chrome.tabs.sendMessage(tab === null || tab === void 0 ? void 0 : tab.id, { message: 'createZip' }, (_) => { });
};
const stopCaptureHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = [];
    chrome.storage.local.set({ captureStart: false }, () => {
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
    });
    chrome.storage.local.get(['events'], (result) => {
        if (result.events)
            events.push(...result.events);
    });
    const tab = yield getCurrentTab();
    createScreenshotsZip(tab);
    retrieveAndDownload(events);
});
const retrieveAndDownload = (events) => {
    const storedEvents = [];
    chrome.storage.local.get(['jsonObject'], (result) => __awaiter(void 0, void 0, void 0, function* () {
        const jsonResultSet = result.jsonObject;
        storedEvents.push(...jsonResultSet);
        if (events.length > 0) {
            storedEvents.push(events);
        }
        const data = (0, downloadHelper_1.objectToJson)(storedEvents);
        if (data) {
            const xml = yield convertJSONtoXAML(data);
            const fileName = (0, downloadHelper_1.downloadXML)(xml);
            yield (0, downloadHelper_1.postExecutionDetail)(fileName, server + apiUrls_1.endpoints.execution);
        }
        chrome.storage.local.clear();
    }));
};
const showLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    chrome.runtime.sendMessage({ message: 'logs' }, (_) => { });
});
window.onload = () => {
    chrome.storage.local.get(['captureStart'], (result) => {
        startButton.style.display = result.captureStart ? 'none' : 'block';
        stopButton.style.display = result.captureStart ? 'block' : 'none';
    });
    chrome.storage.local.get(['checked'], (result) => {
        if (result.checked)
            checkbox.checked = true;
    });
};
logs.addEventListener('click', showLogs);
startButton.addEventListener('click', startCaptureHandler);
stopButton.addEventListener('click', stopCaptureHandler);


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/popup.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map