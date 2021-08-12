public class MovieDetail{
        @auraEnabled
        public String Title ;
        @auraEnabled
        public String Year;
        @auraEnabled
        public String Poster;
        @auraEnabled
        public String imdbRating;
        @auraEnabled
        public String imdbVotes;
        @auraEnabled
        public String imdbId;
        @auraEnabled
         public String metaScore; 
        @auraEnabled
        public String Genre;
        @auraEnabled
        public String Plot ;
        @auraEnabled
        public list<Rating> ratings;
		@auRaEnabled
    	public String Response ;
    	@auRaEnabled
    	public String videoId ;
    	
    public class Rating {
        @auraEnabled    
        public String Source ;
        @auraEnabled    
        public String Value  ;  
    }
    
    /*public static List<MovieDetail> parse(String json) {
        return (List<MovieDetail>) System.JSON.deserialize(json, List<MovieDetail>.class);
    }*/

}