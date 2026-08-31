# Case: EU upload-worker latency

## Intended artifact

An alert-response playbook for an on-call engineer responding at 03:00.

## Task

Write the response playbook.

## Source material

The alert name is `upload-worker-eu latency high`. It fires when EU upload-worker p99 latency exceeds 10 seconds for five minutes. The alert may represent either an overloaded worker queue or memory pressure in the PDF extraction path. Customer impact can include failed or delayed EU document uploads; existing document views/downloads, search, authentication, billing, API reads, scheduled exports, and US-region uploads are not affected by this alert.

Open `https://ops.example.test/dashboards/upload-worker-eu` and inspect `5xx_rate`, `p99_latency`, queue depth, and worker RSS for the last 15 minutes. If `5xx_rate` exceeds 2% while queue depth rises, reduce EU worker concurrency:

```sh
opsctl config set upload-worker --region eu-west-1 --concurrency 8
```

If RSS approaches the 2 GiB container limit and pods restart, quarantine the repeatedly failing object with:

```sh
opsctl uploads quarantine --region eu-west-1 --object-id <object-id>
```

After either mitigation, recovery is confirmed only when `5xx_rate` remains below 2%, p99 latency remains below 10 seconds, and queue depth declines for five minutes. Do not increase concurrency above 24 without platform approval. The responder needs production `opsctl` access.

The worker deployment is `upload-api-2026.09.29.3`. Heap profiles are attached to INC-771. The parser stack trace mentions `PdfObjectResolver`; the dashboard team is moving the queue graph to another folder next quarter.

## Completion criteria

The playbook uses the required top-level sections. Its remediation gives a fastest safe triage route, exact dashboard and commands, observable branch conditions, recovery verification, and the concurrency safety boundary. It does not reduce the response to “check logs,” “restart the service,” or generic dashboard monitoring.
