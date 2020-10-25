// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyBE_mJcItNWOnwomCBs_TdaCYY0OpOlFrQ",
	authDomain: "diablo73-github.firebaseapp.com",
	databaseURL: "https://diablo73-github.firebaseio.com",
	projectId: "diablo73-github",
	storageBucket: "diablo73-github.appspot.com",
	messagingSenderId: "1021897007435",
	appId: "1:1021897007435:web:16ccb1088955f92be108ce",
	measurementId: "G-7576SVVH86"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const settings = {};
db.settings(settings);


function GoogleLogIn() {
	//afterlog();
	//userdet(result.additionalUserInfo.profile);
	var base = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(base).then(function(result) {
		console.log(result);
		console.log("New user? = " + result.additionalUserInfo.isNewUser);
		console.log("Logged In!!!");
		afterlog();
		userdet(result.additionalUserInfo.profile);
		if (result.additionalUserInfo.isNewUser) {
			databnew(result.additionalUserInfo.profile);
		}
		else {
			databold(result.additionalUserInfo.profile);
		}
	}).catch(function(err) {
		console.log(err);
		console.log("Error???");
	})
}

function GoogleLogOut() {
	firebase.auth().signOut();
	beforelog();
	console.log("Logged Out!!!");
}

function afterlog() {
	document.getElementById("vueSearch").style.display = "inline-block";
	document.getElementById("logoutbut").style.display = "inline-block";
	document.getElementById("user").style.display = "inline-block";
	document.getElementById("loginbut").style.display = "none";
}

function beforelog() {
	document.getElementById("vueSearch").style.display = "none";
	document.getElementById("logoutbut").style.display = "none";
	document.getElementById("user").style.display = "none";
	document.getElementById("loginbut").style.display = "inline-block";
}

function userdet(r) {
	var use = '<div style="display: inline-block; margin: 40px; vertical-align: middle">';
	use += '<input type="image" src="' + r.picture + ' style="height: 60px; width: 60px; border-radius: 60px;"></div>';
	use += '<div class="userde">' + r.name + '<br>' + r.email + '</div>';
	document.getElementById('user').innerHTML = use;
}

function databnew(r) {
	console.log("New user!!!");
	db.collection("users").add({
		name: r.name,
		email: r.email,
		picture: r.picture
	});
	console.log("Database added to firestore!!!");
}

function databold(r) {
	console.log("Old user!!!");
	db.collection("users").where("email", "==", r.email).get().then(function(querySnapshot) {
		querySnapshot.forEach(function(document) {
			document.ref.update({
				name: r.name,
				email: r.email,
				picture: r.picture
			});
		});
	});
	console.log("Database updated in firestore!!!");
}
