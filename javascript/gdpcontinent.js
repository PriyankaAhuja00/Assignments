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
var tempData6 = {};
var tempData7 = {};
var tempData8 = {};
var tempData9 = {};
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
    sum1 = sum1 + parseFloat(lineRecords[6],10) + parseFloat(lineRecords[7],10) + parseFloat(lineRecords[8],10) + parseFloat(lineRecords[9],10);
  }
  if(temp!=(Africa.indexOf(lineRecords[0])))
  {
    
    sum2 = sum2 + parseFloat(lineRecords[6],10) + parseFloat(lineRecords[7],10) + parseFloat(lineRecords[8],10) + parseFloat(lineRecords[9],10);
  }
  if(temp!=(Europe.indexOf(lineRecords[0])))
  {
    
    sum3 = sum3 + parseFloat(lineRecords[6],10) + parseFloat(lineRecords[7],10) + parseFloat(lineRecords[8],10) + parseFloat(lineRecords[9],10);
  }
  if(temp!=(America.indexOf(lineRecords[0])))
  {
    
    sum4 = sum4 + parseFloat(lineRecords[6],10) + parseFloat(lineRecords[7],10) + parseFloat(lineRecords[8],10) + parseFloat(lineRecords[9],10);
  }
  if(temp!=(Australia.indexOf(lineRecords[0])))
  {
    sum5 = sum5 + parseFloat(lineRecords[6],10) + parseFloat(lineRecords[7],10) + parseFloat(lineRecords[8],10) + parseFloat(lineRecords[9],10);
  }
  flag=1;
}//end of else part
if(flag==1)
{
  var result=[];
  tempData1["Continent"]="Asia";
  tempData6["Continent"]="Africa";
  tempData7["Continent"]="America";
  tempData8["Continent"]="Europe";
  tempData9["Continent"]="Australia";
  tempData1["GDP"]=sum1.toString();
  tempData6["GDP"]=sum2.toString();
  tempData7["GDP"]=sum3.toString();
  tempData8["GDP"]=sum4.toString();
  tempData9["GDP"]=sum5.toString();
  result.push(tempData1);
  result.push(tempData6);
  result.push(tempData7);
  result.push(tempData8);
  result.push(tempData9);
}//end of flag
  jsonData=result;
  fs.writeFileSync("gdpcontinent.json",JSON.stringify(jsonData),encoding="utf8");

  tempData1={};
  tempData6={};
  tempData7={};
  tempData8={};
  tempData9={};
  isHeader=false;
  flag=0;
});