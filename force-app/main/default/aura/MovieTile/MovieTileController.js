({
	onMovieClick : function(component, event, helper) {
		var appEvent = $A.get("e.c:SelectedMovie");
        var movieId=component.get('v.movie.imdbId');
        appEvent.setParams({
            movieId:movieId
        });
        //alert("Event about to fire:"+movieId);
        appEvent.fire();
	}
})