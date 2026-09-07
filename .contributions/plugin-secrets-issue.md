# Add visibility controls to secret fields in plugin forms

Generated plugin forms show ordinary text fields in clear text, even when a field is named `password` or `apiKey`. Declared password fields are masked but have no reveal control.

Proposed behavior: mask declared password fields and commonly named secret text fields by default. Add an eye button for each field, keeping the existing input and validation. Reopening the form resets visibility.

A synthetic plugin with `password` and `apiKey` string properties reproduces this without an account or device. The change is display privacy only. It does not encrypt config.json, change API responses, or cover arbitrary custom HTML and multiline controls.

Happy to discuss the field detection rules or adjust the proposed behavior.
