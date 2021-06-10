module.exports.eventSummary = (eventData) => (
  `New event '${ eventData.title }' was created.\n
  Adress: ${ eventData.adress } \n
  Description: ${ (eventData.description || 'Not provided.') } \n
  Distance (km): ${ (eventData.distance || 'Not provided.') } \n
`
);

module.exports.eventLinkButton = (eventData) => {
  return {
    'reply_markup': {
      'inline_keyboard': [[
        {
          'text': 'Direct link',
          'url': `https://vejsnoryja-cycling.netlify.app/event/${ eventData._id }`,
        }],
      ],
    },
  };
}

module.exports.eventReplyMarkup = (user) => {
  return {
    'reply_markup': {
      'resize_keyboard': true,
      'keyboard': [[`${user.subscribed? 'Unsubscribe': 'Subscribe'}`]]
    },
  };
}
