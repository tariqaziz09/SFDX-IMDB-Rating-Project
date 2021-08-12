({
	doSearch : function(component, event, helper) {
        let button = event.getSource();
        component.set('v.disableNext',false);
       // console.log('loaded 1:',component.get('v.loaded') + ' '+component.get('v.disableNext'));
        component.set('v.counter',1);
        component.set('v.loaded',true);
        var movieName=component.get("v.movieName");
        console.log("Inside SearchResult"+movieName);
        console.log('doSearch Spinner'+component.get('v.loaded'));
        if(movieName){
        helper.fetchMovieList (component, event).then($A.getCallback(function(MovieList){
            component.set('v.loaded',false);
            console.log(MovieList.length);
         }))
         .catch($A.getCallback(function(){
             console.log('Error');
         }));
        }
        else
            component.set("v.MovieList",null);
        
	},
    showNext: function(component, event, helper){
       component.set('v.counter',component.get('v.counter')+1);
       component.set('v.loaded',true);
        console.log('showNext Spinner'+component.get('v.loaded'));
       // component.set('v.loaded',false);
        helper.fetchMovieList (component, event).then($A.getCallback(function(MovieList){
            console.log('Hello'+MovieList);
             var temp=component.get('v.disableNext');
            component.set('v.loaded',false);
            console.log(component.get('v.loaded'));
        	console.log('temp'+temp);
        	let button = event.getSource();
        if(temp)
            button.set('v.disabled',true);
         }))
         .catch($A.getCallback(function(){
             console.log('Hello');
         }));

 
	},
    showPrevious: function(component, event, helper){
       component.set('v.counter',component.get('v.counter')-1); 
        component.set('v.disableNext',false);
        component.set('v.loaded',true);
        console.log('showPrevious Spinner'+ component.get('v.loaded'));
        event.getSource().set('v.disabled',false);
        helper.fetchMovieList (component, event).then($A.getCallback(function(MovieList){
            component.set('v.loaded',false);
            console.log(component.get('v.loaded'));
         }))
         .catch($A.getCallback(function(){
             console.log('Error');
         }));
    },
    getCss: function(component, event, helper) {
        var toggleValue=event.getParam("toggleValue");
        if(toggleValue){
        component.set("v.toggleCss",true);
        }
        else
         component.set("v.toggleCss",false);   
    }
    
})