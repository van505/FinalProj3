<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
  <link rel="stylesheet" href="{{ mix('css/register.css') }}">
</head>
<body>
  <div class="register-container">
    <!-- Left Side (Form) -->
    <div class="register-form">
      <h2>Sign up now</h2>
      <p class="subtitle">Be a User</p>

      <form method="POST" action="/register">
        @csrf
        <div class="form-group">
          <input type="text" name="fullname" placeholder="Full Name" required>
        </div>
        <div class="form-group">
          <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" name="password" placeholder="Password" required>
        </div>
        <div class="form-group">
          <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
        </div>
        <div class="checkbox">
          <input type="checkbox" name="is_admin"> Register as Admin
        </div>
        <button type="submit" class="btn-next">Next</button>
      </form>

      <p class="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>

    <!-- Right Side (Steps Sidebar) -->
    <div class="register-sidebar">
      <ul>
        <li class="active"><span>Step 1</span> Fill in your details</li>
        <li><span>Step 2</span> Verify your email</li>
        <li><span>Step 3</span> Set your preferences</li>
        <li><span>Step 4</span> Review info</li>
        <li><span>Final Step</span> Complete registration</li>
      </ul>
    </div>
  </div>
</body>
</html>