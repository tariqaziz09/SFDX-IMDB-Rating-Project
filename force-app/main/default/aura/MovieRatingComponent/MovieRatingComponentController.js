({
	handleClick : function(component, event, helper) {
        component.set("v.loaded",true);
       // console.log("Inside Handle click");
        helper.callServer(component, event).then($A.getCallback(function(response){
            component.set('v.loaded',false);
        })).catch($A.getCallback(function(error){
            // console.log('Error');
            component.set('v.loaded',false);
            alert("Error:"+error);
         }));
        
        helper.fireEvent(component,event);
       
	},
    handleEnter:function(component, event, helper) {
        //console.log("Inside handleEnter");
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
        component.set("v.loaded",true);
            helper.callServer(component, event).then($A.getCallback(function(response){
                component.set("v.loaded",false);
            })).catch($A.getCallback(function(response){
                console.log('Error');
            }));
             helper.fireEvent(component,event);
        }
	},
    resetVal:function(component, event, helper) {
   var queryTerm = component.find('enter-search').get('v.value');
        if(queryTerm==null ||queryTerm==''){
            component.set('v.Show',false);
            component.set('v.MovieDetail',null);
            var buttonsubmit=component.getEvent("buttonsubmit");
        buttonsubmit.setParams({
            "movie":queryTerm
        });
            buttonsubmit.fire();
        }      
    },
    openImdb:function(component, event, helper) {
        var imdbUrl="http://www.omdbapi.com/?i="+component.get('v.MovieDetail.imdbId');
        window.open("https://www.imdb.com/title/"+component.get('v.MovieDetail.imdbId'), '_blank');
    },
    getSelectedMovie: function(component, event, helper) {
        component.set("v.loaded",true);
        var action=component.get('c.getMovieDetailbyId');
        var movieId = event.getParam("movieId");
        action.setParams({
            movieId:movieId
        });
        //alert("Event captured"+movieId);
        var error=action.getState();
		//alert(error);
        action.setCallback(this,function(response){
            var responseValue=response.getReturnValue();
            component.set('v.MovieDetail',responseValue);
            component.set('v.videoUrl',"https://www.youtube.com/embed/"+responseValue.videoId);
           //alert('responseValue'+JSON.stringify(responseValue));
           component.set("v.loaded",false);
            component.set('v.Show',true);
        },'SUCCESS');
        
        /*Step 3*/
        $A.enqueueAction(action);
    },
    getCss: function(component, event, helper) {
        
        var toggleValue=event.getParam("toggleValue");
        if(toggleValue){
        component.set("v.toggleCss","toggleClass");
        }
        else
         component.set("v.toggleCss","");   
    }
    
})