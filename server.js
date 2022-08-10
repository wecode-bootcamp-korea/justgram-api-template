const express = require('express');
const app = express();
const port = 8000;

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
]

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];
let postId = 3;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('pong')
});

app.post('/signup', (req, res) => {
  const lastUser = users[users.length - 1];
  if (lastUser) {
    users.push({
      id: users[users.length - 1].id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  }
  else {
    users.push({
      id: 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  }

  res.status(201).json({ message: "userCreated" });
});

app.post('/create-post', (req, res) => {
  posts.push({
    id: postId,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  })
  postId = postId + 1;
  res.status(201).json({ message: "postCreated" });
});

app.get('/posts', (req, res) => {
  const postsWithUserName = posts.map((post) => {
    const user = users.find((user) => post.userId === user.id);

    return {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
      userId: post.userId,
      userName: user.name
    }
  });

  res.json({ data: postsWithUserName })
});

app.patch('/post', (req, res) => {
  const { id, content } = req.body;

  const post = posts.find((post) => post.id === id);
  post.content = content;
  const user = users.find((user) => post.userId === user.id);
  const newPost = {
    postId: post.id,
    postTitle: post.title,
    postContent: post.content,
    userId: post.userId,
    userName: user.name
  }

  res.json({ data: newPost });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});