const readline = require('readline');
const fs = require('fs');
var header = [];
var jsonData = [];
var tempData = {};
var isHeader = true;
var flag=false;
const rl = readline.createInterface({
    input: fs.createReadStream('datafile.csv')
});

rl.on('line', function(line) {
    var lineRecords = line.trim().split(',');
    for (var i = 0; i < lineRecords.length; i++) {
        if (isHeader) {
            header[i] = lineRecords[i].split("\"")[1];
        } else 
        	{
	        	if(!(lineRecords[header.indexOf('Country Name')].split("\"")[1] == 'European Union'))
	        	{
	        		if (header[i] == 'Country Name' ) 
	        		{
	                	tempData[header[i]] = lineRecords[i].split("\"")[1];
	           		}   
	           		if (header[i] == 'Purchasing Power in Billions ( Current International Dollar) - 2013') 
	           		{
	                	tempData[header[i]] = lineRecords[i].split("\"")[1];
	           		}
	           		flag=true;
	        	}
	        		else
                flag=false;
       		  }

          }
     isHeader = false;
   if(flag==true)
   {
   		jsonData.push(tempData);
    	fs.writeFileSync("PowervsC.json", JSON.stringify(jsonData), encoding = "utf8");
    	tempData = {};
   } 
});


