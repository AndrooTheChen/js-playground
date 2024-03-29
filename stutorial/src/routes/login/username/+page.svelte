<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte"
    import { db, user, userData } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from 'firebase/firestore';

    let username = "";
    let loading = false;
    let isAvailable = false;

    let debounceTimer: NodeJS.Timeout;

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading

    async function checkAvailability() {
        isAvailable = false;
        clearTimeout(debounceTimer);

        loading = true;

        // This debounce timer is necessary to prevent the function from being called too often.
        // We wait 500ms after a user stops typing before making a request to the DB to check
        // for availability.
        debounceTimer = setTimeout(async () => {
            console.log("checking availability of", username);

            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());

            isAvailable = !exists;
            loading = false;
        }, 500);

    }

    // Write the user data and also username data to the respective collections in Firestore.
    async function confirmUsername() {
        console.log("confirming username", username);
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: ' I like peanuts',
            links: [
                {
                    title: 'Pretend that this is a link',
                    url: 'https://www.youtube.com/watch?v=tGLkmYPsR7Y',
                    icon: 'custom'
                }
            ]
        });

        await batch.commit();
    }
</script>

<AuthCheck>
    {#if $userData?.username}
    <p class="text">
        Your username is <span class="font-bold">@{$userData.username}</span>
    </p>
    <p class="text-error">Usernames cannot be changed</p>
    <a class="btn btn-warning" href="/login/photo">Upload Profile Image</a>
    {:else}
        <form class="w-25" on:submit|preventDefault={confirmUsername}>
            <input
                type="text"
                placeholder="Username"
                class="input w-full"
                bind:value={username}
                on:input={checkAvailability}
            />

            <div class="my-4 min-h-16 px-8 w-full">
                {#if loading}
                <p class="text-secondary">Checking availability of @{username}...</p>
                {/if}
            
                {#if !isValid && isTouched}
                <p class="text-error text-sm">
                    must be 3-16 characters long, alphanumeric only
                </p>
                {/if}
            
                {#if isValid && !isAvailable && !loading}
                <p class="text-warning text-sm">
                    @{username} is not available
                </p>
                {/if}
            
                {#if isAvailable}
                <button class="btn btn-success">Confirm username @{username} </button>
                {/if}
            </div>
        </form>
    {/if}
</AuthCheck>
