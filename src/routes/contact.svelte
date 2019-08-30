<svelte:head>
	<title>contact</title>
</svelte:head>

<form class="formview" action="https://formspree.io/justin@justinduch.com" method=POST id="contact-form" name="contact-form">
	<header>
		<h2 class="text-center heading">Contact Me</h2>
		<p class="text-center extra-info">To contact me please email <a href="mailto:justin@justinduch.com">justin@justinduch.com</a> or submit your enquiry using the form below.</p>
	</header>
	<div class="form-group email-input-wrapper">
		<label class="control-label sr-only" for="email">E-mail </label>
		<input class="form-control" type="email" name="_replyto" required="" placeholder="Email" inputmode="email">
	</div>
	<div class="form-group message-input-wrapper">
		<label class="control-label sr-only" for="message">Message </label>
		<textarea class="form-control" rows="5" name="message" required="" placeholder="Message"></textarea>
	</div>
	<div class="contact-form-btn-wrapper">
		<button class="btn btn-default btn-submit" type="submit">send</button>
	</div>
</form>
