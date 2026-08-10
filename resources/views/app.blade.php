<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Cyber Staff | Agencia de Desarrollo de Ideas Tecnológicas') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/images/logoCS.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/images/logoCS.ico">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap"
        rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body
    class="font-sans antialiased bg-[#021a1e] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden min-h-screen">
    @inertia
</body>

</html>