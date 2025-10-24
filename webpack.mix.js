const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
   .sass("resources/sass/app.scss", "public/css");

mix.js('resources/js/components/Register.js', 'public/js')
   .sass('resources/sass/register.scss', 'public/css');

mix.sass('resources/sass/student.scss', 'public/css');
mix.sass('resources/sass/faculty.scss', 'public/css');
mix.sass('resources/sass/dashboard.scss', 'public/css');
mix.sass('resources/sass/login.scss', 'public/css');
mix.sass('resources/sass/profile.scss', 'public/css');
mix.sass('resources/sass/Report.scss', 'public/css');
mix.sass('resources/sass/SystemSetting.scss', 'public/css');

