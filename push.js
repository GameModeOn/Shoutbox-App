senderID = '124440747277'

function register() {
  if ( device.platform == 'android' || device.platform == 'Android' )
  {
    pushNotification.register(
      successHandler,
      errorHandler, {
        "senderID":senderID,
        "ecb":"onNotificationGCM"
      }
    );
}

