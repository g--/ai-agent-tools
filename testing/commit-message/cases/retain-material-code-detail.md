# Case: retain a compatibility decision

## Intended artifact

A Git commit message for engineers maintaining a device protocol.

## Task

Write a Conventional Commit with the repository's Gitmoji format.

## Source material

The parser refactor retains its explicit 64 KiB frame buffer limit. Firmware before version 3.4 rejects frames larger than 64 KiB; those devices remain supported through 2028-06-30. Removing the limit would let the refactor emit frames that older devices reject.

The patch renames `FrameAccumulator` to `FrameDecoder`, moves 182 lines to `decoder.rs`, and replaces a loop with an iterator. The team celebrated the refactor at a Thursday lunch. There is no issue reference.

## Completion criteria

The message identifies the material compatibility outcome, not generic refactoring mechanics. It retains the 64 KiB detail because it records a future-relevant compatibility decision. It does not describe file moves, renames, or implementation style changes.
