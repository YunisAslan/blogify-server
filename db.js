const users = [
  {
    username: "Yunis",
    fullName: "Aslanov",
    email: "yunis@gmail.com",
    password: "Yunis123",
    profileImage: "https://www.pngall.com/wp-content/uploads/5/Profile.png",
    isAdmin: false,
    id: "36VsFfx",
  },
  {
    username: "Nicat",
    fullName: "Aslanov",
    email: "yunis@gmail.com",
    password: "Yunis123",
    profileImage: "https://www.pngall.com/wp-content/uploads/5/Profile.png",
    isAdmin: false,
    id: "1",
  },
];

const publishers = [
  {
    username: "jojoruski",
    email: "jojoruski@gmail.com",
    password: "Jojoruski123",
    backgroundImg:
      "https://th.bing.com/th/id/OIP.c_7kKe0a2GYVRGe4bFJI2wHaKw?rs=1&pid=ImgDetMain",
    profileImg:
      "https://th.bing.com/th/id/OIP.iUz2EZeUmztRTBp8kocQZwHaLL?rs=1&pid=ImgDetMain",
    description: "Jojoruski description",
    name: "Jojo",
    joinedDate: "Wed Dec 20 2023 00:19:03 GMT+0400 (Azerbaijan Standard Time)",
    id: "1",
  },
  {
    username: "nekrolog",
    email: "nekrolog@gmail.com",
    password: "Nekrolog123",
    backgroundImg:
      "https://th.bing.com/th/id/OIP.c_7kKe0a2GYVRGe4bFJI2wHaKw?rs=1&pid=ImgDetMain",
    profileImg:
      "https://th.bing.com/th/id/OIP.iUz2EZeUmztRTBp8kocQZwHaLL?rs=1&pid=ImgDetMain",
    description: "Nekrolog description",
    name: "NEKRO",
    joinedDate: "Wed Dec 19 2023 00:19:03 GMT+0400 (Azerbaijan Standard Time)",
    id: "2",
  },
];

const news = [
  {
    id: "1",
    title: "Museum visits to treat loneliness",
    newsBody: "News Body 1",
    linkURL: "",
    thumbnailImg:
      "https://assets.website-files.com/61cc7ec6f43c125c5752aeb9/61cc7ec6f43c12b82e52aed5_23.jpg",
    createdAt: "Wed Dec 22 2023 00:13:03 GMT+0400 (Azerbaijan Standard Time)",
  },
  {
    id: "2",
    title: "Title 2",
    newsBody: "News Body 2",
    linkURL: "",
    thumbnailImg:
      "https://assets.website-files.com/61cc7ec6f43c125c5752aeb9/61cc7ec6f43c12b82e52aed5_23.jpg",
    createdAt: "Wed Dec 21 2023 00:13:03 GMT+0400 (Azerbaijan Standard Time)",
  },
  {
    id: "3",
    title: "Title 3",
    newsBody: "News Body 3",
    linkURL: "",
    thumbnailImg:
      "https://assets.website-files.com/61cc7ec6f43c125c5752aeb9/61cc7ec6f43c12b82e52aed5_23.jpg",
    createdAt: "Wed Dec 22 2023 00:13:03 GMT+0400 (Azerbaijan Standard Time)",
  },
  {
    id: "4",
    title: "Title 4",
    newsBody: "News Body 4",
    linkURL: "",
    thumbnailImg:
      "https://assets.website-files.com/61cc7ec6f43c125c5752aeb9/61cc7ec6f43c12b82e52aed5_23.jpg",
    createdAt: "Wed Dec 22 2023 00:13:03 GMT+0400 (Azerbaijan Standard Time)",
  },
];

const tags = [
  {
    id: "1",
    name: "javascript",
  },
  {
    id: "2",
    name: "typescript",
  },
];

const subscriptions = [
  {
    id: "1",
    userId: 1,
    publisherId: 1,
  },
];

module.exports = { users, publishers, news, tags, subscriptions };
