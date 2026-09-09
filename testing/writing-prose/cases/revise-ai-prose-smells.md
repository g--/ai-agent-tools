# Case: revise a workspace-migration email

## Test purpose

Test whether the skill removes AI-style framing, vague benefit language, decorative structure, repetition, and chat-response residue while retaining the information administrators need to act.

## Intended artifact

A concise email to workspace administrators about an upcoming authentication migration.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

On 18 June at 22:00 UTC, the service will move Business and Enterprise workspaces from the legacy SAML connection to the new SAML connection because the legacy connection’s certificate expires the following day. Existing user sessions will continue, but administrators must update their identity-provider metadata URL before the migration. The metadata URL and step-by-step instructions are in `https://docs.example.test/saml-migration`. Administrators who do not update it before 18 June cannot sign in through SAML after the migration. Password sign-in remains available for workspace owners. Support will be available through the normal support portal during the migration.

The migration project is named Aurora. It has 37 subtasks, began after an architecture workshop, and uses a deployment pipeline called `identity-cutover-prod`.

## Draft to revise

Subject: Unlock a seamless new era of identity management

In today’s fast-paced digital landscape, we are excited to share a comprehensive update designed to streamline and enhance your authentication journey.

## What this email covers

This email explains the upcoming Aurora migration; see ADR-123 for why it is needed. It provides key takeaways to help ensure a smooth transition.

## Key takeaways

1. The new connection will transform your SAML experience.
2. Please leverage the documentation before the migration.
3. Our robust support team is here to help.

## Next steps

Before 18 June, update it. The migration happens at 22:00 UTC. If this is not completed, it may affect authentication.

In conclusion, this proactive update will help ensure a seamless migration. Please do not hesitate to let us know if you have any questions.

## Evaluation criteria

The revision identifies who is affected, what changes, why it changes, when it changes, the metadata-URL action and documentation link, the sign-in consequence of not acting, the password-sign-in fallback, and the support route. It does not make readers retrieve ADR-123 to understand why they must act. It removes generic framing, unsupported benefit claims, meta-narration, repeated conclusions, and workshop, project, subtask, and pipeline details. It does not replace useful operational language with artificially short or simplistic prose.
