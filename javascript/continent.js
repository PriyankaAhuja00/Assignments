const readline = require('readline');
const fs = require('fs');
var header = [];
var jsonData = [];

var isHeader = true;
var flag=false;
var Asia=["Japan","Saudi Arabia","Republic of Korea","India","Russia","Indonesia","Turkey","China"];
var Africa=["South Africa"];
var America=["Brazil","Argentina","Canada","Mexico","USA"];
var Europe=["United Kingdom", "Italy","Germany","France","European Union"];
var Australia=["Australia"];
var sum1=0;
var sum2=0;
var sum3=0;
var sum4=0;
var sum5=0;
var tempData1 = {};
var tempData2 = {};
var tempData3 = {};
var tempData4 = {};
var tempData5 = {};
var flag=0;
const rl = readline.createInterface({
    input: fs.createReadStream('datafile.csv')
});

rl.on('line', function(line) {
    var lineRecords = line.trim().split(',');

    
   for(var j=0;j<lineRecords.length;j++)
   {
        lineRecords[j] = lineRecords[j].replace("\"","").replace("\"","");
  }
    if(isHeader)
    {

      for(var i=0;i<lineRecords.length;i++)
      {
        header[i]=lineRecords[i];
      }
    }
    else
    {
    var temp=-1;
    if(temp!=(Asia.indexOf(lineRecords[0])))
    {
      sum1 = sum1 + parseFloat(lineRecords[2],10) + parseFloat(lineRecords[3],10) + parseFloat(lineRecords[4],10) + parseFloat(lineRecords[5],10);
    }
    if(temp!=(Africa.indexOf(lineRecords[0])))
    {
      
      sum2 = sum2 + parseFloat(lineRecords[2],10) + parseFloat(lineRecords[3],10) + parseFloat(lineRecords[4],10) + parseFloat(lineRecords[5],10);
    }
    if(temp!=(Europe.indexOf(lineRecords[0])))
    {
      
      sum3 = sum3 + parseFloat(lineRecords[2],10) + parseFloat(lineRecords[3],10) + parseFloat(lineRecords[4],10) + parseFloat(lineRecords[5],10);
    }
    if(temp!=(America.indexOf(lineRecords[0])))
    {
      
      sum4 = sum4 + parseFloat(lineRecords[2],10) + parseFloat(lineRecords[3],10) + parseFloat(lineRecords[4],10) + parseFloat(lineRecords[5],10);
    }
    if(temp!=(Australia.indexOf(lineRecords[0])))
    {
      sum5 = sum5 + parseFloat(lineRecords[2],10) + parseFloat(lineRecords[3],10) + parseFloat(lineRecords[4],10) + parseFloat(lineRecords[5],10);
    }
    flag=1;
  }//end of else part
  if(flag==1)
  {
    var result=[];
    tempData1["continent"]="Asia";
    tempData2["continent"]="Africa";
    tempData3["continent"]="America";
    tempData4["continent"]="Europe";
    tempData5["continent"]="Australia";
    tempData1["Population"]=sum1.toString();
    tempData2["Population"]=sum2.toString();
    tempData3["Population"]=sum3.toString();
    tempData4["Population"]=sum4.toString();
    tempData5["Population"]=sum5.toString();
    result.push(tempData1);
    result.push(tempData2);
    result.push(tempData3);
    result.push(tempData4);
    result.push(tempData5);
  }//end of flag
    jsonData=result;
    fs.writeFileSync("continent.json",JSON.stringify(jsonData),encoding="utf8");

    tempData1={};
    tempData2={};
    tempData3={};
    tempData4={};
    tempData5={};
    isHeader=false;
    flag=0;
});


