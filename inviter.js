function inviteGuests() {
  var now = new Date();
  var range = new Date(now.getTime() + (14*24*60*60*1000)); // Days * Hours * Minutes * Seconds * Milliseconds
  var uninvited = [];
  var events = CalendarApp.getCalendarById('CALENDAR_ID_HERE').getEvents(now, range); // Enter your calendar ID here.
  for (var i=0; i<events.length; i++) {
    if (!events[i].getGuestList()[0]){
      uninvited.push(i);
      Logger.log(events[i].getTitle()); // Logs the title of the each event without a guests.
    }
  }
  // Google has a limit on how many guests can be invited in any period of time.
  // I typically invite guests in sets of 3-10, and I use a time-trigger to run this code
  var eventsToInvite = 0;
  if (uninvited.length>3){
    eventsToInvite = 3;
  } else {
    eventsToInvite = uninvited.length;
  }
  Logger.log(uninvited);
  for (var j=0; j<eventsToInvite; j++){
    var num = uninvited[j];
    
    events[num].addGuest('GUEST_EMAIL_HERE'); // Add your guest(s) here.
    Logger.log('Invited guests to: ' + events[num].getTitle()); // Logs each event as the
    Utilities.sleep(10*1000); // Rests 10 seconds between each invite
  }
}
