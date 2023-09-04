<script lang="ts">
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    // import { Auth } from "firebase-admin/auth";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
</script>

<nav class="flex justify-center my-6">
    <ul class="steps pt-1">
        <a href="/login" class="step step-primary">Sign In</a>
        <a
            href="/login/username"
            class="step"
            class:step-primary={$page.route.id?.match(/username|photo/g)}>
            Choose Username
        </a>
        <a
            href="/login/photo"
            class="step"
            class:step-primary={$page.route.id?.includes("photo")}>
            Upload Photo
        </a>
    </ul>
</nav>

<!-- Create a navigation menu to share amongst all child routes. -->
<AnimatedRoute>
    <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
        <div class="card-body items-center text-center">
            <slot />
            <AuthCheck>
                <h2>logged in content</h2>
            </AuthCheck>
        </div>
    </main>
</AnimatedRoute>
