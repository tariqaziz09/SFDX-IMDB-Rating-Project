({
	fetchMovieList : function(component, event) {
        return new Promise(function(resolve, reject){
            //component.set('v.loaded', !component.get('v.loaded'));
         var action=component.get('c.getMovieList');
        action.setParams({
            movieName:component.get('v.movieName'),
            page:component.get('v.counter')
        });
            action.setCallback(this, function(response){
             if(response.getState() === 'SUCCESS'){
               var MovieList = response.getReturnValue();
                  component.set('v.MovieList',MovieList);
                 console.log(component.get('v.loaded')+ ": check loaded");
                 //alert(MovieList.length);
                 		if(MovieList &&MovieList.length<10)
                            component.set('v.disableNext','true');
                  
               resolve(MovieList);
            } else {
               reject();
            }
         });
        $A.enqueueAction(action);
      });
    }
})