$(function(){
		$("#table").hide();
		$("#alertmsg").hide();
			$('#searchmovie').on('click' , function(){
				var $movietitle=$('#movietitle').val();
				var $table=$('#table');
				$("#table").show();
				$("#image").hide();
				
				var tbody=$table.find("tbody");

		    	$.ajax({
				    type:'GET',
				    url:'http://www.omdbapi.com/?s='+ $movietitle,
					datatype:'JSON',
					success:function(movietitle){
						$("#alertmsg").hide();
						if(movietitle.Response=="True"){
						tbody.empty();
						$.each(movietitle.Search,function(i,movie){
							// $table.append('<tr>' + '<td>'+ "<img class=image-responsive src="+movie.Poster+">"+'</td>'+'<td>' +movie.Title+'</td>'+'<td>'+movie.Year+'</td>'+'<td>'+movie.imdbID+'</td>'+'<td>'+movie.Type+'</td>'+'</tr>');
				$table.append('<tr>'+ '<td>'+"<img class=image-responsive id=image1 src="+movie.Poster+">"+'</td>'+'<td>'+'Title: '+movie.Title+'<br>'+'Year: '+movie.Year+'<br>'+'imdbID: '+movie.imdbID+'<br>'+'Type: '+movie.Type +'</td>'+'</tr>');
						
						});
					}
					else{
						
						$("#table").hide();
				        $("#image").hide();
				        $("#alertmsg").show();
				       
					}


					}
					// error:function(){
					// alert('error loading movie');
					// }
				  });	
		    });
});