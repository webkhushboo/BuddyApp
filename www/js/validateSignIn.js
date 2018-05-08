var user = getValueFromSession('user');


if (typeof user.name == 'undefined') 
{
	window.location = 'login.html';
}

	