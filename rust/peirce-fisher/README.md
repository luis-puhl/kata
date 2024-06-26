# Peice-Fisher - Experiment control service

Randomized experiments were used and dissimianted by many researchers, this repo
is named after two pioneers:
[Pieirce](https://en.wikipedia.org/wiki/Charles_Sanders_Peirce) and
[Fisher](Fisherhttps://en.wikipedia.org/wiki/Ronald_Fisher).

## What problem this solves, How it does it, Why do it this way

When there is a need to test whether an feature or experience has advantages
over other (or no exposure at all) there is a need for a
[Randomized Controlled Trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial),
also known as
[Randomized experiment](https://en.wikipedia.org/wiki/Randomized_experiment).

To properly execute such experiment we need a complete Experiment Desing with
Population definition, group allocation, controlled exposure (with logs and no
double exposure) and finally data collection and statistical analisys.

For that we have to edit and store an experiment, provide population allotment,
decide whether a user should be exposed to a treatment and log it and finally,
calculate statistics and provide monitoring. This can be provider by an web
service (REST API, WebApp, database).

This is mainly an exercice on how to run software experiments and to learn rust
doing an useful application service, but also may tools in the market do not
have the rigor nor simplicity they should.
