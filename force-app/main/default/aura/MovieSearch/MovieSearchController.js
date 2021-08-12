({
	onButtonClick : function(component, event, helper) {
		var data=event.getParam("movie");
		component.set('v.movie',data);
        //alert('data'+data);
	},
    getToggleButtonValue:function(component, event, helper) {
		var checkCmp = component.find("tglbtn").get("v.checked");
        if(checkCmp){
        component.set("v.labelValue","Switch to Default Mode");
        component.set("v.darkModeEnable","darkMode");
        }
        else{
            component.set("v.labelValue","Switch to Night Mode");
            component.set("v.darkModeEnable","");
        }
        var appEvent = $A.get("e.c:ToggleChange");
        appEvent.setParams({
            toggleValue:checkCmp
        });
        appEvent.fire();
	}
})