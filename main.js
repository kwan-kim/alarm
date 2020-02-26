// document 선택
var selectDOM = function(target){
  return document.querySelector(target);
}
/*
  dom 생성 
  el = 생성할 엘리먼트 태그
  attr = 태그의 속성 추가
*/
var createDOM = function(el,attr) {
  var ele = document.createElement(el);
  for(var key in attr) {
    var value = attr[key] 
    switch (key) {
      case 'NODE' : ele.innerHTML = value; 
      break; 
      default : ele.setAttribute(key, value); 
      break; 
    }
  }
  return ele;
}
/*
  dom 이벤트 추가
*/ 
var addEvent = function(target, action, func, opt){
  var _thisOption = opt || false;
  target.addEventListener(action,func,_thisOption);
}
/*
  선택된 돔의 value 리턴
*/ 
var getValue = function(target){
  // TODO : 현재는 select 태그만 체크중
  switch(target.tagName){
    case 'SELECT' : 
      return target.options[target.selectedIndex].value;
      break;
    default :
      return target.value;
      break;
  }
}
/*
  알람목록을 관리할 array
  default : 오름차순
*/ 
var setAlarmList = function(alram,day,time,message){
  var data = {
    // clockMode : clock,
    alarmMode : alram,
    day: day,
    time : time,
    intTime : timeTransform(time,'HHMM'),
    message : message,
    active : false,
    create: Date.now()
  }
  alarmList.push(data)
  alarmList.sort(function(a,b){
    return a.intTime - b.intTime;
  })
}
/*
  알람목록 렌더링
*/ 
var renderAlarmList = function(){
  ALARM_LIST.innerHTML = "";
  var ol = createDOM('ol');
  for(var i = 0 ; i < alarmList.length; i++){
    var li = createDOM('li',{
      NODE:alarmList[i].time + ' ' + alarmList[i].message 
    })
    var createTime = alarmList[i].create;
    var stopButton = createDOM('button',{
      NODE:'끄기',
      data:createTime,
      style:"margin-left:5px"
    })

    addEvent(stopButton,'click',stopAlarm);

    var deleteAlarmButton = createDOM('button',{
      NODE:'삭제',
      data:createTime,
      style:"margin-left:5px"
    })

    addEvent(deleteAlarmButton,'click',deleteAlarm);

    li.appendChild(stopButton);
    li.appendChild(deleteAlarmButton);
    ol.appendChild(li);
  }
  
  ALARM_LIST.appendChild(ol);
}
/*
  알람울림 목록 렌더링
*/ 
var renderActiveAlarm = function(){
  ACTIVE_LIST.innerHTML = ''
  var textArea = createDOM('textarea',{
    style: "width:400px;height:100px;"
  })
  for(var i = 0 ; i < alarmList.length; i++){
    if(alarmList[i].active){
      textArea.value += alarmList[i].time + ' ' + alarmList[i].message +  ' 알림' +'\n';
    }
  }
  ACTIVE_LIST.appendChild(textArea);
}
/*
  알람삭제
*/ 
var deleteAlarm = function(event){
  var targetEl = event.target;
  var target = parseInt(targetEl.getAttribute('data'));
  var idx;
  for(var i = 0 ; i < alarmList.length; i++){
    if(alarmList[i].create === target){
      idx = i;
    }
  }
  alarmList.splice(idx,1);
  renderActiveAlarm();
  renderAlarmList();
}
/*
  알람종료
*/ 
var stopAlarm = function(event){
  var targetEl = event.target;
  var target = parseInt(targetEl.getAttribute('data'));

  for(var i = 0 ; i < alarmList.length; i++){
    if(alarmList[i].create === target){
      alarmList[i].active = false;
      alarmList[i].day = dayExtension(alarmList[i].day,0);
    }
  }
  renderActiveAlarm();
}
/*
  알람 목록이 추가되면 작동
  한번 실행후 알림목록이 비워질때까지 반복
*/ 
var alarmTracker = function(){
  if(alarmList.length > 1){
    return false;
  }
  var tracker = setInterval(function(){
    if(alarmList.length > 0){
      var currentDay = dateFormat("YYYY-MM-DD");
      var currentTime = dateFormat("HH:mm");
      for(var i = 0; i < alarmList.length; i++ ){
        if(
          alarmList[i].day === currentDay && 
          alarmList[i].time === currentTime
        ){
          // 야간모드 체크
          if(currentClockMode === 'night'){
            if(alarmList[i].alarmMode ==="emergency"){
              alarmOn(i);
            }
            // var checkTime = timeTransform(alarmList[i].time,'HH')
            // console.log(checkTime)
            // if(checkTime >= NIGHT_TIME){
            //   if(alarmList[i].alarmMode ==="emergency"){
            //     alarmOn(i)
            //   }else{
            //     return false;
            //   }
            // }else{
            //   alarmOn(i)
            // }
          }else{
            alarmOn(i);
          }
        }
      }
    }else{
      clearInterval(tracker);
    }
  },1000)

  // 알람시작
  function alarmOn(i){
    alarmList[i].active = true;
    alarmList[i].day = dayExtension(alarmList[i].day,0);
    renderActiveAlarm();
  }
}
/*
  알람 생성 값 초기화
  시계모드는 초기화 안함
*/ 
var alarmCreateInit = function(){
  // CLOCK_MODE.options[0].selected = true;
  ALARM_MODE.options[0].selected = true;
  YEAR_MONTH_DAY.value ='';
  TIME.value = '';
  MESSAGE.value ='';
}
/*
  시계모드설정
*/ 
var setClockMode = function(){
  if(!currentClockMode){
    CLOCK_MODE.options[0].selected = true;
  }
  currentClockMode = getValue(CLOCK_MODE);
  renderClockMode()
}
/*
  현재 시계의 모드를 렌더링
*/ 
function renderClockMode(){
  var currentMode = selectDOM('.currentMode')
  currentMode.innerHTML = ''
  var span = createDOM('span',{
    NODE:'현재 모드 : ' + currentClockMode
  });
  currentMode.appendChild(span)
}
var add = function(){
  // var clockModeVal = getValue(CLOCK_MODE);
 
  var alarmModeVal = getValue(ALARM_MODE);
  var dayVal = getValue(YEAR_MONTH_DAY);
  var timeVal = getValue(TIME);
  var mesaageVal = getValue(MESSAGE);
  
  if(dayVal === '' || timeVal === '' ){
    alert('날짜와 시간을 설정하세요');
    return false;
  }else if(mesaageVal === ''){
    alert('메시지를 입력해주세요');
    return false;
  }
  
  setClockMode()
  setAlarmList(alarmModeVal,dayVal,timeVal,mesaageVal);
  renderAlarmList();
  alarmTracker();
  alarmCreateInit();
}
/*
  전역변수
  // var NIGHT_TIME = 18 // 야간시간 의 기준(필요없음)
*/ 
var alarmList = []; // 알람목록
var CLOCK_MODE = selectDOM("select[name='clockMode']"); // 시계모드 element
var ALARM_MODE = selectDOM("select[name='alarmMode']"); // 알람모드 element
var YEAR_MONTH_DAY = selectDOM("input[name='setDay']"); // 날짜설정 element
var TIME = selectDOM("input[name='setTime']"); // 시간설정 element
var MESSAGE = selectDOM("input[name='message']"); // 알람내용 element 
var ADD_BUTTON = selectDOM(".addBtn"); // 알람추가 버튼 element
var ALARM_LIST = selectDOM(".alarmList"); // 알람목록 element
var ACTIVE_LIST = selectDOM(".activeList"); // 알람울림목록 element
var currentClockMode; // 현재 시계의 모드

addEvent(CLOCK_MODE, 'change', setClockMode); // 시계모드 변경 이벤트 설정
addEvent(ADD_BUTTON, 'click', add); // 알람목록 추가 이벤트 설정
setClockMode()
/*
  현재시간 출력
*/
function mainLoop(){
  var currentTime = selectDOM('.currentTime');
  var getTime = new Date();
  currentTime.innerHTML = getTime;
  
  setInterval(function(){
    getTime = new Date();
    currentTime.innerHTML = getTime;
  },1000);
}

mainLoop()
/*
  문자 시간을 int형 변환 후 리턴
*/ 
function timeTransform(time,chk){
  switch(chk){
    case 'HH' :
      var _time = time;
      _time = _time.substring(0,2);
      _time = parseInt(_time);
      return _time;
      break;
    case 'HHMM' :
      var _time = time.replace(':','')
      _time = parseInt(_time);
      return _time;
      break;
    default :
      break;
  }
}
/*
  날짜증가
  목적 : 알람이 울리거나 끈후 현재 시간 기준으로 하루를 증가
*/ 
function dayExtension(target,x){
  /*
    기준날짜 x 만큼 증가 
    default : 현재날짜기준 + 1 
  */
  var plusDay = x || 0;
  if(plusDay === 0){
    var newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    newDate = dateFormat("YYYY-MM-DD",newDate);
  }else{
    var targetDate = target.split('-').join(',')
    var newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() + x);
    newDate = dateFormat("YYYY-MM-DD",newDate);
  }
  return newDate
}
/*
  날짜 와 시간을 원하는형태로 리턴
*/ 
function dateFormat(format,target){
  var date = new Date();
  if(target){
    date = new Date(target);
    if(!date){
      date = new Date();
    }
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month < 10 ? month = '0'+ month : null;
  var day = date.getDate();
  day < 10 ? day = '0'+ day : null;
  var hour = date.getHours();
  hour < 10 ? hour = '0'+ hour : null;
  var minute = date.getMinutes();
  minute < 10 ? minute = '0' + minute : null;
  var second = date.getSeconds();
  second < 10 ? second = '0' + second : null;

  switch(format){
    case "YYYY-MM-DD" :
      return year + '-' + month + '-' + day;
      break;
    case "HH:mm" :
      return hour + ':' + minute;
      break;
    case "HH" :
      return hour;
      break;
    case "YYYY, MM, DD":
      return year + ',' + month + ',' + day;
      break;
    default :
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      break;
  }
}
/*
  달력,시계
  https://flatpickr.js.org/
*/
flatpickr("input[name='setDay']");
flatpickr("input[name='setTime']",{
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr:true
});