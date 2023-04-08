/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'X2QzmXGNlPSblDEljHkADcBL40z1',
      username: 'marat',
      fullName: 'Marat Alembikov',
      emailAddress: 'alembikovm@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'olya',
      fullName: 'Olga Alembikova',
      emailAddress: 'olga.alembikova@gmail.com',
      following: [],
      followers: ['X2QzmXGNlPSblDEljHkADcBL40z1'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'tema',
      fullName: 'Artem Alembikov',
      emailAddress: 'tema.alembikov@gmail.com',
      following: [],
      followers: ['X2QzmXGNlPSblDEljHkADcBL40z1'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/olya/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'tema',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'olya',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
