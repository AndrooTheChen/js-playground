<script lang="ts">
    import { auth } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    // Wrapper function to create an authentication object and sign in with Google. Upon
    // signing in Firebase issues a JWT token that can be used to authenticate and be stored
    // by the user. Note that this only allows the user to be verified on the client side and
    // NOT on the server side. 
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
    }

</script>

<h2>Login</h2>

<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>