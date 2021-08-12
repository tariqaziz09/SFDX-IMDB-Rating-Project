({
	callServer : function(component, event, helper) {
        return new Promise(function(resolve,reject){
        //console.log("inside Helper");
        var queryTerm = component.find('enter-search').get('v.value');
        	console.log("iqueryTerm"+queryTerm);
		 var action=component.get('c.getMovieDetail');
        action.setParams({
            movieName:queryTerm
        });
        var error=action.getState();
        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
            var responseValue=response.getReturnValue();
            component.set('v.MovieDetail',responseValue);
            component.set('v.videoUrl',"https://www.youtube.com/embed/"+responseValue.videoId);
            component.set('v.Show',true);
            //component.set("v.loaded",false);
                resolve(responseValue);
            }else
                           {
                           reject();
                           }
        });
        $A.enqueueAction(action);
        });    
	},
    fireEvent:function(component, event, helper){
        var movieTerm = component.find('enter-search').get('v.value');
        var buttonsubmit=component.getEvent("buttonsubmit");
        buttonsubmit.setParams({
            "movie":movieTerm
        });
        
        buttonsubmit.fire();
    }
})