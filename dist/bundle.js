/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// document 선택\r\nvar selectDOM = function(target){\r\n  return document.querySelector(target);\r\n}\r\n/*\r\n  dom 생성 \r\n  el = 생성할 엘리먼트 태그\r\n  attr = 태그의 속성 추가\r\n*/\r\nvar createDOM = function(el,attr) {\r\n  var ele = document.createElement(el);\r\n  for(var key in attr) {\r\n    var value = attr[key] \r\n    switch (key) {\r\n      case 'NODE' : ele.innerHTML = value; \r\n      break; \r\n      default : ele.setAttribute(key, value); \r\n      break; \r\n    }\r\n  }\r\n  return ele;\r\n}\r\n/*\r\n  dom 이벤트 추가\r\n*/ \r\nvar addEvent = function(target, action, func, opt){\r\n  var _thisOption = opt || false;\r\n  target.addEventListener(action,func,_thisOption);\r\n}\r\n/*\r\n  선택된 돔의 value 리턴\r\n*/ \r\nvar getValue = function(target){\r\n  // TODO : 현재는 select 태그만 체크중\r\n  switch(target.tagName){\r\n    case 'SELECT' : \r\n      return target.options[target.selectedIndex].value;\r\n      break;\r\n    default :\r\n      return target.value;\r\n      break;\r\n  }\r\n}\r\n/*\r\n  알람목록을 관리할 array\r\n  default : 오름차순\r\n*/ \r\nvar setAlarmList = function(alram,day,time,message){\r\n  var data = {\r\n    // clockMode : clock,\r\n    alarmMode : alram,\r\n    day: day,\r\n    time : time,\r\n    intTime : timeTransform(time,'HHMM'),\r\n    message : message,\r\n    active : false,\r\n    create: Date.now()\r\n  }\r\n  alarmList.push(data)\r\n  alarmList.sort(function(a,b){\r\n    return a.intTime - b.intTime;\r\n  })\r\n}\r\n/*\r\n  알람목록 렌더링\r\n*/ \r\nvar renderAlarmList = function(){\r\n  ALARM_LIST.innerHTML = \"\";\r\n  var ol = createDOM('ol');\r\n  for(var i = 0 ; i < alarmList.length; i++){\r\n    var li = createDOM('li',{\r\n      NODE:alarmList[i].time + ' ' + alarmList[i].message \r\n    })\r\n    var createTime = alarmList[i].create;\r\n    var stopButton = createDOM('button',{\r\n      NODE:'끄기',\r\n      data:createTime,\r\n      style:\"margin-left:5px\"\r\n    })\r\n\r\n    addEvent(stopButton,'click',stopAlarm);\r\n\r\n    var deleteAlarmButton = createDOM('button',{\r\n      NODE:'삭제',\r\n      data:createTime,\r\n      style:\"margin-left:5px\"\r\n    })\r\n\r\n    addEvent(deleteAlarmButton,'click',deleteAlarm);\r\n\r\n    li.appendChild(stopButton);\r\n    li.appendChild(deleteAlarmButton);\r\n    ol.appendChild(li);\r\n  }\r\n  \r\n  ALARM_LIST.appendChild(ol);\r\n  renderClockMode()\r\n}\r\n/*\r\n  알람울림 목록 렌더링\r\n*/ \r\nvar renderActiveAlarm = function(){\r\n  ACTIVE_LIST.innerHTML = ''\r\n  var textArea = createDOM('textarea',{\r\n    style: \"width:400px;height:100px;\"\r\n  })\r\n  for(var i = 0 ; i < alarmList.length; i++){\r\n    if(alarmList[i].active){\r\n      textArea.value += alarmList[i].time + ' ' + alarmList[i].message +  ' 알림' +'\\n';\r\n    }\r\n  }\r\n  ACTIVE_LIST.appendChild(textArea);\r\n}\r\n/*\r\n  알람삭제\r\n*/ \r\nvar deleteAlarm = function(event){\r\n  var targetEl = event.target;\r\n  var target = parseInt(targetEl.getAttribute('data'));\r\n  var idx;\r\n  for(var i = 0 ; i < alarmList.length; i++){\r\n    if(alarmList[i].create === target){\r\n      idx = i;\r\n    }\r\n  }\r\n  alarmList.splice(idx,1);\r\n  renderActiveAlarm();\r\n  renderAlarmList();\r\n}\r\n/*\r\n  알람종료\r\n*/ \r\nvar stopAlarm = function(event){\r\n  var targetEl = event.target;\r\n  var target = parseInt(targetEl.getAttribute('data'));\r\n\r\n  for(var i = 0 ; i < alarmList.length; i++){\r\n    if(alarmList[i].create === target){\r\n      alarmList[i].active = false;\r\n      alarmList[i].day = dayExtension(alarmList[i].day,0);\r\n    }\r\n  }\r\n  renderActiveAlarm();\r\n}\r\n/*\r\n  알람 목록이 추가되면 작동\r\n  한번 실행후 알림목록이 비워질때까지 반복\r\n*/ \r\nvar alarmTracker = function(){\r\n  if(alarmList.length > 1){\r\n    return false;\r\n  }\r\n  var tracker = setInterval(function(){\r\n    if(alarmList.length > 0){\r\n      var currentDay = dateFormat(\"YYYY-MM-DD\");\r\n      var currentTime = dateFormat(\"HH:mm\");\r\n      for(var i = 0; i < alarmList.length; i++ ){\r\n        if(\r\n          alarmList[i].day === currentDay && \r\n          alarmList[i].time === currentTime\r\n        ){\r\n          // 야간모드 체크\r\n          if(currentClockMode === 'night'){\r\n            if(alarmList[i].alarmMode ===\"emergency\"){\r\n              alarmOn(i);\r\n            }\r\n            // var checkTime = timeTransform(alarmList[i].time,'HH')\r\n            // console.log(checkTime)\r\n            // if(checkTime >= NIGHT_TIME){\r\n            //   if(alarmList[i].alarmMode ===\"emergency\"){\r\n            //     alarmOn(i)\r\n            //   }else{\r\n            //     return false;\r\n            //   }\r\n            // }else{\r\n            //   alarmOn(i)\r\n            // }\r\n          }else{\r\n            alarmOn(i);\r\n          }\r\n        }\r\n      }\r\n    }else{\r\n      clearInterval(tracker);\r\n    }\r\n  },1000)\r\n\r\n  // 알람시작\r\n  function alarmOn(i){\r\n    alarmList[i].active = true;\r\n    alarmList[i].day = dayExtension(alarmList[i].day,0);\r\n    renderActiveAlarm();\r\n  }\r\n}\r\n/*\r\n  알람 생성 값 초기화\r\n  시계모드는 초기화 안함\r\n*/ \r\nvar alarmCreateInit = function(){\r\n  // CLOCK_MODE.options[0].selected = true;\r\n  ALARM_MODE.options[0].selected = true;\r\n  YEAR_MONTH_DAY.value ='';\r\n  TIME.value = '';\r\n  MESSAGE.value ='';\r\n}\r\n/*\r\n  시계모드설정\r\n*/ \r\nvar setClockMode = function(){\r\n  if(!currentClockMode){\r\n    CLOCK_MODE.options[0].selected = true;\r\n  }\r\n  currentClockMode = getValue(CLOCK_MODE);\r\n  renderClockMode()\r\n}\r\n/*\r\n  현재 시계의 모드를 렌더링\r\n*/ \r\nfunction renderClockMode(){\r\n  var currentMode = selectDOM('.currentMode')\r\n  currentMode.innerHTML = ''\r\n  var span = createDOM('span',{\r\n    NODE:'현재 모드 : ' + currentClockMode\r\n  });\r\n  currentMode.appendChild(span)\r\n}\r\nvar add = function(){\r\n  // var clockModeVal = getValue(CLOCK_MODE);\r\n  setClockMode()\r\n  var alarmModeVal = getValue(ALARM_MODE);\r\n  var dayVal = getValue(YEAR_MONTH_DAY);\r\n  var timeVal = getValue(TIME);\r\n  var mesaageVal = getValue(MESSAGE);\r\n  \r\n  if(dayVal === '' || timeVal === '' ){\r\n    alert('날짜와 시간을 설정하세요');\r\n    return false;\r\n  }else if(mesaageVal === ''){\r\n    alert('메시지를 입력해주세요');\r\n    return false;\r\n  }\r\n  \r\n  setAlarmList(alarmModeVal,dayVal,timeVal,mesaageVal);\r\n  renderAlarmList();\r\n  alarmTracker();\r\n  alarmCreateInit();\r\n}\r\n/*\r\n  전역변수\r\n  // var NIGHT_TIME = 18 // 야간시간 의 기준(필요없음)\r\n*/ \r\nvar alarmList = []; // 알람목록\r\nvar CLOCK_MODE = selectDOM(\"select[name='clockMode']\"); // 시계모드 element\r\nvar ALARM_MODE = selectDOM(\"select[name='alarmMode']\"); // 알람모드 element\r\nvar YEAR_MONTH_DAY = selectDOM(\"input[name='setDay']\"); // 날짜설정 element\r\nvar TIME = selectDOM(\"input[name='setTime']\"); // 시간설정 element\r\nvar MESSAGE = selectDOM(\"input[name='message']\"); // 알람내용 element \r\nvar ADD_BUTTON = selectDOM(\".addBtn\"); // 알람추가 버튼 element\r\nvar ALARM_LIST = selectDOM(\".alarmList\"); // 알람목록 element\r\nvar ACTIVE_LIST = selectDOM(\".activeList\"); // 알람울림목록 element\r\nvar currentClockMode; // 현재 시계의 모드\r\n\r\naddEvent(CLOCK_MODE, 'change', setClockMode); // 시계모드 변경 이벤트 설정\r\naddEvent(ADD_BUTTON, 'click', add); // 알람목록 추가 이벤트 설정\r\nsetClockMode()\r\n/*\r\n  현재시간 출력\r\n*/\r\nfunction mainLoop(){\r\n  var currentTime = selectDOM('.currentTime');\r\n  var getTime = new Date();\r\n  currentTime.innerHTML = getTime;\r\n  \r\n  setInterval(function(){\r\n    getTime = new Date();\r\n    currentTime.innerHTML = getTime;\r\n  },1000);\r\n}\r\n\r\nmainLoop()\r\n/*\r\n  문자 시간을 int형 변환 후 리턴\r\n*/ \r\nfunction timeTransform(time,chk){\r\n  switch(chk){\r\n    case 'HH' :\r\n      var _time = time;\r\n      _time = _time.substring(0,2);\r\n      _time = parseInt(_time);\r\n      return _time;\r\n      break;\r\n    case 'HHMM' :\r\n      var _time = time.replace(':','')\r\n      _time = parseInt(_time);\r\n      return _time;\r\n      break;\r\n    default :\r\n      break;\r\n  }\r\n}\r\n/*\r\n  날짜증가\r\n  목적 : 알람이 울리거나 끈후 현재 시간 기준으로 하루를 증가\r\n*/ \r\nfunction dayExtension(target,x){\r\n  /*\r\n    기준날짜 x 만큼 증가 \r\n    default : 현재날짜기준 + 1 \r\n  */\r\n  var plusDay = x || 0;\r\n  if(plusDay === 0){\r\n    var newDate = new Date();\r\n    newDate.setDate(newDate.getDate() + 1);\r\n    newDate = dateFormat(\"YYYY-MM-DD\",newDate);\r\n  }else{\r\n    var targetDate = target.split('-').join(',')\r\n    var newDate = new Date(targetDate);\r\n    newDate.setDate(newDate.getDate() + x);\r\n    newDate = dateFormat(\"YYYY-MM-DD\",newDate);\r\n  }\r\n  return newDate\r\n}\r\n/*\r\n  날짜 와 시간을 원하는형태로 리턴\r\n*/ \r\nfunction dateFormat(format,target){\r\n  var date = new Date();\r\n  if(target){\r\n    date = new Date(target);\r\n    if(!date){\r\n      date = new Date();\r\n    }\r\n  }\r\n  var year = date.getFullYear();\r\n  var month = date.getMonth() + 1;\r\n  month < 10 ? month = '0'+ month : null;\r\n  var day = date.getDate();\r\n  day < 10 ? day = '0'+ day : null;\r\n  var hour = date.getHours();\r\n  hour < 10 ? hour = '0'+ hour : null;\r\n  var minute = date.getMinutes();\r\n  minute < 10 ? minute = '0' + minute : null;\r\n  var second = date.getSeconds();\r\n  second < 10 ? second = '0' + second : null;\r\n\r\n  switch(format){\r\n    case \"YYYY-MM-DD\" :\r\n      return year + '-' + month + '-' + day;\r\n      break;\r\n    case \"HH:mm\" :\r\n      return hour + ':' + minute;\r\n      break;\r\n    case \"HH\" :\r\n      return hour;\r\n      break;\r\n    case \"YYYY, MM, DD\":\r\n      return year + ',' + month + ',' + day;\r\n      break;\r\n    default :\r\n      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;\r\n      break;\r\n  }\r\n}\r\n/*\r\n  달력,시계\r\n  https://flatpickr.js.org/\r\n*/\r\nflatpickr(\"input[name='setDay']\");\r\nflatpickr(\"input[name='setTime']\",{\r\n  enableTime: true,\r\n  noCalendar: true,\r\n  dateFormat: \"H:i\",\r\n  time_24hr:true\r\n});\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });