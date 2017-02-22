const formatPost = (post) => {
  if (post.place) {
    return true;
  }

  return false;
};

const formatPosts = (posts) => {
  let formattedPosts = [];
  posts.forEach((post) => {
    if (formatPost(post)) {
      formattedPosts = [
        ...formattedPosts,
        post,
      ];
    }
  });
  return formattedPosts;
};


export default formatPosts;
