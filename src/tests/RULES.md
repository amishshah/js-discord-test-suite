# Rules

* Each client instance must fetch all offline users before `READY` (or the library equivalent) is received.
* Each client must reply to "!ping" messages with "!pong!".
* Each client must cache 1,000 messages per channel.