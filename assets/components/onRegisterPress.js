import firebase from 'firebase'

const onRegisterPress = () => {

    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    {/* We call Firebase Auth’s createUserWithEmailAndPassword API (line 13), 
    which creates a new account that will show up in Firebase Console -> Authentication table.*/ }
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };

            {/* If the account registration was successful, we also store the user data in Firebase Firestore (line 24). This is necessary for storing extra user information,
             such as full name, profile photo URL, and so on, which cannot be stored in the Authentication table.
            
            If registration was successful, 
            we navigate to the Home Screen, by passing in the user object data as well.
        
             If any error occurs, we simply show an alert with it. Errors can be things such 
                as no network connection, password too short, email invalid, and so on.*/}
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Home', {user: data})
                }) 
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error) 

    });
}

export default onRegisterPress; 