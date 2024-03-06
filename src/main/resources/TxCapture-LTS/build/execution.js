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

/***/ "./src/scripts/execution.detail.ts":
/*!*****************************************!*\
  !*** ./src/scripts/execution.detail.ts ***!
  \*****************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const downloadHelper_1 = __webpack_require__(/*! @/helpers/downloadHelper */ "./src/helpers/downloadHelper.ts");
const apiUrls_1 = __webpack_require__(/*! @/constants/apiUrls */ "./src/constants/apiUrls.ts");
const table = document.getElementById('data');
const getExecutionDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, downloadHelper_1.get)(apiUrls_1.urls.server + apiUrls_1.endpoints.execution);
    console.log(data);
    const executionDetails = JSON.parse(data);
    executionDetails.map((e, id) => {
        const tr = document.createElement('tr');
        tr.appendChild(createTableCell((id + 1).toString()));
        tr.appendChild(createTableCell(e.scriptName));
        tr.appendChild(createTableCell(e.xamlName));
        tr.appendChild(createTableCell(e.pageTitle));
        tr.appendChild(createImageTableCell(e.imageUri));
        table.appendChild(tr);
    });
});
const createTableCell = (data) => {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};
const createImageTableCell = (src) => {
    const td = document.createElement('td');
    const img = createImgElement(src);
    td.appendChild(img);
    return td;
};
const createImgElement = (src) => {
    const img = document.createElement('img');
    img.style.width = '200px';
    img.src = src;
    return img;
};
getExecutionDetails();


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/execution.detail.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=execution.js.map