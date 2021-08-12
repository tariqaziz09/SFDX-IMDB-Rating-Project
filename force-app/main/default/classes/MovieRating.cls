public class MovieRating {
    public class FetchVideo{
      @auraEnabled
    	public String videoId ;  
    }
   @auraEnabled
    public static list<MovieDetail> getMovieList(String movieName,Integer page){
		list<MovieDetail> mD=new list<MovieDetail>();
        List<MovieDetail> movieList= new List<MovieDetail> ();
        String[] movieNamewithSpace= movieName.split(' ');
        String movieNameMod='';
        for(integer i=0;i<movieNamewithSpace.size();i++){
            if(i==movieNamewithSpace.size()-1)
                movieNameMod+=movieNamewithSpace[i];
            else
            movieNameMod+=movieNamewithSpace[i]+'+';
		}
        system.debug('movieNameMod'+movieNameMod);
       
        Http h=new Http();
		HttpRequest req= new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('http://www.omdbapi.com/?apikey=d6e3c177&s='+movieNameMod+'&type=movie'+'&page='+page);
        req.setHeader('content-type', 'application/json');
        HttpResponse res=h.send(req);
         try{
        
        String allcontents = res.getBody();
        String str=allcontents.replace('{"Search":', '');
        system.debug('str'+str);
        MovieDetail MovieNotFound= (MovieDetail)JSON.deserialize(str, MovieDetail.class);
        System.debug('StaticResource_InterestTags'+MovieNotFound);
             if(MovieNotFound.Response=='False'){
                 System.debug('No Movie'+MovieNotFound);
                 return null;
             }
        }catch(System.JSONException e){
            String allcontents = res.getBody();
        	String str=allcontents.replace('{"Search":', '');
            movieList = (List<MovieDetail>)JSON.deserialize(str, List<MovieDetail>.class);
            system.debug('Insdie movieList'+movieList);
            return movieList;
        }
        system.debug('movieList'+movieList);
                if(res.getStatusCode()==200 && movieList.size()>=1){
       	/*Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        if(m.get('Title')==null || m.get('Title')=='')
        {
            return null;
        }
            else{  
                MovieDetail resposeRes=(MovieDetail)JSON.deserialize(res.getBody(), MovieDetail.class);
     /*   mD.Title=(String)m.get('Title');
        mD.Poster=(String)m.get('Poster');
        mD.imdbRating=(String)m.get('imdbRating');
        mD.imdbVotes=(String)m.get('imdbVotes');        
		mD.imdbId=(String)m.get('imdbID');
        mD.metaScore=(String)m.get('Metascore');     
        mD.Year=(String)m.get('Released');
        mD.Genre=(String)m.get('Genre');        
        mD.Plot=(String)m.get('Plot');  
               // list<String> rt=m.get('Ratings');
              // Map<String, String> ratings = (Map<String, String>)JSON.deserializeUntyped(m.get('Ratings')); 
                system.debug(m.get('Ratings') );
        System.debug(md);
        return resposeRes;*/
                    system.debug('Before Return'+movieList);
                    return movieList;
        }
            
        else
			{
            String error=res.getStatus();
                //md.Title=error;
            return md;
            }}
    	
    @auraEnabled
        public static MovieDetail getMovieDetail(String movieName){
            system.debug('movieName'+movieName);
            String[] movieNamewithSpace= movieName.split(' ');
        String movieNameMod='';
        for(integer i=0;i<movieNamewithSpace.size();i++){
            if(i==movieNamewithSpace.size()-1)
                movieNameMod+=movieNamewithSpace[i];
            else
            movieNameMod+=movieNamewithSpace[i]+'+';
		}
   		Http h=new Http();
		HttpRequest req= new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('http://www.omdbapi.com/?apikey=d6e3c177&t='+movieNameMod);
       	req.setHeader('content-type', 'application/json');
        HttpResponse res=h.send(req);
            system.debug('res.getBody()'+res.getBody());
        MovieDetail movieList = (MovieDetail)JSON.deserialize(res.getBody(), MovieDetail.class);
            system.debug('movieList'+movieList);
        if(movieList.Poster=='N/A'){
                movieList.Poster='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon.png';
         } 
            if(movieList.Response=='True'){
            //FOR YOUTUBE VIDEOID FETCH FOR TRAILOR     
			String videoId=getVideoId(movieList.imdbId);
            movieList.videoId=videoId;
            }
            system.debug('movieList'+movieList.videoId);
            return movieList;
        }
    @auraEnabled
        public static MovieDetail getMovieDetailbyId(String movieId){
            system.debug('movieId'+movieId);
	//FOR MOVIEW DETAIL Fetch
   		Http h=new Http();
		HttpRequest req= new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('http://www.omdbapi.com/?apikey=d6e3c177&i='+movieId);
       	req.setHeader('content-type', 'application/json');
        HttpResponse res=h.send(req);
            system.debug('res.getBody()'+res.getBody());
        MovieDetail movieList = (MovieDetail)JSON.deserialize(res.getBody(), MovieDetail.class);

            
            if(movieList.Poster=='N/A'){
                movieList.Poster='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon.png';
            }

            
                   
    //FOR YOUTUBE VIDEOID FETCH FOR TRAILOR     
		String videoId=getVideoId(movieId);
            movieList.videoId=videoId;
            system.debug('movieList'+movieList.videoId);
            return movieList;
        }
    
    public Static String getVideoId(String imdbId){
        HTTP h= new HTTP();
        HttpRequest request= new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('https://imdb-api.com/en/API/YouTubeTrailer/k_51xcbxq6/'+imdbId);
       	request.setHeader('content-type', 'application/json');
        HttpResponse response=h.send(request);
            FetchVideo mv=(FetchVideo)JSON.deserialize(response.getBody(), FetchVideo.class);
        	system.debug('a=='+mv.videoId);
        return mv.videoId;
    }
        
        
    
}