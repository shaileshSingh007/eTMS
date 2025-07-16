$('#popUp,#reqStatusP,#passPage,#secPage,#passDet,#allExist,#createBusPass').hide();
$('#mainC').show();

let initialObj = {
  'name' : "",
  'RN'   : "",
  'station':'',
  'Time':'',
}

//Append station select
function appendAll(){
   let stationArr = [
     'Thane Stn E Kopari-TCS Olympus',
     'badlapur-TCS Olympus'
   ]
   
   stationArr.forEach((n)=>{
     $('#stationInp').append('<option>'+n+'</option>')
   });
   
   let timeAre = [
     '07:20-17:45',
     '08:20-18:45',
     '09:20-19:45',
     '10:20-20:45'
   ]
   
   timeAre.forEach((n)=>{
     $('#timeInp').append('<option>'+n+'</option>')
   })
   
   
}

appendAll();

let myObj = initiateLS('myObject', initialObj);


//localStorage.clear();

setTimeout(()=>{
    $('#mainC,#loader').hide();
    $('#secPage').show();
    
},1000);

$('#busRide').click(()=>{
   $('#passPage').show();
   $('#secPage').hide();
   $('#loader').show();
   setTimeout(()=>{
     $('#popUp').show()
     $('#innerPopUp').css('top','20%');
   },1900);
   setTimeout(()=>{
     $('#loader').hide();
     $('#passDet').show();
   },1800);
   
   
   
   
});
let toggle = true;
$('#menu').click(()=>{
   if(toggle){
     $('#menuDiv').show().css('left','0%');
     $('#passPage').show().css('left','85%');
     toggle = false;
   }else{
     $('#menuDiv').css('left','-85%');
     $('#passPage').css('left','0%');
     toggle = true;
   }
});

$('#goHome').click(()=>{
   $('#menuDiv').css('left', '-85%');
   $('#passPage').css('left', '0%');
});

$('#applyPass').click(() => {
  $('#menuDiv').css('left', '-85%');
  $('#passPage').css('left', '0%');
  setTimeout(()=>{
    $('#allExist').show();
  },300);
});



$('#innerPopUp').click(()=>{
  $('#popUp').hide();
  setTimeout(()=>{
    $('#innerPopUp').css('top','110%');
  },20);
});

$('#backTo').click(()=>{
    $('#secPage').show();
    $('#popUp,#menuDiv,#passPage,#passDet').hide();
    $('#menuDiv').css('left','-85%');
    $('#passPage').css('left','0%');
    
});

$('#status').click(()=>{
  $('#reqBody').empty();
   $('#menuDiv').css('left','-85%');
   
   $('#reqStatusP').show().css('left','0%');
   $('#passPage').css('left','0%');
   setTimeout(()=>{
     $('#loader').show();
   },300);
   
   setTimeout(()=>{
      addStatus();
      $('#loader').hide();
   },500);
   
});

$('#back').click(()=>{
    $('#reqStatusP').show().css('left','110%');
});

let pastDate = '01122024';

function addStatus(){
  let dateArray = getDateRange(pastDate);
  let a = 1740484;

  
  for(let i=dateArray.length-1;i>=0;i--){
    let c = Math.floor(100+Math.random()*900);
    let id = a+(62600*i)+c;
    let st = (i+1) == dateArray.length ? "Approved" : 'Expired';
    let op = st=='Approved' ? 1 : 0;
    let cl = st=='Approved' ? 'lightgreen' : 'orange';
    
  let d1 = dateArray[i][0];
  let d2 = dateArray[i][1];
  
  let domStr =`<div class="request1"><div class="rRow1"><span>Request ID : ${id}</span><span style="color:${cl}">${st}</span></div><div class="rRow2"><div class="toFram">${myObj.station.split('-')[0]}<br/>TCS Olympus</div><div style="opacity:${op}" class="cancel">Cancel</div></div><div class="rRow3">Bus Stop Name : ${myObj.station.split('-')[0]}</div><div class="rRow4"><span>OfficeInTime :${myObj.time.split('-')[0]}</span><span>Drop : ${myObj.time.split('-')[1]}</span></div><div class="rRow5"><span>Start Date : ${d1}</span><span>End Date : ${d2}</span></div></div>`;
  
  $('#reqBody').append(domStr);
  console.log(domStr);
  }
   
}





function getDateRange(pastDate) {
  // Convert ddmmyyyy to Date object
  function parseDate(ddmmyyyy) {
    let day = parseInt(ddmmyyyy.substring(0, 2), 10);
    let month = parseInt(ddmmyyyy.substring(2, 4), 10) - 1; // Months are 0-based in JS
    let year = parseInt(ddmmyyyy.substring(4, 8), 10);
    return new Date(year, month, day);
  }
  
  // Format Date to yyyy-mm-dd
  function formatDate(date) {
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  
  let firstDate = parseDate(pastDate);
  let lastDate = new Date(); // Current date
  
  let result = [];
  let tempDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1); // Start at first day of the past month
  
  while (tempDate <= lastDate) {
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth();
    
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0); // Last day of the month
    
    result.push([formatDate(firstDay), formatDate(lastDay)]);
    
    tempDate.setMonth(tempDate.getMonth() + 1); // Move to the next month
  }
  
  return result;
}

$('#allExist div').click(()=>{
  $('#allExist').hide();
})

let togFlag = true;
$('#qrBox').hide();

$('#togBut').on('click',()=>{
   if(togFlag){
     genQR();
     $("#togBut").text('View Details');
     $('#qrBox').show();
     $('#botomBox').hide();
     
     togFlag = false;
   }else{
     $("#togBut").text('View QR');
     $('#qrBox').hide();
     $('#botomBox').show();
     togFlag = true;
   }
})


function genQR(){
  let x = $('#qrBox').width();
  let y =$('#qrBox').height();
    let text = base64;
    $('#qrBox').empty(); // clear previous QR
    new QRCode(document.getElementById("qrBox"), {
      text: text,
      width:x-15,
      height:y,
    });

}




function saveObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    console.error("Invalid object.");
    return;
  }
  localStorage.setItem("myObject", JSON.stringify(obj));
}



function initiateLS(key, initialObj) {
  const data = localStorage.getItem(key);
  
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse localStorage data:", e);
      return initialObj;
    }
  } else {
    
    localStorage.setItem(key, JSON.stringify(initialObj));
    
    return initiateLS(key, initialObj);
  }
}

$('#GeoCode').on('click',()=>{
$('#nameInp').val(myObj.name);
$('#rollInp').val(myObj.RN);
$('#stationInp').val(myObj.station);
$('#timeInp').val(myObj.time);
  
   $('#createBusPass').show();
})

$('#cancelbt').on('click', () => {
  $('#createBusPass').hide();
})

$('#submitInp').on('click',()=>{
   let nm = $('#nameInp').val().trim();
   let rn = $('#rollInp').val().trim();
   let st = $('#stationInp').val().trim();
   let tm = $('#timeInp').val().trim();
   
   if(nm=="" || rn=="" || st =="" || tm==""){
     alert('Please Enter all required values')
   }else{
     myObj.name = nm;
     myObj.RN = rn;
     myObj.station=st;
     myObj.time = tm;
    saveObject(myObj);
    addDetails(myObj);
    $('#loader').show();
    setTimeout(()=>{
      $('#loader').hide();
      $('#createBusPass').hide();
    },1000);
    
   }
   
})

function addDetails(x) {
  $('#row2,#row4,#row6,#bottomP,#row7,#loc1,#loc2').empty();
   $('#row2').append(`<span>${x.name}</span><span>${x.RN}</span>`);
   
   // add stop and route
   let stop1 = x.station.split('-')[0]
   let stop2 = x.station.split('-')[1]
   
   $('#row4').append(`<span>${stop1}</span><span>Both</span>`);
   
   //Add Date
   $('#row6').append(`<span>${getDays().first}</span><span>${getDays().last}</span>`);
   
   //add time
   let t1 = myObj.time.split('-')[0];
   let t2 = myObj.time.split('-')[1];
   
   $('#bottomP').append(`<span>Office in Time - ${t1}</span><span> Office out Time - ${t2} </span>`)
   
   //add route
   
   $('#row7').append(`Route : ${stop1} to ${stop2} And Return Via-FAST`)
   
   $('#loc1').text(stop1);
   $('#loc2').text(stop2);
   
}

addDetails(myObj);




function getDays() {
  const now = new Date();

  // First and last day of the current month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const format = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mmm = monthNames[date.getMonth()];
    const yyyy = date.getFullYear();
    return `${dd} ${mmm} ${yyyy}`;
  };

  return {
    first: format(firstDay),
    last: format(lastDay)
  };
}



    let randomText = generateRandomString(347);
    let base64 = base64Encode(randomText);
    
    function generateRandomString(length) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/.:()&@";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
    
    function base64Encode(str) {
      return btoa(str);
    }
    
    console.log(base64.length)