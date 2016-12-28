<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * reCAPTCHA - Google Captcha
 */

// To use reCAPTCHA, you need to sign up for an API key pair for your site.
// link: http://www.google.com/recaptcha/admin
$config['recaptcha_site_key'] = '6LeE8QcUAAAAABhPI7LPdyVTsCtJIn2UMu1LVNuA';
$config['recaptcha_secret_key'] = '6LeE8QcUAAAAAKAL7EXGKoRZ9VoRuHaJGm2cVbvp';

// reCAPTCHA supported 40+ languages listed here:
// https://developers.google.com/recaptcha/docs/language
$config['recaptcha_lang'] = 'en';

/* End of file recaptcha.php */
/* Location: ./application/config/recaptcha.php */