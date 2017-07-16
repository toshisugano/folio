<?php 	
	$username = $_POST['username'];
	//If $_POST['password'] == password && $_POST['username'] == names
	$names = array(
		'payal' => 'payal',
		'director' => 'director',
		'apoorva' => 'apoorva',
		'samir' => 'samir',
		'pooja' => 'pooja',
		'riddhi' => 'riddhi',
		'farooq' => 'farooq',
		'lipi' => 'lipi',
		'sourav' => 'sourav',
		'toshi' => 'toshi'
        );

	if ($_POST['password'] == 'Tara1308!' and $username === $names[$username]) {
		echo true;
	} 
	else {
		echo false;
	}
?>