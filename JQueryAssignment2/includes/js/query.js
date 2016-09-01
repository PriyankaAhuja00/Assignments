$(function() {
  var $table = $('#table');
  var tbody = $table.find("tbody");
  var bookid=$('#bookid');
  var $bookname = $('#bookname');
  var $edition = $('#edition');
  var $year = $('#year');
  var $authorname = $('#authorname');
  var $price = $('#price');
  var $alertmsg=$('#alertmsg');
  var $id;
  $table.hide(); 
    // search by book id
    $('#searchbook').on('click', function() {
      var $bookid = $('#bookid').val();
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/data?id=' + $bookid,
        datatype: 'JSON',
        success: function(bookid) {
         if(bookid.length>0){
          tbody.empty();
          $alertmsg.hide();
          $table.show();
          $.each(bookid, function(i, bookid) {
           console.log(bookid);
           $table.append("<tr><td>" + bookid.id + "</td><td>" + bookid.bookname + "</td><td>" + bookid.edition + "</td><td>" + bookid.year + "</td><td>" + bookid.authorname + "</td><td>" + bookid.price + "</td>" + '<td> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+bookid.id+'"></span></a>' + '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+bookid.id+'" ></span></button>' + '</td>' + "</tr>");
         }); 
        }
        else{
         $alertmsg.show();
         $table.hide();
         document.getElementById("alertmsg").innerHTML="OOPS! ID doesnot exist.. Enter valid id";
                }  // ends each
            },        //success ends
            error:function(){
            	document.getElementById("alertmsg").innerHTML="ID not found";
            }
        });           //ajax call ends
    });               // search on click function ends
    // search by book id ends here

    // viewall data begins
    $('#viewall').on('click', function() {
      start=0;
      end=20;
      var $viewall = $('#viewall');
        $.ajax({
          type: 'GET',
          url: 'http://localhost:3000/data?_start=0&_end=20',
          datatype: 'JSON',
          success: function(table) {
            tbody.empty();
            // $("#title").hide();
            // $("#bookid").hide();
            // $("#searchbook").hide();
            $table.show();
            $alertmsg.hide();
            $.each(table, function(i, viewall) {
              $table.append("<tr><td>" + viewall.id + "</td><td>" + viewall.bookname + "</td><td>" + viewall.edition + "</td><td>" + viewall.year + "</td><td>" + viewall.authorname + "</td><td>" + viewall.price + "</td>" + "</td>" + '<td><a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+viewall.id+'"></span></a>' + '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+viewall.id+'"></span></button>' + '</td>' + "</tr>");
                });     // ends each
            },           //success ends
            error: function() {
              alert('invalid entry');
            }
        });             //ajax call ends
    });                 // view all on click function ends
    // view all data ends here

 	// modal window data       
  function submit(addbook) {
    $table.append("<tr><td>" + addbook.id + "</td><td>" + addbook.bookname + "</td><td>" + addbook.edition + "</td><td>" + addbook.year + "</td><td>" + addbook.authorname + "</td><td>" + addbook.price + "</td>" + "</td>" + '<td> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+addbook.id+'"></span></a>' + '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+addbook.id+'"></span></button>' + '</td>' + "</tr>");
  }
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/data?_start=0&_end=10',
    datatype: 'JSON',
    success: function(table) {
     $(table).each(function(i,addbook)
     {
      $('#add').show();
      $('#save').hide();
      $table.append("<tr><td>" + addbook.id + "</td><td>" + addbook.bookname + "</td><td>" + addbook.edition + "</td><td>" + addbook.year + "</td><td>" + addbook.authorname + "</td><td>" + addbook.price + "</td>" + "</td>" + '<td><a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+addbook.id+'"></span></a>'+ '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+addbook.id+'"></span></button>' + '</td>' + "</tr>");
                    // submit(addbook);
                });     // ends each
            },          //success ends
            error: function() {
              alert('invalid entry');
            }
        });             //ajax call ends
  $('#add').on('click', function() {
    var addbook = {
      bookname: $bookname.val(),
      edition: $edition.val(),
      year: $year.val(),
      authorname: $authorname.val(),
      price: $price.val() 
    };
    // console.log(bookname);
    if(addbook.bookname.length== 0 || addbook.edition.length== 0 || addbook.year.length==0|| addbook.authorname.length==0||addbook.price.length==0){
      alert("please fill all the required fields..");
      return false;
    }
    else if(!addbook.edition.match('^[ a-zA-Z]+$')){
      alert("Enter only alphabets");
      return false;
    }
    else if(!($.trim($('#authorname').val()).match('^[a-zA-Z ]+$'))){
      alert("That's not a valid author name..Enter only alphabets");
      return false;
    }
    else if(addbook.year.length>4 || addbook.year.length<4 || addbook.year >2015 || addbook.year<1940){
      alert("Invalid format of year");
      return false;
    }
    else if(addbook.price>1000 || addbook.price<20){
      alert("enter price range between 0 & 1000");
      return false;
    }
    else{
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/data',
        datatype: 'JSON',
        data : addbook,
        success: function(newBook) {
          submit(newBook);
          $table.show();
          alert("book added successfully");
                     $('#save').hide();
                     return true;
                  },
                  error: function() {
                    alert('invalid entry');
                  }
            });       // ajax call ends
        }
    });           //add on click ends
        // delete part begins
        $table.delegate(".glyphicon-trash", 'click' , function(){
        	var flag=confirm("Are you sure you want to delete the entry");
        	var $tr=$(this).closest('tr');
        	console.log($(this).closest('tr'));
        	console.log($(this).attr('data-id'));
          if(flag==true){
           $.ajax({
            type:'DELETE',
            url:'http://localhost:3000/data/'+$(this).attr('data-id'),
            success: function(){
             $tr.remove();
        		},     //success ends
            error: function() {
              alert('invalid entry');
            }
        	});       //ajax call ends here
         }
        });           //table.delegate ends here
        // delete ends

        // update begins
        $table.delegate(".glyphicon-pencil",'click',function(){
          $id = $(this).attr('data-id');
          $('#add').hide();
          $('#save').show();
          $.ajax({
           type: 'GET',
           url: 'http://localhost:3000/data/'+$id,
           dataType: 'JSON',
           success: function(searchData)
           {
             $bookname.val(searchData.bookname),
             $edition.val(searchData.edition),
             $year.val(searchData.year),
             $authorname.val(searchData.authorname),
             $price.val(searchData.price)
           },
           error: function()
           {
             alert('not found');
           }
       });//end ajax edit
   });//end glyphicon-pencil edit
        $("#save").click(function ()
        {
         $("#table").find("tr:not(:first)").remove();
         // var flag = confirm(" Do you want to save the changes");
         var employees={
           bookname: $bookname.val(),
           edition: $edition.val(),
           year: $year.val(),
           authorname: $authorname.val(),
           price: $price.val()
         };
         console.log(name);
         // if(flag==true){
          if(employees.bookname.length== 0 || employees.edition.length== 0 || employees.year.length==0|| employees.authorname.length==0||employees.price.length==0){
            alert("please fill all the required fields..");
            return false;
          }
          else if(!employees.edition.match('^[ a-zA-Z]+$')){
            alert("Enter only alphabets");
            return false;
          }
          else if(!($.trim($('#authorname').val()).match('^[a-zA-Z ]+$'))){
            alert("That's not a valid author name..Enter only alphabets");
            return false;
          }
          else if(employees.year.length>4 || employees.year.length<4 || employees.year >2015 || employees.year<1940){
            alert("Invalid format of year");
            return false;
          }
          else if(employees.price>1000 || employees.price<20){
            alert("enter price range between 0 & 1000");
            return false;
          }
          else{
           $.ajax({
             url: 'http://localhost:3000/data/'+$id,
             type: 'PUT',    
             data: employees,
             success: function(bookid){
               $table.append("<tr><td>" + bookid.id + "</td><td>" + bookid.bookname + "</td><td>" + bookid.edition + "</td><td>" + bookid.year + "</td><td>" + bookid.authorname + "</td><td>" + bookid.price + "</td>" + "</td>" + '<td><a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+bookid.id+'"></span></a>'+ '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+bookid.id+'"></span></button>' + '</td>' + "</tr>");
               alert("data updated successfully");
               return true;
                 },
                 error: function() {
              alert('invalid entry');
            }
            });//end ajax edit
        }
      // }
   });//end save button

       //pagination
       var start=0;
       var end =20;
       $(window).scroll(function()
       {
         if($(window).scrollTop() == $(document).height() - $(window).height())
         {
           $('div#loadmoreajaxloader').show();
           $.ajax({
             url: 'http://localhost:3000/data?_start='+(start+20)+'&_end='+(end+20),
     //http://localhost:3000/db?_start=0&_end=10
     success: function(html)
     {
       start = start+20;
       end = end+20;
       if(html)
       {
         $("#postswrapper").append(html);
         $(html).each(function(index,html)
         {
           $table.append("<tr><td>" + html.id + "</td><td>" + html.bookname + "</td><td>" + html.edition + "</td><td>" + html.year + "</td><td>" + html.authorname + "</td><td>" + html.price + "</td>" + "</td>" + '<td><a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+html.id+'"></span></a>'+ '</td>' + '<td> <button><span class="glyphicon glyphicon-trash" data-id="'+html.id+'"></span></button>' + '</td>' + "</tr>");
         });
         $('div#loadmoreajaxloader').hide();
       }else
       {
         $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
       }
     }
   });
         }
  });

});               //main function ends here

