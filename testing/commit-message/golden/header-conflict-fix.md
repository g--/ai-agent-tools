fix(res.send): 🐛 prevent Content-Length + Transfer-Encoding conflict

Fixed the behavior of `res.send()` to prevent conflicts between
`Content-Length` and `Transfer-Encoding` HTTP headers in responses. The
`Content-Length` header in `res.send()` is now only added when a
`Transfer-Encoding` header is not present, complying with the HTTP
specification that states both headers should not coexist in the same response.

Co-authored-by: bjohansebas <bjohansebas@users.noreply.github.com>
