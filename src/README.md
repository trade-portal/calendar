# The challenges

Essentially, we don't need to worry about how the calendar looks, or rendering.
Ideally, we want to be able to render using whatever system we want.

The thing that we're trying to do it create a calendar object.
That can be given a set of events, and it will split those events into days.

And allow us to loop through each day and retrieve the events for each day.

Perhaps though, we need to start with rendering to understand the requirements?

When rendering we want to loop through weeks and then days, and then hours/time-slots.
Timeslots will be by default 30 minutes.

Therefore there should be an object/function which can retrieve the slots.
And a function that retrieves the days, and the weeks for a given range.

I reckon a calendar object is given a range object.
Which can give the weeks inside itself.
The range object is given a desired, start weekday (eg Monday or Sunday, etc), 
and any day within the period desired.

Maybe it should be a rangeGrid object? That holds also the empty place holders?
