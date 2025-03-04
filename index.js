$('#popUp,#reqStatusP,#passPage,#secPage,#passDet,#allExist').hide();
$('#mainC').show();

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
     $('#innerPopUp').css('top','15%');
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
  
  let domStr =`<div class="request1"><div class="rRow1"><span>Request ID : ${id}</span><span style="color:${cl}">${st}</span></div><div class="rRow2"><div class="toFram">Thane Stn.E Kopari<br/>TCS Olympus</div><div style="opacity:${op}" class="cancel">Cancel</div></div><div class="rRow3">Bus Stop Name : Thane Stn.E Kopari</div><div class="rRow4"><span>OfficeInTime : 7:00</span><span>Drop : 17:45</span></div><div class="rRow5"><span>Start Date : ${d1}</span><span>End Date : ${d2}</span></div></div>`;
  
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