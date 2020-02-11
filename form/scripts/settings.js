// статические классы
var Settings 	= {};
Settings.data 	= {};
Settings.init 	= function(oSettings){
	Settings.data = oSettings;
	console.log(Settings.data);
}
Settings.get 	= function(sSettingName){
	return Settings.data[sSettingName];
}