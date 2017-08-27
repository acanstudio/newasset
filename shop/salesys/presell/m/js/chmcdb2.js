var referrer_url = document.referrer;
var presell_id = $("#presell_id").val();
alert(presell_id);

document.writeln('<div align=center><iframe src=\"/form.html?presell_id='+presell_id+'&referrer_url='+escape(referrer_url)+'\" frameborder=\"0\" scrolling=\"no\" width=\"100%\" height=\"980px\"><\/iframe><\/div>')
