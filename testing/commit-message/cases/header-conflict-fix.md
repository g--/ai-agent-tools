# Case: preserve the reason for a header-ordering fix

## Intended artifact

A Git commit message that future engineers will read while investigating a change to how HTTP response headers are set.

## Task

Write a commit subject and include a body only if it earns its place.

## Source material

Adapted from a commit to [expressjs/express](https://github.com/expressjs/express) (MIT licensed, Jun 15 2026), commit [`18e5985`](https://github.com/expressjs/express/commit/18e5985b8a9d5e8423db0a9121f22bdaecd5b120) by YuryShkoda and bjohansebas.

Express is the "fast, unopinionated, minimalist web framework for node.js," originally released in 2010 and now one of the most widely used HTTP server frameworks in the Node ecosystem (69k+ GitHub stars). `res.send()` is one of its oldest and most heavily used response methods — it accepts a string, Buffer, or object, sets appropriate headers, and writes the response body. Because so many downstream frameworks and middleware build on `res.send()`, changes to its header-setting logic can affect a large number of applications, and correctness against the HTTP spec matters more than it would in a less widely depended-on library.

`res.send()` unconditionally set a `Content-Length` header before the response was flushed, computed from the byte length of the body. When application code (or a proxying middleware) had already set a `Transfer-Encoding` header on the same response — for example to stream a chunked response — the framework would still add `Content-Length` on top of it. HTTP/1.1 forbids a response from carrying both headers at once: a recipient must treat `Content-Length` as invalid whenever `Transfer-Encoding` is present, and some clients and intermediaries reject or mishandle such a response outright. The fix makes `res.send()` skip setting `Content-Length` whenever a `Transfer-Encoding` header is already present on the response, leaving chunked responses with only the one header HTTP requires.

The change shipped as pull request [#4893](https://github.com/expressjs/express/pull/4893), opened by YuryShkoda with the stated intent "Because `Content-Length` and `Transfer-Encoding` can't be present in the response headers together, `Content-Length` should be added only if there is no `Transfer-Encoding` header." bjohansebas co-authored the merged commit. It touched the library source and its test suite; a changelog entry was also added but is omitted here since it states the fix in almost the same words an ideal commit subject would use.

`Transfer-Encoding` describes how the body is framed on the wire — it is not about compression; that's `Content-Encoding`'s job. Its most common value, `chunked`, lets a sender start writing a response before it knows the total byte count: the body is split into chunks, each prefixed by its own size, ending in a zero-length chunk that marks the end. `Content-Length` and `Transfer-Encoding: chunked` are two different, mutually exclusive answers to the same question — where does the body end — so a response declaring both is ambiguous by construction, not merely against convention. (`Transfer-Encoding` also defines `gzip`, `deflate`, and `compress` values, but those are essentially unused in real traffic; almost everything that hits this bug in practice uses `chunked`.)

A response with both headers set is the textbook root cause of HTTP request/response smuggling: if a proxy and the origin server disagree about which header governs framing, they can disagree about where one response ends and the next begins. RFC 9112 §6.1 (which obsoletes RFC 7230) says a sender must not send `Content-Length` in a message that also has `Transfer-Encoding`, precisely to avoid that disagreement.

This wasn't a novel bug: independent reports of the same defect go back at least a decade — issues [#2866](https://github.com/expressjs/express/issues/2866) and [#2893](https://github.com/expressjs/express/issues/2893) in early 2016, [#2968](https://github.com/expressjs/express/issues/2968) a few months later, and [#3369](https://github.com/expressjs/express/issues/3369) in 2017 — each closed without a merged fix. PR #4893 itself was opened in April 2022 and sat unmerged for roughly four years before landing as this commit.

The PR went through several rounds of review before merging. A maintainer requested changes, asking for a test that fails without the fix and passes with it; another reviewer flagged that an early revision checked `this.getHeader('transfer-encoding')` instead of the case-standard `this.get('Transfer-Encoding')` used elsewhere in the file, which the author corrected. A third maintainer said he was initially "on the fence," reasoning out loud through whether checking for `Transfer-Encoding` could make some malformed responses worse before concluding it could only reduce them, since compliant clients already ignore `Content-Length` once `Transfer-Encoding` is present. The approving reviewer separately noted that `Transfer-Encoding` only declares how the body is framed, not that it was actually transformed into the declared encoding — if calling code sets `Transfer-Encoding: gzip` and then sends uncompressed bytes via `res.send()`, the response is still malformed, just for a reason this fix doesn't address; validating that is the calling code's responsibility, not something this change (or Express generally) takes on. Because of that, the fix checks for the presence of any `Transfer-Encoding` value rather than special-casing `chunked`. The PR's own commit history, visible in the squashed merge commit, reads as a punch list of these iterations: `fix(respond): add Content-Length header only if Transfer-Encoding is not present`, `fix(response): used get('Transfer-Encoding')`, `test(res.send): covered Transfer-Encoding and Content-Length headers logic`, `chore(response): removed comment`, `chore(res.redirect): revert changes to focus on res.send`, `test(res.send): added tests for all transfer encodings`, `docs: update History.md to include bug fix for HTTP header conflict in res.send()`.

Express moved some years ago from a single maintainer to governance by the OpenJS Foundation's Express Technical Committee, and for a long stretch most active maintainer attention went toward finishing the long-in-progress Express 5 major version rather than triaging older 4.x bug reports. The commit's committer field shows `GitHub <noreply@github.com>` rather than a person — an artifact of merging through GitHub's web UI, not anything specific to this change. Express was originally created by TJ Holowaychuk in 2010, who stepped back from the project long before this fix. The same week, unrelated commits to the repo bumped several GitHub Actions dependency versions and fixed an unrelated typo in `History.md`.

```diff
--- a/lib/response.js
+++ b/lib/response.js
@@ -162,9 +162,10 @@ res.send = function send(body) {
   var etagFn = app.get('etag fn')
   var generateETag = !this.get('ETag') && typeof etagFn === 'function'

-  // populate Content-Length
-  var len
-  if (chunk !== undefined) {
+  // Because Content-Length and Transfer-Encoding can't be present in the response headers together,
+  // Content-Length should be added only if there is no Transfer-Encoding header
+  var len;
+  if (chunk !== undefined && !this.get('Transfer-Encoding')) {
     if (Buffer.isBuffer(chunk)) {
       // get length of Buffer
       len = chunk.length
```

```diff
--- a/test/res.send.js
+++ b/test/res.send.js
@@ -592,4 +592,29 @@ describe('res', function(){
       })
     })
   })
+
+  describe('when Transfer-Encoding header is present', function(){
+    var transferEncodings = [
+      'chunked',
+      'compress',
+      'deflate',
+      'gzip'
+    ];
+
+    transferEncodings.forEach(function(encoding){
+      it('should not add Content-Length header if Transfer-Encoding header is equal to ' + encoding, function(done){
+        var app = express();
+
+        app.use(function(_, res){
+          res.status(200).set('Transfer-Encoding', encoding).send('');
+        });
+
+        request(app)
+          .get('/')
+          .expect(utils.shouldNotHaveHeader('Content-Length'))
+          .expect(utils.shouldHaveHeader('Transfer-Encoding'))
+          .expect(200, '', done);
+      })
+    });
+  })
 })
```

## Completion criteria

The subject names the header conflict being fixed (Content-Length no longer added when Transfer-Encoding is present) rather than just "fix res.send" or a PR number. Include a body only if it preserves material context the subject can't carry — for example why the two headers can't coexist, the smuggling-related motivation for that rule, or why the check applies to any Transfer-Encoding value rather than only `chunked` — future readers should not need to look up the HTTP spec or the PR thread to understand why the old behavior was a bug and what the fix actually covers. The body should not turn into a recap of the bug's multi-year reporting history, the project's governance structure, unrelated repository trivia (who originally created the project, other PRs merged the same week, the committer-field artifact), or the PR's review process (the naming nitpick, a reviewer's on-the-fence deliberation, the list of intermediate WIP commits) — a future reader investigating this specific header-setting logic doesn't need any of that to understand what changed and why.
